import api from '@/lib/axios';

/* =========================
   TYPES
========================= */

export type AdminRole = 'ADMIN' | 'SUPER_ADMIN';

export interface AdminLoginRequest {
  identifier: string;
  password: string;
}

export interface AdminMeResponse {
  userId: string;
  role: AdminRole;
}

/* =========================
   AUTH APIs
========================= */

/* LOGIN */
export async function adminLogin(data: AdminLoginRequest) {
  const res = await api.post('/api/auth/admin/login', data);
  return res.data;
}

/* LOGOUT */
export async function adminLogout() {
  await api.post('/api/auth/admin/logout');
}

/* CURRENT ADMIN */
export async function fetchAdminMe(): Promise<AdminMeResponse> {
  const res = await api.get('/api/admin/me', {
    withCredentials: true, // IMPORTANT for HttpOnly cookie
  });

  const data = res.data;

  const roles: string[] = data.roles ?? [];

  let role: AdminRole;

  if (roles.includes('ROLE_SUPER_ADMIN')) {
    role = 'SUPER_ADMIN';
  } else if (roles.includes('ROLE_ADMIN')) {
    role = 'ADMIN';
  } else {
    throw new Error('Unauthorized admin role');
  }

  return {
    userId: data.userId,
    role,
  };
}
