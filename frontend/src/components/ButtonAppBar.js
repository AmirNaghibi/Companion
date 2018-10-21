import React, {Component} from 'react';
import {AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import {Link} from 'react-router-dom';
// import MenuIcon from '@material-ui/icons/Menu';
import {auth} from '../firebase';

const NavigateNonAuth = () => {
    return (
        <div>
            <Link to="/register"><Button className="menu-button" color="inherit">Register</Button></Link>
            <Link to="/login" ><Button className="menu-button" color="inherit">Sign-in</Button></Link>
        </div>
    )
}

const NavigateAuth = () => {
    return (
        <Link to="/"><Button className="menu-button" color="inherit" onClick={auth.doSignOut}>Sign out</Button></Link>
    )
}

class ButtonAppBar extends Component {

    authentication() {
        const authUser = this.props.authUser;
        return authUser ? <NavigateAuth/> : <NavigateNonAuth/>;
    }

    render(){
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                    <a href="/">Smart Health</a>
                    </Typography>
                    {this.authentication()}
                </Toolbar>
            </AppBar>
        </div>
    );
};

};

export default ButtonAppBar;