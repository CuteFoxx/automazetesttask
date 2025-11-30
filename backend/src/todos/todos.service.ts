import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Todo, Prisma } from '@prisma/client';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async find(where?: Prisma.TodoWhereInput): Promise<Todo[]> {
    return this.prisma.todo.findMany({ where });
  }

  async findOne(where: Prisma.TodoWhereUniqueInput): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where,
    });
  }

  async create(data: CreateTodoDto) {
    return this.prisma.todo.create({ data });
  }

  async update(where: Prisma.TodoWhereUniqueInput, data: CreateTodoDto) {
    const todo = await this.prisma.todo.findUnique({ where });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    Object.assign(todo, data);

    return this.prisma.todo.update({
      data: todo,
      where,
    });
  }

  async delete(where: Prisma.TodoWhereUniqueInput) {
    return this.prisma.todo.delete({ where });
  }
}
