import { resolve } from 'path'
import { readdir } from 'fs/promises'

/**
 * 工作区
 * @returns
 */
export function workspacePath() {
    const pathList = ['../src', '../docs', '../packages'].map((p) => resolve(__dirname, p))
    return pathList
}

/**
 * 包
 * @returns
 */
export function packagesPath() {
    return resolve(__dirname, '../packages')
}

/**
 * 具体项目
 * @returns
 */
export async function projectPaths() {
    const main = packagesPath()
    const p = await readdir(main)

    return p
}

/**
 * 基于文件目录生成文件列表JSON文件
 */
// export async function generateFileJson(fileDir: string, targetJsonPath: string, { deep: number = 2 }) {}
