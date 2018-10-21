import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';

class Home extends Component {

    render() {    
        const user = firebase.auth().currentUser;
            console.log('new', user);
        const test = user ? <h2>{user.displayName}</h2> : <Redirect to= "/login"/>
        console.log(test);
        
        return (
            <div>
                <h4>Hi User</h4>
            </div>
        )
    }
}

export default Home;