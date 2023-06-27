import resolveConfig from 'tailwindcss/resolveConfig'
import { KeyValuePair } from 'tailwindcss/types/config'

const tailwindConfig = require('../tailwind.config')

const fullConfig = resolveConfig(tailwindConfig)

export const tailwindColors = fullConfig.theme?.colors as KeyValuePair

export default fullConfig
