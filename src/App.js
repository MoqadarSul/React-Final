import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBar from './SearchBar'

class BooksApp extends React.Component {
  state = {
    books: []
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
  
      BooksAPI.update(book, shelfName)
      .then(this.setState(currentState => ({
        books: currentState.books
      })))
    }


  render() {

    return (
      
      <div className="app">
       <ListBooks books = {this.state.books} upDateShelf = {this.updateShelf}/>
       <SearchBar />
      </div>
    )
  }
}

export default BooksApp
