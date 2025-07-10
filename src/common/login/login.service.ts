import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { StudentService } from '../../student/student.service';
import { StaffService } from '../../staff/staff.service';
import { BranchService } from '../../branch/branch.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly studentService: StudentService,
    private readonly staffService: StaffService,
    private readonly branchService: BranchService,
  ) {}

  async validateUser(loginId: string, userType: string, organizationCode?: string) {
    if (userType === 'student') {
      if(!organizationCode) throw new Error('Organization code is required'); // TODO: check for organizationCode
      let branch = await this.branchService.getBranchByCode(organizationCode);
      if(!branch) throw new Error('We are unable to process with your details. Please contact to admin')
      return await this.studentService.login(loginId, branch.tenant.toString() );
    } else if (userType === 'staff') {
      return await this.staffService.login(loginId)
    } else {
      return await this.userService.login(loginId);
    }
  }

  async getUserById(id: string, userType: string) {
    if (userType === 'student') {
      return await this.studentService.getStudentById(id);
    } else if (userType === 'staff') {
      return await this.staffService.getStaffById(id);
    } else {
      return await this.userService.getUserById(id);
    }
  }

  async changePassword(id: string, password: string, userType: string) {
    if (userType === 'student') {
      return await this.studentService.changePassword(id , password);
    } else if (userType === 'staff') {
      return await this.staffService.changePassword(id, password);
    } else {
      return await this.userService.changePassword(id, password);
    }
  }

  async updateDeviceId(id: string, deviceId: string, deviceType: string, userType: string) {
    if (userType === 'student') {
      return await this.studentService.updateStudent(id, { deviceId, deviceType });
    } else if (userType === 'staff') {
      return await this.staffService.updateStaff(id, { deviceId, deviceType });
    } else {
      return await this.userService.updateUser(id, { deviceId, deviceType });
    }
  }

  
} 