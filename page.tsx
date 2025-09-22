'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description?: string | null;
  lessons: { id: string; title: string }[];
}

export default function CoursesPage() {
  const { data, isLoading, error } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="p-4">يتم التحميل...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-600">حدث خطأ في تحميل الدورات</p>;
  }

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">الدورات المتاحة</h1>
      <ul className="space-y-2">
        {data?.map((course) => (
          <li key={course.id} className="border p-4 rounded-md bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="mb-2 text-sm text-gray-600">{course.description}</p>
            {course.lessons.length > 0 && (
              <Link
                href={`/lessons/${course.lessons[0].id}`}
                className="text-blue-600 underline"
              >
                بدء الدرس الأول
              </Link>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}