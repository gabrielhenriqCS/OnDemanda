import NavBar from './components/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <body className='min-h-screen'>
            <NavBar />
            <main className="p-4">{children}</main>
        </body>
    )
}