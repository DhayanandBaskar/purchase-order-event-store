import { Injectable } from '@nestjs/common';
import { PurchaseOrderEventStore } from '../PurchaseOrderEventStore';
import { jsonEvent } from '@eventstore/db-client';
import {
  PurchaseOrderConfirmedEvent,
  PurchaseOrderConfirmedEventType,
  PurchaseOrderCreatedEvent,
  PurchaseOrderCreatedEventType,
} from '../events/PurchaseOrderCreatedEvent';
import { ConfirmationStatus, PurchaseOrder } from '../models/PurchaseOrder';

export interface CreatePurchaseOrderDTO {
  supplier: string;
  buyer: string;
}

@Injectable()
export class PurchaseOrderService {
  constructor(
    private readonly purchaseOrderEventStore: PurchaseOrderEventStore,
  ) {}

  async create(dto: CreatePurchaseOrderDTO, userId: string): Promise<void> {
    const id = this.generateRandomIntegerId();
    const event = jsonEvent<PurchaseOrderCreatedEvent>({
      type: PurchaseOrderCreatedEventType,
      data: {
        id,
        supplier: dto.supplier,
        buyer: dto.buyer,
        confirmationStatus: ConfirmationStatus.PENDING,
      },
      metadata: {
        userId,
      },
    });

    await this.purchaseOrderEventStore.publishEvent(
      this.getStreamName(id),
      event,
      {
        expectedRevision: 'no_stream',
      },
    );
  }

  async confirm(id: string, userId: string): Promise<void> {
    const event = jsonEvent<PurchaseOrderConfirmedEvent>({
      type: PurchaseOrderConfirmedEventType,
      data: {
        id,
      },
      metadata: {
        userId,
      },
    });
    await this.purchaseOrderEventStore.publishEvent(
      this.getStreamName(id),
      event,
      {
        expectedRevision: 'stream_exists',
      },
    );
  }

  async get(id: string) {
    const events = await this.purchaseOrderEventStore.readEvents(
      this.getStreamName(id),
    );
    return events.reduce<Partial<PurchaseOrder>>((projection, { event }) => {
      switch (event?.type) {
        case PurchaseOrderCreatedEventType:
          const { id, supplier, buyer, confirmationStatus } = event.data;
          return {
            ...projection,
            id,
            supplier,
            buyer,
            confirmationStatus,
          };
        case PurchaseOrderConfirmedEventType:
          return {
            ...projection,
            confirmationStatus: ConfirmationStatus.CONFIRMED,
          };
        default:
          return projection;
      }
    }, {});
  }

  private generateRandomIntegerId() {
    const min = 2;
    const max = Number.MAX_SAFE_INTEGER;
    const numberId = Math.floor(Math.random() * (max - min + 1)) + min;
    return String(numberId);
  }

  private getStreamName(id: string) {
    return `PO-${id}`;
  }
}
