import React, { Component } from 'react';

class ListBooks extends Component {
  state = {
    booksInShelves: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  render() {
    let { books, booksCurrentlyReading, booksWantToRead, booksRead } = this.props
  
    this.props.books.map(book => {
      if (!book.shelf){
        book.shelf = "none"}
      this.props.booksCurrentlyReading.map((bookCurrentlyReading) => {
        if (book.id === bookCurrentlyReading.id) {
          book.shelf = "currentlyReading"
        }
      })
      this.props.booksWantToRead.map((bookWantToRead) => {
        if (book.id === bookWantToRead.id) {
          book.shelf = "wantToRead"
        }
      })
      this.props.booksRead.map((bookRead) => {
        if (book.id === bookRead.id) {
          book.shelf = "read"
        }
      })
    })

      // console.log(this.props.booksCurrentlyReading)
      // console.log(this.props.booksWantToRead)
      // console.log(this.props.booksRead)

    return ( 
      <ol className="books-grid">
        {books.map((book) => (
           <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  {book.imageLinks && book.imageLinks.thumbnail ? (
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: ` url(${book.imageLinks.thumbnail}) `}}></div>
                    ) : (
                      <div className="book-cover" style={{ width: 128, height: 193 }}></div>
                    )}                
                  <div className="book-shelf-changer">
                    <select defaultValue={book.shelf} onChange={(event) => this.props.change(event, book)}>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
        ))}
      </ol>
    )
  }
}

export default ListBooks
