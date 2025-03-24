import fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from 'dotenv';

config();

const server = fastify({
  logger: true
});

// Register plugins
server.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
});

// Health check route
server.get('/health', async () => {
  return { status: 'ok' };
});

// Start the server
const start = async () => {
  try {
    await server.listen({ 
      port: Number(process.env.PORT) || 4000,
      host: '0.0.0.0'
    });
    console.log('Server is running on port 4000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start(); 
