const { Car, User } = require("../models");
const ApiError = require("../utils/apiError");
const imagekit = require("../lib/imagekit");

const findProducts = async (req, res, next) => {
  try {
    const cars = await Car.findAll({
      include: ["User"],
    });

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
      userId: req.user.id,
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

const findcarsByID = async (req, res, next) => {
  try {
    const cars = await Car.findOne({
      where: {
        id: req.params.id,
      },
      include: ["User"],
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
const editcars = async (req, res, next) => {
  try {
    const { name, price, category } = req.body;
    const exis = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!exis) {
      return res.status(404).json({
        status: "Failed",
        message: "Mobil tidak ditemukan",
      });
    }

    let newimage = exis.image;
    const file = req.file;
    if (file) {
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
        userId: req.user.id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Sukses",
      message: "Update Berhasil",
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const deletecars = async (req, res, next) => {
  try {
    const car = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!car) {
      return res.status(404).json({
        status: "Not Found",
        message: "car not found",
      });
    }

    await Car.update(
      {
        userId: req.user.id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    await Car.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Deleted Successfully",
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
