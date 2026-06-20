import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/admin/auth';

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (verifyPassword(password)) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/admin',
    });
    return response;
  }

  return NextResponse.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 });
}
