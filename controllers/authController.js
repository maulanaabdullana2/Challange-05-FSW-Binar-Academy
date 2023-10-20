const { User, Auth } = require("../models");
const ApiError = require("../utils/apiError");
const byrcpt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { name, age, address, email, password, confirmpassword } = req.body;

    if (password.length < 8) {
      next(new ApiError("Minimum password must be 8 characters", 400));
    }
    const user = await Auth.findOne({
      where: {
        email,
      },
    });

    if (user) {
      next(new ApiError("User email already Use", 400));
    }

    if (password !== confirmpassword) {
      next(new ApiError("password does not match", 400));
    }

    const hashPassword = byrcpt.hashSync(password, 10);
    const hashconfirmassword = byrcpt.hashSync(confirmpassword, 10);

    const newuser = await User.create({
      name,
      age,
      address,
    });

    const test = await Auth.create({
      email,
      password: hashPassword,
      confirmpassword: hashconfirmassword,
      userId: newuser.id,
    });

    res.status(200).json({
      status: "Success",
      data: {
        ...newuser,
        email,
        password: hashPassword,
        confirmpassword: hashconfirmassword,
      },
    });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({
      where: {
        email,
      },
      include: ["User"],
    });
    if (user && byrcpt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.User.id,
          username: user.User.name,
          role: user.User.role,
          email: user.email,
        },
        process.env.JWT_SECRET || "12345"
      );
      res.status(200).json({
        status: "suksess",
        message: "Login berhasil",
        data: {
          token,
        },
      });
    } else {
      next(new ApiError("wrong password and user not found", 400));
    }
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const currentuser = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

module.exports = {
  register,
  login,
  currentuser,
};
