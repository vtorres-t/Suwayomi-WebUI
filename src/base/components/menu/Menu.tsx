import type { MenuProps } from '@mui/material/Menu';
import MuiMenu from '@mui/material/Menu';
import { type JSX, useState } from 'react';

export const Menu = ({
    children,
    onClose,
    ...props
}: Omit<MenuProps, 'children' | 'onClose'> &
    Required<Pick<MenuProps, 'onClose'>> & {
        children: (onClose: () => void, setHideMenu: (hide: boolean) => void) => JSX.Element | JSX.Element[];
    }) => {
    const [shouldHideMenu, setShouldHideMenu] = useState(false);

    return (
        <MuiMenu
            {...props}
            open={props.open}
            onClose={onClose}
            sx={{ visibility: !props.open || shouldHideMenu ? 'hidden' : 'visible' }}
        >
            {children(() => {
                onClose({}, 'backdropClick');
                setShouldHideMenu(false);
            }, setShouldHideMenu)}
        </MuiMenu>
    );
};
