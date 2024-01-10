const express =require('express');
const mongoose = require('mongoose');
const item = require('./Model/schema');
const app = express();

app.use(express.urlencoded({ extended: true }));

const mongodb = 'mongodb+srv://to-do_user:db.rana@cluster0.12z8wrh.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongodb).then(()=>console.log("Database connected!")).catch(err=>console.log("Mongo Error", err))

const indexFile = '/Views/index.html';
const itemPage = './Views/add-item.html';
const errorPage = './Views/error.html';

app.set('view engine','ejs')
app.listen(3000)

// app.get('/create-item',(req,res)=>{
//     const Item = new item({
//         product: 'Computer',
//         price: 2000
//     });
//     Item.save().then(result=>res.send(result)).catch(err=>console.log(err))
// })

// app.get('/get-items',(req,res)=>{
//     item.find().then(result=>res.send(result)).catch(err=>console.log(err))
// })

// app.get('/get-item',(req,res)=>{
//     item.findById('6590469f5542df559c1daa10').then(result=>res.send(result)).catch(err=>console.log(err))
// })

app.get('',(req,res) => {
    res.redirect('/get-items');
    // res.render('index', { items })
})

app.get('/get-items',(req,res)=>{
    item.find().then(result=>{
        res.render('index', { items: result });
    }).catch(err=>console.log(err))
})

app.get('/add-item',(req,res) => {
    //res.send(result)
    res.render('add-item')
})

app.post('/items',(req,res)=>{
    console.log(req.body)
    const Item = item(req.body)
    Item.save().then(()=>{
        res.redirect('/')
    }).catch(err=>console.log(err))

})

app.get('/items/:id',(req, res)=>{
    //console.log(req.params)
    const id = req.params.id;
    item.findById(id).then(result=>{
        // console.log('result', result);
        res.render('item-details', { item: result })
    })
})

app.delete('/items/:id',(req, res)=>{
    const id = req.params.id;
    item.findByIdAndDelete(id).then(()=>{
        // res.redirect('/') this does not work here 
        // so we will have to return a json object
        res.json({ redirect :'/' })
    }).catch(err=>console.log(err))
})

app.put('/items/:id',(req, res)=>{
    const id = req.params.id;
    console.log(req.body)
    item.findByIdAndUpdate(id, req.body, { new: true }).then(()=>{
        res.json({ msg: 'Updated Successfully' })
    }).catch(err=>console.log(err))
})

app.use((req,res) => {
    res.sendFile(errorPage,{root:__dirname})
})



