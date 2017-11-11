import { timedFn } from '../util';
import { BUFFER_AGENTS } from '../const';

export default class Buffer {
  constructor(size) {
    this.size = size;
    this.data = Array.from(Array(size).keys(), (i) => ({payload: null}));
    this.producerIndex = 0;
    this.consumerIndex = 0;
    this.currentAgent = BUFFER_AGENTS.none;
  }

  get freeslots() {
    return this.data.reduce((acc, slot) => acc += slot.payload? 0 : 1, 0);
  }

  get loadedSlots() {
    return this.data.reduce((acc, slot) => acc += slot.payload? 1 : 0, 0);
  }

  get isAvailable() {
    console.log(!this.currentAgent, this.currentAgent);
    return !this.currentAgent;
  }

  async insert(payload) {
    this.currentAgent = BUFFER_AGENTS.producer;

    for (const data of payload) {
      await timedFn(() => {
        this.data[this.producerIndex].payload = data;
        this.producerIndex += 1;

        if (this.producerIndex > this.size) {
          this.producerIndex = 0;
        }
      });
    }

    this.currentAgent = BUFFER_AGENTS.none;
  }

  async remove(n=1) {
    this.currentAgent = BUFFER_AGENTS.consumer;
    const consumed = [];

    for (const i of new Array(n)) {
      await timedFn(() => {
        const data = this.data[this.consumerIndex].payload;

        consumed.push(data);
        this.data[this.consumerIndex].payload = null;
        this.consumerIndex += 1;

        if (this.consumerIndex >= this.size) {
          this.consumerIndex = 0;
        }
      });
    }

    this.currentAgent = BUFFER_AGENTS.none;

    return consumed;
  }
}
