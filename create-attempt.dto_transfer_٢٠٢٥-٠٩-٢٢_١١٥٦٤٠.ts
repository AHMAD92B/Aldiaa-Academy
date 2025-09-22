import { IsBoolean, IsInt, IsString, IsUUID, Min } from 'class-validator';

export class CreateAttemptDto {
  @IsUUID()
  userId!: string;

  @IsUUID()
  quizId!: string;

  @IsInt()
  @Min(0)
  selected!: number;
}