import { rest } from 'msw';

import config from 'src/config';
import httpStatusCode from 'src/constants/httpStatusCode';

const productsResponse = {
  message: 'Lấy các sản phẩm thành công',
  data: {
    products: [
      {
        _id: '60afb2c76ef5b902180aacba',
        images: [
          'https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg',
          'https://api-ecom.duthanhduoc.com/images/6c4f6bde-6242-40fd-be52-d06033636e04.jpg',
          'https://api-ecom.duthanhduoc.com/images/1385ed69-6843-4edb-a1fb-e5fc795a99e5.jpg',
          'https://api-ecom.duthanhduoc.com/images/7f4f7a5b-b003-462a-a6b9-c0e69175def3.jpg',
          'https://api-ecom.duthanhduoc.com/images/1c323bdd-c0ef-4538-b09d-34c1a4478baa.jpg',
          'https://api-ecom.duthanhduoc.com/images/5054f46f-d317-40f6-a804-6b22dc92e946.jpg',
          'https://api-ecom.duthanhduoc.com/images/eed30991-df2d-41b5-afb2-697a06ba3299.jpg',
          'https://api-ecom.duthanhduoc.com/images/2922fee1-448c-4302-bcc2-804e0fe44f84.jpg',
          'https://api-ecom.duthanhduoc.com/images/84f7bf91-685c-4be9-bd8c-1f0a4e2e21c3.jpg'
        ],
        price: 3190000,
        rating: 4.6,
        price_before_discount: 3990000,
        quantity: 138,
        sold: 1200,
        view: 45968,
        name: 'Điện Thoại Vsmart Active 3 6GB/64GB - Hàng Chính Hãng',
        category: {
          _id: '60afafe76ef5b902180aacb5',
          name: 'Điện thoại',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg',
        createdAt: '2021-05-27T14:55:03.113Z',
        updatedAt: '2023-06-13T14:27:08.013Z'
      },
      {
        _id: '60afb2426ef5b902180aacb9',
        images: [
          'https://api-ecom.duthanhduoc.com/images/aa374023-7a5b-46ea-aca3-dad1b29fb015.jpg',
          'https://api-ecom.duthanhduoc.com/images/b997dac2-2674-4e20-b5ee-459566b077e7.jpg',
          'https://api-ecom.duthanhduoc.com/images/ac328d77-6014-4a2d-8626-924ac35876df.jpg',
          'https://api-ecom.duthanhduoc.com/images/5061fefa-bded-4fb0-80e5-3623656a4816.jpg',
          'https://api-ecom.duthanhduoc.com/images/02c08a86-4d9b-437b-ae02-f1d49cf2933b.jpg',
          'https://api-ecom.duthanhduoc.com/images/12c405e3-b24f-46ef-8969-54050e1022e9.jpg',
          'https://api-ecom.duthanhduoc.com/images/d448057c-3d3d-45d2-a9bc-e984bc80555f.jpg'
        ],
        price: 2590000,
        rating: 4.2,
        price_before_discount: 3490000,
        quantity: 73,
        sold: 6800,
        view: 20305,
        name: 'Điện thoại OPPO A12 (3GB/32GB) - Hàng chính hãng',
        category: {
          _id: '60afafe76ef5b902180aacb5',
          name: 'Điện thoại',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/aa374023-7a5b-46ea-aca3-dad1b29fb015.jpg',
        createdAt: '2021-05-27T14:52:50.392Z',
        updatedAt: '2023-06-13T10:12:26.514Z'
      }
    ],
    pagination: {
      page: 1,
      limit: 2,
      page_size: 23
    }
  }
};

const productDetailResponse = {
  message: 'Lấy sản phẩm thành công',
  data: {
    _id: '60afb07e6ef5b902180aacb6',
    images: [
      'https://api-ecom.duthanhduoc.com/images/4e9c8364-7604-4b61-8658-9f18655bae40.jpg',
      'https://api-ecom.duthanhduoc.com/images/794c2b24-922a-4cc2-8c24-87551af917df.jpg',
      'https://api-ecom.duthanhduoc.com/images/e5ae5753-c153-4a29-9254-48cde48f814f.jpg',
      'https://api-ecom.duthanhduoc.com/images/24ceb22a-d9a2-4936-a53d-1d8c508b5eeb.jpg',
      'https://api-ecom.duthanhduoc.com/images/db1900e0-245c-437f-9e7e-9a5f15045d0f.jpg',
      'https://api-ecom.duthanhduoc.com/images/d4be2e97-e131-4cc6-93ed-432593ba9245.jpg',
      'https://api-ecom.duthanhduoc.com/images/1866d116-06a0-4657-936e-256c8ed09bd0.jpg',
      'https://api-ecom.duthanhduoc.com/images/77c6c7ec-25dc-4d5e-b572-22e7916c1cb2.jpg',
      'https://api-ecom.duthanhduoc.com/images/6492ca72-6451-414c-8653-f31693ebe1e6.jpg'
    ],
    price: 1949000,
    rating: 5,
    price_before_discount: 1990000,
    quantity: 409,
    sold: 1000,
    view: 3665,
    name: 'Điện Thoại Xiaomi Redmi 9A 2GB/32GB - Hàng Chính Hãng',
    description:
      '<p>Điện Thoại Xiaomi Redmi 9A 2GB/32GB - H&agrave;ng Ch&iacute;nh H&atilde;ng<br />Bộ sản phẩm bao gồm: Th&acirc;n m&aacute;y, sạc, c&aacute;p USB, s&aacute;ch hướng dẫn.</p><p>Camera</p><p>- 13MP camera ch&iacute;nh</p><p>- Khẩu độ &fnof;/2.2, AF</p><p>- Đ&egrave;n flash đơn</p><p>- Chế độ k&iacute;nh vạn hoa</p><p>- 5MP camera trước</p><p>- Khẩu độ &fnof;/2.2</p><p>- Chế độ ch&acirc;n dung</p><p>&nbsp;</p><p>Thiết kế</p><p>- M&agrave;n h&igrave;nh giọt nước 6.53HD</p><p>- Độ ph&acirc;n giả 720x1600</p><p>- Tỉ lệ 20:9</p><p>- M&agrave;n h&igrave;nh độ s&aacute;ng 400nit</p><p>- Độ tương phản 1500:1</p><p>- M&agrave;n h&igrave;nh lọc &aacute;nh s&aacute;ng xanh chứng nhận TUV Rheinland</p><p>- Chế độ đọc s&aacute;ch</p><p>- Chế độ thao t&aacute;c to&agrave;n m&agrave;n h&igrave;nh</p><p>- K&iacute;ch thước: 164.9x77.07x9.0mm</p><p>- Trọng lượng: 194g</p><p>- M&agrave;u sắc: X&aacute;m Hoa Cương, Xanh Da Trời, Xanh Khổng Tước</p><p>&nbsp;</p><p>Hiệu năng</p><p>- MediaTek Helio G25</p><p>- Tiến tr&igrave;nh 12nm</p><p>- 8 nh&acirc;n tốc độ l&ecirc;n tới 2.0GHz</p><p>- Ram LPDDR4x - Bộ nhớ c&ocirc;ng nghệ eMMMC5.1</p><p>- 2GB ram + 32GB bộ nhớ</p><p>&nbsp;</p><p>Pin v&agrave; cổng sạc</p><p>Pin 5000mAh</p><p>- Hỗ trợ sạc nhanh 10W</p><p>- Sạc k&egrave;m trong hộp 10W</p><p>&nbsp;</p><p>Kết nối</p><p>- Cổng tai nghe 3.5mm</p><p>- Cổng mirco USB</p><p>- 4G k&eacute;p</p><p>- Băng tần :</p><p>- GSM: B2/3/5/8</p><p>- WCDMA: B1/2/4/5/8</p><p>- FDD-LTE: B1/2/3/4/5/7/8/20/28</p><p>- TDD-LTE: B38/40/41(2535-2655MHz)</p><p>- Hai sim hai s&oacute;ng + thẻ nhớ</p><p>- mở rộng l&ecirc;n đến 512GB</p><p>&nbsp;</p><p>Bảo mật</p><p>- Mở kh&oacute;a bằng khu&ocirc;n mặt</p><p>Điện Thoại Xiaomi Redmi 9A 2GB/32GB - H&agrave;ng Ch&iacute;nh H&atilde;ng</p><p>Cảm ơn qu&yacute; kh&aacute;ch đ&atilde; quan t&acirc;m đến sản phẩm b&ecirc;n shop, qu&yacute; kh&aacute;ch vui l&ograve;ng d&agrave;nh &iacute;t thời gian đọc kĩ ch&iacute;nh s&aacute;ch bảo h&agrave;nh đổi trả:<br />- Sản phẩm được bao test 7 ng&agrave;y kể từ ng&agrave;y nhận được sản phẩm v&agrave; sẽ được đổi m&aacute;y mới c&ugrave;ng model hoặc gi&aacute; trị tương đương sau khi được thẩm định lỗi kĩ thuật.<br />- Sản phẩm lỗi kĩ thuật được x&aacute;c nhận bởi trung t&acirc;m bảo h&agrave;nh ủy quyền ch&iacute;nh h&atilde;ng (bằng văn bản); kh&aacute;ch h&agrave;ng c&oacute; thể gửi lại shop để x&aacute;c nhận lỗi hoặc tới trạm bảo h&agrave;nh gần nhất để thẩm định lỗi.<br />- Sản phẩm đổi trả phải c&ograve;n nguy&ecirc;n hiện trạng m&aacute;y kh&ocirc;ng trầy xước, kh&ocirc;ng bể vỡ, v&ocirc; nước, g&atilde;y ch&acirc;n sim, khung thẻ nhớ&hellip; (tất cả c&aacute;c t&aacute;c động ngoại lực từ ph&iacute;a kh&aacute;ch h&agrave;ng đều TỪ CHỐI BẢO H&Agrave;NH)<br />- Sản phẩm đổi trả phải c&ograve;n nguy&ecirc;n hộp tr&ugrave;ng imei, phụ kiện k&egrave;m theo m&aacute;y kh&ocirc;ng trầy xước, ch&aacute;y nổ, đứt d&acirc;y (nếu trầy xước shop kh&ocirc;ng đổi phụ kiện mới)<br />- Sau 7 ng&agrave;y bao test, sản phẩm vẫn nhận ch&iacute;nh s&aacute;ch bảo h&agrave;nh 18 th&aacute;ng kể từ ng&agrave;y k&iacute;ch hoạt bảo h&agrave;nh (kh&aacute;ch chịu ph&iacute; vận chuyển tới shop bảo h&agrave;nh hộ hoặc tự đến trung t&acirc;m bảo h&agrave;nh gần nhất để được hỗ trợ)<br />- Trong một số trường hợp sản phẩm đ&atilde; được k&iacute;ch hoạt bảo h&agrave;nh điện tử để tham gia chương tr&igrave;nh khuyến m&atilde;i c&oacute; gi&aacute; tốt cho kh&aacute;ch h&agrave;ng. Vui l&ograve;ng chat với nh&acirc;n vi&ecirc;n tư vấn để được hỗ trợ th&ecirc;m th&ocirc;ng tin.<br />- Sản phẩm bị TỪ CHỐI BẢO H&Agrave;NH khi ch&aacute;y nổ, bể vỡ, t&aacute;c động ngoại lực v&agrave;o th&acirc;n v&agrave; b&ecirc;n trong m&aacute;y, c&oacute; thay đổi sửa chữa b&ecirc;n ngo&agrave;i.<br />- C&aacute;c sản phẩm bị kh&oacute;a t&agrave;i khoản như Gmail, Samsung account&hellip; Kh&aacute;ch tự chịu ph&iacute; mở kh&oacute;a nếu kh&ocirc;ng nhớ mật khẩu.<br />Điện Thoại Xiaomi Redmi 9A 2GB/32GB - H&agrave;ng Ch&iacute;nh H&atilde;ng<br />#điện_thoại #dienthoai #di_động #didong #điện_thoại_di_động #dien_thoai_di_dong #điện_thoại_ch&iacute;nh_h&atilde;ng #h&agrave;ng_ch&iacute;nh_h&atilde;ng #điện_thoại_gi&aacute;_rẻ #dien_thoai_gia_re #gi&aacute; rẻ #khuyen_mai #freeship #mobile #smartphone #điện_thoại_xiaomi #xiaomi #xiaomi_redmi_9a</p>',
    category: {
      _id: '60afafe76ef5b902180aacb5',
      name: 'Điện thoại',
      __v: 0
    },
    image: 'https://api-ecom.duthanhduoc.com/images/4e9c8364-7604-4b61-8658-9f18655bae40.jpg',
    createdAt: '2021-05-27T14:45:18.517Z',
    updatedAt: '2023-06-13T20:00:44.317Z'
  }
};

const productsRequest = rest.get(`${config.app.baseUrl}products`, (_, res, ctx) => {
  return res(ctx.status(httpStatusCode.Ok), ctx.json(productsResponse));
});

const productDetailRequest = rest.get(`${config.app.baseUrl}products/:id`, (_, res, ctx) => {
  return res(ctx.status(httpStatusCode.Ok), ctx.json(productDetailResponse));
});

const productRequests = [productsRequest, productDetailRequest];
export default productRequests;
