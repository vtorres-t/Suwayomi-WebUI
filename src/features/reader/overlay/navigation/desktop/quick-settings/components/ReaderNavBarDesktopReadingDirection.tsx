import { useLingui } from '@lingui/react/macro';
import type { IReaderSettingsWithDefaultFlag, ReadingDirection } from '@/features/reader/Reader.types.ts';
import {
    READING_DIRECTION_VALUE_TO_DISPLAY_DATA,
    READING_DIRECTION_VALUES,
} from '@/features/reader/settings/ReaderSettings.constants.tsx';
import type { SelectButtonDefaultableProps } from '@/base/components/buttons/SelectButton.tsx';
import { SelectButton } from '@/base/components/buttons/SelectButton.tsx';

export const ReaderNavBarDesktopReadingDirection = ({
    readingDirection,
    setReadingDirection,
    ...buttonSelectInputProps
}: Pick<IReaderSettingsWithDefaultFlag, 'readingDirection'> &
    Pick<SelectButtonDefaultableProps<ReadingDirection>, 'isDefaultable' | 'onDefault'> & {
        setReadingDirection: (readingDirection: ReadingDirection) => void;
    }) => {
    const { t } = useLingui();

    return (
        <SelectButton
            {...buttonSelectInputProps}
            tooltip={t`Reading direction`}
            value={readingDirection.isDefault ? undefined : readingDirection.value}
            defaultValue={readingDirection.isDefault ? readingDirection.value : undefined}
            values={READING_DIRECTION_VALUES}
            setValue={setReadingDirection}
            valueToDisplayData={READING_DIRECTION_VALUE_TO_DISPLAY_DATA}
            defaultIcon={READING_DIRECTION_VALUE_TO_DISPLAY_DATA[readingDirection.value].icon}
            isCollapsible
        />
    );
};
