import React, { Component } from 'react';
import './../App.css';
import Bot from './../js/bot';

class Comp extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: (this.props.from == 'bot')
    }
    this.bot = new Bot();
    if(this.props.from == 'bot'){
      setTimeout(() => {
        this.setState({loading: false});
      }, 1000);
    }
  }

  renderText(loading){
    if(loading){
      return "...";
    }else{
      let returnArray = [];
      let txt = this.props.text;
      txt.split("[").forEach((t, i) => {
        if(i != 0) {
          let inf = t.split("]")[0];
          returnArray.push(<span onClick={() => { this.props.ttb('', inf); }}>[{inf.split("=")[0]}] </span>);
        }else{
          returnArray.push(t);
          returnArray.push(<br/>);
        }
      });
      return returnArray.map(r => (r));
    }
  }

  render() {
    return (
      <div className={["text", this.props.from].join(" ")} style={{opacity: this.props.index*(1/this.props.length)}}>
        <i className="material-icons">&#xE315;</i>
        {this.renderText(this.state.loading)}
      </div>
    );
  }
}

export default Comp;
