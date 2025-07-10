import { Controller, Get, HttpStatus, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import { BranchService } from "../branch/branch.service";
import { RoleService } from "../roles/role.service";
import { TenantService } from "../tenant/tenant.service";
import { UserService } from "../user/user.service";
import * as moment from 'moment';
import { AcademicYearService } from "../academicYears/academicYear.service";
import { PermissionService } from "../permissions/permission.service";
import { GlobalPermissionsService } from "../globalPermissions/globalPermissions.service";
import { StudentService } from "../student/student.service";
import { StaffService } from "../staff/staff.service";
import * as bcrypt from 'bcrypt';


@Controller('tenant')
export class TenantController {
  constructor(
    private readonly tenantService: TenantService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly branchService: BranchService,
    private readonly academicYearService: AcademicYearService,
    private readonly permissionService: PermissionService,
    private readonly globalPermissionsService: GlobalPermissionsService,
    private readonly studentService: StudentService,
    private readonly staffService: StaffService
  ) {}

  @Post()
  async createTenant(@Req() req, @Res() res) {
    let savedRecord, savedBranch;
    try {
      let tenantWithMobile = await this.tenantService.getTenantByLoginId(req.body.mobileNumber);
      let tenantWithEmail = await this.tenantService.getTenantByLoginId(req.body.email);
      if(!req.body.organizationCode) throw new Error('Organization code is required');
    if(!tenantWithEmail && !tenantWithMobile) {
      let obj = {email: req.body.email, mobileNumber: req.body.mobileNumber, createdBy: req.user._id, organizationCode: req.body.organizationCode}
      savedRecord = await this.tenantService.createTenant(obj);
      if(!savedRecord) throw new Error('Unable to create tenant')
      const role = await this.roleService.getRole('admin');
      let branchData = {
        name: req.body.name,
        logo: req.body.logo,
        address: req.body.address,
        contactPerson: req.body.contactPerson,
        organizationCode: req.body.organizationCode,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        tenant: savedRecord._id,
        isDefault: true,
        studentCount: req.body.studentCount,
        smsCount: req.body.smsCount,
        whatsappCount: req.body.whatsappCount,
        portalEnabledStudents: req.body.portalEnabledStudents,
        portalEnabledStaff: req.body.portalEnabledStaff,
        whatsappUserId: req.body.whatsappUserId,
        whatsappPassword: req.body.whatsappPassword,
        createdBy: req.user._id
      }
      savedBranch = await this.branchService.createBranch(branchData);
      let adminUser = {
        firstName: req.body.contactPerson, 
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        role: role._id,
        tenant: savedRecord._id,
        password: req.body.contactPerson.replace(/\s+/g, '').slice(0, 4).toLowerCase() +
        req.body.mobileNumber.substr(req.body.mobileNumber.length - 4),
        address: req.body.address,
        profilePic: req.body.logo
      }
      const user = await this.userService.createUser(adminUser);
      let year = moment().format('YYYY');
      await this.academicYearService.createAcademicYear({tenant: savedRecord._id, branch: savedBranch._id, createdBy: req.user._id, year: year+'-'+(Number(year)+1), startDate: moment().format(), endDate: moment().add(12, 'months').format(), status: 'upcoming'});
      await this.academicYearService.createAcademicYear({tenant: savedRecord._id, branch: savedBranch._id, createdBy: req.user._id, year: (Number(year)-1)+'-'+(Number(year)), startDate: moment().subtract(12, 'months').format(), endDate: moment().format(), status: 'active'});
      let data = await this.globalPermissionsService.getGlobalPermissions();
      await this.permissionService.createPermission({tenant: savedRecord._id,  role: role._id, permissions: data.permissions});
      res.status(200).json({status: 200, message: 'tenant details', data: user})
    } else {
      if(savedRecord) {
        await this.tenantService.deleteTenant(savedRecord._id);
      }
      if(savedBranch) {
        await this.branchService.deleteBranch(savedBranch._id);
      }
      throw new Error('Tenant already existed with this email/mobile')
    }
    } catch (error) {
      if(savedRecord) {
        await this.tenantService.deleteTenant(savedRecord._id);
      }
      if(savedBranch) {
        await this.branchService.deleteBranch(savedBranch._id);
      }
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('changePassword')
  async changePassword(@Req() req, @Res() res) {
    try {
      if(!req.user) throw new UnauthorizedException('Invalid credentials');
      if(req.user.role?.name === 'student') {
        let user = await this.studentService.getStudentDetails(req.user._id)
        if(!user) throw new UnauthorizedException('Invalid credentials'); 
        let isPasswordValid= await bcrypt.compare(req.body.currentPassword, user.password)
        if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
        await this.studentService.changePassword(req.user._id, req.body.newPassword);
      } else if(req.user.role?.name === 'staff') {
        let user = await this.staffService.getStaffById(req.user._id)
        if(!user) throw new UnauthorizedException('Invalid credentials'); 
        let isPasswordValid= await bcrypt.compare(req.body.currentPassword, user.password)
        if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
        await this.staffService.changePassword(req.user._id, req.body.newPassword);
      } else {
        let user = await this.userService.getUserById(req.user._id)
        if(!user) throw new UnauthorizedException('Invalid credentials'); 
        let isPasswordValid= await bcrypt.compare(req.body.currentPassword, user.password)
        if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
        await this.userService.changePassword(req.user._id, req.body.newPassword);
      }
      return res.status(HttpStatus.OK).json({ message: 'Password changed successfully' });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: error.message
      })
    }
  }

  @Get()
  async getTenants(@Res() res) {
    try {
      const tenants = await this.tenantService.getTenants();
      return res.status(HttpStatus.OK).json({ message: 'Tenants fetched successfully', data: tenants });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('/:id')
  async getTenant(@Req() req, @Res() res) {
    try {
      const tenant = await this.tenantService.getTenant(req.user.tenant);
      return res.status(HttpStatus.OK).json({ message: 'Tenant fetched successfully', data: tenant });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}