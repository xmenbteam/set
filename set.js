function Set() {
  const methods = { add, values, entries, clear, forEach, remove, has };
  const properties = {
    size: {
      configurable: true,
      enumerable: false,
      writable: true,
      value: 0,
    },
    store: {
      configurable: true,
      enumerable: false,
      writable: true,
      value: {},
    },
  };
  return Object.create(methods, properties);
}

function add(args) {
  const newArrayValues = [...Object.values(this.store), ...args];

  const newStore = {};
  let newSize = 0;

  newArrayValues
    .filter((value, index, self) => self.indexOf(value) === index)
    .forEach((element, index) => {
      newStore[index] = element;
      newSize++;
    });

  this.store = newStore;
  this.size = newSize;

  return this.store;
}

function values() {
  const values = [];
  for (let element in this.store) {
    values.push(this.store[element]);
  }
  return values;
}

function entries() {
  const entries = [];
  for (let element in this.store) {
    entries.push([element, this.store[element]]);
  }
  return entries;
}

function clear() {
  this.store = {};
  this.size = 0;
}

function forEach(func) {
  const newStore = {};
  for (let element in this.store) {
    newStore[element] = func(this.store[element]);
  }
  this.store = newStore;
}

function remove(item) {
  for (let element in this.store) {
    if (this.store[element] === item) {
      delete this.store[element];
    }
  }
  const values = Object.values(this.store);

  if (values.length) {
    const newStore = {};
    let newSize = 0;
    values.forEach((value, index) => {
      newStore[index] = value;
      newSize++;
    });
    this.store = newStore;
    this.size = newSize;
  }
}

function has(item) {
  let flag = false;
  for (let element in this.store) {
    if (this.store[element] === item) flag = true;
  }
  return flag;
}

module.exports = Set;
