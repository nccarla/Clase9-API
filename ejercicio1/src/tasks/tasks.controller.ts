
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { TasksService } from './tasks.service';

interface CreateTaskDto {
  title: string;
  description: string;
}

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(@Body() taskData: CreateTaskDto, @Req() req: Request) {
    const user = req.user as any;
    const task = await this.tasksService.createTask(
      taskData.title,
      taskData.description,
      user.userId,
    );
    return {
      mensaje: 'Tarea creada con éxito',
      tarea: task,
    };
  }
}
