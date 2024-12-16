import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './schemas/student.schema';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { AuthService } from './services/auth.service';
import { UserSchema } from './schemas/user.schema';
import { LoginController } from './controllers/login.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/authGuard';
import { AcadamicSchema } from './schemas/acadamic.schema';
import { HealthController } from './controllers/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { Class, ClassSchema } from './schemas/class.schema';
import { GlobalController } from './controllers/global.controller';
import { GlobalService } from './services/global.service';
import { SubjectSchema } from './schemas/subjects.schema';
import { StaffSchema } from './schemas/staff.schema';
import { StaffController } from './controllers/staff.controller';
import { StaffService } from './services/staff.service';
import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';
import { FeeSchema } from './schemas/fee.schema';
import { FeeController } from './controllers/fee.controller';
import { FeeService } from './services/fee.service';
import { RoleService } from './services/role.service';
import { RoleSchema } from './schemas/role.schema';
import { AcadamicService } from './services/acadamic.service';
import { StudentFeesService } from './services/studentFees.service';
import { StudentFeesSchema } from './schemas/studentFees.schema';
import { ExamSchema } from './schemas/exam.schema';
import { ExamController } from './controllers/exam.controller';
import { ExamService } from './services/exam.service';
import { SubjectController } from './controllers/subject.controller';
import { SubjectService } from './services/subject.service';


@Module({
  imports: [ 
    MongooseModule.forRoot('mongodb+srv://sivayekula:LcdXKbcjQOfLdMmR@cluster0.dicgf6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      maxPoolSize: 50,
    }),
    MongooseModule.forFeature([
      {name: 'Student', schema: StudentSchema },
      {name: 'User', schema: UserSchema },
      {name: 'Acadamics', schema: AcadamicSchema },
      {name: 'Class', schema: ClassSchema },
      {name: 'Subject', schema: SubjectSchema },
      {name: 'Staff', schema: StaffSchema },
      {name: 'Fee', schema: FeeSchema },
      {name: 'Role', schema: RoleSchema },
      {name: 'StudentFees', schema: StudentFeesSchema },
      {name: 'Exams', schema: ExamSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
    TerminusModule
  ],
  controllers: [ 
    StudentController, 
    LoginController,
    HealthController,
    GlobalController,
    StaffController,
    UploadController,
    FeeController,
    ExamController,
    SubjectController
  ],
  providers: [ 
    StudentService, 
    GlobalService,
    StaffService,
    UploadService,
    FeeService,
    RoleService,
    AcadamicService,
    StudentFeesService,
    ExamService,
    SubjectService,
    AuthService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
