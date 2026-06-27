import * as BookServices from "../services/book.services.js";
import { getAuthUser } from "../utils/getAuthUser.js";

const getFeaturedBooks = async (req, res) => {
  const result = await BookServices.getFeaturedBooks();

  res.status(200).send({
    success: true,
    data: result,
  });
};

const getAllBooks = async (req, res) => {
  const { keyword = "", page = 1, categories, author } = req.query;

  const categoryArray = categories ? categories.split(",") : [];
  const result = await BookServices.getAllBooks(
    keyword,
    page,
    author,
    categoryArray,
  );

  res.status(200).send({
    success: true,
    data: result,
  });
};

const getSingleBook = async (req, res) => {
  let bookId = req.params.bookId;

  if (!bookId) {
    return res.status(400).json({
      success: false,
      message: "Book not found",
    });
  }

  const result = await BookServices.getSingleBook(bookId);

  res.status(200).send({
    success: true,
    data: result,
  });
};

const postBook = async (req, res) => {
  const user = await getAuthUser(req);

  if (user[0].role !== "admin") {
    {
      return res.status(401).json({
        success: false,
        message: "Unauthorized admin",
      });
    }
  }

  let postBook = await BookServices.postBook(user, req);

  if (!postBook) throw new Error("Failed to post book");

  res.status(201).send({
    success: true,
    message: "Book Posted Successfully",
  });
};

const deleteBook = async (req, res) => {
  const bookId = req.params.bookId;

  if (!bookId) {
    return res.status(400).json({
      success: false,
      message: "Book not found",
    });
  }

  const deleteBook = await BookServices.deleteBook(bookId);

  if (!deleteBook) throw new Error("Book not found or already deleted");

  res.status(200).send({
    success: true,
    message: "Book Deleted Successfully",
  });
};

const updateBook = async (req, res) => {
  const user = await getAuthUser(req);

  const bookId = req.params.bookId;

  const updateData = req.body;

  if (!bookId) {
    return res.status(400).json({
      success: false,
      message: "Book not found",
    });
  }

  const updateBook = await BookServices.updateBook(bookId, updateData, user);

  if (!updateBook) {
    return res.status(400).json({
      success: false,
      message: "Book not found",
    });
  }

  res.status(200).send({
    success: true,
    message: "Book Updated Successfully",
  });
};

export {
  deleteBook,
  getAllBooks,
  getFeaturedBooks,
  getSingleBook,
  postBook,
  updateBook,
};
