import { src, dest, series, parallel, watch } from 'gulp'
import { normalizePath } from 'vite'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import { emptyDir, run } from '../../build/index.ts'

const sass = gulpSass(dartSass)
const runDir = process.cwd()

export const removeDist = () => {
    return emptyDir(normalizePath(`${runDir}/dist`))
}

export const buildStyle = () => {
    return src(normalizePath(`${runDir}/theme/**/*.scss`))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest('dist/theme/'))
}

export const buildComponents = () => {
    return run('pnpm run build:components', runDir)
}

export const watchStyle = () => {
    console.log(normalizePath(`${runDir}/theme/**/*.{scss,css,less}`))
    const watcher = watch(normalizePath(`${runDir}/theme/**/*.{scss,css,less}`))

    watcher.on('change', function (path, stats) {
        console.log(`${path}:changed`)
        return buildStyle()
    })

    watcher.on('add', function (path, stats) {
        console.log(`${path}:added`)
        return buildStyle()
    })

    watcher.on('unlink', function (path, stats) {
        console.log(`${path}:removed`)
        return buildStyle()
    })
}

export const dev = () => {
    return run('wt nt PowerShell pnpm run dev:components;PowerShell pnpm run dev:style', runDir)
}

export default series(removeDist, parallel(buildStyle, buildComponents))
