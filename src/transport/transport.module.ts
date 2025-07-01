import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StopSchema } from "./stops.schema";
import { RouteSchema } from "./route.schema";
import { RouteController } from "./route.controller";
import { StopsController } from "./stops.controller";
import { RouteService } from "./route.service";
import { StopsService } from "./stops.service";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Stop', schema: StopSchema },
      { name: 'Route', schema: RouteSchema }
    ])
  ],
  controllers: [ RouteController, StopsController ],
  providers: [ RouteService, StopsService ],
  exports: [ RouteService, StopsService ]
})

export class TransportModule {}