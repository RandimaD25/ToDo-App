import express, { Request, Response, NextFunction } from 'express';
import todoRoute from "./routes/todoRoute";
import authRoute from "./routes/authRoute";

let cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const port = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());
app.use('/api', todoRoute)
app.use('/api', authRoute)


app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
