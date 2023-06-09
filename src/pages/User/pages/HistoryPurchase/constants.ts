import { purchaseStatus } from 'src/constants/purchase';

export const navLinks = [
  {
    name: 'Tất cả',
    status: purchaseStatus.all
  },
  {
    name: 'Chờ xác nhận',
    status: purchaseStatus.waitForConfirmation
  },
  {
    name: 'Chờ lấy hàng',
    status: purchaseStatus.waitForGetting
  },
  {
    name: 'Đang giao',
    status: purchaseStatus.inProgress
  },
  {
    name: 'Hoàn thành',
    status: purchaseStatus.delivered
  },
  {
    name: 'Đã hủy',
    status: purchaseStatus.cancelled
  }
];
