import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI

if (!uri) {
    throw new Error(
        'Please define the MONGO_URI'
    )
}

const db = async () => {
    try {
        await mongoose.connect(uri)
        console.log('MongoDB Connected...')

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error;
    }
}

export default db;