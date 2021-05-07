import {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
  JSONEventType,
} from '@eventstore/db-client';
import { PurchaseOrder } from '../models/PurchaseOrder';

export declare type PurchaseOrderCreatedEventType = 'purchase-order-created';
export const PurchaseOrderCreatedEventType: PurchaseOrderCreatedEventType =
  'purchase-order-created';

export declare type PurchaseOrderConfirmedEventType = 'purchase-order-confirmed';
export const PurchaseOrderConfirmedEventType: PurchaseOrderConfirmedEventType =
  'purchase-order-confirmed';

export type PurchaseOrderEvent =
  | PurchaseOrderCreatedEvent
  | PurchaseOrderConfirmedEvent;

export type PurchaseOrderCreatedEvent = JSONEventType<
  PurchaseOrderCreatedEventType,
  PurchaseOrder
>;

export type PurchaseOrderConfirmedEvent = JSONEventType<
  PurchaseOrderConfirmedEventType,
  {
    id: string;
  }
>;
