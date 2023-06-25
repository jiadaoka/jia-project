import { existsSync, readdirSync, statSync, unlinkSync, rmdirSync } from 'fs'
import { resolve } from 'path'

const emptyDirSymbol = Symbol('emptyDirSymbol')

const obj = {
    [emptyDirSymbol]: async (path: string, startPath?: string) => {
        // 判断文件是否存在
        if (existsSync(path)) {
            const files = readdirSync(path)
            const len = files.length

            for (let i = 0; i < len; i++) {
                const curPath = resolve(path, files[i])

                if (statSync(curPath).isDirectory()) {
                    await obj[emptyDirSymbol](curPath, startPath ?? path)
                } else {
                    unlinkSync(curPath)
                }
            }

            if (startPath) {
                rmdirSync(path)
            }
        }
    },
}

export const emptyDir = async (path: string) => {
    // 判断文件是否存在
    if (existsSync(path)) {
        await obj[emptyDirSymbol](path)
    }
}
