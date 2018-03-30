import React, { Component } from 'react'
import ListBooks from './ListBooks'

class BookShelf extends Component {

  // this function returns a shelf and calls ListBooks in it to list
  // the given books in the shelf
  render() {
    let { shelfTitle, books, booksCurrentlyReading, booksWantToRead, booksRead, change } = this.props
  
    return ( 
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ListBooks 
            books={books}
            booksCurrentlyReading={booksCurrentlyReading}
            booksWantToRead={booksWantToRead}
            booksRead={booksRead}
            change={change}
          />
        </div>
      </div>
    )
  }
}

export default BookShelf
