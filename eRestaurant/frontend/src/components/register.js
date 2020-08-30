import React from 'react';
import NavBar from './NavBar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container:{

    }
 
  }));

  const PaperForm = withStyles((theme) => ({
    root: {
        background: 'gray',
    },

  }))(Paper);




const Register = () => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <NavBar/>
            <Container maxWidth="sm" style = {{marginTop: '100px'}}>
            <PaperForm variant="outlined">
                <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Paper className={classes.paper}>Register</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <TextField id="outlined-basic" label="Firstname" variant="outlined" />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <TextField id="outlined-basic" label="Lastname" variant="outlined" />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <TextField
                    id="email"
                    label="Email Adress"
                    placeholder="Calvin@gmail.com"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"/>
                </Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth helperText="Do Not Share Your Password With Anyone"/>
                </Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                <TextField id="outlined-basic" label="Password Repeat" variant="outlined" fullWidth/>
                </Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                <Button variant="outlined" fullWidth>Register</Button>
                <p>Already have an account? Sign-In Here</p>
                </Paper>
                </Grid>

                
            </Grid>
            </form>
            </PaperForm>
            </Container>
    </div>
    )

}

export default Register;