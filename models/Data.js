const db=require("../config/db")
class DataModel {

    static async getData(){
      try {
        const result = await new Promise((resolve, reject) => {
          db.query("SELECT * FROM posts", [], (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    } 
    
    static async addData(id,userid,air_Q,water_Q,humid,tempr,winds,sco,resou){

return new Promise (resolve=> { db.query("INSERT INTO posts(post_id, user_id, air_quality, water_quality, humidity, temp, wind_speed, score, resource)VALUES (?,?,?,?,?,?,?,?,?)",
[id,userid,air_Q,water_Q,humid,tempr,winds,sco,resou], (error, result) => {
         if (!error) 
           resolve(true)
          else 
           resolve(false)
         

       } )
      })


    
} 
} 



module.exports=DataModel
