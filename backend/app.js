const express = require('express');
require('dotenv').config({path:'.env'});

const PORT = process.env.PORT || 8000;

const app = express();
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
