import { AddToCartResponseType, PurcharseListStatusType, PurchaseResponseType } from 'src/types/purchase.type';
import http from 'src/utils/http';

const purchasesApi = {
    getPurchaseList(params: { status: PurcharseListStatusType }) {
        return http.get<PurchaseResponseType>('/purchases', { params });
    },
    addToCart(body: { product_id: string; buy_count: number }) {
        return http.post<AddToCartResponseType>('/purchases/add-to-cart', body);
    }
};

export default purchasesApi;
