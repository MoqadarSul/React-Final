import React, { Component } from 'react'


export default class BookView extends Component {


    render() {
    
        const upDateShelf = this.props.upDateShelf;
        return (
        <div>
            <ol>
            {this.props.books.map((book, index) => (
                <div key={index}>
                <li>{book.title}</li>
                <select value={book.shelf ? book.shelf : 'none'} onChange={(e) => this.props.upDateShelf(book, e.target.value)}>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
          </select>
            </div>
         ))}
         </ol>
     </div>
        )
    }
}
