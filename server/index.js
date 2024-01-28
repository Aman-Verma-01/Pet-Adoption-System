
import {connectDB} from './src/db/index.js'
import {app} from './app.js'
import dotenv from 'dotenv'
dotenv.config()



connectDB()
.then(()=>{
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Server running at ${port}`);
    })
    
})
.catch((err)=>{
    console.log("Mongo DB Connection Failed :: " + err);
})
