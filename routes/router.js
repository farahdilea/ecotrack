const express=require('express')
const reportcontroller=require("../controllers/ReportsController")
const router=require ('express').Router();
const Datacontroller=require("../controller/DataController") 

/*router.get("/",(req,res,next)=>
{
    res.send("alaa")
})*/

 router.get("/alldata",Datacontroller.getallData) 

    router.get("/allreports",reportcontroller.getallreports)
    router.post("/addreport",reportcontroller.addnewreport)
    router.post("/deletereport",reportcontroller.deletereport)
    router.post("/editreport",reportcontroller.updatereport)

module.exports=router
