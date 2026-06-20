import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const USE_DB = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

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

    if (USE_DB) {
      const { getSupabase } = await import('@/lib/supabase');
      const supabase = getSupabase();
      const { data, error } = await supabase.storage
        .from('products')
        .upload(filename, buffer, { contentType: file.type, upsert: true });
      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('products')
        .getPublicUrl(filename);

      return NextResponse.json({ url: urlData.publicUrl });
    }

    const filepath = path.join(process.cwd(), 'public', filename);
    fs.writeFileSync(filepath, buffer);
    return NextResponse.json({ url: `/${filename}` });
  } catch {
    return NextResponse.json({ error: 'فشل رفع الملف' }, { status: 400 });
  }
}
