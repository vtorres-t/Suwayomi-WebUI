/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export default {
    '*.{ts,tsx,js,jsx}': [
        // Si hay archivos, corre oxfmt. Si la lista está vacía, devuelve un array vacío (no hace nada)
        (filenames) => filenames.length > 0 ? `oxfmt --write ${filenames.join(' ')}` : [],
        // Si hay archivos, corre oxlint.
        (filenames) => filenames.length > 0 ? `oxlint --fix ${filenames.join(' ')}` : [],
        () => 'pnpm tsc'
    ],
    '*.{json,md,yml,yaml,css,scss,html,graphql}': (filenames) =>
        filenames.length > 0 ? `oxfmt --write ${filenames.join(' ')}` : [],
    '*.json': () => 'pnpm tsc',
};
