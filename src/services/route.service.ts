import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class RouteService {
  constructor(@InjectModel('Route') private routeModel){}

  async createRoute(route) {
    try {
      const newRoute = await this.routeModel.create(route);
      return newRoute;
    } catch (error) {
      throw error;
    }
  }

  async getRoutes(tenantId: string) {
    try {
      return await this.routeModel.find({tenant: tenantId, status: 'active'});
    } catch (error) {
      throw error;
    }
  }

  async getRoute(routeId: string) {
    try {
      return await this.routeModel.findById(routeId);
    } catch (error) {
      throw error;
    }
  }

  async updateRoute(routeId: string, route) {
    try {
      return await this.routeModel.findByIdAndUpdate(routeId, route);
    } catch (error) {
      throw error;
    }
  }

  async deleteRoute(routeId: string) {
    try {
      return await this.routeModel.findByIdAndUpdate(routeId, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }
}