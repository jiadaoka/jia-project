import { src, dest, series, parallel } from 'gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import { emptyDir, run } from '../../build/index.ts'

import { cwd } from 'process'

const sass = gulpSass(dartSass)
const runDir = cwd()

export const removeDist = () => {
    return emptyDir(`${runDir}/dist`)
}

export const buildStyle = () => {
    return src(`${runDir}/theme/**/*.scss`).pipe(sass()).pipe(autoprefixer()).pipe(dest('dist/theme/'))
}

export const buildComponents = () => {
    return run('pnpm run build:components', runDir)
}

const openWt = async () => {
    await run('wt nt', runDir)
}

export const watchStyle = async () => {
    await openWt()
    run('echo 111', runDir)
}

export const watchComponents = () => {}

export default series(removeDist, parallel(buildStyle, buildComponents))
