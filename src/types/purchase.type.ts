import { ProductItemType } from './product.type';
import { SuccessResponse } from './utils.type';

export type PurchaseStatusType = -1 | 1 | 2 | 3 | 4 | 5;

export type PurcharseListStatusType = PurchaseStatusType | 0;

export interface PurchaseItemType {
  _id: string;
  buy_count: number;
  price: number;
  price_before_discount: number;
  status: PurchaseStatusType;
  user: string;
  product: ProductItemType;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ExtendedCartItem extends PurchaseItemType {
  disabled: boolean;
  checked: boolean;
}

export type PurchaseResponseType = SuccessResponse<PurchaseItemType[]>;

export type AddToCartResponseType = SuccessResponse<PurchaseItemType>;
