'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import type { ReactNode } from 'react';

export function AppRecaptchaProvider({ children }: { children: ReactNode }) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaKey) {
    console.error("reCAPTCHA Site Key not found in environment variables. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY.");
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaKey}
      scriptProps={{ async: false, defer: false,appendTo: "head", nonce: undefined}}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
