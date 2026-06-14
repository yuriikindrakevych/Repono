import '../css/app.css';
import './bootstrap';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { setI18n } from './i18n';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Keep the i18n dictionary in sync with the active page's shared props.
router.on('navigate', (event) => setI18n(event.detail.page.props?.i18n));

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        setI18n(props.initialPage.props?.i18n);
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
