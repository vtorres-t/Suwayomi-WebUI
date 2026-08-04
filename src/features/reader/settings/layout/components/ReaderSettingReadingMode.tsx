import { useLingui } from '@lingui/react/macro';
import type { IReaderSettingsWithDefaultFlag, ReadingMode } from '@/features/reader/Reader.types.ts';
import {
    READING_MODE_VALUE_TO_DISPLAY_DATA,
    READING_MODE_VALUES,
} from '@/features/reader/settings/ReaderSettings.constants.tsx';
import { ButtonSelectInput } from '@/base/components/inputs/ButtonSelectInput.tsx';
import type { SelectButtonDefaultableProps } from '@/base/components/buttons/SelectButton.tsx';

export const ReaderSettingReadingMode = ({
    readingMode,
    setReadingMode,
    ...buttonSelectInputProps
}: Pick<IReaderSettingsWithDefaultFlag, 'readingMode'> &
    Pick<SelectButtonDefaultableProps<ReadingMode>, 'isDefaultable' | 'onDefault'> & {
        setReadingMode: (mode: ReadingMode) => void;
    }) => {
    const { t } = useLingui();

    return (
        <ButtonSelectInput
            {...buttonSelectInputProps}
            label={t`Reading mode`}
            value={readingMode.isDefault ? undefined : readingMode.value}
            defaultValue={readingMode.isDefault ? readingMode.value : undefined}
            values={READING_MODE_VALUES}
            setValue={setReadingMode}
            valueToDisplayData={READING_MODE_VALUE_TO_DISPLAY_DATA}
        />
    );
};
