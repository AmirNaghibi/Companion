import React, {Component} from 'react';
import './landing.css'
import Logo from '../assets/images/logo.svg';
import Facebook from '../assets/images/fb-button.svg';


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

        <img src={Facebook} style={{height: 60 }}/>
      </div>
    )
  }
}

export default Landing;
