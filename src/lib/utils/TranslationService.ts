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

    private static readonly MAX_CACHE_SIZE = 100;

    private static readonly responseCache = new Map<string, string>();

    public static async translate(text: string): Promise<string> {
        const cleanText = text?.trim();
        if (!cleanText) return text;

        if (this.responseCache.has(cleanText)) {
            const cached = this.responseCache.get(cleanText) ?? cleanText;
            this.responseCache.delete(cleanText);
            this.responseCache.set(cleanText, cached);
            return cached;
        }

        try {
            console.log(`translate Spanish to English: ${cleanText}`);
            if (!this.instance) {
                if (this.isDownloading) {
                    await new Promise<void>((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 500);
                    });
                    return await this.translate(cleanText);
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
            const result = await this.instance(cleanText, {
                chunk_length: 64,
                stride: 0,
            });

            const translatedText = Array.isArray(result) ? result[0]?.translation_text : result?.translation_text;
            console.log(`result translate: ${translatedText}`);
            const finalResult = translatedText || cleanText;

            if (finalResult !== cleanText) {
                if (this.responseCache.size >= this.MAX_CACHE_SIZE) {
                    const firstKey = this.responseCache.keys().next().value;
                    if (firstKey !== undefined) {
                        this.responseCache.delete(firstKey);
                    }
                }
                this.responseCache.set(cleanText, finalResult);
            }
            return finalResult;
        } catch (error) {
            this.isDownloading = false;
            this.instance = null;
            console.error('Error en TranslationService:', error);
            return cleanText;
        }
    }
}

export const translateOffline = (text: string) => TranslationService.translate(text);
