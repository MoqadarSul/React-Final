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
          this.setState(() => ({
            results
        }))
      })
        event.preventDefault();
      }
     


    render() {
      console.log(this.state.results)
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
    <li>
                    <p>{book.title}</p>
    </li>
                  </div>
                );
              })}
              </ol>
            </div>
        )
    }
}
