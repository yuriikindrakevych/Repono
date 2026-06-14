import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { MarketingHeader, Footer } from '@/Components/repono/Chrome';

const wrap = { maxWidth: 'var(--container-prose)', margin: '0 auto', padding: '0 24px' };

export default function Legal({ doc }) {
    const { auth } = usePage().props;
    return (
        <div className="repono-surface">
            <Head title={doc.title} />
            <MarketingHeader auth={auth} />
            <main style={{ ...wrap, paddingTop: 56, paddingBottom: 80 }}>
                <span className="r-eyebrow">Legal</span>
                <h1 style={{ fontSize: 'var(--fs-display-md)', marginTop: 12 }}>{doc.title}</h1>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-subtle)', marginTop: 8 }}>
                    Updated {doc.updated}
                </p>
                <div style={{ display: 'grid', gap: 18, marginTop: 28 }}>
                    {doc.body.map((p, i) => (
                        <p key={i} style={{ fontSize: 'var(--fs-body)', color: 'var(--text-body)', lineHeight: 'var(--lh-relaxed)' }}>{p}</p>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
