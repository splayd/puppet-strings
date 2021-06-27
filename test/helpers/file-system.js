import path from 'node:path'
import tempy from 'tempy'
import fse from 'fs-extra'

export async function createTemporaryDirectory() {
  const directoryPath = tempy.directory()
  await fse.ensureDir(directoryPath)
  return directoryPath
}

export async function deleteFile(filePath) {
  await fse.remove(filePath)
}

export async function writeFile(directoryPath, fileName, fileContents) {
  const filePath = path.join(directoryPath, fileName)
  await fse.outputFile(filePath, fileContents)
  return filePath
}
