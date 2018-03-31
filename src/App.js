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

  // changes the shelf of a book -> gets called by a change in the books "drop-down" menu
  change = (event, book) => {
    let shelf = event.target.value
    
      BooksAPI.update(book, shelf)
      .then(() => {
        // if book is already on a shelf:
        if (book.shelf !== "none") {
          // remove it from the shelfs - in the state -> so it re-renders
          if (shelf === "none") {
            let booksInShelvesNew = this.state.booksInShelves.filter((books) => books.id !== book.id)
            this.setState({ booksInShelves: booksInShelvesNew })
          } 
          // change the shelf and update the state -> re-render
          else {
            let booksInShelvesNew = this.state.booksInShelves.filter((books) => books.id !== book.id)
            book.shelf = shelf
            booksInShelvesNew.push(book)
            this.setState({booksInShelves: booksInShelvesNew})
          }
        }
        // if book is not already on a shelf
        else {
          book.shelf = shelf
          this.addToShelf(book)
        }
      })
      .catch(function(err){
        console.log(err) 
      })
    
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
