import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import helmet from 'helmet';
config();

const app = express();

//   routes
import leaguesRoutes from './routes/leagues.routes.js';
import matchesRoutes from './routes/matches.routes.js';
import scorersRoutes from './routes/scorers.routes.js';
import teamsRoutes from './routes/teams.routes.js';
import usersRoutes from './routes/users.routes.js';
import betsRoutes from './routes/bets.routes.js';
import homeRoutes from './routes/home.routes.js';

//   middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended:false }));

app.use('/', homeRoutes)
app.use('/api/tricampeon/leagues', leaguesRoutes);
app.use('/api/tricampeon/matches', matchesRoutes);
app.use('/api/tricampeon/scorers', scorersRoutes);
app.use('/api/tricampeon/teams', teamsRoutes);
app.use('/api/tricampeon/users', usersRoutes);
app.use('/api/tricampeon/bets', betsRoutes);


export default app;