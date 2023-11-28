const mysql=require('mysql')
const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'ecotrack',
});
db.getConnection(()=>{
console.log('connected to db successfully');
})
module.exports=db;
