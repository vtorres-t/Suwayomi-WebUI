import type { ComponentType, Ref } from 'react';
import { memo } from 'react';

type PropsSourceCreator<T, Props extends Record<string, any>> = (props: Props) => T;

export const withPropsFrom = <
    ComponentProps extends Record<string, any>,
    SourceProps extends Record<string, any>[],
    SourcePropKeys extends keyof (ComponentProps | MergeObjectsArray<SourceProps>),
>(
    Component: ComponentType<ComponentProps>,
    propsSources: {
        [K in keyof SourceProps]: PropsSourceCreator<SourceProps[K], Omit<ComponentProps, SourcePropKeys>>;
    },
    sourcePropKeys: SourcePropKeys[],
) =>
    memo(({ ref, ...props }: Omit<ComponentProps, SourcePropKeys> & { ref?: Ref<HTMLElement> }) => {
        const sourceProps = propsSources.reduce(
            (acc, propsSource) => ({
                ...acc,
                ...propsSource(props as unknown as Omit<ComponentProps, SourcePropKeys>),
            }),
            {},
        );

        const selectedProps = Object.fromEntries(
            Object.entries(sourceProps).filter(([key]) => sourcePropKeys.includes(key as SourcePropKeys)),
        ) as Pick<MergeObjectsArray<SourceProps>, SourcePropKeys>;

        const combinedProps = { ...props, ...selectedProps } as unknown as ComponentProps;

        return <Component {...combinedProps} ref={ref} />;
    });
