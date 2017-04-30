import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Text from './component/text';
import Bot from './js/bot';
import Storage from './js/storage';

class App extends Component {
  constructor(props){
    super(props);
    this.textInput = null;
    this.storage = Storage();
    this.bot = Bot();
    this.state = {
      history: this.storage.getHistoryArray()
    }
  }

  generalFocus(){
    this.textInput.focus();
  }

  tellToBot(val, info){
    this.bot.tell(val, info);
    this.setState({history: this.storage.getHistoryArray()});
  }

  onSubmitHandle(e){
    let val = this.textInput.value;
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13 && val != "") {
        this.tellToBot(val);
        this.textInput.value = "";
    }
  }

  render() {
    return (
      <div className="App" onClick={this.generalFocus.bind(this)}>
        <div className="chat">
          {this.state.history.map((t,i) =>
            (<Text from={t.from} text={t.text} key={i} index={i+1} length={this.state.history.length}/>)
          )}
          <div className="text inp">
            <i className="material-icons">&#xE315;</i>
            <div className="input">
              <input ref={(input) => { this.textInput = input; }}
                     onKeyPress={(e, input) => { this.onSubmitHandle(e); }}/>
            </div>
            <br/>
          </div>
        </div>
        <div className="footer">Lynx v0.0.3 &middot;
          <span onClick={() => { this.tellToBot('Nasıl kullanacağım hakkında bilgi verir misin?', "BİLGİ"); }}>[BİLGİ]</span>
          <a href="https://github.com/AUCyberClub/ctfbot" target="_blank">[KAYNAK]</a></div>
      </div>
    );
  }
}

export default App;


function makeid(){
    var length = 5;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i=0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
