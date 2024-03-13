import express from "express";
import post from "../models/post.js";

const router = express.Router();

/*  GET/ 
    HOME/ 
*/
router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "Nodejs Blog",
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
    res.render("post", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

/*  post/ 
    post :search/ 
*/
router.get("/search", async (req, res) => {
  try {
    const data = await post.findById({ _id: slug });
    const locals = {
      title: data.title,
    };

    res.render("search", { locals, data });
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
  res.render("about", locals);
});

//contact page
router.get("/contact", (req, res) => {
  const locals = {
    title: "Contact",
    description: " a simple blog made with Node, Express and MongoDB",
  };
  res.render("contact", locals);
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
