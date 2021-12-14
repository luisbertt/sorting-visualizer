import { useCallback, useEffect, useReducer, useRef, useState } from "react"

function useSortingVisualizer(
    baseArray: number[],
    algorithm: (
        from: number,
        to: number
    ) => Generator<["swap" | "compare", number, number], void, number>
): {
    displayedArray: number[]
    done: boolean
    reset: () => void
    step: () => void
    stats: { compare: number; swap: number }
    barEffects: Record<number, string>
} {
    const [resetCount, reset] = useReducer((state) => state + 1, 0)
    const [{ displayedArray, done, barEffects, stats }, setState] = useState({
        displayedArray: [] as number[],
        done: true,
        barEffects: {},
        stats: { compare: 0, swap: 0 },
    })
    const stepRef = useRef(() => {})

    useEffect(() => {
        let state = {
            displayedArray: baseArray,
            done: false,
            barEffects: {},
            stats: { compare: 0, swap: 0 },
        }
        setState(state)
        const generator = algorithm(0, state.displayedArray.length)
        let nextValue = 0

        function doStep() {
            const action = generator.next(nextValue)
            if (action.done) {
                if (!state.done) {
                    state = {
                        ...state,
                        done: true,
                    }
                    setState(state)
                }
            } else if (action.value[0] === "compare") {
                const a = state.displayedArray[action.value[1]]
                const b = state.displayedArray[action.value[2]]
                if (a > b) {
                    nextValue = 1
                } else if (a < b) {
                    nextValue = -1
                } else {
                    nextValue = 0
                }
                state = {
                    ...state,
                    barEffects: {
                        [action.value[1]]: "red",
                        [action.value[2]]: "red",
                    },
                    stats: {
                        ...state.stats,
                        compare: state.stats.compare + 1,
                    },
                }
                setState(state)
            } else if (action.value[0] === "swap") {
                const workingArray = [...state.displayedArray]
                const tmp = workingArray[action.value[1]]
                workingArray[action.value[1]] = workingArray[action.value[2]]
                workingArray[action.value[2]] = tmp
                state = {
                    ...state,
                    displayedArray: workingArray,
                    barEffects: {
                        [action.value[1]]: "green",
                        [action.value[2]]: "green",
                    },
                    stats: {
                        ...state.stats,
                        swap: state.stats.swap + 1,
                    },
                }
                setState(state)
            } else {
                throw new Error("What? " + JSON.stringify(action.value))
            }
        }
        stepRef.current = doStep
    }, [resetCount, baseArray, algorithm])

    const step = useCallback(() => {
        stepRef.current()
    }, [stepRef])

    return {
        displayedArray,
        done,
        barEffects,
        stats,
        step,
        reset,
    }
}

export default useSortingVisualizer
