import { BUFFER_AGENTS } from '../const';

export default class Buffer {
  constructor(size) {
    this.size = size;
    this.data = Array.from(Array(size).keys(), (i) => ({payload: null}));
    this.producerIndex = 0;
    this.consumerIndex = 0;
    this.currentAgent = BUFFER_AGENTS.none;
  }
}
