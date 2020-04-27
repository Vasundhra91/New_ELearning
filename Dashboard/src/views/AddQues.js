import React from 'react';
//import Grid from '@material-ui/core/Grid';
import axios from "axios";
import Select from "react-select";
class AddQuestion extends React.Component {
    state = {
        MCQ_option: [],
        MCQ_ques: [],
        MCQ_Answer: [],
        Ques_id: Math.random(),
        selectedOption: "",
        data: { label: "Loading ...", value: "" },
        loading: true
    }
    componentDidMount() {
        axios
            .get("/users/coursedetails")
            .then(result => this.setState({ data: result.data.map((data) => { return { value: data._id, label: data.Usercourse } }) }))

        this.setState({ loading: false})
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption: selectedOption.value });
        this.setState({ loading: true })
    };
    handleEvent = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSumbmitEvent = (e) => {

        e.preventDefault();
        //  var data1 = "";
        if (this.state.MCQ_option !== "" && this.state.MCQ_ques !== "") {
            var optionid = this.state.MCQ_option.split(',');
            //var MCQ_queslist = ''
            let jsonObj = []

            for (var i = 0; i < optionid.length; i++) {
                // MCQ_queslist = MCQ_queslist + ',' + '"' + optionid[i] + '"'
                jsonObj.push(optionid[i])
            }
            var tempDate = new Date();
            var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();

            //data1 = '{"Ques_id":' + '"'+this.state.Ques_id+'"'+ ',"MCQ_Answer":' + '"'+this.state.MCQ_Answer+'"'+ ',"MCQ_ques":' + '"'+this.state.MCQ_ques+'"'+ ',"User_id":' +0+ ',"Result":' + '"'+"null"+'"'+ ',"MCQ_option":{"option":[ '+ MCQ_queslist.substr(1) + ']}}';
            var newdata = {
                Ques_id: this.state.Ques_id,
                MCQ_Answer: this.state.MCQ_Answer,
                MCQ_ques: this.state.MCQ_ques,
                MCQ_option: jsonObj,
                UserCourseID: this.state.selectedOption,
                Inserted_date: date

            }
            console.log(newdata)
            this.props.AddDetails(newdata)
            e.target.reset();
            this.setState({
                MCQ_option: "",
                MCQ_ques: "",
                MCQ_Answer: ""
                // loading: false
            })
        }
    }

    render() {
        const { selectedOption } = '';

        return (
            <form onSubmit={this.handleSumbmitEvent}>
                <div className="container">
                    <div className="col-md-3">
                        <Select value={selectedOption} isDisabled={this.state.loading} classname="form-control input-sm" options={this.state.data} onChange={this.handleChange} placeholder="Course Selection" />
                    </div>
                    <div>
                        <label>Question
                <textarea type="text" id="MCQ_ques" onChange={this.handleEvent}></textarea></label>
                        <label>Option
                <textarea type="text" id="MCQ_option" onChange={this.handleEvent}></textarea></label>
                        <label>Answer
                <textarea type="text" id="MCQ_Answer" onChange={this.handleEvent}></textarea></label>
                        <button type="submit">Add Ques. </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default AddQuestion;
