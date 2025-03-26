import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const excludedRoutes = ['/api/login', '/api/health']; // Add routes you want to exclude
    const { url } = request;
    // Allow excluded routes without authentication
    if (excludedRoutes.includes(url)) {
      return true;
    }

    const authHeader = request.headers['authorization'];
    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'your-secret-key',
      });
      request.user = decoded; // Attach decoded token to the request
      request.user['academicYear'] = request.headers['x-academic-year'];
      request.user['branch'] = request.headers['x-branch'];
      return true;
    } catch (err) {
      return false;
    }
  }
}
