const userModel = require("../models/userModel");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("user not found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const registerationDone = await newUser.save();
    if (!registerationDone) {
      return res.status(404).send("Something went wrong");
    }
    res.status(200).json({
      success: true,
      newUser,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
};
