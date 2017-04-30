import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Text from './component/text';

class App extends Component {
  constructor(props){
    super(props);
    this.textInput = null;
  }

  generalFocus(){
    this.textInput.focus();
  }

  onSubmitHandle(e){
    let val = this.textInput.value;
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13 && val != "") { //Enter keycode
        console.log('enter press', val);
        this.textInput.value = "";
    }
  }

  render() {
    return (
      <div className="App" onClick={this.generalFocus.bind(this)}>
        <div className="chat">
          <Text from="bot" key="1" text="Hello. My Name is Ava. What is your name?"/>
          <Text from="user" key="2" text="Burak"/>
          <Text from="bot" key="3" text="Tell me a password for idenifying you later!"/>
          <Text from="user" key="4" text="1245460234*dsg"/>
          <Text from="bot" key="5" text="What are you doing here, Burak?"/>
          <Text from="user" key="6" text="I'm here for the CTF."/>
          <div className="text inp">
            <i className="material-icons">&#xE315;</i>
            <div className="input">
              <input ref={(input) => { this.textInput = input; }}
                     onKeyPress={(e, input) => { this.onSubmitHandle(e); }}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
