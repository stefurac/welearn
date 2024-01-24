/**
 * Exports general styling and theming constants.
 * 
 * Defines shared constants that need to be accessed by multiple components.
 */

const screenPaddingVertical = 24
const screenPaddingHorizontal = 48

const constants = {
    screen: {
        paddingVertical: `${screenPaddingVertical}px`,
        paddingHorizontal: `${screenPaddingHorizontal}px`,
    },
    sideNav: {
        width: '280px',
        paddingVertical: `${screenPaddingVertical}px`,
        paddingHorizontal: '24px',
    },
    icons: {
        baseStyle: `
            width: 24px;
            height: 24px;
            margin: 0;
            
            transition: stroke 200ms ease;
            transition: fill 200ms ease;

            cursor: pointer;
        `,
        strokeStyle: `
            stroke: currentColor;
            stroke-width: 1.5;
        `,
        fillStyle: `
            fill: currentColor;
        `,
    },
}
export default constants