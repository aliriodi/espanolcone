import mongoose from 'mongoose'


const dbConnect = async () => mongoose.connect(process.env.DB_URI);

export default dbConnect;
