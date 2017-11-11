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

}
