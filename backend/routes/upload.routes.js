// backend/routes/upload.routes.js
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import cloudinary from '../utils/cloudinary.js';

const router = express.Router();

// multer setup
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'your_folder_name',
      resource_type: 'auto', // ✅ THIS is important
    });

    fs.unlinkSync(filePath); // cleanup local file

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
});

export default router;
