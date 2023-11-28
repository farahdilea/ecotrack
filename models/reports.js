const db=require("../config/db")

class reportModel
{

      
static async getreports()
{
    return new Promise(resolve =>
        {
            console.log("getting reports from db")
            db.query("select * from reports",[],(error,result)=>
            {
            if(!error) 
                resolve(result)
            else 
                console.log(error)
            })
        })
}

static async addreport(userid,problemname,descriptionn )
{
return new Promise(resolve=>{
    db.query("insert into reports(user_id,problem_name,description)values (?,?,?)",[userid,problemname,descriptionn],(e,r)=>{
if (!e)
resolve(true)
else
resolve(false)

    })
     
})
}

static async deletereport(id)
{
    return new Promise(resolve=>{
      db.query("delete from reports where report_id=?",[id],(error,result)=>
      {
        if (error)
        resolve(false)
        else
        resolve(true)
      })

    })
}


static async edit(id,newname,newdescription)
{
    return new Promise(resolve=>{
        db.query("update reports set problem_name=?,description=? where report_id=? ",[newname,newdescription,id],(error,result)=>
   { if(!error)
    resolve(true)
    else{
    resolve(false)
    console.log(error)}
   })
    })


}

}

module.exports= reportModel