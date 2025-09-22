import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete existing data
  await prisma.attempt.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      hashedPassword: 'hashedpassword1',
      role: Role.STUDENT,
    },
  });
  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob',
      hashedPassword: 'hashedpassword2',
      role: Role.TEACHER,
    },
  });

  // Create course
  const course = await prisma.course.create({
    data: {
      title: 'Introduction to Programming',
      description: 'Learn basics of programming',
      teacherId: bob.id,
      lessons: {
        create: [
          {
            title: 'Lesson 1: Variables',
            content: 'This lesson covers variables.',
            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            quizzes: {
              create: [
                {
                  question: 'What is a variable?',
                  options: ['A fixed value', 'A storage location', 'A function', 'An error'],
                  answer: 1,
                },
              ],
            },
          },
          {
            title: 'Lesson 2: Functions',
            content: 'This lesson covers functions.',
            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            quizzes: {
              create: [
                {
                  question: 'What does a function do?',
                  options: [
                    'Stores data',
                    'Executes a block of code',
                    'Defines a constant',
                    'None of the above',
                  ],
                  answer: 1,
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      lessons: { include: { quizzes: true } },
    },
  });

  // Enroll Alice in the course
  await prisma.enrollment.create({
    data: {
      userId: alice.id,
      courseId: course.id,
    },
  });

  console.log('Database seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });