import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useState } from 'react';
import type { TextSettingDialogProps } from '@/base/components/settings/text/TextSettingDialog.tsx';
import { TextSettingDialog } from '@/base/components/settings/text/TextSettingDialog.tsx';

export type TextSettingProps = Omit<TextSettingDialogProps, 'isDialogOpen' | 'setIsDialogOpen' | 'value'> &
    Required<Pick<TextSettingDialogProps, 'value'>> & {
        disabled?: boolean;
        settingDescription?: string;
    };

export const TextSetting = (props: TextSettingProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { settingName, settingDescription, value, isPassword = false, disabled = false } = props;

    return (
        <>
            <ListItemButton disabled={disabled} onClick={() => setIsDialogOpen(true)}>
                <ListItemText
                    primary={settingName}
                    secondary={settingDescription ?? (isPassword ? '********' : value)}
                    slotProps={{
                        secondary: {
                            sx: { display: 'flex', flexDirection: 'column', wordWrap: 'break-word' },
                        },
                    }}
                />
            </ListItemButton>
            <TextSettingDialog {...props} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </>
    );
};
