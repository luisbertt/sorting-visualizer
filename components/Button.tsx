import { ReactNode } from "react"

type ButtonProps = {
    children: ReactNode
    onClick: () => void
}

export const Button = ({ children, onClick }: ButtonProps) => (
    <button className="border px-2 bg-white text-black" onClick={onClick}>
        {children}
    </button>
)
