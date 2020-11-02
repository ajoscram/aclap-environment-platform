export function isPath(input: string, identifier: string): boolean {
    return input.startsWith('file://');
}