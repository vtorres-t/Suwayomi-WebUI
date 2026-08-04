import { GridLayouts } from '@/base/components/GridLayouts.tsx';
import { useLocalStorage } from '@/base/hooks/useStorage.tsx';
import { GridLayout } from '@/base/Base.types.ts';

export function SourceGridLayout() {
    const [sourceGridLayout, setSourceGridLayout] = useLocalStorage('source-grid-layout', GridLayout.Compact);

    return <GridLayouts gridLayout={sourceGridLayout} onChange={setSourceGridLayout} />;
}
