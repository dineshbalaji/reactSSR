import React from 'react';
import {Component} from "react";
console.log('app');
export default class App extends Component {
  constructor(){
    super();
    this.state ={text:'World'}
  }
  textChangeHandler(evt){
    this.setState({
      text:evt.target.value
    });
  }
  render(){
    return (<div>
      <p>Hello {this.state.text}</p>
      <input type="text" onChange={this.textChangeHandler.bind(this)}/>
      </div>)
  }
}