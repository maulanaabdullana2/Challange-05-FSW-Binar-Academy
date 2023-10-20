const ApiError = require("../utils/apiError");

const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      if (req.user.role !== role) {
        next(new ApiError(`Kamu bukan tidak bisa akses ini`, 401));
      }
      next();
    } catch (error) {
      next(new ApiError(error.message, 400));
    }
  };
};

module.exports = checkRole;
