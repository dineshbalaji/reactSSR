import express from 'express';
import { renderToStaticMarkup} from "react-dom/server";
import Html from "./template";
import App from "./app";

let app = express();



app.get('/',(req,res)=>{

  let html = Html(renderToStaticMarkup(<App/>))
  res.send(html);
});


app.listen(8080,'127.0.0.1',()=>{
  console.log('server up on running!!');
});