import { config } from "dotenv"
config()

export const getLeaguesByID = async ( req,res ) => {
    try {
        const { idLeague } = req.body;
        const connect = await fetch(`https://api.unidadeditorial.es/sports/v1/classifications/current/?site=8&type=10&tournament=0${idLeague}`)
        const resApi = await connect.json();
        res.status(200).json({resApi}) 
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error})
    }
}