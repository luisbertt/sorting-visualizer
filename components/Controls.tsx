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
    <div className="absolute -left-28">{children}</div>
)

export const TimelineControl = ({ children }: { children: ReactNode }) => (
    <div className="space-x-1">{children}</div>
)

export const Stats = ({
    stats,
}: {
    stats: { compare: number; swap: number }
}) => (
    <div className="font-bold text-2xl">
        <p>
            Comparisons {stats.compare} | Swaps {stats.swap}{" "}
        </p>
    </div>
)

export const Controls = ({ children }: { children: ReactNode }) => (
    <div className="flex space-x-7 text-sm">{children}</div>
)
