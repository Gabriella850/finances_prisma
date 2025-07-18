import { FastifyInstance } from 'fastify';
import { BankController } from '../controllers/bank-controller';

export async function banksRoutes(app: FastifyInstance) {
  const controller = new BankController();

  app.get('/banks', controller.list);
  app.post('/banks', controller.create);
  app.patch('/banks/:id', controller.update);
  app.delete('/banks/:id', controller.delete);
}
