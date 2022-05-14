import {readFile, readdir, stat} from 'fs/promises'
import {join} from 'path'

export async function walk(directory: string): Promise<string[]> {
  let fileList: string[] = []

  const files = await readdir(directory)

  for (const file of files) {
    const path = join(directory, file)

    if ((await stat(path)).isDirectory()) {
      fileList = [...fileList, ...(await walk(path))]
    } else {
      fileList.push(path)
    }
  }

  return fileList
}

export async function fileBuffer(path: string): Promise<Buffer> {
  return readFile(path)
}
