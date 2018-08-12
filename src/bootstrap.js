import React from 'react';
import {hydrate} from 'react-dom'
import App from './app';
console.log('test');
hydrate(<App/>,document.getElementById('container'));