const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const blog = require("../models/blog");

const router = Router();

// Storage setup for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(`./public/uploads/${req.user._id}`);

    // Create directory if not exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// GET: Render Add Blog Page
router.get("/add-new", (req, res) => {
  return res.render("addblog", {
    user: req.user,
  });
});

// GET: Show All Blogs
router.get("/", async (req, res) => {
  try {
    const allBlogs = await blog.find({}).populate("createdBy");
    res.render("home", {
      user: req.user,
      blogs: allBlogs,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).send("Something went wrong while fetching blogs.");
  }
});

// POST: Create New Blog
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!req.file) {
      return res.status(400).send("Image file is required.");
    }

    const newBlog = await blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverimageUrl: `/uploads/${req.user._id}/${req.file.filename}`

    });

    console.log("✅ Blog created:", newBlog);
    return res.redirect("/");
  } catch (err) {
    console.error("❌ Blog creation error:", err.message);
    return res.status(500).send("Blog creation failed.");
  }
});

module.exports = router;
