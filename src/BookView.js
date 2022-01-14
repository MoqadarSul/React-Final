import React, { Component } from "react";

export default class BookView extends Component {
  
  render() {
    return (
      <div>
        <ol className="books-grid">
          {this.props.books.map((book, index) => (
            <li key={book.id}>
              <div className="book">
                <div key={book.id}>
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{ width: 128, height: 193,
                        backgroundImage: (book.imageLinks) ? 
                        `url(${book.imageLinks.thumbnail})`
                        : `url(${'icons/no_image_available'})` }}>
                        </div>
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
