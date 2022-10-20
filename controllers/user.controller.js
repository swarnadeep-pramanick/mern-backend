const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");
const HttpError = require("../models/error");

const createUser = async (req, res, next) => {
  const { name, email, password, image } = req.body;
  const hash = bcrypt.hashSync(password, saltRounds);
  const newUser = new User({
    name,
    email,
    password: hash,
    image,
    places: [],
  });
  try{
    await newUser.save();
    res.status(201).json(newUser);
  }catch(err){
    const error = new HttpError("Something went wrong",500)
    return next(error)
  }
};

const getAllUsers = async (req, res, next) => {
  let users = await User.find({}, "-password");
  if (users.length < 1) return next(new HttpError("Users not found",404))
  res
    .status(200)
    .json({ users: users.map((us) => us.toObject({ getters: true })) });
};

const getUserByEmail = async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  const { email, password } = req.body;
  // res.send(req.body)
  const user = await User.findOne({ email: email });
  if (!user) return next(new HttpError("User not found",404))

  const passwordValid = bcrypt.compareSync(password, user.password);
  // console.log(passwordValid)
  if (!passwordValid) {
    return next(new HttpError("Unauthorized",401))
  } else {
    res.status(200).json({ user: user.toObject({ getters: true }) });
  }
};

const getUserById = async (req, res, next) => {
  const uid = req.params.uid;
  const user = await User.findById(uid);
  if (!user) return next(new HttpError("User not found",404))
  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const updateUser = async (req, res, next) => {
  const { name, image } = req.body;
  const uid = req.params.uid;
  const user = await User.findById(uid);
  if (!user) return next(new HttpError("User not found",404))
  try{
    user.name = name;
    user.image = image;
    await user.save();
    res.status(200).json({ user: user.toObject({ getters: true }) });
  }catch(err){
    const error = new HttpError("Something went wrong",500)
    return next(error)
  }
 
};

const deleteUser = async (req, res, next) => {
  const uid = req.params.uid;
  const user = await User.findById(uid);
  if(!user){
    return next(new HttpError("User not found",404))
  }
  try{
    await user.remove();
    res.status(200).json({ message: "User deleted successfully" });
  }
  catch(err){
    const error = new HttpError("Something went wrong",500)
    return next(error)
  }
  
};

const updatePassword = async (req, res, next) => {
  const uid = req.params.uid;
  const { password } = req.body;
  const user = await User.findById(uid);
  if (!user) return next(new HttpError("User not found",404))
  else{
    const hash = bcrypt.hashSync(password, saltRounds);
    user.password = hash;
    await user.save();
    res.status(200).json({
      message: "Password Updated",
    });
  }
};

exports.createUser = createUser;
exports.getAllUsers = getAllUsers;
exports.getUserByEmail = getUserByEmail;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.updatePassword = updatePassword;
