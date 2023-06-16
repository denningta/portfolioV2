import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'
import { KeyValuePair } from 'tailwindcss/types/config.js'

const fullConfig = resolveConfig(tailwindConfig)

export const tailwindColors = fullConfig.theme?.colors as KeyValuePair 

export default fullConfig
