// Shuffles an array
// Fisher-Yates Shuffle
export function shuffle(array: number[]) {
    let m = array.length,
        t,
        i

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--)

        // And swap it with the current element.
        t = array[m]
        array[m] = array[i]
        array[i] = t
    }
    return array
}

// Generates a random integer in the range [min, max]. (Inclusive)
export function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function generateNumberArray(size: number): number[] {
    let arr = []
    for (let i = 0; i < size; i++) {
        arr.push(i + 1)
    }
    return shuffle(arr)
}

export function scale(numberToScale: number, factor: number) {
    return numberToScale * factor
}
