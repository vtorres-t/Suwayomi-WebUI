import { useLingui } from '@lingui/react/macro';
import type {
    IReaderSettings,
    IReaderSettingsWithDefaultFlag,
    ReadingDirection,
} from '@/features/reader/Reader.types.ts';
import {
    PAGE_SCALE_VALUE_TO_DISPLAY_DATA,
    READER_PAGE_SCALE_MODE_VALUES,
} from '@/features/reader/settings/ReaderSettings.constants.tsx';
import { ButtonSelectInput } from '@/base/components/inputs/ButtonSelectInput.tsx';
import type { SelectButtonDefaultableProps } from '@/base/components/buttons/SelectButton.tsx';

export const ReaderSettingPageScaleMode = ({
    pageScaleMode,
    setPageScaleMode,
    ...buttonSelectInputProps
}: Pick<IReaderSettingsWithDefaultFlag, 'pageScaleMode'> &
    Pick<SelectButtonDefaultableProps<ReadingDirection>, 'isDefaultable' | 'onDefault'> & {
        setPageScaleMode: (mode: IReaderSettings['pageScaleMode']) => void;
    }) => {
    const { t } = useLingui();

    return (
        <ButtonSelectInput
            {...buttonSelectInputProps}
            label={t`Scale type`}
            value={pageScaleMode.isDefault ? undefined : pageScaleMode.value}
            defaultValue={pageScaleMode.isDefault ? pageScaleMode.value : undefined}
            values={READER_PAGE_SCALE_MODE_VALUES}
            setValue={setPageScaleMode}
            valueToDisplayData={PAGE_SCALE_VALUE_TO_DISPLAY_DATA}
        />
    );
};
