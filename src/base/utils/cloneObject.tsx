export function cloneObject<T extends object>(obj: T) {
    return structuredClone(obj);
}
