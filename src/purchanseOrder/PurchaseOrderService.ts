import { Injectable } from '@nestjs/common';
import { PurchaseOrderEventStore } from '../PurchaseOrderEventStore';
import { jsonEvent } from '@eventstore/db-client';
import {
  PurchaseOrderCreatedEvent,
  PurchaseOrderCreatedEventType,
} from '../events/PurchaseOrderCreatedEvent';
import { uuid } from 'uuidv4';
import { ConfirmationStatus } from '../models/PurchaseOrder';

export interface CreatePurchaseOrderDTO {
  supplier: string;
  buyer: string;
}

@Injectable()
export class PurchaseOrderService {
  constructor(
    private readonly purchaseOrderEventStore: PurchaseOrderEventStore,
  ) {}

  async create(dto: CreatePurchaseOrderDTO): Promise<void> {
    const event = jsonEvent<PurchaseOrderCreatedEvent>({
      type: PurchaseOrderCreatedEventType,
      data: {
        id: uuid(),
        supplier: dto.supplier,
        buyer: dto.buyer,
        confirmationStatus: ConfirmationStatus.PENDING,
      },
    });

    await this.purchaseOrderEventStore.publishEvent(event);
  }
}
