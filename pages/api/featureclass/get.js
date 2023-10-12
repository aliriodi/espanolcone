import dbConnect from '../../../config/mongo'
import Section from '../../../models/Section';
import Template from '../../../models/Template';
import TypeElement from '../../../models/TypeElement';
import ClassNameC from '../../../models/ClassNamec';





export default async function getAllfeatures(req, res) {

  try {
   

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');
    console.log('CREATING DOCUMENT');

    const sections = await Section.find().exec();
    const templates = await Template.find().exec();
    const typeElements = await TypeElement.find().exec();
    const classnames = await ClassNameC.find().exec();

    console.log('CREATED DOCUMENT');

    res.json( {sections,templates,typeElements,classnames} )

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}

