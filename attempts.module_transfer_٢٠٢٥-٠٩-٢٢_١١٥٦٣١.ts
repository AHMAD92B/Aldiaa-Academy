import { Module } from '@nestjs/common';
import { AttemptsController } from './attempts.controller';
import { AttemptsService } from './attempts.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AttemptsController],
  providers: [AttemptsService, PrismaService],
})
export class AttemptsModule {}