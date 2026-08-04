export const baseCleanup = (str: string) => str.toLowerCase().trim();

export const enhancedCleanup = (str: string): string =>
    baseCleanup(str)
        .normalize('NFKC')
        .replaceAll(/[^\p{L}\p{N}]+/gu, ' ')
        .trim();

export const reverseString = (str: string, separator: string = ''): string =>
    str.split(separator).reverse().join(separator);

export const indent = (str: string, level: number, char: string): string => char.repeat(level) + str;
