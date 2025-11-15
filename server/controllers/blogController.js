import Blog from "../models/Blog.js";

export const getBlogs = async (req, res) => {
  const page = Math.max(parseInt(req.query.page || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || "9", 10), 1), 50);
  const q = (req.query.q || "").trim();
  const category = (req.query.category || "").trim();

  const filter = { isPublished: true };
  if (category) filter.category = category;
  if (q) filter.$text = { $search: q };

  const [items, total] = await Promise.all([
    Blog.find(filter)
      .select("title slug excerpt coverImage category createdAt author")
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Blog.countDocuments(filter),
  ]);

  const out = items.map((b) => ({
    ...b,
    authorName: b.author?.name || "CloudCare Editorial",
    date: new Date(b.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));

  res.json({ items: out, total, page, pages: Math.ceil(total / limit) });
};

export const getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true })
    .populate("author", "name")
    .lean();

  if (!blog) return res.status(404).json({ message: "Not found" });

  blog.authorName = blog.author?.name || "CloudCare Editorial";
  blog.date = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  res.json(blog);
};

export const createBlog = async (req, res) => {
  try {
    console.log("📥 Incoming blog create request");
    console.log("➡ req.body:", req.body);
    console.log("➡ req.file:", req.file);
    console.log("➡ req.user:", req.user);

    const body = { ...req.body, author: req.user._id };

    if (req.file) {
      body.coverImage = `/uploads/${req.file.filename}`;
    }

    const blog = await Blog.create(body);
    res.status(201).json(blog);
  } catch (err) {
    console.error("❌ SERVER ERROR in createBlog:");
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const updateBlog = async (req, res) => {
  const body = { ...req.body };

  if (req.file) {
    body.coverImage = `/uploads/${req.file.filename}`;
  }

  const blog = await Blog.findByIdAndUpdate(req.params.id, body, {
    new: true,
  });
  res.json(blog);
};

export const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
};
