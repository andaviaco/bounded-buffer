import { getRandomIntInclusive } from '../util';
import { PRODUCER_CHARS, PRODUCER_STATUS } from '../const';

export default class Producer {
  constructor() {
    this.status = PRODUCER_STATUS.sleeping;
  }

  produce(n=1) {
    return Array.from(Array(n), () => PRODUCER_CHARS[getRandomIntInclusive(0, PRODUCER_CHARS.length - 1)]);
  }


}
