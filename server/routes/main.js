import express from "express";
import post from "../models/post.js";

const router = express.Router();

/*  GET/ 
    HOME/ 
*/
router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "BlogJS Home",
      description: " a simple blog made with Node, Express and MongoDB",
    };
    let perPage = 10;
    let page = req.query.page || 1;
    
    const data = await post
      .aggregate([{ $sort: { createdDate: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute:"/"
    });
  } catch (error) {
    console.log(error);
  }
});

/*  GET/ 
    post :id/ 
*/

router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await post.findById({ _id: slug });
    const locals = {
      title: data.title,
    };
    res.render("post", { locals, data,currentRoute:`/post/${slug}`});
  } catch (error) {
    console.log(error);
  }
});

/*  POST/ 
    post :search/ 
*/
router.post("/search", async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm
    const searchNoSpecialCharacters = searchTerm.replace(/[^a-zA-Z0-9]/g,'')

    const data = await post.find({
      $or: [
        {title: {$regex: new RegExp(searchNoSpecialCharacters)}},
        {body: {$regex: new RegExp(searchNoSpecialCharacters)}}
      ]
    })
    const locals = {
      title: data.title,
    };

    res.render("search",{locals,data})
  } catch (error) {
    console.log(error);
  }
});

//about page
router.get("/about", (req, res) => {
  const locals = {
    title: "About",
    description: " a simple blog made with Node, Express and MongoDB",
  };
  res.render("about", {locals, currentRoute:"/about"});
});

//contact page
router.get("/contact", (req, res) => {
  const locals = {
    title: "Contact",
    description: " a simple blog made with Node, Express and MongoDB",
  };
  res.render("contact", {locals, currentRoute:"/contact"});
});

export default router;

function insertPostData() {
  post.insertMany([
    {
      title: "1 post",
      body: "this is the third post body",
    },
    {
      title: "2 post",
      body: "this is the third post body",
    },
    {
      title: "3 post",
      body: "this is the third post body",
    },
    {
      title: "4 post",
      body: "this is the third post body",
    },
    {
      title: "5 post",
      body: "this is the third post body",
    },
    {
      title: "6 post",
      body: "this is the third post body",
    },
    {
      title: "7 post",
      body: "this is the third post body",
    },
    {
      title: "8 post",
      body: "this is the third post body",
    },
    {
      title: "9 post",
      body: "this is the third post body",
    },
    {
      title: "10 post",
      body: "this is the third post body",
    },
    {
      title: "11 post",
      body: "this is the third post body",
    },
  ]);
}
// insertPostData();






