import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { AttemptsModule } from './attempts/attempts.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [CoursesModule, AttemptsModule],
  providers: [PrismaService],
})
export class AppModule {}