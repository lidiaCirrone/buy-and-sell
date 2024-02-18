import dotenv from 'dotenv';
dotenv.config();
import Hapi from '@hapi/hapi';
import * as admin from 'firebase-admin';
import routes from './routes';
import { db } from './database';


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

let server;

const start = async () => {
   server = Hapi.server({
      port: 8000,
      host: 'localhost'
   });

   routes.forEach(route => server.route(route))

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