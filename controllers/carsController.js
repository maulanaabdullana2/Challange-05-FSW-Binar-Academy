const { Car } = require("../models");
const ApiError = require("../utils/apiError");
const imagekit = require("../lib/imagekit");

const findProducts = async (req, res, next) => {
  try {
    const cars = await Car.findAll();

    res.status(200).json({
      status: "Success",
      data: {
        cars,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const createCars = async (req, res, next) => {
  try {
    const { name, price, category } = req.body;
    const file = req.file;
    let images;
    if (file) {
      const img = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
      });
      images = img.url;
    }
    const cars = await Car.create({
      name,
      price,
      category,
      imageUrl: images,
    });
    res.status(200).json({
      status: "Success",
      data: {
        cars,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const findcarsByID = async (req, res) => {
  try {
    const cars = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: "sucess",
      data: {
        cars,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const editcars = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const exis = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    let newimage = exis.image;

    if (req.file) {
      const img = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
      });
      newimage = img.url;
    }
    await Car.update(
      {
        name,
        price,
        category,
        imageUrl: newimage,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Suksess",
      message: "Update Succesfully",
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const deletecars = async (req, res) => {
  try {
    await Car.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Suksess",
      message: "Delete Successfully",
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

module.exports = {
  findProducts,
  createCars,
  editcars,
  findcarsByID,
  deletecars,
};
