import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

export default class SearchBar extends Component {
    state = {
        value : '',
        results : [],

    }
    handleChange = event => {
        this.setState({value : event.target.value});
      }
    
      handleSubmit = event => {
        BooksAPI.search(this.state.value)
        .then((results) => {
          const result1 = this.upDateSearchedShelfs(results);
          this.setState(() => ({
            results : result1,
        }))
      })
        event.preventDefault();
      }
      upDateSearchedShelfs = (results) =>{
        const myBooks = this.props.books
        const addToState = results.filter((result) => 
        myBooks.find(b => 
          {
          if(b.id === result.id) {
            result.shelf = b.shelf
            return result
          }
        }))
        console.log(addToState)
        myBooks.concat(addToState)
        console.log(results)
        return results
       }
      
    render() {
      
        return (
            <div>
            <h1>Search Bar Goes here</h1>
     <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
<ol>
      {this.state.results.map((book, index) => {
   return (
       <div key={index}>
          <li><p>{book.title}</p></li>
             <select value={book.shelf ? book.shelf : 'none'} onChange={(e) => this.props.upDateShelf(book, e.target.value)}>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
           </select>
         </div>
       );
    })}
 </ol>
            </div>
        )
    }
}
