import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  @Get()
  getAllTasks(@Request() req) {
    return {
      message: `Tareas para ${req.user.username}`,
      tasks: ['Tarea 1', 'Tarea 2'],
    };
  }

  @Post()
  createTask(@Body() body: { title: string }, @Request() req) {
    return {
      message: `Tarea creada por ${req.user.username}`,
      task: body,
    };
  }
}
