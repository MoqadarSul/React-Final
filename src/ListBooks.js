import React, { Component } from 'react'
import { update } from './BooksAPI';
import { Link } from 'react-router-dom'
import BookView from './BookView';

export default class ListBooks extends Component {
    state = {
        shelves : [
          {
            category : 'currentlyReading',
            name : 'Currently Reading',
        },{
            category : 'read',
            name : 'I have Read',
        },
        {
          category : 'wantToRead',
          name : 'Want To Read',
      }]
    }
  
    render() {
     
     
      const upDateShelf = this.props.upDateShelf;
        return (
          <div>
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
            <div className="list-books-content">
              {this.state.shelves.map((shelf, index) => {
                const filteredCategories = this.props.books.filter(book => book.shelf === shelf.category);
                   
                return (
                  <div className="bookshelf" key={index}>
                    <h2 className="bookshelf-title">{shelf.name}</h2>
                    <div className="bookshelf-books">
                       <BookView books = {filteredCategories} upDateShelf = {upDateShelf}/>    
                    </div>
                  </div>
                );
              })}
            </div> 
            
            </div> 
           
            </div>
          );
          
    }
}
