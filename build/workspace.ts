import { resolve } from 'path'
import { readdir } from 'fs/promises'

export function workspacePath() {
    const pathList = ['../src', '../docs', '../packages'].map((p) => resolve(__dirname, p))
    return pathList
}

export function packagesPath() {
    return resolve(__dirname, '../packages')
}

export async function projectPath() {
    const main = packagesPath()
    const projectPath = await readdir(main)

    return projectPath
}
