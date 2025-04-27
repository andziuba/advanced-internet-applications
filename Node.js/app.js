const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
    secret: 'online-bookstore-secret',
    resave: false,
    saveUninitialized: true
}));
app.set('view engine', 'ejs');

// Połączenie z bazą danych
const url = 'mongodb://localhost:27017';
const dbName = 'online_store';
let db, booksCollection;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName);
        booksCollection = db.collection('books');
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error(err));

// Inicjalizacja koszyka w sesji
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});

// Wyświetlanie strony głównej
app.get('/', async (req, res) => {
    try {
        const books = await booksCollection.find().toArray();
        res.render('index', { books, message: req.session.message });
        req.session.message = null;
    } catch (err) {
        res.status(500).send('Error fetching books');
    }
});

// Dodawanie książki do koszyka
app.post('/add-to-cart', async (req, res) => {
    const bookId = req.body.bookId;
    try {
        const isInCart = req.session.cart.some(item => item._id.toString() === bookId);

        if (isInCart) {
            req.session.message = 'Book is already in the cart.';
        } else {
            const book = await booksCollection.findOne({ _id: new ObjectId(bookId) });
            if (book) {
                req.session.cart.push(book);
                req.session.message = 'Book added to cart.';
            }
        }
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error adding book to cart');
    }
});

// Wyświetlanie koszyka
app.get('/cart', (req, res) => {
    res.render('cart', { cart: req.session.cart, message: req.session.message });
    req.session.message = null;
});

// Usuwanie ksiązki z koszyka
app.post('/remove-from-cart', (req, res) => {
    const bookId = req.body.bookId;
    req.session.cart = req.session.cart.filter(item => item._id.toString() !== bookId);
    req.session.message = 'Book removed from cart.';
    res.redirect('/cart');
});

// Złożenie zamówienia
app.post('/checkout', async (req, res) => {
    try {
        const cart = req.session.cart;
        const bookIds = cart.map(item => new ObjectId(item._id));
        const books = await booksCollection.find({ _id: { $in: bookIds } }).toArray();

        const isAvailable = books.every(book =>
            cart.find(item => item._id.toString() === book._id.toString())
        );

        if (!isAvailable) {
            req.session.message = 'One or more books are no longer available.';
            return res.redirect('/cart');
        }

        await booksCollection.deleteMany({ _id: { $in: bookIds } });

        req.session.cart = [];
        req.session.message = 'Purchase successful!';
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error during checkout');
    }
});

// Anulowanie zamówienia
app.post('/cancel', (req, res) => {
    req.session.cart = [];
    req.session.message = 'Purchase cancelled.';
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
