/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import { describe, expect, it } from 'vitest';

import { isAxiosError, isEntityError } from '../utils';
import HttpStatusCode from 'src/constants/httpStatusCode';

// describe dùng để mô tả các ngữ cảnh hoặc 1 đơn vị cần test: Ví dụ function, component
describe('isAxiosError', () => {
  // it dùng để ghi chú trường hợp cần test
  it('isAxiosError trả về boolean', () => {
    // expect dùng để mong đợi giá trị trở về
    expect(isAxiosError(new Error())).toBe(false);
    expect(isAxiosError(new AxiosError())).toBe(true);
  });
});

describe('isEntityError', () => {
  it('isEntityError trả về boolean', () => {
    expect(
      isEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError
        } as any)
      )
    ).toBe(false);
    expect(
      isEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity
        } as any)
      )
    ).toBe(true);
  });
});
