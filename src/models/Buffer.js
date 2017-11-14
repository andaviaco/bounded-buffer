import { intervalFn } from '../util';
import { BUFFER_AGENTS } from '../const';

export default class Buffer {
  constructor(size) {
    this.size = size;
    this.data = Array.from(Array(size).keys(), (i) => ({payload: null}));
    this.producerIndex = 0;
    this.consumerIndex = 0;
    this.currentAgent = BUFFER_AGENTS.none;
    this.producerIntervalId = null;
    this.consumerIntervalId = null;
  }

  get freeslots() {
    return this.data.reduce((acc, slot) => acc += slot.payload? 0 : 1, 0);
  }

  get loadedSlots() {
    return this.data.reduce((acc, slot) => acc += slot.payload? 1 : 0, 0);
  }

  get isAvailable() {
    return !this.currentAgent;
  }

  async insert(payload) {
    this.currentAgent = BUFFER_AGENTS.producer;

    await intervalFn(payload.length, (i, stop) => {
      this.producerIntervalStop = stop;

      this.data[this.producerIndex].payload = payload[i];
      this.producerIndex += 1;

      if (this.producerIndex >= this.size) {
        this.producerIndex = 0;
      }
    });

    this.currentAgent = BUFFER_AGENTS.none;
  }

  async remove(n=1) {
    const consumed = [];

    this.currentAgent = BUFFER_AGENTS.consumer;

    await intervalFn(n, (i, stop) => {
      const data = this.data[this.consumerIndex].payload;

      this.consumerIntervalStop = stop;

      consumed.push(data);
      this.data[this.consumerIndex].payload = null;
      this.consumerIndex += 1;

      if (this.consumerIndex >= this.size) {
        this.consumerIndex = 0;
      }
    })

    this.currentAgent = BUFFER_AGENTS.none;

    return consumed;
  }

  stop() {
    this.currentAgent = BUFFER_AGENTS.none;

    this.producerIntervalStop();
    this.consumerIntervalStop();
  }
}
