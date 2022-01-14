import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import BookView from "./BookView";

export default class SearchBar extends Component {
  state = {
    value: "",
    results: [],
  };

  updateQuery = (value) => {
    if (value.length > 0) {
      this.setState(
        {
          value: value,
          results: []
        })
      //try and see if we can also send this.state.value might not work because of the asyn state update
      //state value wont work
      this.searchBooks(value)
    }
    else {
      this.setState({
      value: '',
      results: []
    })
    }
  }


  searchBooks = (bookSearched) => {
    if (bookSearched.length > 0) {
      BooksAPI.search(bookSearched).then((results) => {
        const result1 = this.upDateSearchedShelfs(results);
          this.setState(() => ({
            results: result1,
          }));
      });
    }

  }

  upDateSearchedShelfs = (results) => {
    if (!results.error) {
      const myBooks = this.props.books;
      const addToState = results.filter((result) =>
        myBooks.find((b) => {
          if (b.id === result.id) {
            result.shelf = b.shelf;
            return result;
          }
        })
      );
      myBooks.concat(addToState)
      return results;
    }
  };

  render() {
   const upDateShelf = this.props.upDateShelf;
    // <BookView books = {this.state.results}/>   
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.value}
                onChange={(e) => this.updateQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            {this.state.results ? ( <BookView books={this.state.results}  upDateShelf ={upDateShelf}/>) : (<h1>No Results for {this.state.value}</h1>)}
          </div>
         

        </div>
      </div>
    );
  }
}
