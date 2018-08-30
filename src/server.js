require('es6-promise').polyfill();
import 'isomorphic-fetch';
import express from 'express';
import React from 'react';
import { renderToString } from "react-dom/server";
import { Html } from "./template";
import App from "./app";

let app = express();

/* app.engine('pug', require('pug').__express)
app.set('views','./views');
app.set('view engine','pug'); */


app.use('/dist', express.static('dist'));

app.get('/', (req, res) => {

  fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()).then((_users) => {

    // TODO: catch issue in server side render (currently blocking page)
    
    let html = Html(renderToString(<App users={_users} />))
    res.send(html);

  })


  // res.render('index');
});


app.listen(8080, '127.0.0.1', () => {
  console.log('server up on running!!');
});