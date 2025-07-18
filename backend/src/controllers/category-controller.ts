// src/controllers/category-controller.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaCategoryRepository } from '../repositories/prisma/prisma-category-repository';
import { CreateCategoryService } from '../services/categories/create-category-service';
import { ListCategoryService } from '../services/categories/list-category-service';
import { UpdateCategoryService } from '../services/categories/update-category-service';
import { DeleteCategoryService } from '../services/categories/delete-category-service';

const categoryRepo = new PrismaCategoryRepository();

export async function listCategories(request: FastifyRequest, reply: FastifyReply) {
  const service = new ListCategoryService(categoryRepo);
  const categories = await service.execute();
  return reply.send(categories);
}

export async function createCategory(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as { name: string };
  const service = new CreateCategoryService(categoryRepo);
  const category = await service.execute(data);
  return reply.status(201).send(category);
}

export async function updateCategory(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const data = request.body as Partial<{ name: string }>;
  const service = new UpdateCategoryService(categoryRepo);
  const updated = await service.execute(id, data);

  if (!updated) {
    return reply.status(404).send({ error: 'Category not found' });
  }

  return reply.send(updated);
}

export async function deleteCategory(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const service = new DeleteCategoryService(categoryRepo);
  await service.execute(id);
  return reply.status(204).send();
}
