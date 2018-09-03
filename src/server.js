require('es6-promise').polyfill();
import 'isomorphic-fetch';
import express from 'express';
import React from 'react';
import {JSDOM} from 'jsdom';
import { renderToString } from "react-dom/server";

import { Html } from "./template";
import App from "./app";
import config from './config';

//const { window } = new JSDOM(`...`); // creating fake window for node
require('jsdom-global')();

// Making SSR indicator to false while application run on CSR.
window.__isSSR = true; 


let app = express();

/* app.engine('pug', require('pug').__express)
app.set('views','./views');
app.set('view engine','pug'); */


app.use('/dist', express.static('dist'));

app.get('/', (req, res) => {

  fetch(config.urls.getUsers).then(r => r.json()).then((_users) => {

    // TODO: catch issue in server side render (currently blocking page)
    let serverData = {users:_users};
    let reactHtmlString = renderToString(<App users={_users}/>);
    let html = Html(reactHtmlString,JSON.stringify(serverData));
    
    res.send(html);

  })


  // res.render('index');
});


app.listen(8080, '127.0.0.1', () => {
  console.log('server up on running!!');
});