import type { ComponentProps } from 'react';
import { useRef } from 'react';
import type { GroupedVirtuosoHandle, StateSnapshot } from 'react-virtuoso';
import { GroupedVirtuoso } from 'react-virtuoso';
import { useMergedRef } from '@mantine/hooks';
import { VirtuosoUtil } from '@/lib/virtuoso/Virtuoso.util.tsx';

export const GroupedVirtuosoPersisted = <ItemData = any, Context = any>({
    ref: passedRef,
    persistKey,
    ...props
}: ComponentProps<typeof GroupedVirtuoso<ItemData, Context>> & {
    persistKey: string;
}) => {
    const { state, persistState } = VirtuosoUtil.usePersistState<StateSnapshot>(persistKey);

    const localRef = useRef<GroupedVirtuosoHandle>(undefined);
    const ref = useMergedRef(localRef, passedRef);

    return (
        <GroupedVirtuoso
            {...props}
            ref={ref}
            isScrolling={(isScrolling) => {
                if (!isScrolling) {
                    localRef.current?.getState(persistState);
                }

                props.isScrolling?.(isScrolling);
            }}
            restoreStateFrom={state}
        />
    );
};
