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
import { AcademicController } from './controllers/academic.controller';
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
import { DesignationSchema } from './schemas/designation.schema';
import { DesignationController } from './controllers/designation.controller';
import { DesignationService } from './services/designation.service';
import { TransactionsController } from './controllers/transactions.controller';
import * as moment from 'moment';
import { BreakTimeSchema } from './schemas/breakTime.schema';
import { BreakTimeController } from './controllers/breakTime.controller';
import { BreakTimeService } from './services/breakTime.service';
import { StopSchema } from './schemas/stops.schema';
import { StopsController } from './controllers/stops.controller';
import { StopsService } from './services/stops.service';
import { RouteService } from './services/route.service';
import { RouteController } from './controllers/route.controller';
import { RouteSchema } from './schemas/route.schema';
import { BranchSchema } from './schemas/branch.schema';
import { BranchController } from './controllers/branch.controller';
import { BranchService } from './services/branch.service';
import { UserService } from './services/user.service';
import { SmsController } from './controllers/sms.controller';
import { SmsService } from './services/sms.service';
import { WhatsAppController } from './controllers/whatsApp.controller';
import { WhatsAppService } from './services/whatsApp.service';
import { FeeSubCategorySchema } from './schemas/feeSubCategory';
import { FeeCategorySchema } from './schemas/feeCategory.schema';
import { FeeSubCategoryController } from './controllers/feeSubCategory.controller';
import { FeeSubCategoryService } from './services/feeSubCategory.service';
import { FeeCategoryService } from './services/feeCategory.service';
import { FeeCategoryController } from './controllers/feeCategory.controller';
import { DashboardController } from './controllers/dashboard.controller';
import { SmsTemplateSchema } from './schemas/smsTemplate.schema';
import { SmsTemplateController } from './controllers/smsTemplate.controller';
import { SmsTemplateService } from './services/smsTemplate.service';
import { BankAccountsController } from './controllers/bankAccounts.controller';
import { BankAccountService } from './services/bankAccount.service';
import { BankAccountsSchema } from './schemas/bankAccounts.schema';
import { BoardSchema } from './schemas/board.schema';
import { BoardsController } from './controllers/boards.controller';
import { BoardService } from './services/board.service';
import { ContactUsController } from './controllers/contactUs.controller';
import { ContactUsService } from './services/contactUs.service';
import { TemplateNamesController } from './controllers/templateNames.controller';
import { TemplateNamesService } from './services/templateNames.service';
import { TemplateNamesSchema } from './schemas/templateNames.schema';
import { GlobalPermissionsSchema } from './schemas/globalPermissions.schema';
import { GlobalPermissionsService } from './services/globalPermissions.service';
import { LoanSchema } from './schemas/loan.schema';
import { LoanService } from './services/loan.service';
import { LoansController } from './controllers/loans.controller';
import { CounterSchema } from './schemas/counter.schema';
import { CounterService } from './services/counter.service';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true, // makes config available globally
      envFilePath: '.env', // optional if your .env is in root
    }),
    // Use forRootAsync to load env vars properly
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
        maxPoolSize: 50,
      }),
      inject: [ConfigService],
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
      {name: 'FeeGroup', schema: FeeGroupSchema },
      {name: 'Holidays', schema: HolidaysSchema },
      {name: 'Permission', schema: PermissionsSchema },
      {name: 'Attendance', schema: AttendanceSchema },
      {name: 'Marks', schema: MarksSchema },
      {name: 'Transaction', schema: TransactionSchema },
      {name: 'Designation', schema: DesignationSchema },
      {name: 'BreakTime', schema: BreakTimeSchema},
      {name: 'Route', schema: RouteSchema},
      {name: 'Stop', schema: StopSchema},
      {name: 'Branch', schema: BranchSchema},
      {name: 'FeeCategory', schema: FeeCategorySchema},
      {name: 'FeeSubCategory', schema: FeeSubCategorySchema},
      {name: 'SmsTemplate', schema: SmsTemplateSchema},
      {name: 'BankAccounts', schema: BankAccountsSchema},
      {name: 'Board', schema: BoardSchema},
      {name: 'TemplateNames', schema: TemplateNamesSchema},
      {name: 'GlobalPermissions', schema: GlobalPermissionsSchema},
      {name: 'Loans', schema: LoanSchema},
      {name: 'Counter', schema: CounterSchema}
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'brBsTtEcOywyQGSAynpcnA==',
      signOptions: { expiresIn: '24h' },
    }),
    TerminusModule,
  ],
  controllers: [ 
    StudentController, 
    LoginController,
    HealthController,
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
    FeeGroupController,
    HolidaysController,
    RoleController,
    PermissionController,
    AttendanceController,
    MarksController,
    TransactionsController,
    DesignationController,
    BreakTimeController,
    RouteController,
    StopsController,
    BranchController,
    SmsController,
    WhatsAppController,
    FeeCategoryController,
    FeeSubCategoryController,
    DashboardController,
    SmsTemplateController,
    BankAccountsController,
    BoardsController,
    ContactUsController,
    TemplateNamesController,
    LoansController
  ],
  providers: [ 
    StudentService,
    UserService,
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
    FeeGroupService,
    HolidaysService,
    PermissionService,
    AttendanceService,
    MarksService,
    TransactionsService,
    BreakTimeService,
    RouteService,
    StopsService,
    BranchService,
    GlobalPermissionsService,
    SmsService,
    WhatsAppService,
    FeeCategoryService,
    FeeSubCategoryService,
    SmsTemplateService,
    BankAccountService,
    BoardService,
    ContactUsService,
    TemplateNamesService,
    LoanService,
    CounterService,
    DesignationService,
    {
      provide: 'MomentWrapper',
      useValue: moment
    },
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
