import React from "react"
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    
    },
}));

const Answer = (props) => {
  // const classes = useStyles();

  return(
    <Button variant="contained" color="primary">
      {props.content}
    </Button>
  )
}

export default Answer