const server = require ("./src/app.js");
const {conn}=require('./src/db.js');

conn.sync({force:false}).then(()=>{
    server.listen(3006,()=>{
        console.log("listen at 3006")
    })
})