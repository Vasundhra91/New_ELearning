import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import homeimg from '../../images/login.jpg'
import { Redirect } from 'react-router-dom'

const MCQ_Function = ({ MCQ_quesdetails, DeleteMCQ_quesdetails }) => {
  const MCQ_queslist = MCQ_quesdetails.map(MCQ_ques => {
    return (
      <div key={MCQ_ques.id}>
        <Grid container>
          <Grid item xs={3}>
            <div> Question: {MCQ_ques.MCQ_ques} </div></Grid>
          <Grid item xs={3}>
             <Grid item xs={5}><div> Option:  </div></Grid>
            {MCQ_ques.MCQ_option.option.map(function (MCQ_option, i) {
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