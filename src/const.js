
export const BUFFER_SIZE = 40;

export const PRODUCER_CHARS = 'ABCDEFGHIJKMLNOPQRSTUVWXYZ0123456789+*#$%&';

export const PRODUCER_STATUS = {
  sleeping: 'sleeping',
  working: 'working',
  wakingUp: 'waking up',
};

export const CONSUMER_STATUS = {
  sleeping: 'sleeping',
  working: 'working',
  wakingUp: 'waking up',
};

export const BUFFER_AGENTS = {
  none: null,
  producer: 'productor',
  consumer: 'consumidor',
};

export const BUFFER_AGENTS_COLORS = {
  [BUFFER_AGENTS.none]: 'secondary',
  [BUFFER_AGENTS.producer]: 'primary',
  [BUFFER_AGENTS.consumer]: 'red',
};
