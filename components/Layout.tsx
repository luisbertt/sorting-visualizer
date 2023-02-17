import Head from "next/head"
import { ReactNode } from "react"

type LayoutProps = {
    children?: ReactNode
    title: string
}

const Layout = ({ children, title }: LayoutProps) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        <main className="flex h-screen justify-center items-center">
            <div>{children}</div>
        </main>
        <footer></footer>
    </div>
)

export default Layout
