import express from "express";
import users from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import post from "../models/post.js";
import user from "../models/user.js";

const router = express.Router();

const adminLayout = "../views/layouts/admin"; //???
const jwtSecret = process.env.JWT_TOKEN;

/* GET / 
    check LOGIN
 */

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    // res.render('/admin')
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    // res.render('/admin')
    return res.status(401).json({ message: "Unauthorized" });
  }
};

/* GET / 
    ADMIN LOGIN
 */

router.get("/admin", (req, res) => {
  try {
    // cosnt data = post
    const locals = {
      title: "User Login",
    };
    res.render("admin/index", { locals, layout: adminLayout }); //<---doubt
  } catch (error) {
    console.log(error);
  }
});

/* POST / 
    ADMIN LOGIN check
 */

router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await users.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard",);
  } catch (error) {
    console.log(error);
  }
});

/* GET / 
    ADMIN DASHBOARD/
 */

router.get("/dashboard", authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: "Dashboard",
          };
        const data = await post.find()
        const curUser = await user.findById(req.userId)
        res.render("admin/dashboard", {locals, curUser, data});
    } catch (error) {
        
    }
  
});


/* POST / 
    register
 */

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await users.create({ username, password: hashedPassword });
    res.status(201).json({ message: "User Sucessfully Created" }); //<---doubt
  } catch (error) {
    console.log(error);
  }
});

export default router;
