import {
  EventStoreDBClient,
  FORWARDS,
  jsonEvent,
  JSONEventType,
  START,
} from '@eventstore/db-client';
import { JSONEventData } from '@eventstore/db-client/dist/types';
import { PurchaseOrderEvent } from './events/PurchaseOrderCreatedEvent';
import { AppendToStreamOptions } from '@eventstore/db-client/dist/streams';

export class PurchaseOrderEventStore {
  client = EventStoreDBClient.connectionString(
    'esdb://localhost:2113?tls=false',
  );

  async publishEvent(
    streamName: string,
    event: JSONEventData,
    options?: AppendToStreamOptions,
  ) {
    await this.client.appendToStream(streamName, [event], options);
  }

  async readEvents(streamName: string) {
    return await this.client.readStream<PurchaseOrderEvent>(streamName, {
      fromRevision: START,
      direction: FORWARDS,
      maxCount: 10,
    });
  }
}
