import NavBar from './components/NavBar';
import ProfileAndNotification from './components/ProfileAndNotification';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='min-h-screen'>
            <header className='h-16 flex items-center px-6 justify-between sticky top-0 bg-blue-300 z-10'>
                <NavBar />
                <ProfileAndNotification />
            </header>
            <main className="p-4">{children}</main>
        </div>
    )
}