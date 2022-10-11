const Product = require("../models/product");
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");




exports.addProduct =  (req, res) => {
  let info = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    cid: req.body.cid,
    userId: req.params.id,
    sellerId: req.body.sellerId,
    image: req.file.path,
  };
  const product = Product.create(info).then((product) => {
    res.json(product);
  }).catch(err=>{
    res.json(err.message)
  });
};



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Images')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
  }
})

exports.upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
}).single('image')




exports.getAllProducts = (req, res) => {
  let products = Product.findAll({
    attributes: ["name", "description"],
  }).then((products) => {
    res.status(200).json({
      products,
    });
  });
};

exports.getProductById = (req, res) => {
  let id = req.params.id;

  let product = Product.findOne({
    where: { id: id },
  }).then((product) => {
    res.json(product);
  });
};

exports.getProductByName = (req, res) => {
  let name = req.params.name;

  let product = Product.findOne({
    where: { name: name },
  }).then((product) => {
    res.json(product);
  });
};

exports.updateProduct = (req, res) => {
  let id = req.params.id;
  if (req.body.name === "") {
    return res.status(400).json("Name cannot be null");
  }
  const product = Product.update(req.body, {
    where: { id: id },
  })
    .then((product) => {
      res.status(200).json("Product updated successfully");
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

exports.deleteProduct = (req, res) => {
  let id = req.params.id;
  let prod = Product.findOne({
    where: { id: id },
  }).then((prod, error) => {
    if (prod === null) {
      res.json("No product found");
    }
    if (error) {
      return res.json(error);
    }

    let product = Product.destroy({
      where: { id: id },
    }).then((product) => {
      res.status(200).json("product deleted");
    });
  });
};

exports.searchProduct = (req, res) => {
  let name = req.params.name;
  let products = Product.findAll({
    where: { name: { [Op.like]: "%" + name + "%" } },
    attributes: ["name", "id"],
  }).then((products) => {
    res.status(200).json({
      products,
    });
  });
};

//i have to work more on this
exports.getRandom =async (req, res) => {
  const  c= await Product.count()
  
  let ran = Math.floor(Math.random() * c) + 1; 
  // console.log(ran);
  let product =  Product.findOne({
    where: { id: ran },
  }).then((product) => {
    res.status(200).json({
      product,
    });
  });
};
