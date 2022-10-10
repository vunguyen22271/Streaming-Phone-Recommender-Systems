const router = require("express").Router();
const Cloudinary = require("cloudinary");
const Auth = require("../middleware/Auth");
const AuthAdmin = require("../middleware/AuthAdmin");
const Fs = require("fs");
// We will upload images on cloudinary
Cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// upload image
router.post("/upload", Auth, AuthAdmin, (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: "No files were upload" });

    const file = req.files.file;
    if (file.size > 1024 * 1024 * 5)
    {
        removeTmp(file.tempFilePath)
        return res.status(400).json({ msg: "File size is too big" });
    }
    

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png")
    {
        removeTmp(file.tempFilePath)
        return res.status(400).json({ msg: "The file format is not correct" });
    }
    Cloudinary.v2.uploader.upload(file.tempFilePath,{folder:'test'}, async (err, result)=>{
        if(err) throw err;

        removeTmp(file.tempFilePath)
        res.json({public_id:result.public_id, url: result.secure_url})
    })

    // res.json('Success')
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
router.post('/destroy', Auth, AuthAdmin, (req, res)=>{
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({ msg: "No images selected" });

        Cloudinary.v2.uploader.destroy(public_id,(err, result)=>{
            if(err) throw err;

            res.json({msg:"Deleted Image"})
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
})
const removeTmp = (path) =>{
    Fs.unlink(path,err =>{
        if(err) throw err;
    })
}

module.exports = router;
