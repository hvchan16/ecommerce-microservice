import "reflect-metadata";
import { AppDataSource } from "./data-source";
import app from "./app";

const port = process.env.PORT || 3002;

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Order service running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
