import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { MenuItemProps } from '@mui/material/MenuItem';
import MuiMenuItem from '@mui/material/MenuItem';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconTypeMap } from '@mui/material/SvgIcon';

interface IProps extends MenuItemProps {
    title: string;
    Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
}

export const MenuItem = ({ title, Icon, ...menuItemProps }: IProps) => (
    <MuiMenuItem {...menuItemProps}>
        <ListItemIcon>
            <Icon fontSize="small" />
        </ListItemIcon>
        <ListItemText>{title}</ListItemText>
    </MuiMenuItem>
);
