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


@Module({
  imports: [ 
    MongooseModule.forRoot('mongodb+srv://sivayekula:LcdXKbcjQOfLdMmR@cluster0.dicgf6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      maxPoolSize: 50,
    }),
    MongooseModule.forFeature([
      {name: 'Student', schema: StudentSchema },
      {name: 'User', schema: UserSchema },
      {name: 'AcadamicSchema', schema: AcadamicSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ StudentController, LoginController ],
  providers: [ StudentService, AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule {}
