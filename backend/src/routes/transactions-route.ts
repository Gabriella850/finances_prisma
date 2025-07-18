import { FastifyInstance } from 'fastify';
import { TransactionController } from '../controllers/transaction-controller';

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/transactions', TransactionController.list);
  app.post('/transactions', TransactionController.create);
  app.patch('/transactions/:id', TransactionController.update);
  app.delete('/transactions/:id', TransactionController.delete);
}
