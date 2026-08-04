import { useLingui } from '@lingui/react/macro';
import Fab from '@mui/material/Fab';

export const MigrationContinueButton = ({
    onClick,
    isDisabled,
    title,
}: {
    onClick: () => void;
    isDisabled?: boolean;
    title?: string;
}) => {
    const { t } = useLingui();

    return (
        <Fab
            variant="extended"
            color="primary"
            sx={{
                position: 'fixed',
                bottom: (theme) => theme.spacing(2),
                right: (theme) => theme.spacing(2),
            }}
            disabled={isDisabled}
            onClick={onClick}
        >
            {title ?? t`Continue`}
        </Fab>
    );
};
