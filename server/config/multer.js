import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|pdf|doc|docx/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  if (ext) cb(null, true);
  else cb(new Error("File type not supported"), false);
};

const upload = multer({ storage, fileFilter });

export default upload;
