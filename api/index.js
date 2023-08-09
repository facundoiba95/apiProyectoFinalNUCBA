import app from "./app.js";
import './database.js'

const PUERTO = process.env.PORT || 3100;

app.listen(PUERTO, () => {
    console.log('Server listening to port: ', PUERTO);
})