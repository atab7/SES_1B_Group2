import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

export default function LayoutTextFields() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
      <div>
        
        
        <TextField
          id="outlined-full-width"
          label="First Name"
          style={{ margin: 8 }}
          placeholder="Current First Name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Middle Name"
          style={{ margin: 8 }}
          placeholder="Current Middle Name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Last Name"
          style={{ margin: 8 }}
          placeholder="Current Last Name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Email Address"
          style={{ margin: 8 }}
          placeholder="hugh.jass@gmail.com"
          helperText="Confirmation Email Will Be Sent"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Password"
          style={{ margin: 8 }}
          placeholder="*********"
          helperText="Choose a secure password"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label=" Re-Enter Password"
          style={{ margin: 8 }}
          placeholder="*********"
          helperText=""
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          
        />
       
        <TextField
          id="outlined-full-width"
          label="Residential Address"
          style={{ margin: 8 }}
          placeholder="Where u live :-)"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Phone Number"
          style={{ margin: 8 }}
          placeholder="+61 123 456 890"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <br></br>
        <Button variant="contained"
         margin="normal"
         style={{ margin: 8 }}
         
        >Confirm</Button>

        
      </div>
      </Container>
    </div>
  );
}

/*
<TextField
label="Confirm Password"
id="outlined-margin-none"
defaultValue="Default Value"
className={classes.textField}
helperText="Some important text"
variant="outlined"
style = {{width: 260}}
/> */