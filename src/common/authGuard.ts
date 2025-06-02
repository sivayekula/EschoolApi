import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const excludedRoutes = ['/api/login', '/api/health']; // Add routes you want to exclude
    const devices = ['webApp', 'mobile'];
    const { url } = request;
    // Allow excluded routes without authentication
    if (excludedRoutes.some((route) => url.startsWith(route))) return true;

    const authHeader = request.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Missing Authorization header');
    if (!authHeader.startsWith('Bearer ')) throw new UnauthorizedException('Invalid Authorization header');
    if (!request.headers['x-device']) throw new UnauthorizedException('Missing device header');
    if (!devices.includes(request.headers['x-device'])) throw new UnauthorizedException('Invalid device header');
    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'brBsTtEcOywyQGSAynpcnA==',
      });
      request.user = decoded; // Attach decoded token to the request
      request.user['academicYear'] = request.headers['x-academic-year'] || request.user.academicYear;
      request.user['branch'] = request.headers['x-branch'] || request.user.branch;
      request.user['device'] = request.headers['x-device'];
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
