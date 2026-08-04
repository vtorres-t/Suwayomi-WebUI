import { Link } from 'react-router-dom';
import CardActionArea from '@mui/material/CardActionArea';
import type { ComponentProps } from 'react';

export const OptionalCardActionAreaLink = ({
    disabled,
    children,
    ...props
}: ComponentProps<typeof CardActionArea> &
    ComponentProps<typeof Link> & {
        disabled?: boolean;
    }) => {
    if (disabled) {
        return children;
    }

    return (
        <CardActionArea component={Link} {...props}>
            {children}
        </CardActionArea>
    );
};
