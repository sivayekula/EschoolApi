import { Body, Controller, HttpStatus, Post, Req, Res, SetMetadata } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "src/dto/login.dto";
import { AcademicYearService } from "src/services/academicYear.service";
import { AuthService } from "src/services/auth.service";
import { PermissionService } from "src/services/permission.service";
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
  @Post('')
  async login(@Body() loginObj: LoginDto, @Res() res) {
    try {
      const user = await this.authService.validateUser(loginObj.loginId, loginObj.password, loginObj.userType);
      let permissions = await this.permissionService.getPermission(user.role, user.tenant);
      const result = {
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