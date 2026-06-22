import mongoose from "mongoose";

import { BookModel } from "../models/book.model.js";

const objectId = mongoose.Types.ObjectId;

const getFeaturedBooks = async (req, res) => {
  let data = await BookModel.aggregate([
    {
      $match: { ratings: { $gte: 4.5 } },
    },
    {
      $sort: { createdAt: -1 },
    },

    {
      $project: {
        stock: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
  ]);

  if (!data || data.length === 0) {
    throw new Error("book not found");
  }

  return data.slice(0, 4);
};

const getAllBooks = async (keyword = "", page = 1, author, categories = []) => {
  page = parseInt(page);

  if (isNaN(page) || page < 1) page = 1;

  const limit = 8;

  const skip = (page - 1) * limit;

  const searchRegex = { $regex: keyword, $options: "i" };

  const matchQuery = {
    $and: [
      {
        $or: [{ title: searchRegex }, { description: searchRegex }],
      },
    ],
  };

  // if (minPrice !== undefined || maxPrice !== undefined) {
  //   const priceFilter = {};
  //   if (minPrice !== undefined) priceFilter.$gte = Number(minPrice);
  //   if (maxPrice !== undefined) priceFilter.$lte = Number(maxPrice);

  //   matchQuery.$and.push({ price: priceFilter });
  // }

  if (author) {
    matchQuery.$and.push({
      author: { $regex: author, $options: "i" },
    });
  }

  if (categories.length > 0) {
    matchQuery.$and.push({
      category: { $in: categories },
    });
  }

  const books = await BookModel.aggregate([
    { $match: matchQuery },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $project: {
        stock: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
  ]);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    books,
    allCategories,
    allAuthors,
  };
};

const getSingleBook = async (bookId) => {
  bookId = new objectId(bookId);

  let data = await BookModel.aggregate([
    {
      $match: { _id: bookId },
    },

    {
      $project: {
        stock: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
  ]);

  if (!data || data.length === 0) {
    throw new Error("book not found");
  }

  return data;
};

const postBook = async (user, req) => {
  const postData = req.body;

  if (!postData) throw new Error("Don't blank anything");

  const data = await BookModel.create(postData);

  if (data) return 1;
};

const deleteBook = async (bookId) => {
  bookId = new objectId(bookId);

  let data = await BookModel.findOneAndDelete({
    _id: bookId,
  });

  if (data) return 1;
};

const updateBook = async (bookId, updateData, user) => {
  bookId = new objectId(bookId);

  let data = await BookModel.findOneAndUpdate(
    { _id: bookId, author: user[0]?._id },
    { $set: updateData },
    { new: true, runValidators: true },
  );

  if (data) return 1;
};

export {
  deleteBook,
  getAllBooks,
  getFeaturedBooks,
  getSingleBook,
  postBook,
  updateBook,
};
