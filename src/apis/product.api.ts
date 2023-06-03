import {
    CategoryListResponse,
    ProductItemResponse,
    ProductListParamsType,
    ProductListReponse
} from 'src/types/product.type';
import http from 'src/utils/http';

const productApi = {
    getProductList(params?: ProductListParamsType) {
        return http.get<ProductListReponse>('/products', { params: params });
    },
    getCategoryList() {
        return http.get<CategoryListResponse>('/categories');
    },
    getProductItem(productId: string) {
        return http.get<ProductItemResponse>(`/products/${productId}`);
    }
};

export default productApi;
