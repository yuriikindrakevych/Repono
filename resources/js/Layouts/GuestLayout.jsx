import { Logo } from '@/Components/repono/Chrome';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="repono-surface flex min-h-screen flex-col items-center pt-10 sm:justify-center sm:pt-0"
            style={{ background: 'var(--surface-page)' }}>
            <div className="mb-2">
                <Link href="/"><Logo size={34} /></Link>
            </div>

            <div className="mt-6 w-full overflow-hidden px-6 py-6 sm:max-w-md"
                style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                {children}
            </div>
        </div>
    );
}
