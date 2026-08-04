import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { plural } from '@lingui/core/macro';

export const MissingChaptersInfoSeparator = ({
    missingChaptersGap: missingChapterCount,
}: {
    missingChaptersGap: number;
}) => (
    <Stack
        sx={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            pt: 3.5,
            pb: 2.5,
        }}
    >
        <Box
            sx={{
                flexGrow: 1,
                border: '1px solid',
                borderColor: (theme) => theme.palette.text.secondary,
            }}
        />
        <Typography sx={{ px: 2 }} variant="body2" color="textSecondary">
            {plural(missingChapterCount, {
                one: 'Missing # chapter',
                other: 'Missing # chapters',
            })}
        </Typography>
        <Box
            sx={{
                flexGrow: 1,
                border: '1px solid',
                borderColor: (theme) => theme.palette.text.secondary,
            }}
        />
    </Stack>
);
