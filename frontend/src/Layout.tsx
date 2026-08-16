import NavBar from './components/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex items-center justify-center h-[800px]'>
            <NavBar />
            <main className="p-4">{children}</main>
        </div>
    )
}