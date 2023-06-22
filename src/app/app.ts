import cors from 'cors';
import express, { Application } from 'express';

import globalErrorHandler from './middlewares/globalerrorHandler';
import routes from './routes';

const app: Application = express();

app.use(cors());

//parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application route
// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

app.use('/api/v1/', routes);

// //testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger')
// })

//global error handling
app.use(globalErrorHandler);

export default app;
