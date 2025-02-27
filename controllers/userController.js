const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body?._id,
      {
        username: req.body.username,
        email: req.body.email,
      },
      {
        new: true,
      },
    )
    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    const data = await User.findById(req.params?.id)
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
