import { FastifyRequest, FastifyReply } from 'fastify';
import { Bank } from '../entities/bank';
import { PrismaBankRepository } from '../repositories/prisma/prisma-bank-repository';
import { CreateBankService } from '../services/banks/create-bank-service';
import { ListBankService } from '../services/banks/list-bank-service';
import { UpdateBankService } from '../services/banks/update-bank-service';
import { DeleteBankService } from '../services/banks/delete-bank-service';

const bankRepo = new PrismaBankRepository();

export class BankController {
  async list(request: FastifyRequest, reply: FastifyReply) {
    const service = new ListBankService(bankRepo);
    const result = await service.execute();
    return reply.send(result);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as Omit<Bank, 'id'>;
    const service = new CreateBankService(bankRepo);
    const result = await service.execute(data);
    return reply.status(201).send(result);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const data = request.body as Partial<Omit<Bank, 'id'>>;
    const service = new UpdateBankService(bankRepo);
    const updated = await service.execute(id, data);
    if (!updated) return reply.status(404).send({ error: 'Bank not found' });
    return reply.send(updated);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const service = new DeleteBankService(bankRepo);
    await service.execute(id);
    return reply.status(204).send();
  }
}
