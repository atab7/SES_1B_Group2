
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
  }));

  const PaperForm = withStyles((theme) => ({
    root: {
        background: 'gray',
    },

  }))(Paper);




const Login = () => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <NavBar/>
            <Container maxWidth="sm" style = {{marginTop: '100px'}}>
            <PaperForm variant="outlined">
                <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <p>Le Bistrod d'Andre</p>
                    <p>Sign In</p>
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
                <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth helperText="Forgot Password?"/>
                </Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                <Button variant="outlined" fullWidth>Sign in</Button>
                <p>Dont Have an Account? Register Here</p>
                </Paper>
                </Grid>

                
            </Grid>
            </form>
            </PaperForm>
            </Container>
    </div>
    )

}

export default Login;