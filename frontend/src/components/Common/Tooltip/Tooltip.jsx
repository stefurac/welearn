import React from 'react'
import PropTypes from 'prop-types'
import MaterialTooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'

const useCustomStyle = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}))

const TooltipComponent = props => {
    const classes = useCustomStyle();
    return <MaterialTooltip arrow classes={classes} {...props} />;
}

// Styling wrap for tool tip
const Tooltip = props => {
    return (
        <TooltipComponent {...props}>
            {props.children}
        </TooltipComponent>
    )
}

Tooltip.propTypes = {
    children: PropTypes.node,
}

export default Tooltip
