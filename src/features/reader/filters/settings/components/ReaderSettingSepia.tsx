import Stack from '@mui/material/Stack';
import { useLingui } from '@lingui/react/macro';
import type { IReaderSettings } from '@/features/reader/Reader.types.ts';
import { CheckboxInput } from '@/base/components/inputs/CheckboxInput.tsx';

export const ReaderSettingSepia = ({
    sepia,
    updateSetting,
}: Pick<IReaderSettings['customFilter'], 'sepia'> & {
    updateSetting: (sepia: boolean) => void;
}) => {
    const { t } = useLingui();

    return (
        <Stack>
            <CheckboxInput label={t`Sepia`} checked={sepia} onChange={(_, checked) => updateSetting(checked)} />
        </Stack>
    );
};
