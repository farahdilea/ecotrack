const resourceModel=require("../models/resources")

class resourcesController{
    static async getallResources(req,res){

        var result=await resourceModel.getResources();
    
if(result) {
 res.send(result)
    }
   
    }
  
}
module.exports=resourcesController
