import express from "express";
import user from "../models/user.js";



const router = express.Router();

const adminLayout = '../views/layouts/admin';           //???


/* GET / 
    ADMIN LOGIN
 */


router.get("/admin",(req,res)=>{
    try {
        // cosnt data = post
        const locals = {
            title :"User Login"
        }
        res.render('admin/index',{locals, layout: adminLayout})    //<---doubt
    } catch (error) {
        console.log(error)
    }
})

/* POST / 
    ADMIN LOGIN check
 */


    router.post("/admin",(req,res)=>{
        try {
            const {username, password} = req.body;




            res.send(req.body)    //<---doubt
        } catch (error) {
            console.log(error)
        }
    })
    
/* POST / 
    register
 */


    router.post("/admin",(req,res)=>{
        try {
            const {username, password} = req.body;
            



            res.send(req.body)    //<---doubt
        } catch (error) {
            console.log(error)
        }
    })
    

export default router;