import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type:"mysql",
    host:"34.176.113.242",
    port:3306,
    username:'darknet',
    password:"davian1011",
    database:"testtodo",
    entities:[__dirname + "/**/*.entity{.ts,.js}"],
    synchronize:true
  }), UsersModule,TasksModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
