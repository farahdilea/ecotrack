const mysql=require('mysql')
const db=mysql.createPool({
  host:"localhost",
  username:"root",
  password :"",
  database:"ecotrack"  
});
db.getConnection(()=>{
    console.log('connet to db succefully')
})
module.exports=db;