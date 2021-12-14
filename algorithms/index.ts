function compare(a: number, b: number): ["compare", number, number] {
    return ["compare", a, b]
}
function swap(a: number, b: number): ["swap", number, number] {
    return ["swap", a, b]
}

function* bubbleSort(
    from: number,
    to: number
): Generator<["swap" | "compare", number, number], void, number> {
    let swapped
    do {
        swapped = false
        to -= 1
        for (let j = from; j < to; j++) {
            if ((yield compare(j, j + 1)) > 0) {
                yield swap(j, j + 1)
                swapped = true
            }
        }
    } while (swapped)
}

function* tailSort(
    from: number,
    to: number
): Generator<["swap" | "compare", number, number], void, number> {
    let swapped /*: boolean */
    do {
        swapped = false
        from += 1 // increment by 1 EACH loop, as we know the first element will be in place
        for (let j = to - 1; j >= from; j--) {
            if ((yield compare(j, j - 1)) < 0) {
                yield swap(j, j - 1)
                swapped = true
            }
        }
    } while (swapped)
}

function* cocktailSort(
    from: number,
    to: number
): Generator<["swap" | "compare", number, number], void, number> {
    let swapped /*: boolean */
    do {
        swapped = false
        to -= 1 // decrement by 1 EACH loop, as we know the last element will be in place
        for (let j = from; j < to; j++) {
            if ((yield compare(j, j + 1)) > 0) {
                yield swap(j, j + 1)
                swapped = true
            }
        }
        if (!swapped) {
            break
        }
        swapped = false
        from += 1 // increment by 1 EACH loop, as we know the first element will be in place
        for (let j = to - 1; j >= from; j--) {
            if ((yield compare(j, j - 1)) < 0) {
                yield swap(j, j - 1)
                swapped = true
            }
        }
    } while (swapped)
}

function* quickSort(
    from: number,
    to: number
): Generator<["swap" | "compare", number, number], void, number> {
    if (to - from <= 1) {
        return // An array with the length of 1 or smaller is always sorted
    }
    // Pick pivot
    const pivot = to - 1
    // Partition
    let i = from
    for (let j = from; j < to; j++) {
        if ((yield compare(j, pivot)) < 0) {
            yield swap(i, j)
            i++
        }
    }
    yield swap(i, pivot)
    yield* quickSort(from, i)
    yield* quickSort(i + 1, to)
}

export default { bubbleSort, tailSort, cocktailSort, quickSort }
