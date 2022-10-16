const e = require('express');
const uuid= require('uuid');

let places = [
  {
    id: "p1",
    title: "Empire Building",
    description: "New York",
    address: "NY city",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO3VVDMNZlYn4QzAsUx0P-dC_e5ip6nuD4tJMBtc3jtXKIvD_BYXsJ8BZ5Tzc-GvnQs-8&usqp=CAU",
    creatorId: "u1",
    location: {
      lat: 23.1745,
      lng: 88.5606,
    },
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = places.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    res.status(404).json("Not Found");
  }
  res.status(200).json(place);
};
const getPlacesByUid = (req, res, next) => {
  const userId = req.params.userid;
  const place = places.filter((p) => {
    return p.creatorId === userId;
  });
  if (!place) {
    res.status(404).json("Not Found");
  }
  res.status(200).json(place);
};

const createPlace = (req,res,next) => {
    const { title,description,address,coordinates,creator } = req.body
    const createdPlace = {
        id:uuid.v4(),
        title: title,
        description: description,
        address: address,
        location: coordinates,
        creatorId:creator
    }
    places.push(createdPlace)
    res.status(201).json(places)
}   

const updatePlace = (req,res,next) => {
    const pid = req.params.pid
    const {  title,description  } = req.body
    const place = places.find(pl => pl.id === pid)
    if(place){
        place.title = title
        place.description = description
        res.status(200).json(place)
    }
    else{
        res.status(404).json("Place Not Found")
    }
}

const deletePlace = (req,res,next) => {
    const pid = req.params.pid 
    places = places.filter(p => p.id !== pid)
    res.status(200).json({message:"Deleted Successfully"})
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUid = getPlacesByUid
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace