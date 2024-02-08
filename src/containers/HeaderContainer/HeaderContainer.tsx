import React, { FunctionComponent } from 'react'
import Header from '../../components/Header/Header'
import Search from '../../components/Search/Search'
import User from '../../components/User/User'

const HeaderContainer:FunctionComponent = ():JSX.Element  => {
  return (
    <header className="header">
      <Header >
        {{
          childrenOne: <Search />,
          childrenTwo: <User />
        }}
      </Header>
    </header>
  )
}

export default HeaderContainer