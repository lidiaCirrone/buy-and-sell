const Boom = require('@hapi/boom');
const { db } = require('../database.js');

const getListingRoute = {
   method: 'GET',
   path: '/api/listings/{id}',
   handler: async (req, h) => {
      h.set('Access-Control-Allow-Origin', 'polyglotwannabe.com');
      const id = req.params.id;
      const { results } = await db.query(
         'SELECT * FROM listings WHERE id=?',
         [id]
      )
      const listing = results[0];
      if (!listing) throw Boom.notFound(`Listing does not exist with id ${id}`);
      return listing;
   }
}

module.exports = { getListingRoute };