const multer = require("multer");
const { nanoid } = require("nanoid");

const fileUploader = ({
  //sebuah function yg memiliki argumen
  destinationFolder = "avatar", //
  prefix = "POST", //menggelompkan file apa
  fileType = "image",
}) => {
  const storageConfig = multer.diskStorage({
    // letak menyimapan gambar di folder mana
    // arahnya mau taro di folder mana
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../public/${destinationFolder}`);
    },

    //rename nama file--function
    filename: (req, file, cb) => {
      const fileExtension = file.mimetype.split("/")[1];

      const filename = `${prefix}_${nanoid()}.${fileExtension}`; //variable
      cb(null, filename);
    },
  });

  const uploader = multer({
    storage: storageConfig,

    fileFilter: (req, file, cb) => {
      console.log(file);
      if (file.mimetype.split("/")[0] != fileType) {
        return cb(null, false);
      }
      cb(null, true);
    },
  });
  return uploader;
};

const upload = multer({
  limits: {
    fileSize: 10000000000, //byte
  },
  fileFilter: (req, file, cb) => {
    console.log(file);

    const file_type = file.mimetype.split("/")[0];
    const file_format = file.mimetype.split("/")[1];

    if (
      file_type != "image" &&
      (format_file != "jpg" || format_file != "png")
    ) {
      return cb(null, false);
    }
    cb(null, true);
  },
});

module.exports = { fileUploader, upload };
