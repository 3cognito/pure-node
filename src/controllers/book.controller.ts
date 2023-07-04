import { IncomingMessage, ServerResponse } from "http";
import { BookServiceInterface, bookService } from "../services/book.service";
import { Request } from "../core";

class BookController {
  private BookService: BookServiceInterface;

  constructor(service: BookServiceInterface) {
    this.BookService = service;
  }

  addBook = async (req: Request, res: ServerResponse): Promise<void> => {
    try {
      const { author, title } = req.body;
      const data = await this.BookService.addBook(author, title);
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    } catch (err) {
      res.statusCode = 500;
      res.end("Something went wrong");
    }
  };

  deleteBook = async (req: Request, res: ServerResponse): Promise<void> => {
    const { id } = req.body;
    const message = await this.BookService.deleteBook(id);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(message);
  };

  getBook = async (req: Request, res: ServerResponse): Promise<void> => {
    const { id } = req.body;
    const data = await this.BookService.getBook(id);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  };

  getBooks = async (req: Request, res: ServerResponse): Promise<void> => {
    const data = await this.BookService.getBooks();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  };

  updateBook = async (req: Request, res: ServerResponse): Promise<void> => {
    const { author, title } = req.body;
    const data = await this.BookService.updateBook(author, title);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  };
}

export const bookController = new BookController(bookService);
