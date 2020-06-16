const path = require("path");
const fs = require("fs");

const Picture = require("../models/imageModel");
// File uploading
var multer = require("multer");

const home = (req, res, next) => {
  Picture.find()
    .then((allImages) => {
      res.render("index", { allImages: allImages });
    })
    .catch((err) => console.log(err));
};

const uploads = (req, res, next) => {
  res.render("uploads");
};

// Single Image Upload.....
const uploadsingle = (req, res, next) => {
  const file = req.file;
  if (!file) {
    return console.log("Please select an Image.");
  }
  let url = file.path.replace("public", "");
  Picture.findOne({ imgUrl: url })
    .then((img) => {
      if (img) {
        console.log("Duplicate Image. Try again!");
        return res.redirect("/upload");
      }
      Picture.create({ imgUrl: url }).then((img) => {
        console.log("Image saved to DB.");
        res.redirect("/");
      });
    })
    .catch((err) => {
      return console.log("ERROR: " + err);
    });
};

//Multiple Images Upload......

const uploadMultiple = (req, res, next) => {
  const files = req.files;
  if (!files) {
    return console.log("Please select images.");
  }

  files.forEach((file) => {
    let url = file.path.replace("public", "");

    Picture.findOne({ imgUrl: url })
      .then(async (img) => {
        if (img) {
          return console.log("Duplicate Image.");
        }
        await Picture.create({ imgUrl: url });
      })
      .catch((err) => {
        return console.log("ERROR: " + err);
      });
  });

  res.redirect("/");
};

const deleteImage = (req, res, next) => {
  let searchQuery = { _id: req.params.id };
  
  Picture.findOne(searchQuery)
    .then((img) => {
      fs.unlink(__basedir + "/public/" + img.imgUrl, (err) => {
        if (err) return console.log(err);
        Picture.deleteOne(searchQuery).then((img) => {
          res.redirect("/");
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { home, uploads, uploadsingle, uploadMultiple, deleteImage };
