import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from "reactstrap";

export default class User_paper extends Component {
    state = {
        testpaper: [],
        Ques_id: ""
    }

    componentDidMount() {
        fetch('/users/AdminTestPaper')
            .then(res => res.json())
            .then(testpaper => this.setState({ testpaper }))
            .catch(error => console.error('Error:', error));
    }
    handleSumbmitEvent = (e) => {
        e.preventDefault();
        this.setState({ Ques_id: e.target.id })
    }
    render() {
        var count = 0;
        if (this.state.Ques_id !== "") {
            console.log(this.state.Ques_id)
            return (
                <Redirect to={{
                    pathname: "/admin/User_test",
                    state: { id: this.state.Ques_id }
                }} />
            )
        }
        else {
            return (
                this.state.testpaper.map(MCQ_ques => {
                    count++;
                    return (<div  key={MCQ_ques._id} >
                        <Row>
                            <Col md="12">
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h4">Question Paper: {count}</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Table>
                                                <tr>
                                                    <div>
                                                        <button type="submit" id={MCQ_ques._id} onClick={this.handleSumbmitEvent}> Test Paper: {count} </button>
                                                    </div>
                                                </tr>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        </div>
                    )

                }))
        }
    }

}