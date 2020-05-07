const express = require('express')
const cors = require('cors')
const path = require('path')
const connectDB = require('./db/mongoose')
const app = express()

connectDB()
app.use(cors())
app.use(express.json({ extended: false }));
app.use('/api/users' , require('./routes/user'));
app.use('/api/books' , require('./routes/book'));

// Serve static React files on production
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'));
    // serve index.html file
    app.get('*' , (req , res) => {
        res.sendFile(path.resolve(__dirname , 'client' , 'build' , 'index.html'));
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
})