import { mkdirs } from 'fs-extra'
import path from 'path'
import { short } from 'git-rev-sync'
import settings from './settings'

const mockRootPath = settings.rootDir
mkdirs(mockRootPath)

export function loadConfigure() {
  const filePath = path.join(mockRootPath, settings.configureName)
  try {
    return require(filePath).default
  } catch (err) {
    console.err(err)
    process.exit()
  }
}

export function reload() {
  return { ...configure, ...loadConfigure() }
}

const configure = loadConfigure()
configure.gitHash = short()

export default configure
