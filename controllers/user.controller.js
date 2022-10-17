const uuid = require('uuid')
const bcrypt = require('bcrypt')
const saltRounds = 10;

let users = [
    {
        id:"u1",
        name:"Swarnadeep Pramanick",
        email:"swarnadeep@gmail.com",
        password:"213",
        image:"https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg",
        places:2
    }
]


const createUser = (req,res,next) => {
    const {  name,email,password,image,palces  } = req.body
    const newUser = {
        id:uuid.v4(),
        name,
        email,
        password,
        image,
        palces
    }
    users.push(newUser)
    res.status(201).json(users)
}

const getAllUsers = (req,res,next) => {
    res.send(users)

}

const getUserByEmail = (req,res,next) => {
    const { email,password } = req.body
    const user = users.find(u => u.email === email)
    if(!user) res.status(404).json({ message:"User not found" })
    res.status(200).json({user})
}

const getUserById = (req,res,next) => {
    const uid = req.params.uid
    const user = users.find(u => u.id === uid)
    if(!user) res.status(404).json({ message:"User not found" })
    res.status(200).json({user})
}

const updateUser = (req,res,next) => {
    const { name,image  } = req.body
    const uid = req.params.uid
    const user = users.find(u => u.id === uid)
    if(!user) res.status(404).json({ message:"User not found" })
    user.name = name
    user.image = image
    res.status(200).json(users)
}

const deleteUser = (req,res,next) => {
    const uid = req.params.uid
    users = users.filter(u => u.id !== uid)
    res.status(200).json(users)
}

const updatePassword = async (req,res,next) => {
    const uid = req.params.uid
    const { password } = req.body
    const user = users.find(u => u.id === uid)
    if(!user) res.status(404).json({ message:"User not found" })
    const hash = bcrypt.hashSync(password, saltRounds);
    user.password = hash
    res.status(200).json({
        message:"Password Updated"
    })
}

exports.createUser = createUser
exports.getAllUsers = getAllUsers
exports.getUserByEmail = getUserByEmail
exports.getUserById = getUserById
exports.updateUser = updateUser
exports.deleteUser = deleteUser
exports.updatePassword = updatePassword