import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreatePurchaseOrderDTO,
  PurchaseOrderService,
} from './purchanseOrder/PurchaseOrderService';
import { PurchaseOrder } from './models/PurchaseOrder';

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

  @Get('/purchaseOrders/:id')
  getPurchaseOrder(@Param('id') id: string): Promise<Partial<PurchaseOrder>> {
    return this.purchaseOrderService.get(id);
  }

  @Post('/createPurchaseOrder')
  async publishPurchaseOrderCreatedEvent(
    @Body() createPurchaseOrderDTO: CreatePurchaseOrderDTO,
  ): Promise<void> {
    await this.purchaseOrderService.create(createPurchaseOrderDTO, 'U1');
  }

  @Post('/confirmPurchaseOrder')
  async publishPurchaseOrderConfirmedEvent(@Body() { id }: { id: string }) {
    await this.purchaseOrderService.confirm(id, 'U1');
  }
}
