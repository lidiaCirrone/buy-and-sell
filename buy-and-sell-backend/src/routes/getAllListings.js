const { db } = require('../database.js');

const getAllListingsRoute = {
   method: 'GET',
   path: '/api/listings',
   handler: async (req, h) => {
      const { results } = await db.query(
         'SELECT * FROM listings'
      );
      return results;
   }
}

module.exports = { getAllListingsRoute };