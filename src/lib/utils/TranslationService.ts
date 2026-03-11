/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { pipeline, type TranslationPipeline, env } from '@xenova/transformers';

// 1. Forzamos a que no use rutas locales si no tienes los archivos en /public
env.allowLocalModels = false;
// 2. Opcional: Si quieres que use un CDN específico (HuggingFace por defecto)
// env.remoteHost = 'https://huggingface.co';

export class TranslationService {
    private static instance: TranslationPipeline | null = null;

    public static async translate(text: string): Promise<string> {
        if (!text || !text.trim()) return text;

        try {
            if (!this.instance) {
                // Usamos un modelo más ligero para evitar errores de memoria o red (opcional)
                // 'Xenova/m2m100_418M' es grande, podrías probar 'Xenova/t5-small' para testear
                this.instance = (await pipeline('translation', 'Xenova/m2m100_418M', {
                    quantized: true,
                    // Añadimos progreso para ver si realmente descarga algo en la consola
                    progress_callback: (p: any) =>
                        console.log(`Cargando traductor: ${p.status} ${p.progress?.toFixed(2) || ''}%`),
                })) as any;
            }

            // M2M100 requiere códigos de idioma específicos (ej: 'spa_Latn', 'eng_Latn')
            // Si usas T5 u otros, los parámetros pueden variar
            const output = await (this.instance as any)(text, {
                src_lang: 'es',
                tgt_lang: 'en',
            });

            if (Array.isArray(output) && output.length > 0) {
                return output[0].translation_text || text;
            }

            return text;
        } catch (error) {
            console.error('Error en TranslationService:', error);
            return text;
        }
    }
}
