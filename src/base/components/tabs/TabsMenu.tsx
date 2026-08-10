import type { TabsProps } from '@mui/material/Tabs';
import Tabs from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';

const StyledTabsMenu = styled(Tabs)(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    border: 0,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
}));

export const TabsMenu = ({ children, ...props }: TabsProps) => (
    <StyledTabsMenu
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        {...props}
    >
        {children}
    </StyledTabsMenu>
);
