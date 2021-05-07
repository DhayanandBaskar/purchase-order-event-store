import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreatePurchaseOrderDTO,
  PurchaseOrderService,
} from './purchanseOrder/PurchaseOrderService';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly purchaseOrderService: PurchaseOrderService,
  ) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/createPurchaseOrder')
  async publishPurchaseOrderCreatedEvent(
    @Body() createPurchaseOrderDTO: CreatePurchaseOrderDTO,
  ): Promise<void> {
    await this.purchaseOrderService.create(createPurchaseOrderDTO);
  }
}
