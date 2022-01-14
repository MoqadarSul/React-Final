import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBar from './SearchBar'
import { Route } from 'react-router-dom'


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

  updateShelf = (book, shelfName) => {
    //find item in the list to update ui
      const currentBook = this.state.books.find((bookElement) => bookElement.id === book.id)

      if(currentBook){
        currentBook.shelf = shelfName;
         BooksAPI.update(book, shelfName)
         .then(this.setState(currentState => ({
        books: currentState.books
      })))
      }else{
        book.shelf = shelfName;
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
      <ListBooks books = {this.state.books} upDateShelf = {this.updateShelf}/>
      )} />

      <Route exact path='/search' render={() => (
          <SearchBar
          books={this.state.books}
          updateShelf={this.updateShelf}
          />
      )} />
    
       
    </div>
    )
  }
}

export default BooksApp
