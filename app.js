const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

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
    res.render('books', {
      nav: [
        {
          link: '/books',
          title: 'Books'
        },
        {
          link: '/authors',
          title: 'Authors'
        }
      ],
      title: 'Library',
      books
    });
  });

bookRouter.route('/single')
  .get((req, res) => {
    res.send('Hello single books');
  });

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.render('index', {
    nav: [
      {
        link: '/books',
        title: 'Books'
      },
      {
        link: '/authors',
        title: 'Authors'
      }
    ],
    title: 'Library'
  });
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
