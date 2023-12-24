const resourceModel=require("../models/resources")

class resourcesController{
    static async getallResources(req,res){

        var result=await resourceModel.getResources();
    
if(result) {
 res.send(result)
    }
   
    }
    
  static async getmyResource(req,res){
    var topic=req.body.topic
    

    var x=await resourceModel.getmyResource(topic)
    if(x) {
        res.send(x)
           }
    
}
}
module.exports=resourcesController
