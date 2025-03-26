import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { BranchService } from "../services/branch.service";
import { RoleService } from "../services/role.service";
import { TenantService } from "../services/tenant.service";
import { UserService } from "../services/user.service";
import * as moment from 'moment';
import { AcademicYearService } from "../services/academicYear.service";


@Controller('tenant')
export class TenantController {
  constructor(
    private readonly tenantService: TenantService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly branchService: BranchService,
    private readonly academicYearService: AcademicYearService
  ) {}

  @Post()
  async createTenant(@Req() req, @Res() res) {
    try {
      let tenantWithMobile = await this.tenantService.getTenantByLoginId(req.body.mobileNumber);
      let tenantWithEmail = await this.tenantService.getTenantByLoginId(req.body.email);
    if(!tenantWithEmail && !tenantWithMobile) {
      let obj = {email: req.body.email, mobileNumber: req.body.mobileNumber, createdBy: req.user._id}
      let savedRecord = await this.tenantService.createTenant(obj);
      if(!savedRecord) throw new Error('Unable to create tenant')
      const role = await this.roleService.getRole('admin');
      let branchData = {
        name: req.body.name,
        logo: req.body.logo,
        address: req.body.address,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        tenant: savedRecord._id,
        isDefault: true,
        studentCount: req.body.studentCount,
        smsCount: req.body.smsCount,
        whatsappCount: req.body.whatsappCount,
        portalEnabledStudents: req.body.portalEnabledStudents,
        portalEnabledStaff: req.body.portalEnabledStaff,
      }
      await this.branchService.createBranch(branchData);
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
      await this.academicYearService.createAcademicYear({tenant: savedRecord._id, year: year+'-'+(Number(year)+1), startDate: moment().format(), endDate: moment().add(12, 'months').format(), status: 'active'});
      res.status(200).json({status: 200, message: 'tenant details', data: user})
    } else {
      throw new Error('Tenant already existed with this email/mobile')
    }
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
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