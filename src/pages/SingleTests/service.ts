import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function getSingleTests(params?: TableListParams) {
  return request('/api/singleTests/getSingleTests', {
    method: 'POST',
    data: {
      params,
    }
  });
}

export async function saveOrUpdateSingleTest(params?: any) {
  return request('/api/singleTests/saveOrUpdate', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
