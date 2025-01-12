import React from 'react'
import { Dropdown } from 'react-bootstrap'
import './SidebarDropdown.scss'

const Sidebardropdown = (props) => {
    return (
        <div className={`custom_dropdown ${props.className}`}>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    <div>
                        {props.icon && <img src={props.icon} alt="img" />}
                        {props.title}
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {props.dropdownItems?.map((item, key) => (
                        <Dropdown.Item href={item.to} key={key}>
                            <span>{props.iconItem && <img src={item.iconItem} alt="img" />}</span>
                            {item.label}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
      
    )
}

export default Sidebardropdown
