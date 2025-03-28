import { Body, Controller, HttpStatus, Post, Req, Res, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "../dto/login.dto";
import { AcademicYearService } from "../services/academicYear.service";
import { AuthService } from "../services/auth.service";
import { PermissionService } from "../services/permission.service";
import * as bcrypt from 'bcrypt';
import { BranchService } from '../services/branch.service';
export const Public = () => SetMetadata('isPublic', true);

@Controller('login')
export class LoginController {
constructor(
  private readonly authService: AuthService,
  private readonly academicYearService: AcademicYearService,
  private readonly jwtService: JwtService,
  private readonly permissionService: PermissionService,
  private readonly branchService: BranchService
){}
  @Public()
  @Post()
  async login(@Req() req, @Body() loginObj: LoginDto, @Res() res) {
    try {
      const user = await this.authService.validateUser(loginObj.loginId, loginObj.userType);
      if(!user) throw new UnauthorizedException('Invalid credentials'); 
      let isPasswordValid= await bcrypt.compare(loginObj.password, user.password)
      if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
      if(user.status !== 'active') throw new Error('We are unable to process with your details. Please contact to admin')
      if(loginObj.userType === 'student' && user.branch?.portalEnabledStudents === false) throw new Error('We are unable to process with your details. Please contact to admin')
      if(loginObj.userType === 'staff' && user.branch?.portalEnabledStaff === false) throw new Error('We are unable to process with your details. Please contact to admin')
      delete user.password
      let result= {}
      let permissions = user.role.name !== 'superadmin' ? await this.permissionService.getPermission( user.tenant, user.branch, user?.role?._id, user?.designation) : null;
      result = {
        ...user,
        permissions
      }
      let token = this.jwtService.sign(result);
      const branch = user.role.name !== 'superadmin' ? user.branch ? [await this.branchService.getBranch(user.branch)] : await this.branchService.findAll(user.tenant, true) : [];
      const academicYear = user.role.name !== 'superadmin' ? await this.academicYearService.getAcademicYear(user.tenant, branch[0]?._id) : null;
      return res.status(HttpStatus.OK).json({ token, academicYear, branch: branch[0] });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: error.message
      })
    }
  }
}