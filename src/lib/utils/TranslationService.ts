/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { pipeline, type TranslationPipeline } from '@xenova/transformers';

export class TranslationService {
    private static instance: TranslationPipeline | null = null;

    public static async translate(text: string): Promise<string> {
        if (!text.trim()) return text;

        try {
            if (!this.instance) {
                // Inicializamos el modelo
                this.instance = (await pipeline('translation', 'Xenova/m2m100_418M', {
                    quantized: true,
                })) as TranslationPipeline;
            }

            const output = await (this.instance as any)(text, {
                src_lang: 'es',
                tgt_lang: 'en',
            });

            // El modelo devuelve un array de objetos: [{ translation_text: "..." }]
            if (Array.isArray(output) && output.length > 0) {
                return output[0].translation_text || text;
            }

            return (output as any).translation_text || String(output);
        } catch (error) {
            console.log(error);
            return text;
        }
    }
}

export const translateOffline = (text: string) => TranslationService.translate(text);
