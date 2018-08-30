require('es6-promise').polyfill();
import 'isomorphic-fetch';

import React from 'react';
import { Component } from "react";
console.log('app');

export default class App extends Component {
  constructor(props) {
    super(props);
    console.log('>>constructor', props.users);
    
    this.state = { text: 'dinesh', users: props.users || []};
  }
  static getDerivedStateFromProps(props, state){
    console.log('>>GDSFP')
    //return {...state, ...{users:props.users}} // Todo:issue: not working
    return Object.assign({},state,{users:props.users || []});
  }
  shouldComponentUpdate(){
    console.log('>> shouldComponentUpdate')
    return true;
  }
  getSnapshotBeforeUpdate(prevProps,prevState){
    console.log('>>getSnapshortBeforeUpdate')
  }

  textChangeHandler(evt) {
    this.setState({
      text: evt.target.value
    });
  }
  render() {
    console.log('>>render')
    return (
    <div>
      <h1>React server side rendering</h1>
      <p>Hello {this.state.text}</p>
      <label htmlFor="input-box">Typing somthing to confirm event handling in CSR</label>  
      <input id="input-box" type="text" onChange={this.textChangeHandler.bind(this)} />

      <p>Listing users from SSR</p>
      <ul>
        {this.state.users.map(user => (<li key={user.id}>{user.name}</li>))}
      </ul>
    </div>
    );
  }
  componentDidMount(){
    console.log('>> componentDidMount');
  }
  componentDidUpdate(){
    console.log('>> componentDidupdate');
  }
}