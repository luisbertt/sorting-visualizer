import { ReactNode } from "react"

type ButtonProps = {
    children: ReactNode
    onClick: () => void
}

export const Button = ({ children, onClick }: ButtonProps) => (
    <button
        className="bg-white hover:bg-gray-100 text-gray-800 py-1 px-2 border border-gray-400 rounded"
        onClick={onClick}
    >
        {children}
    </button>
)
