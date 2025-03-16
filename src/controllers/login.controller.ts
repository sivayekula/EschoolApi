import { Body, Controller, HttpStatus, Post, Req, Res, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "src/dto/login.dto";
import { AcademicYearService } from "src/services/academicYear.service";
import { AuthService } from "src/services/auth.service";
import { PermissionService } from "src/services/permission.service";
import * as bcrypt from 'bcrypt';
import { length } from "class-validator";
export const Public = () => SetMetadata('isPublic', true);

@Controller('login')
export class LoginController {
constructor(
  private readonly authService: AuthService,
  private readonly academicYearService: AcademicYearService,
  private readonly jwtService: JwtService,
  private readonly permissionService: PermissionService
){}
  @Public()
  @Post()
  async login(@Body() loginObj: LoginDto, @Res() res) {
    try {
      const user = await this.authService.validateUser(loginObj.loginId, loginObj.userType);
      if(!user) throw new UnauthorizedException('Invalid credentials'); 
      let isPasswordValid= await bcrypt.compare(loginObj.password, user.password)
      if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
      if(user.status !== 'active') throw new Error('We are unable to process with your details. Please contact to admin')
      if(loginObj.userType === 'student' && user.isPortalLoginEnabled === false) throw new Error('We are unable to process with your details. Please contact to admin')
      delete user.password
      let result= {}
      let permissions = await this.permissionService.getPermission(user.role._id, user.tenant);
      result = {
        ...user,
        permissions
      }
      let token = this.jwtService.sign(result);
      const academicYear = await this.academicYearService.getAcademicYear();
      return res.status(HttpStatus.OK).json({ token, academicYear });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: error.message
      })
    }
  }
}