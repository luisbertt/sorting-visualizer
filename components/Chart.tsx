import { ReactNode } from "react"
import { scale } from "utils"

type CharContainerProps = {
    children: ReactNode
}

export const ChartContainer = ({ children }: CharContainerProps) => (
    <div className="flex items-end space-x-1">{children}</div>
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
    const height = `${scale(n, 5)}px`
    const styles = `${barBg[barEffects as keyof BGColors] || "bg-gray-200"} w-2`

    return <div className={styles} style={{ height }}></div>
}
