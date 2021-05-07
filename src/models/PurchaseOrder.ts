export type PurchaseOrder = {
  id: string;
  supplier: string;
  buyer: string;
  confirmationStatus: ConfirmationStatus;
};

export enum ConfirmationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
}
