import { getRandomIntInclusive } from '../util';
import { CONSUMER_STATUS } from '../const';

export default class Producer {
  constructor(buffer) {
    this.status = CONSUMER_STATUS.sleeping;
    this.buffer = buffer;
  }

  consume(n=1) {
    const nitems = n > this.buffer.loadedSlots? this.buffer.loadedSlots : n;
    console.log('try consume');
    if (!this.buffer.isAvailable && this.buffer.loadedSlots) {
      console.log('try consume: NOPE');
      return null;
    }
    console.log('try consume: YES');

    return this.buffer.remove(nitems);
  }

  randConsume() {
    if (!this.buffer.isAvailable && this.buffer.loadedSlots) {
      return null;
    }
    const consumed = this.consume(getRandomIntInclusive(2, 8));

    return consumed;
  }
}
