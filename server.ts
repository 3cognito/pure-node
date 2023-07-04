import { IncomingMessage, ServerResponse } from "http";
import { router } from "./src/core";
import { bookController } from "./src/controllers/book.controller";
import { Request } from "./src/core";

export default function serverHandler(req: IncomingMessage, res: ServerResponse) {
  const Request = req as Request;

  router.post("/", bookController.addBook);
  router.get("/", bookController.getBooks);
  router.handle(Request, res);
}
