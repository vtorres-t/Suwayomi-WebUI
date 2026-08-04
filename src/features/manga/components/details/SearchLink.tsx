import type { ReactNode } from 'react';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import type { MangaLocationState } from '@/features/manga/Manga.types.ts';
import type { SourceIdInfo } from '@/features/source/Source.types.ts';
import { AppRoutes } from '@/base/AppRoute.constants.ts';

export const SearchLink = ({
    query,
    sourceId,
    mode,
    children,
}: {
    query: string;
    sourceId: SourceIdInfo['id'] | undefined;
    mode: MangaLocationState['mode'] | 'source.global-search';
    children?: ReactNode;
}) => {
    const link = (() => {
        const isSourceMode = mode === 'source' && sourceId !== undefined;
        if (isSourceMode) {
            return AppRoutes.sources.children.browse.path(sourceId, query);
        }

        if (mode === 'source.global-search') {
            return AppRoutes.sources.children.searchAll.path(query);
        }

        return AppRoutes.library.path(undefined, query);
    })();

    return (
        <Link component={RouterLink} to={link} sx={{ textDecoration: 'none', color: 'inherit' }}>
            {children ?? query}
        </Link>
    );
};
