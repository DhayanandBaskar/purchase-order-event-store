import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PurchaseOrderService } from './purchanseOrder/PurchaseOrderService';
import { PurchaseOrderEventStore } from './PurchaseOrderEventStore';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PurchaseOrderService, PurchaseOrderEventStore],
})
export class AppModule {}
