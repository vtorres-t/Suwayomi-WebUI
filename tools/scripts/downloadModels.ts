/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import fs from 'fs';
import path from 'path';
import { axios } from 'axios'; // Asegúrate de tener axios instalado

const MODEL_URL = 'https://huggingface.co';
const TARGET_DIR = path.join(__process.cwd(), 'public/models/Xenova/t5-small');

const files = [
    'config.json',
    'tokenizer.json',
    'tokenizer_config.json',
    'onnx/encoder_model_quantized.onnx',
    'onnx/decoder_model_merged_quantized.onnx',
];

async function downloadFile(file: string) {
    const url = `${MODEL_URL}${file}`;
    const filePath = path.join(TARGET_DIR, file);

    // Crear carpetas si no existen
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    console.log(`Descargando: ${file}...`);
    const response = await axios({ url, method: 'GET', responseType: 'stream' });
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function setup() {
    console.log('--- Configurando modelos de traducción ---');
    for (const file of files) {
        // eslint-disable-next-line no-await-in-loop
        await downloadFile(file);
    }
    console.log('--- ¡Modelos listos! ---');
}

setup().catch(console.error);
