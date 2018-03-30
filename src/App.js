import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import AddBook from './AddBook'
import BookShelf from './BookShelf'
import ListBooks from './ListBooks'


class BooksApp extends Component {

  state = {
    booksInShelves: []
  }

  // get the books which are currently in shelfs - initial
  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => this.setState({booksInShelves: books}))
    .catch(function(err){
      console.log(err) 
    })
  }

  // add a book into a shelf by updating the state of BooksApp
  addToShelf(book){
    this.setState((prevState) => {
      booksInShelves: prevState.booksInShelves.push(book)
    })
  }

  // delete a book from all shelfes
  deleteFromShelfs(book){
    this.setState((prevState) => {
        booksInShelves: prevState.booksInShelves.filter((books) => books.id !== book.id)
    })
  }

  // changes the shelf of a book -> gets called by a change in the books
  // "drop-down" menu
  //
  // -> there is a small ERROR:
  //    for a short time there are 2 children with the same key in the "ol"-list
  //    this is because the page gets re-rendered 2 times (when book is deletet 
  //    and when book is added)
  //    this could be solved by rendering only 1 times, but the user-experience
  //    gets hurt, becuase then it takes the book a long time to switch its position
  change = (event, book) => {
    let shelf = event.target.value
    // first set shelf to "none"
    BooksAPI.update(book, shelf)
      // then delete it from the shelfs
      .then(this.deleteFromShelfs(book))
      // then add it to the new shelf, if not "none" is chosen
      .then(() => {
        if (shelf !== "none") {this.addToShelf(book)} 
      })
      .catch(function(err){
        console.log(err) 
      })
    book.shelf = shelf
  }

  render() {
    const books = this.state.booksInShelves
    const booksCurrentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
    const booksWantToRead = books.filter((book) => book.shelf === 'wantToRead')
    const booksRead = books.filter((book) => book.shelf === 'read')

    // console.log("------------")
    // console.log(booksCurrentlyReading.length)
    // console.log(booksWantToRead.length)
    // console.log(booksRead.length)
    // console.log("------------")

    return ( 
        <div className="app">
          {/* There are 2 pages, the root and the "search/add-page" */}
          {/* To show the real "shelf" of a book, "search/add-page" needs the shelfs as props */}
          {/* ListBooks needs the books it should list and the shelfs as props, also the change-function */}
          <Route path='/search' render={({ history }) => (
            <AddBook 
              booksCurrentlyReading={booksCurrentlyReading}
              booksWantToRead={booksWantToRead}
              booksRead={booksRead}
              change={this.change}
            />
          )}/>

          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf 
                    shelfTitle="Currently Reading"
                    books={booksCurrentlyReading}
                    booksCurrentlyReading={booksCurrentlyReading}
                    booksWantToRead={booksWantToRead}
                    booksRead={booksRead}
                    change={this.change}
                  />
                  <BookShelf 
                    shelfTitle="Want to Read"
                    books={booksWantToRead}
                    booksCurrentlyReading={booksCurrentlyReading}
                    booksWantToRead={booksWantToRead}
                    booksRead={booksRead}
                    change={this.change}
                  />
                  <BookShelf 
                    shelfTitle="Read"
                    books={booksRead}
                    booksCurrentlyReading={booksCurrentlyReading}
                    booksWantToRead={booksWantToRead}
                    booksRead={booksRead}
                    change={this.change}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link className='open-search' to='/search'>Add a book</Link>
              </div>
            </div>
          )}/>          
        </div>
    )
  }
}

export default BooksApp
