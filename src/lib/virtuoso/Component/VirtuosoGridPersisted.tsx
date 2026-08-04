import type { ComponentProps } from 'react';
import { useRef } from 'react';
import type { GridStateSnapshot, VirtuosoGridHandle } from 'react-virtuoso';
import { VirtuosoGrid } from 'react-virtuoso';
import { useMergedRef } from '@mantine/hooks';
import { VirtuosoUtil } from '@/lib/virtuoso/Virtuoso.util.tsx';

export const VirtuosoGridPersisted = <ItemData = any, Context = any>({
    ref: passedRef,
    persistKey,
    ...props
}: ComponentProps<typeof VirtuosoGrid<ItemData, Context>> & {
    persistKey: string;
}) => {
    const { state, persistState } = VirtuosoUtil.usePersistState<GridStateSnapshot>(persistKey);

    const localRef = useRef<VirtuosoGridHandle>(undefined);
    const ref = useMergedRef(localRef, passedRef);

    return <VirtuosoGrid {...props} ref={ref} stateChanged={persistState} restoreStateFrom={state} />;
};
