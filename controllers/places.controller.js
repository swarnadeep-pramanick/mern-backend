const e = require('express');
const User = require('../models/user')

const Place = require('../models/places')


const getPlaceById = async(req, res, next) => {
  const placeId = req.params.pid;
  const place = await Place.findById(placeId)
  if (!place) {
    res.status(404).json("Not Found");
  }
  res.status(200).json(place.toObject({ getters:true }));
};
const getPlacesByUid = async (req, res, next) => {
  const userId = req.params.userid;
  const places = await Place.find({ creator:userId })
  if (places.length < 1) {
    res.status(404).json("Not Found");
  }
  res.status(200).json({places:places.map(pl => pl.toObject({ getters:true }))});
};

const createPlace = async (req,res,next) => {
    const { title,description,address,coordinates,creator,image } = req.body
    const createdPlace = new Place({
      title,
      description,
      address,
      image,
      location:coordinates,
      creator
    })
    let user = await User.findById(creator)
    if(!user){
      res.status(404).json({
        messaeg:"Users not found"
      })
    }
    
      
    try{
      const sess = await mongoose.startSession()
      sess.startTransaction()
      await createdPlace.save({ session:sess })
      user.places.push(createdPlace)
      await user.save({ session:sess })
      await sess.commitTransaction()
      res.status(201).json(createdPlace)
    }
    catch(err){
      res.status(500).json({message:"Something went wrong"})
  }
}   

const updatePlace = async(req,res,next) => {
    const pid = req.params.pid
    const {  title,description  } = req.body
    const place = await Place.findById(pid)
    
    if(place){
        place.title = title
        place.description = description
        try{
          await place.save()
          res.status(200).json(place.toObject({ getters:true }))
        }catch(e){
          res.status(500).json({message:"Something Went Wrong"})
        }
    }
    else{
        res.status(404).json("Place Not Found")
    }
}

const deletePlace = async(req,res,next) => {
    const pid = req.params.pid 
    const place = await Place.findById(pid)
    if(!place) res.status(404).json({message:"invalid id"})
    try{
      await place.remove()
      res.status(200).json({message:"Deleted Successfully"})
    }catch(err){
      res.status(500).json({message:err})
    }
    
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUid = getPlacesByUid
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace