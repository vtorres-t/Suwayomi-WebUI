import type { Direction } from '@mui/material/styles';
import type { EmotionCache } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

export const DIRECTION_TO_CACHE: Record<Direction, EmotionCache> = {
    ltr: createCache({
        key: 'muiltr',
    }),
    rtl: createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    }),
};
