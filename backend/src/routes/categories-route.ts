// src/routes/categories-routes.ts
import { FastifyInstance } from 'fastify';
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category-controller';

export async function categoriesRoutes(app: FastifyInstance) {
  app.get('/categories', listCategories);
  app.post('/categories', createCategory);
  app.patch('/categories/:id', updateCategory);
  app.delete('/categories/:id', deleteCategory);
}
