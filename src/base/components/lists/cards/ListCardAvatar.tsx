import type { ComponentProps } from 'react';
import { AvatarSpinner } from '@/base/components/AvatarSpinner.tsx';

export const ListCardAvatar = (props: ComponentProps<typeof AvatarSpinner>) => {
    const { slots } = props;

    return (
        <AvatarSpinner
            {...props}
            slots={{
                ...slots,
                avatarProps: {
                    ...slots?.avatarProps,
                    sx: {
                        width: 56,
                        height: 56,
                        flex: '0 0 auto',
                        background: 'transparent',
                        ...slots?.avatarProps?.sx,
                    },
                },
            }}
        />
    );
};
