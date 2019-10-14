const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(bookService, nav) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = db.collection('books');
        const books = await col.find().toArray();

        res.render('booksListView', {
          nav,
          title: 'Library',
          books
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        debug('Connected correctly to server');

        const db = await client.db(dbName);

        const col = await db.collection('books');
        const book = await col.findOne({ _id: new ObjectID(id) });
        debug(book);

        book.details = await bookService.getBookById(book.bookId);
        res.render('bookView', {
          nav,
          title: 'Library',
          book
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  function middleware(req, res, next) {
    // in local.strategy.js we pull the user out of the data base,
    // we can append any rule to user: if(req.user.admin)
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    getIndex,
    getById,
    middleware
  };
}

module.exports = bookController;
