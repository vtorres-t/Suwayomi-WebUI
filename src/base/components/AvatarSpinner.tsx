import type { AvatarProps } from '@mui/material/Avatar';
import Avatar from '@mui/material/Avatar';
import type { SpinnerImageProps } from '@/base/components/SpinnerImage.tsx';
import { SpinnerImage } from '@/base/components/SpinnerImage.tsx';

export const AvatarSpinner = ({
    iconUrl,
    alt,
    slots,
}: {
    iconUrl: string;
    alt: string;
    slots?: { avatarProps?: Partial<AvatarProps>; spinnerImageProps?: Partial<SpinnerImageProps> };
}) => (
    <Avatar variant="rounded" alt={alt} {...slots?.avatarProps}>
        <SpinnerImage
            alt={alt}
            src={iconUrl}
            {...slots?.spinnerImageProps}
            spinnerStyle={{ small: true, ...slots?.spinnerImageProps?.spinnerStyle }}
            imgStyle={{ objectFit: 'cover', width: '100%', height: '100%', ...slots?.spinnerImageProps?.imgStyle }}
        />
    </Avatar>
);
