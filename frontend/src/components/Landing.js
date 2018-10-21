import React, {Component} from 'react';
import './landing.css'
import Logo from '../assets/images/logo.svg';
import Facebook from '../assets/images/fb-button.svg';
import Google from '../assets/images/google-button.svg';


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClosed: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isClosed: true });
    this.props.onClick();
  }

  render () {
    return (
      <div onClick={this.handleClick} className={`landing-container ${this.state.isClosed ? 'dismiss' : ''}`}>
        <img src={Logo} style={{ height: 60 }}/>
        <p style={{ marginTop: 5, color: '#3f3f3f' }}>safe travels</p>

        <p style={{marginTop: 125}}><b>Sign in with</b></p>
        <div style={{ marginTop: 25, display: 'flex', width: '70%', justifyContent: 'space-around' }}>
         <img src={Facebook} style={{height: 60 }}/>
          <p>or</p>
          <img src={Google} style={{height: 60 }}/>
         </div>
      </div>
    )
  }
}

export default Landing;
