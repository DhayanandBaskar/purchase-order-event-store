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

export type PurchaseOrderCreatedEvent = JSONEventType<
  PurchaseOrderCreatedEventType,
  PurchaseOrder
>;
