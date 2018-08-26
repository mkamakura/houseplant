import { mkdirs } from 'fs-extra'
import path from 'path'

import settings from './settings'

const mockRootPath = settings.rootDir
mkdirs(mockRootPath)

export function loadConfigure() {
  const filePath = path.join(mockRootPath, settings.configureName)
  try {
    return require(filePath)
  } catch (err) {
    console.err(err)
    process.exit()
  }

}

export function reload() {
  return { ...configure, ...loadConfigure() }
}

const configure = loadConfigure()

export default configure
