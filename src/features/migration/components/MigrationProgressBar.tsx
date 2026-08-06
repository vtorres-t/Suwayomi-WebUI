import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import type { MigrationProgress } from '@/features/migration/Migration.types.ts';

export const MigrationProgressBar = ({
    completed,
    total,
    label,
}: {
    label: string;
} & MigrationProgress) => {
    const progress = total > 0 ? (completed / total) * 100 : 0;

    if (completed === total) {
        return null;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 2,
                py: 1,
                backgroundColor: 'background.default',
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 'fit-content' }}>
                {label}
            </Typography>
        </Box>
    );
};
