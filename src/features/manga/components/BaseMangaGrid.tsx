import type { IMangaGridProps } from '@/features/manga/components/MangaGrid.tsx';
import { MangaGrid } from '@/features/manga/components/MangaGrid.tsx';

type TMangaBaseGrid = Omit<
    IMangaGridProps['mangas'][number],
    'downloadCount' | 'downloadSize' | 'unreadCount' | 'chapters'
>;

export function BaseMangaGrid(props: Omit<IMangaGridProps, 'mangas'> & { mangas: TMangaBaseGrid[] }) {
    const { mangas } = props;

    return <MangaGrid gridWrapperProps={{ sx: { p: 1 } }} {...props} mangas={mangas as IMangaGridProps['mangas']} />;
}
