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

type BGColors = {
    green: string
    red: string
}

type BarProps = {
    n: number
    barEffects: string
}

const barBg: BGColors = {
    green: "bg-green-500",
    red: "bg-red-500",
}

export const Bar = ({ n, barEffects }: BarProps) => {
    const height = `${scale(n, 10)}px`
    const styles = `${
        barBg[barEffects as keyof BGColors] || "bg-gray-300"
    } w-4 text-black text-center`

    return (
        <div className={styles} style={{ height }}>
            {n}
        </div>
    )
}
