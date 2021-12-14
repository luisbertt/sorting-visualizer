import Head from "next/head"
import { ReactNode } from "react"

type LayoutProps = {
    children?: ReactNode
    title: string
}

const Layout = ({ children, title }: LayoutProps) => (
    <div className="bg-black">
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        <main className="flex flex-col h-screen justify-center items-center space-y-4 text-white">
            {children}
        </main>
        <footer></footer>
    </div>
)

export default Layout
