import express from "express"
import todoRoute from "./routes/todoRoute";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', todoRoute)


app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
