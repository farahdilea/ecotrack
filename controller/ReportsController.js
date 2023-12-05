const reportsModel=require("../models/reports")


class ReportsController{


    static async getallreports(req,res)
    {
        console.log("gt all reports")
        var results= await reportsModel.getreports();
        if (results)
            res.send(results)

    }

    static async addnewreport(req,res)
    {
        console.log("add a new report")
       
       /* var user_id=req.body.user_id;
        var problem_name=req.body.problem_name;
        var description=req.body.description;*/
         var x=await reportsModel.addreport(req.body.user_id,req.body.problem_name,req.body.description)
         if(x==true)
           res.send("added successfully");
         else
         {
           res.send ("add failed") 
      
         } 

    }


    static async deletereport(req,res)
    {
      const id=req.body.report_id;
      if(id)
      {
        var result=await reportsModel.deletereport(id);
        if(result)
        res.send("delete done")
      else
      res.send("failed to delete user")
      }
    }

    static async updatereport(req,res)
    {
      console.log("edit report");
      const id=req.body.report_id;
      const newname=req.body.problem_name;
      const newdescription=req.body.description;

     var x= await reportsModel.edit(id,newname,newdescription)
     if(x)
     res.send("data edited successfully")
    else
    res.send("editing failed")
    }

}

module.exports=ReportsController
