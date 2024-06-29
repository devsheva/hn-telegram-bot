import { pathsToModuleNameMapper } from 'ts-jest'

import { compilerOptions } from './tsconfig.json'
import type { JestConfigWithTsJest } from 'ts-jest'
const jest: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
}

export default jest
