import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    private readonly users = [
        { id: 1, email: 'fernando@ejemplo.com', password: '1234', name: 'Fernando' },
    ];

    async validateUser(email: string, password: string): Promise<any> {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
        access_token: this.jwtService.sign(payload),
    };
}
}
