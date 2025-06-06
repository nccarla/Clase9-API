import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async createTask(title: string, description: string, authorId: number) {
        const task = this.taskRepository.create({ title, description, authorId });
        return this.taskRepository.save(task);
    }
}