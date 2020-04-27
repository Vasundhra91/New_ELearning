import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from "reactstrap";
import {userContext} from 'views/Logincontext'
export default class User_paper extends Component {
    state = {
        testpaper: [],
        Ques_id: "",
        DeletedQues_id: false,
        Username:""
    }
    static contextType = userContext;
    componentDidMount() {
        const { user } = this.context

    console.log(user)
        //let userinfo=  this.props.location.state.Name
        // userinfo =userinfo.split('-')
        // this.setState({ Username: userinfo[0] })
        fetch('/users/AdminTestPaper')
            .then(res => res.json())
            .then(testpaper => this.setState({ testpaper }))
            .catch(error => console.error('Error:', error));
    }
    handleSumbmitEvent = (e) => {
        e.preventDefault();
        this.setState({ Ques_id: e.target.id })
    }
    handleDeleteEvent = (e) => {
        e.preventDefault();
        this.setState({ DeletedQues_id:true});
        fetch('/users/deletetest_paper/'+ e.target.id , {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }}).then(res => res.json())
            .then(testpaper => this.setState({ testpaper }))
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error))
    }
    render() {
        console.log(this.context)
        var count = 0;
        if (this.state.Ques_id !== "") {
            if(this.state.DeletedQues_id===false)
            return (
                <Redirect to={{
                    pathname: "/admin/User_test",
                    state: { id: this.state.Ques_id }
                }} />
            )
        }
        else {
                const MCQ_queslist = this.state.testpaper.map(MCQ_ques => {
                    count++;
                    return (
                    <div  key={MCQ_ques._id} >
                        <Row>
                            <Col md="12">
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h4">Question Paper: {count}</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Table>
                                                <tr>
                                                    <td>
                                                    <div>
                                                        <button type="submit" id={MCQ_ques._id} onClick={this.handleSumbmitEvent}> Test Paper: {count} </button>
                                                    </div>
                                                    </td>
                                                    <td>
                                                        <button type="submit" id={MCQ_ques._id} onClick={this.handleDeleteEvent}> Delete Test Paper: {count} </button>
                                                    </td>
                                                </tr>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        </div>
                    )
                }
                )
                return (
                    
                  <div>
                      <div>
                          {this.state.Username}
                      </div>
                    {MCQ_queslist}
                  </div>
                )
        }
    }

}