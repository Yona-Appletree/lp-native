#!/usr/bin/env node

import * as fs from 'fs';
import { spawnSync } from 'child_process';
import * as path from 'path';

const EXPORT_NAME = 'lp_pure';
const BUILD_DIR = 'value/js';
const PUBLIC_API_HEADER = 'src/modules/pure/pure.h';
const PUBLIC_API_DIR = path.dirname(PUBLIC_API_HEADER);

if (!fs.existsSync(PUBLIC_API_HEADER)) {
  console.error(`ERROR: ${PUBLIC_API_HEADER} does not exist`);
  process.exit(1);
}

console.log(`Building ${EXPORT_NAME}.js...`);

const EXPORTED_FUNCTIONS = fs
  .readFileSync(PUBLIC_API_HEADER, 'utf8')
  .split('\n')
  .map((it) => it.match(/(lp_[\w_]+)/)?.[1])
  .filter((it) => !!it)
  .map((it) => '_' + it);

console.log(`FUNCTIONS: ${EXPORTED_FUNCTIONS}`);

const files = spawnSync('find', [PUBLIC_API_DIR, '-iname', '*.c*'])
  .stdout.toString()
  .split('\n')
  .filter((it) => it?.trim())
  .filter((it) => !!it);

console.info(`FILES: ${files}`);

const emccArgs = [
  '-O3',
  '--closure',
  '1',
  '-s',
  'WASM=1',
  '-s',
  'EXPORTED_RUNTIME_METHODS=ccall,cwrap',
  '-s',
  'ALLOW_MEMORY_GROWTH=1',
  '-s',
  'MODULARIZE=1',
  '-s',
  `EXPORT_NAME=${EXPORT_NAME}`,
  '-s',
  `EXPORTED_FUNCTIONS=[${EXPORTED_FUNCTIONS}]`,
  '-s',
  'ENVIRONMENT=web',
  '-o',
  `${BUILD_DIR}/${EXPORT_NAME}.js`,
  '-s',
  'SINGLE_FILE',
  '-x',
  'c++',
  ...files,
];

console.info(`em++ ${emccArgs.join(' ')}`);

spawnSync('em++', emccArgs, { stdio: 'inherit' });

fs.writeFileSync(
  `${BUILD_DIR}/${EXPORT_NAME}.d.ts`,
  `
import '@types/emscripten';

export interface EmscriptenModule_${EXPORT_NAME} extends EmscriptenModule {
  ccall: typeof ccall;
  cwrap: typeof cwrap;
}

declare const moduleFactory: EmscriptenModuleFactory<EmscriptenModule_${EXPORT_NAME}>;

export default moduleFactory;
`.trim()
);

/*
#!/bin/bash

cd "$(dirname "$0")" || exit 1

# Changes to this must be reflected in webpack.config.common.js
EXPORT_NAME=lp_pure

# Functions starting with this will be exported
PUBLIC_API_NAME=lp

BUILD_DIR="value/js"

PUBLIC_API_HEADER="src/modules/pure/pure.h"
PUBLIC_API_DIR=$(dirname "$PUBLIC_API_HEADER")

if [ ! -f "$PUBLIC_API_HEADER" ]; then
    echo "ERROR: $PUBLIC_API_HEADER does not exist"
    exit 1
fi

echo "Building $EXPORT_NAME.js..."

EXPORTED_FUNCTIONS=$(egrep -o "$PUBLIC_API_NAME""_\w+" $PUBLIC_API_HEADER | tr '\n' ' ' | sed 's/ /","_/g' | sed 's/^/["_/' | sed 's/,"_$/]/')

echo "FUNCTIONS: $EXPORTED_FUNCTIONS"

# The warning "treating 'c' input as 'c++' when in C++ mode, this behavior is deprecated" is suppressed
# with "-x c++", from https://gitlab.kitware.com/cmake/cmake/-/issues/18826

# This disables the warning about the find command being word-split, which is not a problem here.
# It does assume that all source files do not contain spaces in their names.

# shellcheck disable=SC2046
em++ -O3  --closure 1  -s WASM=1 \
         -s EXPORTED_RUNTIME_METHODS='ccall,cwrap' \
         -s ALLOW_MEMORY_GROWTH=1 \
         -s MODULARIZE=1 \
         -s EXPORT_NAME=$EXPORT_NAME \
         -s EXPORTED_FUNCTIONS="$EXPORTED_FUNCTIONS" \
         -s ENVIRONMENT=web \
         -o "$BUILD_DIR/$EXPORT_NAME.js" \
         -s "SINGLE_FILE" \
         -x c++ \
         $(find src/modules/pure -iname '*.c' -or -iname '*.cc' -or -iname '*.cpp' | grep -v main.cc) \
         || exit 1
    # -s "FILESYSTEM=0"

cat <<'EOF' | sed "s/__name__/$EXPORT_NAME/" > $BUILD_DIR/$EXPORT_NAME.d.ts
import '@types/emscripten';

export interface EmscriptenModule___name__ extends EmscriptenModule {
  ccall: typeof ccall;
  cwrap: typeof cwrap;
}

const moduleFactory: EmscriptenModuleFactory<EmscriptenModule___name__>;

export default moduleFactory;
EOF

echo "DONE."

 */
