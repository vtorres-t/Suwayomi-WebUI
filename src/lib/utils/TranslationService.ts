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
// Forzamos a que use el CDN oficial de Hugging Face
env.remoteHost = 'https://huggingface.co';
env.remotePathTemplate = '{model}/resolve/{revision}/';

export class TranslationService {
    private static instance: any = null;

    public static async translate(text: string): Promise<string> {
        if (!text?.trim()) return text;

        try {
            if (!this.instance) {
                // Especificamos la tarea 'translation_en_to_es' (o similar según el modelo)
                this.instance = await pipeline('translation', 'Xenova/t5-small', {
                    // Importante: intentamos cargar sin cuantizar si lo otro falla
                    quantized: true,
                    progress_callback: (p: any) => {
                        if (p.status === 'progress') {
                            console.log(`Cargando modelo: ${p.file} ${p.progress.toFixed(2)}%`);
                        }
                    },
                });
            }

            // T5-small requiere el prefijo exacto
            const result = await this.instance(`translate Spanish to English: ${text}`);

            // T5 devuelve un array [{ translation_text: "..." }]
            return result[0]?.translation_text || text;
        } catch (error) {
            console.error('Fallo total en el traductor:', error);
            return text;
        }
    }
}

export const translateOffline = (text: string) => TranslationService.translate(text);
