import { Fragment } from 'react';
import Stack from '@mui/material/Stack';
import { useLingui } from '@lingui/react/macro';
import { CustomTooltip } from '@/base/components/CustomTooltip.tsx';
import { Kbd } from '@/base/components/texts/Kbd.tsx';

export const Hotkey = ({ keys, removeKey }: { keys: string[]; removeKey?: (key: string) => void }) => {
    const { t } = useLingui();

    return (
        <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}>
            {keys.map((key, index) => (
                <Fragment key={key}>
                    <CustomTooltip title={t`Delete`} hidden={!removeKey}>
                        <Stack
                            sx={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: 0.5,
                                cursor: removeKey ? 'pointer' : undefined,
                            }}
                            onClick={() => removeKey?.(key)}
                        >
                            {key.split('+').map((splitKey, splitIndex, splitKeys) => (
                                <Fragment key={splitKey}>
                                    <Kbd>{splitKey}</Kbd>
                                    {splitIndex === splitKeys.length - 1 ? '' : '+'}
                                </Fragment>
                            ))}
                        </Stack>
                    </CustomTooltip>
                    {index === keys.length - 1 ? '' : ','}
                </Fragment>
            ))}
        </Stack>
    );
};
