import mongoose from "mongoose";
import { User } from "../../models/User.js";
import bcrypt from 'bcrypt'



const createAdmin = async () => {
    await mongoose.connect('mongodb://localhost:27017/demoUsersDB')

    const existingAdmin = await User.findOne({role : 'admin'})

    if(existingAdmin){
        console.log('Admin already exist')
        return
    }

    const hashedPassword = await bcrypt.hash('admin123' , 10)

    await User.create({
        fullName : 'Admin',
        email :'admin@gmail.com',
        password : hashedPassword,
        role : 'admin',
        age :'30'
    })

    console.log('Admin created !')
}

createAdmin()