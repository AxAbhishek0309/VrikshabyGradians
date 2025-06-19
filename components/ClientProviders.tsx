"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { LanguageProvider } from "@/contexts/language-context";
import { Toaster } from "@/components/ui/toaster";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <CartProvider>
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
} 