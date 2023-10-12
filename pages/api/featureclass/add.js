import dbConnect from '../../../config/mongo';
import Section from '../../../models/Section';
import Template from '../../../models/Template';
import TypeElement from '../../../models/TypeElement';
import ClassNameC from '../../../models/ClassNamec';


/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse}  res 
 */


export default async function addFeature(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;
  
   
    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');
   
   
   // console.log(req.body)
  //console.log(req.body)
   if(req.body.section){
    const section = await Section.create(req.body)
//console.log('CREATED SECTION', section);
    console.log('CREATING DOCUMENT section');
    res.json({message: "Done"})
  //  res.json({ section })
  }
    
   if(req.body.template){
        const template = await Template.create(req.body)
//        console.log('CREATED TEMPLATE', template);
        console.log('CREATING DOCUMENT template');
        res.json({message: "Done"})
      // res.json({ template })
      }

    if(req.body.classnamec){
      
      
        const classnamec = await ClassNameC.create(req.body)
        //    console.log('CREATED CLASSNAME', className);
        console.log('CREATING DOCUMENT classnamec');
        res.json({message: "Done"})
          //  res.json({classNameC})
          }

    if(req.body.typeelement){
      //console.log(req.body)
                const typeelement = await TypeElement.create(req.body)
             //   console.log('CREATED SECTION', typeelement);
             console.log('CREATING DOCUMENT Typeelement');
          res.json({message: "Done"})
            // res.json( typeelement )
            } 
    
            // res.json({message: "No se encontro req.body valido"})

  } catch (error) {
   // console.log(error);
    res.json({ error })
  }
}
