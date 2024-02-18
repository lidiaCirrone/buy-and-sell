const dotenv = require('dotenv');
dotenv.config();
const Hapi = require('@hapi/hapi');
const admin = require('firebase-admin');
const routes = require('./routes/index.js');
const { db } = require('./database.js');


admin.initializeApp({
   credential: admin.credential.cert({
      type: process.env.FIREBASE_type,
      project_id: process.env.FIREBASE_project_id,
      private_key_id: process.env.FIREBASE_private_key_id,
      private_key: process.env.FIREBASE_private_key,
      client_email: process.env.FIREBASE_client_email,
      client_id: process.env.FIREBASE_client_id,
      auth_uri: process.env.FIREBASE_auth_uri,
      token_uri: process.env.FIREBASE_token_uri,
      auth_provider_x509_cert_url: process.env.FIREBASE_auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.FIREBASE_client_x509_cert_url,
      universe_domain: process.env.FIREBASE_universe_domain,
   })
});

const server = Hapi.server({
   port: 3000,
   host: "0.0.0.0", // needed for Render deployment  
   routes: {
      cors: {
         origin: '*',
         
      }
   }
});

routes.forEach(route => server.route(route))

const start = async () => {

   await server.register([
      {
         plugin: require("@hapi/inert"),
         options: {}
      },
      {
         plugin: require("hapi-pino"),
         options: {
            logEvents: ["response", "onPostStart"]
         }
      }]);

   db.connect();
   await server.start();
   console.log(`server is listening on ${server.info.uri}`)
}

process.on('unhandledRejection', err => {
   console.log(err);
   process.exit(1);
})

process.on('SIGINT', async () => {
   console.log('Stopping server...');
   await server.stop({ timeout: 10000 })
   db.end();
   console.log('Server stopped');
   process.exit(0);
})

start();