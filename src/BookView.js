import React, { Component } from "react";

export default class BookView extends Component {
  render() {
    const upDateShelf = this.props.upDateShelf;
    return (
      <div>
        <ol className="books-grid">
          {this.props.books.map((book, index) => (
            <li>
              <div className="book">
                <div key={index}>
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 188,
                        backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf ? book.shelf : "none"}
                        onChange={(e) =>
                          this.props.upDateShelf(book, e.target.value)
                        }
                      >
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
