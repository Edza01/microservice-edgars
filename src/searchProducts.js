const axios = require('axios');

async function searchProducts(query, page = 1, limit = 2) {
    try {
        const response = await axios.get('https://dummyjson.com/products/search', {
            params: {
                q: query,
                limit,
                skip: (page - 1) * limit
            }
        });

        const products = response.data.products.map(product => {
            const final_price = product.price * (1 - product.discountPercentage / 100);
            return {
                title: product.title,
                description: product.description,
                final_price: parseFloat(final_price.toFixed(2))
            };
        });

        return {
            products,
            total: response.data.total,
            skip: response.data.skip,
            limit: response.data.limit
        };
    } catch (error) {
        throw error.response.data;
    }
}

module.exports = searchProducts;
