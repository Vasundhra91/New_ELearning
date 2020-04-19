import React from 'react';
class  AdmitCard extends React.Component {
    state = {
        user_id: "5e7f4a359f828716503c5b39",
        UserStatus: [],
        usersinfo:[]
    }
    componentDidMount() {
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
        return (
            <>
            <h1>Admit Card</h1>
            </>
        )
    }
}


export default AdmitCard;