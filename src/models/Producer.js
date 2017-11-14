import EventEmitter from 'events';

import { getRandomIntInclusive } from '../util';
import { PRODUCER_CHARS, PRODUCER_STATUS } from '../const';

export default class Producer extends EventEmitter {
  constructor(buffer) {
    super();

    this.status = PRODUCER_STATUS.sleeping;
    this.buffer = buffer;
  }

  async produce(n=1) {
    let product;
    let result;

    this.status = PRODUCER_STATUS.wakingUp;
    this.emit('wakeUp');

    const nitems = n > this.buffer.freeslots? this.buffer.freeslots : n;

    if (!this.buffer.isAvailable || !this.buffer.freeslots) {
      this.status = PRODUCER_STATUS.sleeping;
      this.emit('sleep');

      return null;
    }

    this.status = PRODUCER_STATUS.working;
    product = Array.from(Array(nitems), () => PRODUCER_CHARS[getRandomIntInclusive(0, PRODUCER_CHARS.length - 1)]);
    this.emit('work', product);

    result = await this.buffer.insert(product);

    this.status = PRODUCER_STATUS.sleeping;
    this.emit('sleep');

    return result
  }

  randProduct() {

    const product = this.produce(getRandomIntInclusive(2, 8));

    return product;
  }
}
