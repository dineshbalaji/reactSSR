import express from 'express';
 import React from 'react';
import { renderToStaticMarkup} from "react-dom/server";
import {Html} from "./template";
import App from "./app";

let app = express();

/* app.engine('pug', require('pug').__express)
app.set('views','./views');
app.set('view engine','pug'); */


app.use('/dist',express.static('dist'));

app.get('/',(req,res)=>{

 let html = Html(renderToStaticMarkup(<App/>))
  res.send(html);
 // res.render('index');
});


app.listen(8080,'127.0.0.1',()=>{
  console.log('server up on running!!');
});