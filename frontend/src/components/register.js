import React, {Component} from 'react';
import {auth} from '../firebase';
// import MenuItem from '@material-ui/core/MenuItem';
import {withRouter} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import {withStyles} from '@material-ui/core/styles';

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    password1: '',
    password2: '',
    error: null
}

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        const {history} = this.props;

        e.preventDefault();
        const {
            email, password1
        } = this.state;

        auth.doCreateUserWithEmailAndPassword(email, password1)
        .then(authUser => {
          this.setState({ ...INITIAL_STATE });
          history.push('/map');
        })
        .catch(error => {
          this.setState({error: error});
        });
  
    }    

    render () {

        const {
            firstName,
            lastName,
            email,
            password1,
            password2,
            error
        } = this.state;

        console.log(this.state);

        const isInvalid = password1 !== password2 ||
        password1 === '' || email === '' ||
        firstName === '' || lastName === '' 

        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                    <TextField
                        label="firstname"
                        value={firstName}
                        placeholder = "First Name"
                        multiline
                        onChange={e => {this.setState({'firstName' : e.target.value})}}
                    />

                    <TextField
                        label="lastname"
                        value={lastName}
                        placeholder = "Last Name"
                        multiline
                        onChange={e => {this.setState({'lastName' : e.target.value})}}
                    />
                    </div>

                    <div>
                    <TextField
                        label="email"
                        value={email}
                        placeholder = "enter your email here here"
                        multiline
                        onChange={e => {this.setState({'email' : e.target.value})}}
                    />
                    </div>

                    <div>
                    <TextField
                        label="password"
                        type="password"
                        value={password1}
                        onChange={e => {this.setState({'password1' : e.target.value})}}
                        placeholder = "password here"
                        multiline
                    />
                    </div>

                    <div>
                    <TextField
                        label="confirm password "
                        value={password2}
                        placeholder = "sssshhhh -2 "
                        multiline
                        onChange={e => {this.setState({'password2' : e.target.value})}}
                    />
                    </div>
                    {error & <p>{error}</p>}
                    <Button variant="contained" color="primary" disabled={isInvalid} type="submit">
                        Register
                    </Button>
                </form> 
            </div>
        )
    }
}

export default withRouter(Register);