function deepClone<T>(obj: T, seen = new WeakMap()): T {
    
    if (obj === null || typeof obj !== "object") return obj;

    
    if (seen.has(obj)) return seen.get(obj);

   
    if (obj instanceof Date) return new Date(obj) as T;

   
    if (obj instanceof Map) {
        const mapCopy = new Map();
        seen.set(obj, mapCopy);
        obj.forEach((value, key) => {
            mapCopy.set(key, deepClone(value, seen));
        });
        return mapCopy as T;
    }

    
    if (obj instanceof Set) {
        const setCopy = new Set();
        seen.set(obj, setCopy);
        obj.forEach(value => {
            setCopy.add(deepClone(value, seen));
        });
        return setCopy as T;
    }

    
    const clone = Object.create(Object.getPrototypeOf(obj));
    seen.set(obj, clone);

    
    for (const key of Reflect.ownKeys(obj)) {
        (clone as any)[key] = deepClone((obj as any)[key], seen);
    }

    return clone;
}


const obj = {
    name: "Alice",
    age: 30,
    nested: { key: "value" },
    date: new Date(),
    arr: [1, 2, { deep: "test" }],
    map: new Map([["key", "value"]]),
    set: new Set([1, 2, 3]),
    method() {
        return "Hello!";
    },
    [Symbol("id")]: 123,
};

const copy = deepClone(obj);

console.log(copy);
console.log(copy !== obj);
console.log(copy.nested !== obj.nested);
console.log(copy.map !== obj.map);
console.log(copy.set !== obj.set);
console.log(copy.method === obj.method);
