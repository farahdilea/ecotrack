const db=require("../config/db")

class chatModel
{   
    
    
    static async getchat(location) {
        return new Promise(resolve => {
            console.log("getting users from db");
            db.query("SELECT name,user_id FROM user WHERE location = ?", [location], (error, result) => {
                console.log("naah");
                if (!error) {
                    resolve(result);
                    console.log("hello there");
                } else {
                    console.log(error);
                    resolve(null);
                }
            });
        });
    }

    static async getchati(interest) {
        return new Promise(resolve => {
            console.log("getting users from db");
            db.query("SELECT u.name FROM user u JOIN interests i ON u.user_id = i.user_id  WHERE i.name = ?", [interest], (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    console.log(error);
                    resolve(null);
                }
            });
        });
    }
    

static async addchat(userid,user2id,msgg )
{
return new Promise(resolve=>{
    db.query("insert into msg(user1_id,user2_id,msg)values (?,?,?)",[userid,user2id,msgg],(e,r)=>{
if (!e)
resolve(true)
else
resolve(false)

    })
     
})
}



}

module.exports= chatModel
