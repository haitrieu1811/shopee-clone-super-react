import { AddToCartResponseType, PurcharseListStatusType, PurchaseResponseType } from 'src/types/purchase.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

const purchasesApi = {
  getPurchaseList(params: { status: PurcharseListStatusType }) {
    return http.get<PurchaseResponseType>('/purchases', { params });
  },
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<AddToCartResponseType>('/purchases/add-to-cart', body);
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<PurchaseResponseType>('/purchases/update-purchase', body);
  },
  deletePurchase(body: string[]) {
    return http.delete<SuccessResponse<{ deleted_count: number }>>('/purchases', { data: body });
  },
  buyPurchases(body: { product_id: string; buy_count: number }[]) {
    return http.post<PurchaseResponseType>('/purchases/buy-products', body);
  }
};

export default purchasesApi;
