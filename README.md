# Udacity Book-Reader Project

## Project Overview

This project is based on the starter template for the final assessment project for Udacity's React Fundamentals course.
The goal of this project was to get used to React and practice coding.  

On the main page you can see three shelfes - "Want To Read", "Currently Reading" and "Read". You can have as many books on one shelf as you want. Every book has a drop-down menu where you can change its shelf. 
By clicking on the grenn plus-button on the bottom of the page in the right corner, you get sent to a search-page. There you can search for books an add them to the shelf of your choise. 
By clicking on the back-arrow you can return to the shelfs-page.

## How to run the app

* download the zip file or clone the repo to your Desktop.
* install all project dependencies with `npm install`
* for routing you´ll need DOM bindings for react router - install it with `npm install --save react-router-dom`
* start the development server with `npm start`

## Backend Server

To make the changes persistent, a backend server is needed. This server saves all book objects. So one can refresh the page without losing all of his books in the shlefs.
The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods that where needed to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

Every book has the following keys:
`{title, subtitle, authors, publisher, publishedDate, description, industryIdentifiers, readingModes, pageCount, printType, categories, averageRating, ratingsCount, maturityRating, allowAnonLogging, contentVersion, panelizationSummary, imageLinks, language, previewLink, infoLink, canonicalVolumeLink, id, shelf}`

