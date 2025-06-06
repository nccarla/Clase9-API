import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    Req,
    UseGuards,
    ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('register')
    register(@Body() body: any) {
        return this.userService.create({
            email: body.email,
            password: body.password,
            name: body.name,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string, @Req() req: Request) {
        const user = req.user as any;
        if (user.userId !== Number(id)) {
            throw new ForbiddenException('No puedes eliminar otro usuario');
        }
        await this.userService.deleteById(Number(id));
        return { message: 'Usuario eliminado correctamente' };
    }
}