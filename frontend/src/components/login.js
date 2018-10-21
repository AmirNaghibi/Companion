import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {auth} from '../firebase';
import { withStyles } from '@material-ui/core/styles';

// import auth from '../../firebase/config';

const INITIAL_STATE = {
    email: 'charlottechen@gmail.com',
    password: '123123',
    error: null
};

const StyledButton = withStyles({
  root: {
    backgroundColor: 'white',
    borderColor: '#6b4df4',
    color: '#6b4df4'
  }
})(Button);

class Login_Page extends Component {
    constructor(props){
        super(props);

        this.state = {...INITIAL_STATE}
    }

    onSubmit = (event) => {
        event.preventDefault();

        const {
          email,
          password,
        } = this.state;

        const {
          history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            history.push('/map');
          })
          .catch(error => {
            this.setState({error: error});
          });
    }

    render () {

        const {
            email,
            password,
            error
        } = this.state;

        return (
            <div style={{ height: '100%', display: 'flex', flexFlow:'column', justifyContent: 'center' }}>
                <form onSubmit={this.onSubmit}>
                    <div style={{ margin: '0 50px', height: 150, display: 'flex', flexFlow: 'column', justifyContent: 'space-around' }}>
                        <TextField
                            label="Email"
                            fullWidth
                            multiline
                            value={email}
                            onChange = {event => this.setState({email: event.target.value})}
                        />
                        <TextField
                            label="Password"
                            id="standard-password-input"
                            fullWidth
                            multiline
                            type="password"
                            value={password}
                            onChange = {event => this.setState({password: event.target.value})}
                        />
                    </div>

                    <div style={{ display: 'flex', marginTop: 15, justifyContent: 'center'}}>
                    <StyledButton variant="outlined"  onClick={this.onSubmit.bind(this)}>
                        Login
                    </StyledButton>
                    <Link style={{marginLeft: 10}} to='/password-reset'><Button variant="outlined" color="secondary">Forgot Password</Button></Link>
                    </div>
                        {error && <p>{error.message}</p>}
                </form>

                <div style={{ marginBottom: 100 }}>
                    <h4 style={{ color: '#6b4df4', marginBottom: 5 }}>Don't have an account?</h4>
                    <Link style={{ color: '#6b4df4'}} to='/register'>Sign up here</Link>
                </div>
            </div>
        )
    }
}

export default Login_Page;
