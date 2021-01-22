var generator = require('generate-password');

export function generate(): string{
    return generator.generate({lenght: 10, numbers: true});
}