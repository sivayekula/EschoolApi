import { Body, Controller, HttpStatus, Post, Req, Res, SetMetadata } from "@nestjs/common";
import { LoginDto } from "src/dto/login.dto";
import { AcademicYearService } from "src/services/academicYear.service";
import { AuthService } from "src/services/auth.service";
export const Public = () => SetMetadata('isPublic', true);

@Controller('login')
export class LoginController {
constructor(
  private readonly authService: AuthService,
  private readonly academicYearService: AcademicYearService
){}
  @Public()
  @Post('')
  async login(@Body() loginObj: LoginDto, @Res() res) {
    try {
      const token = await this.authService.validateUser(loginObj.email, loginObj.mobileNumber, loginObj.password, loginObj.userType);
      const academicYear = await this.academicYearService.getAcademicYear();
      return res.status(HttpStatus.OK).json({ token, academicYear });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: error.message
      })
    }
  }
}