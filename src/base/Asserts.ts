export function assertIsDefined<T>(value: T | undefined): asserts value is NonNullable<T> {
    if (value === undefined || value === null) {
        throw new Error('Value is undefined or null');
    }
}
