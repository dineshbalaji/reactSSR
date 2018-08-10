let Express = require("express");
let app = Express();
app.use((rq,rs,nxt)=>{
    nxt();
})
app.get('/',(rq,rs)=>{
    rs.send('hello world');
})
app.listen('8080');