import Stack from '@mui/material/Stack';
import { useLingui } from '@lingui/react/macro';
import type { IReaderSettings } from '@/features/reader/Reader.types.ts';
import { CheckboxInput } from '@/base/components/inputs/CheckboxInput.tsx';

export const ReaderSettingGrayscale = ({
    grayscale,
    updateSetting,
}: Pick<IReaderSettings['customFilter'], 'grayscale'> & {
    updateSetting: (grayscale: boolean) => void;
}) => {
    const { t } = useLingui();

    return (
        <Stack>
            <CheckboxInput label={t`Grayscale`} checked={grayscale} onChange={(_, checked) => updateSetting(checked)} />
        </Stack>
    );
};
