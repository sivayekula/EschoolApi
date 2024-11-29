import { Body, Controller, Post, Req, SetMetadata } from "@nestjs/common";
import { LoginDto } from "src/dto/login.dto";
import { AuthService } from "src/services/auth.service";
export const Public = () => SetMetadata('isPublic', true);

@Controller('login')
export class LoginController {
constructor(
  private readonly authService: AuthService
){}
  @Public()
  @Post('')
  async login(@Body() loginObj: LoginDto) {
    return await this.authService.validateUser(loginObj.email, loginObj.mobileNumber, loginObj.password, loginObj.userType);
  }
}