import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent() {
  let data = null
  const temp = JSON.parse(localStorage.getItem('antd-pro-authority') || '{}')
  if (localStorage.getItem('antd-pro-authority')) {
    data ={
      id: temp.data.user.id
    }
  }
  return request('/api/user/currentUser', {
    method: 'POST',
    data,
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
