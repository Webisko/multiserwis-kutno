import express from 'express';
import cors from 'cors';
import { config } from './config';
import healthRouter from './routes/health';
import authRouter from './routes/auth';
import employeesRouter from './routes/employees';
import coursesRouter from './routes/courses';
import modulesRouter from './routes/modules';
import lessonsRouter from './routes/lessons';
import enrollmentsRouter from './routes/enrollments';
import progressRouter from './routes/progress';
import certificatesRouter from './routes/certificates';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    name: 'MultiSerwis Backend API',
    version: '0.1.0',
    endpoints: {
      health: 'GET /health',
      auth: {
        login: 'POST /api/auth/login',
        register: 'POST /api/auth/register',
        me: 'GET /api/auth/me'
      },
      courses: {
        list: 'GET /api/courses',
        details: 'GET /api/courses/:slug',
        create: 'POST /api/courses (admin)',
        update: 'PUT /api/courses/:id (admin)',
        delete: 'DELETE /api/courses/:id (admin)'
      },
      modules: {
        list: 'GET /api/modules/course/:courseId',
        create: 'POST /api/modules (admin)',
        update: 'PUT /api/modules/:id (admin)',
        delete: 'DELETE /api/modules/:id (admin)'
      },
      lessons: {
        list: 'GET /api/lessons/module/:moduleId',
        get: 'GET /api/lessons/:id',
        create: 'POST /api/lessons (admin)',
        update: 'PUT /api/lessons/:id (admin)',
        delete: 'DELETE /api/lessons/:id (admin)'
      },
      enrollments: {
        list: 'GET /api/enrollments',
        enroll: 'POST /api/enrollments',
        update: 'PUT /api/enrollments/:id'
      },
      progress: {
        get: 'GET /api/progress/:enrollmentId',
        track: 'POST /api/progress'
      },
      certificates: {
        list: 'GET /api/certificates',
        generate: 'POST /api/certificates',
        verify: 'GET /api/certificates/:certNumber'
      },
      employees: {
        list: 'GET /api/employees',
        create: 'POST /api/employees',
        update: 'PUT /api/employees/:id',
        delete: 'DELETE /api/employees/:id'
      }
    }
  });
});

app.use('/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/modules', modulesRouter);
app.use('/api/lessons', lessonsRouter);
app.use('/api/enrollments', enrollmentsRouter);
app.use('/api/progress', progressRouter);
app.use('/api/certificates', certificatesRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(config.port, () => {
  console.log(`API running on port ${config.port}`);
});
