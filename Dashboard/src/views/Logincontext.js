import React, { Component} from 'react';
export const userContext = React.createContext();
export class UserContextProvider extends Component
{
    state={
        user:{}
    }
      setUser = user => {
        this.setState(prevState => ({ user }))
      }
 render()
{ const { children } = this.props
const { user } = this.state
const { setUser } = this

    return(
        <userContext.Provider 
        value={{
            user,
            setUser,
          }}
        >
          {children}
        </userContext.Provider>
    )
}

}


