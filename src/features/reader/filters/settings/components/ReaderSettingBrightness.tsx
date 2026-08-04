import Stack from '@mui/material/Stack';
import { useLingui } from '@lingui/react/macro';
import type { IReaderSettings } from '@/features/reader/Reader.types.ts';
import { CheckboxInput } from '@/base/components/inputs/CheckboxInput.tsx';
import { SliderInput } from '@/base/components/inputs/SliderInput.tsx';
import { CUSTOM_FILTER, DEFAULT_READER_SETTINGS } from '@/features/reader/settings/ReaderSettings.constants.tsx';

export const ReaderSettingBrightness = ({
    brightness,
    updateSetting,
}: Pick<IReaderSettings['customFilter'], 'brightness'> & {
    updateSetting: <Filter extends keyof IReaderSettings['customFilter']>(
        filter: Filter,
        value: IReaderSettings['customFilter'][Filter],
        commit: boolean,
    ) => void;
}) => {
    const { t } = useLingui();

    return (
        <Stack>
            <CheckboxInput
                label={t`Custom brightness`}
                checked={brightness.enabled}
                onChange={(_, checked) => updateSetting('brightness', { ...brightness, enabled: checked }, true)}
            />
            {brightness.enabled && (
                <SliderInput
                    label={t`Custom brightness`}
                    value={brightness.value}
                    onDefault={() =>
                        updateSetting(
                            'brightness',
                            { ...brightness, value: DEFAULT_READER_SETTINGS.customFilter.brightness.value },
                            true,
                        )
                    }
                    slotProps={{
                        slider: {
                            defaultValue: DEFAULT_READER_SETTINGS.customFilter.brightness.value,
                            value: brightness.value,
                            step: CUSTOM_FILTER.brightness.step,
                            min: CUSTOM_FILTER.brightness.min,
                            max: CUSTOM_FILTER.brightness.max,
                            onChange: (_, value) => {
                                updateSetting('brightness', { ...brightness, value: value as number }, false);
                            },
                            onChangeCommitted: (_, value) => {
                                updateSetting('brightness', { ...brightness, value: value as number }, true);
                            },
                        },
                    }}
                />
            )}
        </Stack>
    );
};
