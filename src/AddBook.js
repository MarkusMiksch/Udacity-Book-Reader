import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'


class AddBook extends Component {

  state = {
    foundBooks: []
  }

  // this function gets called when the search-query changes
  // it gets the books from the DB and saves them in the state,
  // which causes a re-render
  findBooks = (query) => BooksAPI.search(query)
    .then((books) => {
      if (books && books.length > 0) {
        console.log(books)
        this.setState({foundBooks: books}) 
      } else {
        this.setState({foundBooks: []}) 
      }})
    .catch(function(err){
      console.log(err) 
    })

  render() {
    
    let books = this.state.foundBooks

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" 
              placeholder="Search by title or author" 
              onChange={(event) => this.findBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks 
            books={books}
            booksCurrentlyReading={this.props.booksCurrentlyReading}
            booksWantToRead={this.props.booksWantToRead}
            booksRead={this.props.booksRead}
            change={this.props.change}
          />
        </div>
      </div>
    )
  }
}

export default AddBook
