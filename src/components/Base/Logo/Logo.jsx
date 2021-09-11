import React from 'react'
import "./Logo.css"

function Logo(props) {
    return (
        <div className={"logo " + props.size}>
            <h3><span>P</span>inea<span>P</span>lanner</h3>
        </div>
    )
}

export default Logo
