import React from 'react';
import { userContext } from 'views/Logincontext'
class  AdmitCard extends React.Component {
    state = {
        user_id: "5e9c3277004c8b7118debff3",
        UserStatus: [],
        usersinfo:[]
    }
    static contextType = userContext;
    componentDidMount() {

      const { user } = this.context

    console.log(user)
    if (user !== "") {
      let obj = user;
      let keys = Object.keys(obj);
      let lat = obj[keys[0]];
      console.log(lat._id)
      this.setState({user_id:lat._id})
    }
        const newUser = {User_id:this.state.user_id};
         fetch('/users/userinfo_byid', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            //.then(response => console.log('Success:', JSON.stringify(response)))
            .then(usersinfo => this.setState({ usersinfo }))
            .catch(error => console.error('Error:', error))

        
    }
    render() {
        console.log(this.state.usersinfo)
        const AdmitCard = this.state.usersinfo.map(Userinfo => {
            return (
              <div key={Userinfo._id}>
                <div className ="container">
                  <div>
                   <h2>{Userinfo.Fname}</h2>
                  </div>
                    <div> Name: {Userinfo.Fname} {Userinfo.LName} </div>
                  
                  <div>
                    <div> Course: {Userinfo.UserCourse} </div>
                  </div>
                  <div>
                    
                </div>
                </div>
              </div>
            )
          }
          )
          return (
            <div>
              {AdmitCard}
            </div>
          )
    }
}


export default AdmitCard;