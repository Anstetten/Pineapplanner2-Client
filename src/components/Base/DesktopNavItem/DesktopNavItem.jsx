import React from 'react'
import "./DesktopNavItem.css"

function DesktopNavItem(props) {
    return (
        <div className='desktopNav' >
            {props.children}
            <p>{props.text}</p>
        </div>
    )
}

export default DesktopNavItem
