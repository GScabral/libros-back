const server = require ("./src/app.js");
const {conn}=require('./src/db.js');


const PORT= process.env.PORT || 3006;

conn.sync({force:false}).then(()=>{
    server.listen(PORT,()=>{
        console.log("listen at 3006")
    })
})