import { ReactNode } from "react"
import { scale } from "utils"

type CharContainerProps = {
    children: ReactNode
    height: string
}

export const ChartContainer = ({ children, height }: CharContainerProps) => (
    <div className="flex items-end text-xs space-x-1" style={{ height }}>
        {children}
    </div>
)

type BarProps = {
    n: number
    barEffects: Record<number, string>
}

export const Bar = ({ n, barEffects }: BarProps) => {
    const height = `${scale(n, 10)}px`
    const color = barEffects ? `bg-${barEffects}-500` : "bg-gray-400"
    return (
        <div
            className={`${color} w-4 text-black text-center`}
            style={{ height }}
        >
            {n}
        </div>
    )
}
