export {};

declare global {
  interface Array<T> {
    shuffle(): T[];
  }
}

Array.prototype.shuffle = function <T>(this: T[]): T[] {
return this.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};