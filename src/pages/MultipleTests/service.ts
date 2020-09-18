import request from '@/utils/request';
// eslint-disable-next-line import/no-unresolved
import { TableListParams } from './data.d';

export async function getMultipleTests(params?: TableListParams) {
  return request('/api/multipleTests/getMultipleTests', {
    method: 'POST',
    data: {
      params,
    }
  });
}

export async function saveOrUpdateMultipleTest(params?: any) {
  return request('/api/multipleTests/saveOrUpdate', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function deleteMultipleTest( ids: any) {
  return request('/api/multipleTests/deleteTests', {
    method: 'POST',
    data: {
      ids
    },
  });
}
