import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Serialize } from 'src/decorators/serialize.decorator';
import { TodoDto } from './dto/todo.dto';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
@Serialize(TodoDto)
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  async getAllTodos() {
    return await this.todoService.find();
  }

  @Get(':id')
  async getTodo(@Param('id', ParseIntPipe) id: number) {
    return await this.todoService.findOne({ id });
  }

  @Post()
  async createTodo(@Body() todo: CreateTodoDto) {
    return await this.todoService.create(todo);
  }

  @Patch(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() todo: CreateTodoDto,
  ) {
    return await this.todoService.update({ id }, todo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return await this.todoService.delete({ id });
  }
}
