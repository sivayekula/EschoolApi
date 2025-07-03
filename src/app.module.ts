import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/authGuard';
import { TerminusModule } from '@nestjs/terminus';
import * as moment from 'moment';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuickActionsModule } from './quickActions/quickActions.module';
import { NotificationModule } from './notifications/notification.module';
import { UploadModule } from './upload/upload.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AcademicModule } from './academic/academic.module';
import { StudentModule } from './student/student.module';
import { BankAccountModule } from './bankAccounts/bankAccount.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AcademicYearModule } from './academicYears/academicYear.module';
import { CommonModule } from './common/common.module';
import { ExamModule } from './exams/exam.module';
import { FeeModule } from './fee/fee.module';
import { StaffModule } from './staff/staff.module';
import { TenantModule } from './tenant/tenant.module';
import { TransportModule } from './transport/transport.module';
import { UserModule } from './user/user.module';
import { FeeCategoryModule } from './feeCategory/feeCategory.module';
import { FeeSubCategoryModule } from './feeSubCategory/feeSubCategory.module';
import { FeeGroupModule } from './feeGroup/feeGroup.module';
import { StudentFeesModule } from './studentFees/studentFees.module';
import { ClassModule } from './class/class.module';
import { SectionModule } from './section/section.module';
import { SubjectModule } from './subject/subject.module';
import { LoanModule } from './loan/loan.module';
import { PermissionModule } from './permissions/permission.module';
import { GlobalPermissionsModule } from './globalPermissions/globalPermissions.module';
import { BoardModule } from './board/board.module';
import { BranchModule } from './branch/branch.module';
import { TemplateNamesModule } from './templateNames/templateNames.module';
import { TimetableModule } from './timeTable/timetable.module';
import { BreakTimeModule } from './breakTime/breakTime.module';
import { MarksModule } from './marks/marks.module';


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
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'brBsTtEcOywyQGSAynpcnA==',
      signOptions: { expiresIn: '1d' },
    }),
    TerminusModule,
    QuickActionsModule,
    NotificationModule,
    UploadModule,
    AcademicModule,
    TransactionsModule,
    StudentModule,
    BankAccountModule,
    AttendanceModule,
    AcademicYearModule,
    CommonModule,
    ExamModule,
    FeeModule,
    FeeCategoryModule,
    FeeSubCategoryModule,
    FeeGroupModule,
    StudentFeesModule,
    ClassModule,
    SectionModule,
    SubjectModule,
    LoanModule,
    StaffModule,
    StudentModule,
    TenantModule,
    TransportModule,
    UserModule,
    PermissionModule,
    GlobalPermissionsModule,
    BoardModule,
    BranchModule,
    TemplateNamesModule,
    TimetableModule,
    BreakTimeModule,
    MarksModule
  ],
  controllers: [],
  providers: [ 
    {
      provide: 'MomentWrapper',
      useValue: moment
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
