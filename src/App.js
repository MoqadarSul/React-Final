import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBar from './SearchBar'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books: [],
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  changeShelf = (book, shelfName) => {
      const currentBook = this.state.books.filter((bookElement) => bookElement.id === book.id)
      book.shelf = shelfName;
      if(currentBook[0]){
        BooksAPI.update(book, shelfName)
         .then(this.setState(currentState => ({
        books: currentState.books
      })))
      }else{
        //adding the book to our list of books
        BooksAPI.update(book, shelfName)
        .then(this.setState(prevState => ({
          books: [...this.state.books, book]
        })))
      }
    }


  render() {

    return (
      <div className="app">
      <Route exact path='/' render={() => (
      <ListBooks books = {this.state.books} upDateShelf = {this.changeShelf}/>
      )} />

      <Route exact path='/search' render={() => (
          <SearchBar
          books={this.state.books}
          updateShelf={this.changeShelf}
          />
      )} />
      <Link to="/search" className="open-search">
        <button type="button">
         </button>
        </Link>
    </div>
    )
  }
}

export default BooksApp
