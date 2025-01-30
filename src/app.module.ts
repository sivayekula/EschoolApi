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
import { AcademicSchema } from './schemas/academic.schema';
import { HealthController } from './controllers/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ClassSchema } from './schemas/class.schema';
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
import { AcademicService } from './services/academic.service';
import { StudentFeesService } from './services/studentFees.service';
import { StudentFeesSchema } from './schemas/studentFees.schema';
import { ExamSchema } from './schemas/exam.schema';
import { ExamController } from './controllers/exam.controller';
import { ExamService } from './services/exam.service';
import { SubjectController } from './controllers/subject.controller';
import { SubjectService } from './services/subject.service';
import { TimeTableSchema } from './schemas/timetable.schema';
import { TimetableController } from './controllers/timetable.controller';
import { TimetableService } from './services/timetable.service';
import { AcademicController } from './controllers/adadamic.controller';
import { TenantSchema } from './schemas/tenant.schema';
import { TenantController } from './controllers/tenant.controller';
import { TenantService } from './services/tenant.service';
import { StudentFeesController } from './controllers/studentFees.controller';
import { AcademicYearSchema } from './schemas/academicYear.schema';
import { AcademicYearController } from './controllers/academicYear.controller';
import { AcademicYearService } from './services/academicYear.service';
import { SectionController } from './controllers/section.controller';
import { SectionSchema } from './schemas/section.schema';
import { SectionService } from './services/section.service';
import { ClassCategorySchema } from './schemas/classCategory.schema';
import { ClassCategoryController } from './controllers/classCategory.controller';
import { ClassCategoryService } from './services/classCategory.service';
import { FeeGroupSchema } from './schemas/feeGroup.schema';
import { FeeGroupController } from './controllers/feeGroup.controller';
import { FeeGroupService } from './services/feeGroup.service';
import { HolidaysSchema } from './schemas/holidays.schema';
import { HolidaysController } from './controllers/holidays.controller';
import { HolidaysService } from './services/holidays.service';
import { RoleController } from './controllers/role.controller';
import { PermissionsSchema } from './schemas/permissions.schema';
import { PermissionController } from './controllers/permission.controller';
import { PermissionService } from './services/permission.service';
import { AttendanceController } from './controllers/attendance.controller';
import { AttendanceService } from './services/attendance.service';
import { AttendanceSchema } from './schemas/attendance.schema';
import { MarksSchema } from './schemas/marks.schema';
import { MarksController } from './controllers/marks.controller';
import { MarksService } from './services/marks.service';
import { ClassController } from './controllers/class.controller';
import { ClassService } from './services/class.service';
import { TransactionSchema } from './schemas/transactions.schema';
import { TransactionsService } from './services/transactions.service';


@Module({
  imports: [ 
    MongooseModule.forRoot('mongodb+srv://sivayekula:LcdXKbcjQOfLdMmR@cluster0.dicgf6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      maxPoolSize: 50,
    }),
    MongooseModule.forFeature([
      {name: 'Student', schema: StudentSchema },
      {name: 'User', schema: UserSchema },
      {name: 'Academics', schema: AcademicSchema },
      {name: 'Class', schema: ClassSchema },
      {name: 'Subject', schema: SubjectSchema },
      {name: 'Staff', schema: StaffSchema },
      {name: 'Fee', schema: FeeSchema },
      {name: 'Role', schema: RoleSchema },
      {name: 'StudentFees', schema: StudentFeesSchema },
      {name: 'Exams', schema: ExamSchema },
      {name: 'Timetable', schema: TimeTableSchema },
      {name: 'Tenant', schema: TenantSchema },
      {name: 'AcademicYear', schema: AcademicYearSchema },
      {name: 'Section', schema: SectionSchema },
      {name: 'ClassCategory', schema: ClassCategorySchema },
      {name: 'FeeGroup', schema: FeeGroupSchema },
      {name: 'Holidays', schema: HolidaysSchema },
      {name: 'Permission', schema: PermissionsSchema },
      {name: 'Attendance', schema: AttendanceSchema },
      {name: 'Marks', schema: MarksSchema },
      {name: 'Transaction', schema: TransactionSchema }
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
    SubjectController,
    TimetableController,
    AcademicController,
    TenantController,
    StudentFeesController,
    AcademicYearController,
    ClassController,
    SectionController,
    ClassCategoryController,
    FeeGroupController,
    HolidaysController,
    RoleController,
    PermissionController,
    AttendanceController,
    MarksController
  ],
  providers: [ 
    StudentService, 
    GlobalService,
    StaffService,
    UploadService,
    FeeService,
    RoleService,
    AcademicService,
    StudentFeesService,
    ExamService,
    SubjectService,
    TimetableService,
    TenantService,
    AcademicYearService,
    ClassService,
    SectionService,
    ClassCategoryService,
    FeeGroupService,
    HolidaysService,
    PermissionService,
    AttendanceService,
    MarksService,
    TransactionsService,
    AuthService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
