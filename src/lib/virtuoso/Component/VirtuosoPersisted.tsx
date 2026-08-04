import type { ComponentProps } from 'react';
import { useRef } from 'react';
import type { StateSnapshot, VirtuosoHandle } from 'react-virtuoso';
import { Virtuoso } from 'react-virtuoso';
import { useMergedRef } from '@mantine/hooks';
import { VirtuosoUtil } from '@/lib/virtuoso/Virtuoso.util.tsx';

export const VirtuosoPersisted = <ItemData = any, Context = any>({
    ref: passedRef,
    persistKey,
    ...props
}: ComponentProps<typeof Virtuoso<ItemData, Context>> & {
    persistKey: string;
}) => {
    const { state, persistState } = VirtuosoUtil.usePersistState<StateSnapshot>(persistKey);

    const localRef = useRef<VirtuosoHandle>(undefined);
    const ref = useMergedRef(localRef, passedRef);

    return (
        <Virtuoso
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
