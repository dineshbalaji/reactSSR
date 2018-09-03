import React from 'react';
import {hydrate} from 'react-dom'
import App from './app';
let users = serverData.users || [];
hydrate(<App users={users}/>,document.getElementById('container'));