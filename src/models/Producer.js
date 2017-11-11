import { getRandomIntInclusive } from '../util';
import { PRODUCER_CHARS, PRODUCER_STATUS } from '../const';

export default class Producer {
  constructor(buffer) {
    this.status = PRODUCER_STATUS.sleeping;
    this.buffer = buffer;
  }

  produce(n=1) {
    const nitems = n > this.buffer.freeslots? this.buffer.freeslots : n;
    if (!this.buffer.isAvailable && this.buffer.freeslots) {
      console.log('try produce: NOPE');
      return null;
    }

    const product = Array.from(Array(nitems), () => PRODUCER_CHARS[getRandomIntInclusive(0, PRODUCER_CHARS.length - 1)]);

    return this.buffer.insert(product);
  }

  randProduct() {
    if (!this.buffer.isAvailable && this.buffer.freeslots) {
      return null;
    }
    
    const product = this.produce(getRandomIntInclusive(2, 8));

    return product;
  }
}
