import {
  EventStoreDBClient,
  FORWARDS,
  jsonEvent,
  JSONEventType,
  START,
} from '@eventstore/db-client';
import { JSONEventData } from '@eventstore/db-client/dist/types';

export class PurchaseOrderEventStore {
  client = EventStoreDBClient.connectionString(
    'esdb://localhost:2113?tls=false',
  );

  streamName = 'purchase_order';

  async publishEvent(event: JSONEventData) {
    const appendResult = await this.client.appendToStream(this.streamName, [
      event,
    ]);
  }

  async readEvents() {
    return await this.client.readStream(this.streamName, {
      fromRevision: START,
      direction: FORWARDS,
      maxCount: 10,
    });
  }
}
