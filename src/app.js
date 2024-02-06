const express = require('express');
const searchProducts = require('./searchProducts');
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');

const app = express();
const port = 3000;

app.use(bodyParser.json()); 
app.use(xmlparser()); 

app.use((req, res, next) => {
    const logEntry = {
        type: 'messageIn',
        body: req.body,
        method: req.method,
        path: req.originalUrl,
        dateTime: new Date().toISOString()
    };
    console.log(JSON.stringify(logEntry));
    next();
});

app.use((req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
        const logEntry = {
            type: 'messageOut',
            body: body,
            dateTime: new Date().toISOString()
        };
        console.log(JSON.stringify(logEntry));
        originalSend.call(this, body);
    };
    next();
});

app.get('/products/search/:query', async (req, res) => {
    const query = req.params.query;
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 2;

    try {
        const products = await searchProducts(query, page, limit);
        const acceptHeader = req.headers['accept'];
        if (acceptHeader === 'application/xml') {
            res.type('application/xml').send(productsToXml(products));
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ code: 500, message: 'Internal Server Error' });
    }
});

const xmlbuilder = require('xmlbuilder');

function productsToXml(products) {
    const root = xmlbuilder.create('products');

    products.forEach(product => {
        const productElement = root.ele('product');
        productElement.ele('title', product.title);
        productElement.ele('description', product.description);
        productElement.ele('final_price', product.final_price.toFixed(2));
    });

    return root.end({ pretty: true });
}

if (!module.parent) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;
