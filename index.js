const Joi =require('joi');//class
const express= require('express');  
 const app = express();
 app.use(express.json())
;
 const genres=[
{id :1 , name: 'drama'},
{id :2 , name: 'action'}];


 app.get('/api/genres', (req, res) => {
    res.send(genres);
  });
  
app.post('/api/genres',(req,res)=>{
const schema ={
name:Joi.string().min(3).required()
};
const result=Joi.validate(req.body,schema);
if(result.error){
 res.status(400).send (result.error);
    return;
}
const genre ={
id:genres.length+1,
name:genres.body.name // we read it from the bode request 
    };

genres.push(genre);
res.send(genre); //response in the body 
});



app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name; 
    res.send(genre);
  });
  

  app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
  
    res.send(genre);
  });
 

  function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }
  
 app.listen(3000,console.log('listen on 3000'));
 const port = process.env.PORT || 3000;
 app.listen(port, () => console.log(`Listening on port ${port}...`));