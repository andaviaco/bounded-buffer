import EventEmitter from 'events';

import { getRandomIntInclusive } from '../util';
import { CONSUMER_STATUS } from '../const';

export default class Producer extends EventEmitter {
  constructor(buffer) {
    super();

    this.status = CONSUMER_STATUS.sleeping;
    this.buffer = buffer;
  }

  async consume(n=1) {
    let consume;
    let nitems;

    this.status = CONSUMER_STATUS.wakingUp;
    this.emit('wakeUp');
    nitems = n > this.buffer.loadedSlots? this.buffer.loadedSlots : n;

    if (!this.buffer.isAvailable && this.buffer.loadedSlots) {
      this.status = CONSUMER_STATUS.sleep;
      this.emit('sleep');

      return null;
    }

    this.status = CONSUMER_STATUS.work;
    this.emit('work');

    consume = await this.buffer.remove(nitems);

    this.status = CONSUMER_STATUS.sleep;
    this.emit('sleep');

    return consume;
  }

  randConsume() {
    const consumed = this.consume(getRandomIntInclusive(2, 8));

    return consumed;
  }

}
