import * as https from "node:http";
import { connectToDatabase } from "./src/database/connection";
import serverFunction from "./server";

const server = https.createServer(serverFunction);

const port = process.env.PORT || 3000;
server.listen(port, async () => {
  console.log(`server started at port ${port}`);
  await connectToDatabase();
});
