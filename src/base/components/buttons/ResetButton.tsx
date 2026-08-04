import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import { useLingui } from '@lingui/react/macro';
import { CustomTooltip } from '@/base/components/CustomTooltip.tsx';

type PropsIconButton = { asIconButton: true } & IconButtonProps;
type PropsButton = { asIconButton?: false } & ButtonProps;
type Props = PropsIconButton | PropsButton;

export const ResetButton = ({ asIconButton, ...props }: Props) => {
    const { t } = useLingui();

    if (asIconButton) {
        return (
            <CustomTooltip title={t`Reset`}>
                <IconButton color="inherit" {...props}>
                    <RestartAltIcon />
                </IconButton>
            </CustomTooltip>
        );
    }

    return (
        <Button startIcon={<RestartAltIcon />} {...(props as ButtonProps)}>
            {t`Reset`}
        </Button>
    );
};
