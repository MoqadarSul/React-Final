import React, { Component } from "react";
import BookView from "./BookView";

export default class ListBooks extends Component {
  
  render() {
    const categories = [
      { name: "currentlyReading", books: [] },
      { name: "read", books: [] },
      { name: "wantToRead", books: [] },
    ];
    categories.forEach((category) => {
      category.books = this.props.books.filter(
        (book) => book.shelf === category.name
      );
    });
    const upDateShelf = this.props.upDateShelf;
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books" />
              <BookView books={categories[0].books} upDateShelf={upDateShelf} />
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books" />
              <BookView books={categories[1].books} upDateShelf={upDateShelf} />
              <h2 className="bookshelf-title">Want To Read</h2>
              <div className="bookshelf-books" />
              <BookView books={categories[2].books} upDateShelf={upDateShelf} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
