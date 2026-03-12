/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/* eslint-disable no-console */
import { pipeline, env } from '@xenova/transformers';

env.allowLocalModels = false;
env.allowRemoteModels = true;
env.useBrowserCache = true;
env.remoteHost = 'https://huggingface.co';
env.remotePathTemplate = '{model}/resolve/{revision}/';

export class TranslationService {
    private static instance: any = null;

    private static isDownloading: boolean = false;

    public static async translate(text: string): Promise<string> {
        if (!text?.trim()) return text;

        try {
            console.log(`translate Spanish to English: ${text}`);
            if (!this.instance) {
                if (this.isDownloading) {
                    await new Promise<void>((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 500);
                    });
                    return await this.translate(text);
                }

                this.isDownloading = true;

                this.instance = await pipeline('translation', 'Xenova/opus-mt-es-en', {
                    quantized: true,
                    revision: 'main',
                    progress_callback: (p: any) => {
                        if (p.status === 'progress') {
                            console.log(`Cargando traductor: ${p.progress.toFixed(0)}%`);
                        }
                    },
                });

                this.isDownloading = false;
            }
            const result = await this.instance(text, {
                chunk_length: 128,
                stride: 0,
            });
            console.log(`result translate: ${result[0]?.translation_text}`);
            return result[0]?.translation_text || text;
        } catch (error) {
            this.isDownloading = false;
            console.error('Error en TranslationService:', error);
            return text;
        }
    }
}

export const translateOffline = (text: string) => TranslationService.translate(text);
