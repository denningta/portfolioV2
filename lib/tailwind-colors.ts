import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'
import { KeyValuePair } from 'tailwindcss/types/config'

const fullConfig = resolveConfig(tailwindConfig)

export const tailwindColors = fullConfig.theme?.colors as KeyValuePair

export default fullConfig
