require('es6-promise').polyfill();
import 'isomorphic-fetch';

import React from 'react';
import { Component } from "react";
import config from './config';

export default class App extends Component {
  constructor(props) {
    super(props);
    console.log('>>constructor >> isSSR', window.__isSSR);
    this.state = { text: 'dinesh', ssrUsers: props.users, csrUsers:[]};
  }
  static getDerivedStateFromProps(props, state){
    console.log('>>GDSFP >> isSSR', window.__isSSR);
    return state;
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('>> shouldComponentUpdate');
    return true;
  }
  getSnapshotBeforeUpdate(prevProps,prevState){
    console.log('>>getSnapshortBeforeUpdate');
  }
  

  textChangeHandler(evt) {
    this.setState({
      text: evt.target.value
    });
  }
  render() {
    
    console.log('render >> __isSSR', window.__isSSR);
    return (
    <div>
      <h1>React server side rendering</h1>
      <p>Hello {this.state.text}</p>
      <label htmlFor="input-box">Typing somthing to confirm event handling in CSR</label>  
      <input id="input-box" type="text" onChange={this.textChangeHandler.bind(this)} />

      <p>Listing users in SSR</p>
      <ul>
        {this.state.ssrUsers.map(user => (<li key={user.id}>{user.name}</li>))}
      </ul>
      <p>Listing Agian, users in CSR</p>
       <ul>
       {this.state.csrUsers.map(user => (<li key={user.id}>{user.name}</li>))}
       </ul>
    </div>
    );
  }
  componentDidCatch(err){
    console.log('>>componentDidCatch');
  }
  componentDidMount(){

    console.log('>> componentDidMount');

    fetch(config.urls.getUsers).then(r => r.json()).then((_users) => {
      this.setState({csrUsers:_users});
    })
    
  }
  componentDidUpdate(){
    console.log('>> componentDidupdate');
  }
}