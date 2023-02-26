interface comp {
    name: string
}

export const withInstall = <T extends comp>(component: T) => {
    ;(component as SFCWithInstall<T>).install = (app): void => {
        app.component(component.name, component)
    }

    return component as SFCWithInstall<T>
}
