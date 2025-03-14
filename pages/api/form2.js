import dbConnect from '../../config/mongo'
import mongoose from 'mongoose'

export default async function handler(req, res) {
  try {
    
    const db = await dbConnect()
    
    
    const collections = await mongoose.connection.db.listCollections().toArray()
    
    
    const allData = {}

    
    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name
      const collection = db.collection(collectionName)
      
    
      const documents = await collection.find({}).toArray()
      
    
      allData[collectionName] = documents.map(doc => ({
        ...doc,
        _id: doc._id.toString()
      }))
    }

    
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Disposition', 'attachment; filename="all-collections.json"')

    
    res.status(200).send(JSON.stringify(allData, null, 2))

  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ success: false, error: error.message })
  }
}