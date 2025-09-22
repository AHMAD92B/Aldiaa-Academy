# أكاديمية الضياء – منصة تعليمية تفاعلية (نسخة مختصرة)

هذه المنصة عبارة عن مثال مبسط لتطبيق تعلم تفاعلي مبني باستخدام **Next.js 14** للواجهة و **NestJS** مع **Prisma/PostgreSQL** للخلفية. يمكن للمستخدمين استعراض الدورات، مشاهدة الدروس بالفيديو، الإجابة عن اختبار قصير، وتتبع التقدم. تم تضمين دعم اللغة العربية وواجهة متجاوبة.

## التشغيل المحلي

1. **التثبيت**

   ```bash
   cd educational-platform
   npm install
   # يُنَفَّذ التثبيت لجميع الحزم الفرعية بفضل workspaces
   ```

2. **إعداد قاعدة البيانات**

   تأكد من توفر PostgreSQL محليًا وأنشئ قاعدة بيانات جديدة مطابقة للقيمة الموجودة في `DATABASE_URL` داخل `.env`. بعد ذلك قم بتوليد مخطط Prisma وتشغيل السكريبت التمهيدي:

   ```bash
   cp .env.example .env
   # عدل DATABASE_URL إذا لزم الأمر
   npx prisma migrate reset --schema=prisma/schema.prisma --skip-generate --skip-seed
   npx prisma db push --schema=prisma/schema.prisma
   npx ts-node prisma/seed.ts
   ```

3. **تشغيل التطبيق**

   ```bash
   npm run dev
   ```

   هذا الأمر يقوم بتشغيل الواجهة على `http://localhost:3000` والخلفية على `http://localhost:3001/api` بشكل متزامن.

## اختبارات E2E

تم إعداد Playwright لاختبار سيناريو بسيط لبدء الدرس وإكمال الاختبار. لتشغيل الاختبارات:

```bash
cd apps/web
npx playwright install
npx playwright test
```

## هيكل المجلدات

- `apps/web`: الواجهة باستخدام Next.js (App Router) مع TailwindCSS و React Query.
- `apps/api`: خادم NestJS يوفر مسارات REST `/api/courses` و`/api/attempts`.
- `prisma`: مخطط Prisma وملف التهيئة والبيانات الأولية.
- `.env.example`: متغيرات البيئة المطلوبة للتشغيل.

## ملاحظات

- هذا النموذج لا يتضمن نظام تسجيل دخول فعلي؛ يتم استخدام معرف مستخدم ثابت في الواجهة.
- لدعم لغات إضافية وإصدارات موسعة، يمكن إضافة مسارات وإدخال مكونات وفقًا للتفاصيل المذكورة في النسخة الموسعة.
