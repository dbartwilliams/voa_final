import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { fileRemover } from "../utils/fileRemover.js";
import { v4 as uuidv4 } from "uuid";

const createPost = async (req, res, next) => {
  try {
      const defaultTagStrings = ["War"];
    const post = new Post({
      title: "sample title",
      caption: "Please replace the sample caption",
      slug: uuidv4(),
      isPublished: false,
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
        tags: defaultTagStrings,
      user: req.user._id,
    });

    const createdPost = await post.save();
    return res.json(createdPost);
  } catch (error) {
    next(error);
  }
};

// const createPost = async (req, res, next) => {
//   try {
//     const generalCategory = await PostCategories.findOne({ name: "General" });
//     const defaultCategoryIds = generalCategory ? [generalCategory._id] : [];
//     const defaultTagStrings = ["War"];

//     const post = new Post({
//       title: "sample title",
//       caption: "Please replace the sample caption",
//       slug: uuidv4(),
//       isPublished: false,
//       body: {
//         type: "doc",
//         content: [],
//       },
//       photo: "",
//       user: req.user._id,
//       categories: defaultCategoryIds,
//       tags: defaultTagStrings,
//     });

//     const createdPost = await post.save();
//     return res.json(createdPost);
//   } catch (error) {
//     next(error);
//   }
// }
const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return next(new Error("Post was not found"));
    }

    const upload = uploadPicture.single("postPicture");

    const handleUpdatePostData = async (data, next) => {
      try {
        const parsed = JSON.parse(data);
        const { title, caption, slug, body, tags, categories, isPublished } = parsed;

        post.title = title || post.title;
        post.caption = caption || post.caption;
        post.slug = slug || post.slug;
        post.body = body || post.body;
        post.isPublished = isPublished ?? post.isPublished;
        post.tags = tags || post.tags;
        post.categories = categories || post.categories;

        const updatedPost = await post.save();
        return res.json(updatedPost);
      } catch (err) {
        next(new Error("Invalid update data: " + err.message));
      }
    };

    upload(req, res, async function (err) {
      if (err) {
        return next(new Error("Upload error: " + err.message));
      }

      try {
        if (req.file) {
          if (post.photo) {
            fileRemover(post.photo);
          }
          post.photo = req.file.filename;
        } else {
          if (post.photo) {
            fileRemover(post.photo);
          }
          post.photo = "";
        }

        await handleUpdatePostData(req.body.document, next);
      } catch (err) {
        next(err);
      }
    });
  } catch (error) {
    next(error);
  }
};


const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    fileRemover(post.photo);

    await Comment.deleteMany({ post: post._id });

    return res.json({
      message: "Post is successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      },
      {
        path: "categories",
        select: ["title"],
      },
      {
        path: "comments",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "name"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
            populate: [
              {
                path: "user",
                select: ["avatar", "name"],
              },
            ],
          },
        ],
      },
    ]);

    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    return res.json(post);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword;
    const categories = req.query.categories
      ? req.query.categories.split(",")
      : []; // Expecting categories to be comma-seperated

      let where = {};

    // If no user or user is not admin, restrict to published posts only
    // if (!req.user || !req.user.admin) {
    //   where.isPublished = true;
    // }

    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    }

    if (categories.length > 0) {
      where.categories = { $in: categories };
    }

    let query = Post.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Post.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: "user",
          select: ["avatar", "name", "verified"],
        },
        {
          path: "categories",
          select: ["title"],
        },
      ])
      .sort({ updatedAt: "desc" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export { createPost, updatePost, deletePost, getPost, getAllPosts };
