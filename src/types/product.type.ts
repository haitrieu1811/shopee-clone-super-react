import { SuccessResponse } from './utils.type';

export interface CategoryType {
  _id: string;
  name: string;
  __v?: number;
}

export interface PaginationType {
  page: number;
  limit: number;
  page_size: number;
}

export interface ProductItemType {
  _id: string;
  images: string[];
  price: number;
  rating: number;
  price_before_discount: number;
  quantity: number;
  sold: number;
  view: number;
  name: string;
  category: CategoryType;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type ProductListType = ProductItemType[];

export type ProductListReponse = SuccessResponse<{
  products: ProductListType;
  pagination: PaginationType;
}>;

export type CategoryListResponse = SuccessResponse<CategoryType[]>;

export interface ProductListParamsType {
  page?: number | string;
  limit?: number | string;
  order?: 'desc' | 'asc';
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price';
  category?: string;
  exclude?: string;
  rating_filter?: number | string;
  price_max?: number | string;
  price_min?: number | string;
  name?: string;
}

export type ProductItemResponse = SuccessResponse<ProductItemType>;
