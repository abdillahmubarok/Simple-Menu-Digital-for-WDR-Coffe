import { NextResponse } from 'next/server';
import { z } from 'zod';

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

const requestSchema = z.object({
  token: z.string(),
  message: z.string(),
});

export async function POST(request: Request) {
  if (!RECAPTCHA_SECRET_KEY || !WHATSAPP_NUMBER) {
    return NextResponse.json(
      { message: 'Konfigurasi server tidak lengkap.' },
      { status: 500 }
    );
  }

  const body = await request.json();
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Permintaan tidak valid.' }, { status: 400 });
  }

  const { token, message } = parsed.data;

  try {
    const recaptchaResponse = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
        return NextResponse.json(
            { message: 'Verifikasi reCAPTCHA gagal.', details: recaptchaData['error-codes'] },
            { status: 400 }
        );
    }

    if (recaptchaData.score < 0.5) {
        return NextResponse.json(
            { message: 'Aktivitas Anda terdeteksi sebagai bot. Silakan coba lagi.' },
            { status: 403 }
        );
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    return NextResponse.json({ whatsappUrl });

  } catch (error) {
    console.error('Error in send-whatsapp API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan tidak diketahui';
    return NextResponse.json(
      { message: 'Gagal memverifikasi reCAPTCHA.', details: errorMessage },
      { status: 500 }
    );
  }
}
