/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export default {
    '*.{ts,tsx,js,jsx}': [
        'oxfmt --write',
        // Encapsula el comando en una función para asegurar que el operador lógico "|| true" quede al final de la ejecución
        (filenames) => `oxlint --fix ${filenames.join(' ')} || true`,
        () => 'pnpm tsc',
    ],
    '*.{json,md,yml,yaml,css,scss,html,graphql}': 'oxfmt --write',
    '*.json': () => 'pnpm tsc',
};
