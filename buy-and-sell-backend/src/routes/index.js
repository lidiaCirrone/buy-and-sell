const { addViewToListingRoute } = require("./addViewToListing.js");
const { createNewListingRoute } = require("./createNewListing.js");
const { deleteListingRoute } = require("./deleteListing.js");
const { getAllListingsRoute } = require("./getAllListings.js");
const { getListingRoute } = require("./getListing.js");
const { getUserListingsRoute } = require("./getUserListings.js");
const { updateListingRoute } = require("./updateListing.js");

export default [
   addViewToListingRoute,
   createNewListingRoute,
   deleteListingRoute,
   getAllListingsRoute,
   getListingRoute,
   getUserListingsRoute,
   updateListingRoute
]