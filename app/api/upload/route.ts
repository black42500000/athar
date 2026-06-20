import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'لم يتم رفع ملف' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = path.extname(file.name) || '.jpeg';
    const filename = `${Date.now()}${ext}`;
    const filepath = path.join(process.cwd(), 'public', filename);
    fs.writeFileSync(filepath, buffer);

    return NextResponse.json({ url: `/${filename}` });
  } catch {
    return NextResponse.json({ error: 'فشل رفع الملف' }, { status: 400 });
  }
}
