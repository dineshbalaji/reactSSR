require("@babel/polyfill");
require('es6-promise').polyfill();
import 'isomorphic-fetch';
import express from 'express';
import React from 'react';
import {JSDOM} from 'jsdom';
import { renderToString, renderToNodeStream } from "react-dom/server";

import { Html, headHtml, tailHtml } from "./template";
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

app.get('/nostream',  async function (req, res) {

  let _users = await fetch(config.urls.getUsers).then(r => r.json())
  // TODO: catch issue in server side render (currently blocking page)
  let serverData = { users: _users };
  let reactHtmlString = renderToString(<App users={_users} />);
  let html = Html(reactHtmlString, JSON.stringify(serverData));
  res.send(html);
});

app.get('/', async function (req, res) {

  let _users = await fetch(config.urls.getUsers).then(r => r.json())
  let serverData = { users: _users };

  res.write(headHtml( JSON.stringify(serverData)));

  let stream = renderToNodeStream(<App users={_users}/>); // return node readable stream;
  // stream.on('data',data => console.log(JSON.stringify(data))); // to log and see streaming response
  stream.pipe(res, {end:false});
  stream.on('end', ()=>{
    res.end(tailHtml);
  });
});

app.listen(8080, '127.0.0.1', () => {
  console.log('server up on running!!');
});