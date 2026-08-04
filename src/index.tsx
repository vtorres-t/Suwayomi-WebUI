import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/base/AppSession.ts';
import '@/index.css';
import '@/polyfill.manual';
import { initializeLocalization } from '@/i18n';
import '@/lib/dayjs/Setup.ts';
import '@/lib/koration/Setup.ts';
import '@/lib/PointerDeviceUtil.ts';
import { App } from '@/App';
import { defaultPromiseErrorHandler } from '@/lib/DefaultPromiseErrorHandler.ts';

initializeLocalization().catch(defaultPromiseErrorHandler('i18n', true));

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
