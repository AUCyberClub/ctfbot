import React, { Component } from 'react';
import './../App.css';

class Comp extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className={["text", this.props.from].join(" ")}>
        <i className="material-icons">&#xE315;</i>
        {this.props.text}
      </div>
    );
  }
}

export default Comp;
