/**
 * Defines color palettes to be used throughout the app.
 *
 * Provides both a light and dark color palette to be injected throughout the app. This single source of truth allows
 * the look and feel of the entire app to be easily modified.
 */

// TODO: decide on color palette as a group (this is just something random to work as an example for now)
export const lightPalette = {
    accent: '#db48bb',
    primary: '#6848db',
    primaryLight: '#9e8cde',
    warning: '#ad1717',
    background: '#f4f6f8',
    sideNavBackground: '#ffffff',
    shadow: '#00000044',
    text: {
        heavy: '#222222',
        regular: '#666666',
        light: '#bcbcbc',
        feather: '#eaeaea',
    },
    heatmap: {
        none: '#bcbcbc',
        min: '#a995ed',
        max: '#3311a8',
    }
}

// TODO: decide on color palette as a group (this is just something random to work as an example for now)
export const darkPalette = {
    accent: '#db48bb',
    primary: '#6848db', 
    primaryLight: '#9e8cde',
    warning: '#d93434',
    background: '#f4f6f8',
    sideNavBackground: '#CFC9DA',
    shadow: '#00000070',
    text: {
        heavy: '#bcbcbc',
        regular: '#767676',
        light: '#666666',
        feather: '#31363f',
    },
    heatmap: {
        none: '#666666',
        min: '#3311a8',
        max: '#a995ed',
    }
}
