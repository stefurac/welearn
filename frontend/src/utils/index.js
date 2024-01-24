/**
 * A collection of utility functions.
 */

import styled from 'styled-components'
import { v4 as uuidV4, v5 as uuidV5 } from 'uuid'
import convert from 'color-convert'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'

const UUID_NAMESPACE = '6236a3d3-447a-44c9-9370-c4e7312f6fdc'

/**
 * Deterministically converts an object into a UUID
 * 
 * @param {any} obj object to be converted into a UUID
 */
export const uuid = obj => uuidV5(obj, UUID_NAMESPACE)

/**
 * Randomly generate a UUID
 */
export const generateUuid = () => uuidV4()

/**
* Creates an icon component from an SVG by adding icon-specific styling.
*
* @param {ReactComponent} svgComponent base SVG component
* @param {*} isFilled whether component is filled or not (stroke)
*/
export const makeIconComponent = (svgComponent, isFilled) => styled(svgComponent)`
   ${({ theme }) => theme.constants.icons.baseStyle}
   ${({ theme }) => isFilled
        ? theme.constants.icons.fillStyle
        : theme.constants.icons.strokeStyle}
   margin-right: 16px;
`

/**
 * Interpolate from one color to another.
 *
 * @param {string} from starting color, in hex
 * @param {string} to end color, in hex
 * @param {number} step real number between 0 and 1 representing how far to interpolate
 */
export const interpolateColor = (from, to, step) => {
    const hslFrom = convert.hex.hsl(from)
    const hslTo = convert.hex.hsl(to)
    const hslResult = [
        (hslTo[0] - hslFrom[0]) * step + hslFrom[0],
        (hslTo[1] - hslFrom[1]) * step + hslFrom[1],
        (hslTo[2] - hslFrom[2]) * step + hslFrom[2],
    ]
    return `#${convert.hsl.hex(hslResult)}`
}

/**
 * Darken a color.
 *
 * @param {string} color starting color, in hex
 * @param {number} step real number between 0 and 1 representing how much to darken
 */
export const darkenColor = (color, step) => {
    const hsl = convert.hex.hsl(color)
    const hslResult = [hsl[0], hsl[1], hsl[2] * (1 - step)]
    return `#${convert.hsl.hex(hslResult)}`
}

/**
 * Creates a portal that mounts children to the document body
 *
 * @param {*} children children to mount 
 */
export const Portal = ({ children }) => ReactDOM.createPortal(children, document.body);

/**
 * Format the amount of minutes someone has studied into a displayable string.
 *
 * @param {number} studyTimeMins amount of minutes studied
 */
export const formatStudyTimeMins = (studyTimeMins) => {
    if (studyTimeMins === undefined || studyTimeMins === 0) return '0h0m'

    const roundedUpMins = parseInt(studyTimeMins + .99)
    const hours = parseInt(roundedUpMins / 60)
    const mins = roundedUpMins - hours * 60
    return `${hours}h${mins}m`
}


export const errorToast = (msg, position) => {
    toast.error(msg, {
        position: position || 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    })
}