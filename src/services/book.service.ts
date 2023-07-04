import { Model } from "mongoose";
import { BookDoc, BookModel } from "../database/models/book";

export interface BookServiceInterface {
  addBook(author: string, title: string): Promise<BookDoc>;
  getBook(id: string): Promise<BookDoc>;
  getBooks(): Promise<BookDoc[]>;
  deleteBook(id: string): Promise<string>;
  updateBook(id: string, updateDto: { title?: string; author?: string }): Promise<BookDoc>;
}

class BookService implements BookServiceInterface {
  private BookModel: Model<BookDoc>;

  constructor(Model: Model<BookDoc>) {
    this.BookModel = Model;
  }

  public async addBook(author: string, title: string): Promise<BookDoc> {
    const book = await this.BookModel.create({ author, title });
    return book;
  }

  public async getBook(id: string): Promise<BookDoc> {
    const book = await this.BookModel.findById(id);
    if (!book) throw new Error("Not found"); //Throw appropriate error
    return book;
  }

  public async getBooks(): Promise<BookDoc[]> {
    const books = await this.BookModel.find({});
    if (books.length === 0) throw new Error("No books");
    return books;
  }

  public async deleteBook(id: string): Promise<string> {
    const book = await this.BookModel.findByIdAndDelete(id);
    if (!book) throw new Error("Book does not exist");
    return "Delete successful";
  }

  public async updateBook(id: string, updateDto: { title?: string; author?: string }): Promise<BookDoc> {
    const book = await this.BookModel.findByIdAndUpdate(id, updateDto, { new: true });
    if (!book) throw new Error("Not found");
    return book;
  }
}

export const bookService = new BookService(BookModel);
