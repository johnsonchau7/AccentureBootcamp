import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    tool: {
        paddingLeft: '0px',
        paddingRight: '0px'
    }
  }));


const Nav = (active) => {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar className={classes.tool}>
            <div className={classes.title}>
            <Button color="inherit"><Link to ="/">
              {active === 'Home' ? <b>Home</b> : "Home"}
              </Link>
              </Button>
            <Button color="inherit">
              <Link to ="/Dashboard">
                 {active === 'Dashboard' ? <b>Dashboard</b> : "Dashboard"}
              </Link>
              </Button>
            </div>
            <Button color="inherit">
              <Link to="/Signup">
              {active === 'Signup' ? <b>Signup</b> : "Signup"}
                </Link>
              </Button>
            <Button color="inherit">
              <Link to ="/Login">
              {active === 'Login' ? <b>Login</b> : "Login"}
              </Link>
              </Button>
            
          </Toolbar>
        </Container>
        </AppBar>
      </div>
    );
  }

  export default Nav;