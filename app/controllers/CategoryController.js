const Category = require("../models/category");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { Op } = require("sequelize");

exports.getAllCategories = (req, res) => {
  let categories = Category.findAll({
    attributes: ["name", "id"],
  }).then((categories) => {
    res.status(200).json({
      categories,
    });
  });
};

exports.getOneCategory = (req, res) => {
  let id = req.params.id;
  let category = Category.findOne({
    where: { id: id },
  }).then((category) => {
    res.status(200).json({
      category,
    });
  });
};
exports.addCategoryPage = (req, res, next) => {
  res.render("addCate", {
    layout: "login_layout",
    addCategoryPage: true,
    errorMessage: " message(req)",
  });
};

exports.addCategory = (req, res) => {
  let info = {
    name: req.body.name,
  };
  const category = Category.create(info)
    .then((category) => {
      res.json(category.name);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

exports.updateCategory = (req, res) => {
  let id = req.params.id;
  if (req.body.name === "") {
    return res.status(400).json("name cant be null");
  }
  const category = Category.update(req.body, {
    where: { id: id },
  })
    .then((cate) => {
      if (cate.name !== "") {
        res.status(400).json("category created succ");
      }
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

exports.deleteCategory = (req, res) => {
  let id = req.params.id;

  let cate = Category.destroy({
    where: { id: id },
  })
    .then((prod) => {
      res.status(200).json("category deleted");
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
  res.status.json("category deleted");
};


//i have to work on this
exports.getRandom = (req, res) => {
  let ran = Math.floor(Math.random() * 10) + 1;
  console.log(ran);
  let category = Category.findOne({
    where: { id: ran },
  }).then((category) => {
    res.status(200).json({
      category,
    });
  });
};

exports.searchCategory = (req, res) => {
  let name = req.params.name;

  let categories = Category.findAll({
    where: { name: { [Op.like]: "%" + name + "%" } },
    attributes: ["name", "id"],
  }).then((categories) => {
    res.status(200).json({
      categories,
    });
  });
};
