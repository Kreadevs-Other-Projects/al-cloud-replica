import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Paper,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api/axios.js";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FALLBACK_BLOGS } from "../constants/blogs.js";

const BlogEdit = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    coverImage: "",
    isPublished: true,
  });

  const fetchBlogs = async () => {
    console.log("📡 Fetching blogs...");

    try {
      const res = await api.get("/api/blogs/");
      console.log("✅ API response received:", res);

      const items = Array.isArray(res.data?.items)
        ? res.data.items
        : Array.isArray(res.data)
        ? res.data
        : [FALLBACK_BLOGS];

      console.log("🧩 Parsed blog items:", items);

      if (items.length === 0) {
        console.warn("⚠️ No blogs found in API response — using fallback.");
      }

      setBlogs(items);
    } catch (err) {
      console.error("❌ Failed to fetch blogs:", err);
      setBlogs([]);
    } finally {
      console.log("✅ Finished fetching blogs.");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("🚀 useEffect triggered — fetching blogs...");
    fetchBlogs();
  }, []);

  const handleOpenDialog = (blog = null) => {
    console.log(blog ? "✏️ Editing blog:" : "➕ Adding new blog:", blog);

    if (blog) {
      setEditingBlog(blog);
      setFormData(blog);
    } else {
      setEditingBlog(null);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        coverImage: "",
        isPublished: true,
      });
    }

    console.log("🪟 Dialog opened with formData:", formData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    console.log("❌ Closing dialog.");
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    console.log(`✏️ Field changed → ${name}:`, newValue);

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async () => {
    const fd = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "imageFile") fd.append(key, formData[key]);
    });

    if (formData.imageFile) {
      fd.append("coverImage", formData.imageFile);
    }

    try {
      if (editingBlog) {
        await api.put(`/api/blogs/${editingBlog._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/api/blogs", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await fetchBlogs();
      handleCloseDialog();
    } catch (err) {
      console.error("❌ Failed to save blog:", err);
    }
  };

  const handleDelete = async (id) => {
    console.log("🗑 Attempting to delete blog:", id);
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      console.log("🚫 Delete canceled by user.");
      return;
    }

    try {
      const res = await api.delete(`/api/blogs/${id}`);
      console.log("✅ Blog deleted successfully:", res.data);
      await fetchBlogs();
    } catch (err) {
      console.error("❌ Failed to delete blog:", err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Blog Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
      >
        Create New Blog
      </Button>

      <Box mt={3}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Published</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {blogs.map((blog, index) => (
                  <TableRow key={blog._id || index}>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.category}</TableCell>
                    <TableCell>{blog.isPublished ? "Yes" : "No"}</TableCell>
                    <TableCell>{blog.authorName}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(blog)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(blog._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "22px" }}>
          {editingBlog ? "Edit Blog" : "Create Blog"}
        </DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Excerpt"
                name="excerpt"
                fullWidth
                multiline
                rows={2}
                value={formData.excerpt}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ mb: 1, fontWeight: "bold" }}>
                Content
              </Typography>

              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, content: value }))
                  }
                  style={{ height: "250px" }}
                />
              </Box>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Category"
                name="category"
                fullWidth
                value={formData.category}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Cover Image URL"
                name="coverImage"
                fullWidth
                value={formData.coverImage}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ mb: 1, fontWeight: "bold" }}>
                Upload Cover Image
              </Typography>

              <Button variant="outlined" component="label">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);

                      setFormData((prev) => ({
                        ...prev,
                        coverImage: imageUrl,
                        imageFile: file,
                      }));
                    }
                  }}
                />
              </Button>

              {formData.coverImage && (
                <Box
                  mt={2}
                  sx={{
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={
                      formData.coverImage?.startsWith("/uploads")
                        ? `${"http://localhost:5000"}${formData.coverImage}`
                        : formData.coverImage
                    }
                    alt="Cover Preview"
                    style={{
                      width: "100%",
                      maxHeight: "250px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ px: 3 }}
          >
            {editingBlog ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BlogEdit;
