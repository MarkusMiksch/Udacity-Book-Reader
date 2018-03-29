# Book-Reader Project

This project is based on the starter template for the final assessment project for Udacity's React Fundamentals course.
The goal of this project was to get used to React and practice coding.  

On the main page you can see three shelfes - "Want To Read", "Currently Reading" and "Read". You can have as many books on one shelf as you want. Every book has a drop-down menu where you can change its shelf. 
By clicking on the grenn plus-button on the bottom of the page in the right corner, you get sent to a search-page. There you can search for books an add them to the shelf of your choise. 
By clicking on the back-arrow you can return to the shelfs-page.

## How to run the app

* fownload the zip file or clone the repo to your Desktop.
* install all project dependencies with `npm install`
* start the development server with `npm start`


## Backend Server

To simplify the development process, there was  a backend server provided to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods that where needed to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in the app.

Every book has the following keys:
{title, subtitle, authors, publisher, publishedDate, description, industryIdentifiers, readingModes, pageCount, printType, categories, averageRating, ratingsCount, maturityRating, allowAnonLogging, contentVersion, panelizationSummary, imageLinks, language, previewLink, infoLink, canonicalVolumeLink, id, shelf}

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. 

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that work with the backend.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
