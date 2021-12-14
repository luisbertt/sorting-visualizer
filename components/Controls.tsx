import { Dispatch, SetStateAction, ReactNode } from "react"
import { generateNumberArray } from "utils"

type AlgorithmCheckboxProps = {
    name: string
    generator: (
        from: number,
        to: number
    ) => Generator<["swap" | "compare", number, number], void, number>
    currentAlgorithm: (
        from: number,
        to: number
    ) => Generator<["swap" | "compare", number, number], void, number>
    setAlgorithm: Dispatch<
        SetStateAction<
            (
                from: number,
                to: number
            ) => Generator<["swap" | "compare", number, number], void, number>
        >
    >
}
export const AlgorithmCheckbox = ({
    name,
    generator,
    currentAlgorithm,
    setAlgorithm,
}: AlgorithmCheckboxProps) => (
    <p>
        <label>
            <input
                type="radio"
                checked={currentAlgorithm === generator}
                onChange={() => setAlgorithm(() => generator)}
            />{" "}
            {name}
        </label>
    </p>
)

export const AlgorithmsControl = ({ children }: { children: ReactNode }) => (
    <div>
        <h3 className="text-center">Algorithm:</h3>
        {children}
    </div>
)

export const TimelineControl = ({ children }: { children: ReactNode }) => (
    <div className="space-x-1">
        <h3 className="text-center">Timeline control:</h3>
        {children}
    </div>
)

export const Stats = ({
    stats,
}: {
    stats: { compare: number; swap: number }
}) => (
    <p className="text-sm">
        Comparisons: {stats.compare} Swaps: {stats.swap}
    </p>
)

export const Controls = ({ children }: { children: ReactNode }) => (
    <div className="text-sm flex space-x-8">{children}</div>
)

export const GenerateArray = ({
    setNumberArray,
}: {
    setNumberArray: Dispatch<SetStateAction<number[]>>
}) => (
    <div>
        <button
            className="bg-white text-black border p-2"
            onClick={() => setNumberArray(generateNumberArray(50))}
        >
            Generate Array
        </button>
    </div>
)
