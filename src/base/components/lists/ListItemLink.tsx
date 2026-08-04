import { Link } from 'react-router-dom';
import type { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemButton from '@mui/material/ListItemButton';

export function ListItemLink(props: ListItemButtonProps<typeof Link>) {
    return <ListItemButton component={Link} {...props} />;
}
