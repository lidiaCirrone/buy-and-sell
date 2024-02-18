const admin = require('firebase-admin');
const { db } = require('../database.js');

const deleteListingRoute = {
   method: 'DELETE',
   path: '/api/listings/{id}',
   handler: async (req, h) => {
      const { id } = req.params;
      const token = req.headers.authtoken;
      const user = await admin.auth().verifyIdToken(token);
      const userId = user.user_id;
      await db.query(
         'DELETE FROM listings WHERE id=? AND user_id=?',
         [id, userId]
      );
      return { message: 'Success!' }
   }
}

module.exports = { deleteListingRoute };