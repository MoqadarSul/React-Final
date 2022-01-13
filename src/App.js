import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBar from './SearchBar'

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage : false
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
      
      <div className="app">{
        this.state.showSearchPage ? (
          <SearchBar upDateShelf = {this.updateShelf} books = {this.state.books}/>
        ): (
          <ListBooks books = {this.state.books} upDateShelf = {this.updateShelf}/>
        )
      }
        <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
       
      </div>
    )
  }
}

export default BooksApp
