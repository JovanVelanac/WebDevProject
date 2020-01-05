const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/rtwitter');
const cheeps = db.get('cheep'); 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
res.json({
    message: 'Cheep Cheep! '
})
})

app.get('/cheep', (req, res) =>{
    cheeps
        .find()
        .then(cheeps =>{
            res.json(cheeps); 
        })
})
function isValidCheep(cheep) {
return cheep.name && cheep.name.toString().trim() !=='' &&
cheep.content && cheep.content.toString().trim() !==''
}
app.post('/cheep', (req, res) =>{
    if (isValidCheep(req.body)){
        const cheep = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };
        cheeps
        .insert(cheep)
        .then(createdCheep => {
            res.json(createdCheep);
        })
    }else{
        res.status(422);
        res.json({
            message: "Valid name and input please"
        });
    }

});
app.listen(5000, ()=>{
    console.log('Listening on http://localhost:5000')
})