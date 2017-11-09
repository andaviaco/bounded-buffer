
export default class Buffer {
  constructor(size) {
    this.data = Array.from(Array(size).keys(), (i) => ({payload: i+1}))
  }
}
