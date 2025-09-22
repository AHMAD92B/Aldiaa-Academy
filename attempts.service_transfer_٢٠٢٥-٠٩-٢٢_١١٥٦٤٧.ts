import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAttemptDto } from './dto/create-attempt.dto';

@Injectable()
export class AttemptsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAttemptDto) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id: data.quizId } });
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    const correct = data.selected === quiz.answer;
    const attempt = await this.prisma.attempt.create({
      data: {
        userId: data.userId,
        quizId: data.quizId,
        selected: data.selected,
        correct,
      },
    });
    return attempt;
  }
}