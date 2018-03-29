import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import AddBook from './AddBook'
import ListBooks from './ListBooks'

class BooksApp extends Component {

  state = {
    booksInShelves: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
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
  addToShelf(book, shelf){
    this.setState((prevState) => {
      booksInShelves: prevState.booksInShelves.push(book)
      if (shelf === "currentlyReading") {
        currentlyReading: prevState.currentlyReading.push(book)
      }
      else if (shelf === "wantToRead") {
        wantToRead: prevState.wantToRead.push(book)
      }
      else if (shelf === "read") {
        read: prevState.read.push(book)
      }
    })
  }

  // delete a book from all shelfes
  deleteFromShelfs(book){
    this.setState((prevState) => {
        currentlyReading: prevState.currentlyReading.filter((books) => books.id !== book.id)
        wantToRead: prevState.wantToRead.filter((books) => books.id !== book.id)
        read: prevState.read.filter((books) => books.id !== book.id)
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
    BooksAPI.update(book.id, "none")
      // then delete it from the shelfs
      .then(this.deleteFromShelfs(book))
      // then add it to the new shelf, if not "none" is chosen
      .then(() => {if (shelf !== "none") {
        // then update its shelf in the DB
        BooksAPI.update(book.id, shelf)
        .then(this.addToShelf(book, shelf))
        .catch(function(err){
          console.log(err) 
        })
      }})
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
          <Route path='/add' render={({ history }) => (
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
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ListBooks 
                        books={booksCurrentlyReading}
                        booksCurrentlyReading={booksCurrentlyReading}
                        booksWantToRead={booksWantToRead}
                        booksRead={booksRead}
                        change={this.change}
                      />
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ListBooks 
                        books={booksWantToRead}
                        booksCurrentlyReading={booksCurrentlyReading}
                        booksWantToRead={booksWantToRead}
                        booksRead={booksRead}
                        change={this.change}
                      />
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ListBooks 
                        books={booksRead}
                        booksCurrentlyReading={booksCurrentlyReading}
                        booksWantToRead={booksWantToRead}
                        booksRead={booksRead}
                        change={this.change}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link className='open-search' to='/add'>Add a book</Link>
              </div>
            </div>
          )}/>          
        </div>
    )
  }
}

export default BooksApp
