/**
 * Exports themes used to determine the look and feel of the app.
 *
 * Provides both a light and dark theme to be injected throughout the app, which includes a color palette, typography,
 * as well as general constants. Also provides a GlobalStyleComponent which injects global styles to all components in
 * the underlying component tree.
 */

import constants from './constants'
import typography from './typography'
import globalStyle from './globalStyle'
import { lightPalette, darkPalette } from './palette'

const sharedTheme = {
    constants,
    typography,
}

export const lightTheme = {
    palette: lightPalette,
    ...sharedTheme
}

export const darkTheme = {
    palette: darkPalette,
    ...sharedTheme
}

export const GlobalStyleComponent = globalStyle