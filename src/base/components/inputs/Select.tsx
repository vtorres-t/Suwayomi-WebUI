import MuiSelect from '@mui/material/Select';

export const Select = <Value,>({
    children,
    maxSelectionHeightPx = 250,
    ...props
}: React.ComponentProps<typeof MuiSelect<Value>> & {
    maxSelectionHeightPx?: number;
}) => (
    <MuiSelect<Value> MenuProps={{ slotProps: { paper: { sx: { maxHeight: maxSelectionHeightPx } } } }} {...props}>
        {children}
    </MuiSelect>
);
