import React from 'react';
import Grid from '@material-ui/core/Grid';
//import homeimg from '../../images/login.jpg'

const MCQ_Function = ({ MCQ_quesdetails, DeleteMCQ_quesdetails }) => {
  const MCQ_queslist = MCQ_quesdetails.map(MCQ_ques => {
    return (
      <div key={MCQ_ques.id}>
        <Grid container>
          <Grid item xs={3}>
            <div> Question: {MCQ_ques.MCQ_ques} </div></Grid>
          <Grid item xs={3}>
             <Grid item xs={5}><div> Option:  </div></Grid>
            {MCQ_ques.MCQ_option.map(function (MCQ_option, i) {
              return <div key={i}>
                <Grid item xs={7}>
                  <span>{MCQ_option}</span></Grid>
              </div>
            })}</Grid>
          <Grid item xs={3}>
            <div> Answer: {MCQ_ques.MCQ_Answer} </div>
          </Grid>
          <Grid item xs={3}>
            <button onClick={() => { DeleteMCQ_quesdetails(MCQ_ques.id) }}> Delete Item </button>
          </Grid>
        </Grid>
      </div>
    )
  }
  )
  return (
    <div>
      {MCQ_queslist}
    </div>
  )

}
export default MCQ_Function;