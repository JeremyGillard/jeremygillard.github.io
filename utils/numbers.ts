export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomNumberString(minLength: number = 1, maxLength: number = 10): string {
    /*
        I chained the substring function because Math.random did not give me a strong enough disparity between very large and very small numbers. This allows me to have a nice disparity in string length.
    */
    return getRandomInt(1, 1000000)
        .toString()
        .substring(0, getRandomInt(minLength, maxLength));
}