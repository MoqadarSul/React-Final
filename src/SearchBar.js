import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import BookView from "./BookView";

export default class SearchBar extends Component {
  state = {
    value: "",
    results: [],
  };

  upDateSearch = (value) => {
    if (value.length > 0) {
      this.setState({
        value,
        results: [],
      });
      
      this.searchBooks(value);
    } else {
      this.setState({
        value: "",
        results: [],
      });
    }
  };

  searchBooks = (bookSearched) => {
    const myBooks = this.props.books;
    if (bookSearched.length > 0) {
      BooksAPI.search(bookSearched).then((results) => {
        if (!results.error) {
          results.forEach((book) => {
            myBooks.forEach((element) => {
              if (element.id === book.id) {
                book.shelf = element.shelf;
              }
            });
          });
          this.setState(() => ({
            results,
          }));
        }
      });
    }
  };

  render() {
    const upDateShelf = this.props.updateShelf;
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.value}
                onChange={(e) => this.upDateSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            {this.state.results ? (
              <BookView books={this.state.results} upDateShelf={upDateShelf} />
            ) : (
              <h1>No Results for {this.state.value}</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}
