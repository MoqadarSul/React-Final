import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

export default class SearchBar extends Component {
  state = {
    value: "",
    results: [],
  };

  handleSubmit = () => {
    if (this.state.value.length > 0) {
      BooksAPI.search(this.state.value).then((results) => {
        const result1 = this.upDateSearchedShelfs(results);
        this.setState(() => ({
          results: result1,
        }));
      });
    }
  };
  upDateSearchedShelfs = (results) => {
    const myBooks = this.props.books;
    const addToState = results.filter((result) =>
      myBooks.find((b) => {
        if (b.id === result.id) {
          result.shelf = b.shelf;
          return result;
        }
      })
    );
    return results;
  };

  render() {
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.value}
                onChange={(e) => this.setState({ value: e.target.value })}
              />
            </div>
          </div>

          {this.state.results.map((book, index) => {
            return (
              <ol className="books-grid">
                <div className="search-books-results">
                  <div key={index}>
                    <li>
                      <p>{book.title}</p>
                    </li>
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
              </ol>
            );
          })}
        </div>
      </div>
    );
  }
}
