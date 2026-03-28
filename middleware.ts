// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')

  // Logika pembelok: Jika yang dibuka adalah subdomain bebebai
  if (hostname === 'bebebai.kelfino.my.id') {
    return NextResponse.rewrite(new URL('/weather', request.url)) 
    // ^ sesuaikan '/weather' dengan nama folder folder page dashboard kamu
  }
}