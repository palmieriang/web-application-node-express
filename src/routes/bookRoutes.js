const express = require('express');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

const sql = require('mssql');

function router(nav) {
  const books = [
    {
      title: 'The Lightning Thief',
      genre: '',
      author: 'Rick Riordan',
      read: false
    },
    {
      title: 'A Series of Unfortunate Events',
      genre: '',
      author: 'Lemony Snicket',
      read: false
    },
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    },
    {
      title: 'Les Misérables',
      genre: 'Historical Fiction',
      author: 'Victor Hugo',
      read: false
    },
    {
      title: 'The Time Machine',
      genre: 'Science Fiction',
      author: 'H. G. Wells',
      read: false
    },
    {
      title: 'A Journey into the Center of the Earth',
      genre: 'Science Fiction',
      author: 'Jules Verne',
      read: false
    },
    {
      title: 'The Dark World',
      genre: 'Fantasy',
      author: 'Henry Kuttner',
      read: false
    },
    {
      title: 'The Wind in the Willows',
      genre: 'Fantasy',
      author: 'Kenneth Grahame',
      read: false
    },
    {
      title: 'Life On The Mississippi',
      genre: 'History',
      author: 'Mark Twain',
      read: false
    },
    {
      title: 'Childhood',
      genre: 'Biography',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    }
  ];

  bookRouter.route('/')
    .get((req, res) => {
      const request = new sql.Request();
      request.query('select * from books')
        .then((result) => {
          console.log(result);
          res.render('booksListView', {
            nav,
            title: 'Library',
            books
          });
        })
        .catch((error) => error);
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;

      res.render('bookView ', {
        nav,
        title: 'Library',
        book: books[id]
      });
    });

  return bookRouter;
}

module.exports = router;
