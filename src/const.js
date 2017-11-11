
export const BUFFER_SIZE = 40;

export const PRODUCER_CHARS = 'ABCDEFGHIJKMLNOPQRSTUVWXYZ0123456789+-*#$%&';

export const PRODUCER_STATUS = {
  sleeping: 0,
  working: 1,
  wakingUp: 2,
};

export const BUFFER_AGENTS = {
  none: null,
  producer: 'producer',
  consumer: 'consumer',
};
