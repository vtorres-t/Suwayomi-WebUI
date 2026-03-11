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
env.allowRemoteModels = true; // Forza el uso de la carpeta public/models
env.localModelPath = '/models/';

export class TranslationService {
    private static instance: any = null;

    public static async translate(text: string): Promise<string> {
        if (!text || !text.trim()) return text;

        try {
            if (!this.instance) {
                // Inicializamos el modelo T5-small
                this.instance = await pipeline('translation', 'Xenova/t5-small', {
                    quantized: true,
                    progress_callback: (p: any) => console.log(`Cargando T5: ${p.status} ${p.progress?.toFixed(2)}%`),
                });
            }

            // T5 requiere un prefijo para saber qué idioma traducir
            const prefix = 'translate Spanish to English: ';
            const output = await this.instance(prefix + text);

            // T5 devuelve [{ translation_text: "..." }]
            if (Array.isArray(output) && output.length > 0) {
                return output[0].translation_text || text;
            }

            return text;
        } catch (error) {
            console.error('Error en TranslationService (T5):', error);
            return text;
        }
    }
}

export const translateOffline = (text: string) => TranslationService.translate(text);
