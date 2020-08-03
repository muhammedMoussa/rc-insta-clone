import React from 'react'

export default function Header({children}) {
    return (
        <div className="app__header">
            <img 
                className="app__header__img"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                load="lazy"
                alt="logo"
            />
            {children}
        </div>
    )
}
