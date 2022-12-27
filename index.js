const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000


/// middle were ///
require('dotenv').config()
app.use(cors())


app.get('/', (req , res)=>{
    res.send('to-do-server is running')

})

app.listen(port,()=>{
    console.log('server is running on port', port);
})