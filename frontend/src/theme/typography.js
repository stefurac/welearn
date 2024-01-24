/**
 * Defines typography to be used throughout the app.
 *
 * Provides a single source of truth for the general typography (font sizes, families, weight, etc.) to be used in the
 * app. 
 */

// TODO: Decide on typography choices together as a group
const fontFamily = '"Source Sans Pro", sans-serif';
const dosisFontFamily = '"Dosis", sans-serif'
const codeFontFamily = '"Fira Code", monospace'

const fontWeightLight = 300;
const fontWeightRegular = 400;
const fontWeightMedium = 500;
const fontWeightBold = 700;

const typography = {
    htmlFontSize: 16,
    fontFamily,
    dosisFontFamily,
    codeFontFamily,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
    h1: {
        fontFamily: fontFamily,
        fontWeight: fontWeightMedium,
        fontSize: '2.5rem',
        lineHeight: 1.2,
    },
    h2: {
        fontFamily: fontFamily,
        fontWeight: fontWeightRegular,
        fontSize: '2rem',
        lineHeight: 1.2,
    },
    h3: {
        fontFamily: fontFamily,
        fontWeight: fontWeightRegular,
        fontSize: '1.75rem',
        lineHeight: 1.2,
    },
    h4: {
        fontFamily: fontFamily,
        fontWeight: fontWeightRegular,
        fontSize: '1.5rem',
        lineHeight: 1.28,
    },
    h5: {
        fontFamily: fontFamily,
        fontWeight: fontWeightRegular,
        fontSize: '1.25rem',
        lineHeight: 1.41,
    },
    h6: {
        fontFamily: fontFamily,
        fontWeight: fontWeightRegular,
        fontSize: '1rem',
        lineHeight: 1.4,
    },
    body: {
        fontFamily: fontFamily,
        fontWeight: fontWeightRegular,
        fontSize: '1rem',
        lineHeight: 1.5,
    },
    richText: {
        h1: {
            fontFamily: fontFamily,
            fontWeight: fontWeightMedium,
            fontSize: '2rem',
            lineHeight: 1.5,
        },
        h2: {
            fontFamily: fontFamily,
            fontWeight: fontWeightRegular,
            fontSize: '1.7rem',
            lineHeight: 1.4,
        },
        h3: {
            fontFamily: fontFamily,
            fontWeight: fontWeightRegular,
            fontSize: '1.4rem',
            lineHeight: 1.3,
        },
        body: {
            fontFamily: fontFamily,
            fontWeight: fontWeightRegular,
            fontSize: '1rem',
            lineHeight: 1.2,
        },
    }
}
export default typography