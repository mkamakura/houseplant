import { readJSONSync } from 'fs-extra'
import { join } from 'path'

const DEFAULT_SETTINGS = {
  rootDir: 'mocks',
  distDir: 'dist',
  configureName: 'configure.js',
  port: 8080,
  host: '0.0.0.0'
}

const CWD = process.cwd()

function loadSettings() {
  const fileName = 'houseplant.json'
  try {
    return readJSONSync(join(CWD, fileName))
  } catch (err) {
    console.warn(`Not found ${fileName}`)
    return {}
  }
}

const settings = { ...DEFAULT_SETTINGS, ...loadSettings() }
settings.rootDir = join(CWD, settings.rootDir)
export default settings
