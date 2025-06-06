import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductoModule } from './producto/producto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto/producto.entity';
import { Comentario } from './comentario/comentario.entity'; // <-- AÑADIR ESTA LÍNEA

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '28marzo2005',
        database: 'apicurso',
        entities: [Producto, Comentario], 
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Producto, Comentario]), 
    AuthModule,
    ProductoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
