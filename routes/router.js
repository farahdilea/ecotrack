const express=require('express')
const reportcontroller=require("../controllers/ReportsController")
const router=require ('express').Router();

/*router.get("/",(req,res,next)=>
{
    res.send("alaa")
})*/


    router.get("/allreports",reportcontroller.getallreports)
    router.post("/addreport",reportcontroller.addnewreport)
    router.post("/deletereport",reportcontroller.deletereport)
    router.post("/editreport",reportcontroller.updatereport)

module.exports=router
