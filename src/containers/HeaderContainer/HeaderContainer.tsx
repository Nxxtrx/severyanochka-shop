import React, { FunctionComponent } from 'react'
import Header from '../../components/Header/Header'
import Search from '../../components/Search/Search'
import User from '../../components/User/User'
import './Header.scss'

const HeaderContainer:FunctionComponent = ():JSX.Element  => {
  return (
    <header className="header">
      <div className="header-inner">
        <Header>
          {{
            childrenOne: <Search />,
            childrenTwo: <User />
          }}
        </Header>
      </div>
    </header>
  )
}

export default HeaderContainer