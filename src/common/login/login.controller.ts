import { Body, Controller, HttpStatus, Post, Req, Res, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./login.dto";
import { AcademicYearService } from "../../academicYears/academicYear.service";
import { LoginService } from "./login.service";
import { PermissionService } from "../../permissions/permission.service";
import * as bcrypt from 'bcrypt';
import { BranchService } from '../../branch/branch.service';

@Controller('login')
export class LoginController {
constructor(
  private readonly authService: LoginService,
  private readonly academicYearService: AcademicYearService,
  private readonly jwtService: JwtService,
  private readonly permissionService: PermissionService,
  private readonly branchService: BranchService
){}

  @Post()
  async login(@Req() req, @Body() loginObj: LoginDto, @Res() res) {
    try {
      if(!req.headers['x-device']) throw new UnauthorizedException('Missing device header');
      const user = await this.authService.validateUser(loginObj.loginId, loginObj.userType, loginObj.organizationCode);
      if(!user) throw new UnauthorizedException('Invalid credentials');
      let isPasswordValid= await bcrypt.compare(loginObj.password, user.password)
      if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
      if(user.status !== 'active') throw new Error('We are unable to process with your details. Please contact to admin')
      if(loginObj.userType === 'student' && user.branch?.portalEnabledStudents === false) throw new Error('We are unable to process with your details. Please contact to admin')
      if(loginObj.userType === 'staff' && user.branch?.portalEnabledStaff === false) throw new Error('We are unable to process with your details. Please contact to admin')
      delete user.password
      let result= {}
      let permissions = user.role.name !== 'superadmin' ? await this.permissionService.getPermission( user.tenant, user.branch, user?.role?._id, user?.designation) : null;
      result = req.headers['x-device'] === 'webApp' ? {
        ...user,
        permissions
      } : {
        _id: user._id,
        firstName:user.firstName,
        lastName: user.lastName,
        tenant: user.tenant,
        branch: user.branch._id,
        role: user.role._id
      }
      if(req.body.deviceId && req.body.deviceType) { 
        if(user.deviceId !== req.body.deviceId) {
          await this.authService.updateDeviceId(user._id, req.body.deviceId, req.body.deviceType, loginObj.userType);
        }
      }
      let token = this.jwtService.sign(result);
      const branch = user.role.name !== 'superadmin' ? user.branch ? [await this.branchService.getBranch(user.branch)] : await this.branchService.findAll(user.tenant, true) : [];
      const academicYear = user.role.name !== 'superadmin' ? await this.academicYearService.getAcademicYear(user.tenant, branch[0]?._id.toString()) : null;
      const resp = req.headers['x-device'] === 'webApp' ? { token, academicYear, branch: branch[0] } : {token, academicYear:academicYear._id}
      return res.status(HttpStatus.OK).json(resp);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}