import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useLingui } from '@lingui/react/macro';
import type { IReaderSettings } from '@/features/reader/Reader.types.ts';
import { READER_PAGE_SCALE_MODE_TO_SCALING_ALLOWED } from '@/features/reader/settings/ReaderSettings.constants.tsx';

export const ReaderSettingStretchPage = ({
    pageScaleMode,
    shouldStretchPage,
    setShouldStretchPage,
}: Pick<IReaderSettings, 'pageScaleMode' | 'shouldStretchPage'> & {
    setShouldStretchPage: (mode: IReaderSettings['shouldStretchPage']) => void;
}) => {
    const { t } = useLingui();

    if (!READER_PAGE_SCALE_MODE_TO_SCALING_ALLOWED[pageScaleMode]) {
        return null;
    }

    return (
        <Box>
            <Button
                onClick={() => setShouldStretchPage(!shouldStretchPage)}
                variant={shouldStretchPage ? 'contained' : 'outlined'}
            >
                {t`Stretch small pages`}
            </Button>
        </Box>
    );
};
