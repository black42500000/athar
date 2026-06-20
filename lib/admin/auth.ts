import { cookies } from 'next/headers';

const ADMIN_PASSWORD = 'admin123';

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get('admin_auth')?.value === 'true';
}

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}
