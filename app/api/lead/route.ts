import { NextRequest, NextResponse } from 'next/server';
import { processAndSaveLead, LeadPayload } from '@/lib/leadService';

// In-memory rate limiting map: IP -> timestamp array
const rateLimitMap = new Map<string, number[]>();
const MAX_REQUESTS_PER_MINUTE = 6;
const WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_MINUTE) {
    return false;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please wait a minute or call us directly.' },
        { status: 429 }
      );
    }

    const body = (await req.json()) as LeadPayload;
    const userAgent = req.headers.get('user-agent') || '';

    const result = await processAndSaveLead(body, ip, userAgent);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Validation failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      leadId: result.leadId,
      message: 'Enquiry received successfully',
    });
  } catch (err: unknown) {
    console.error('[API Lead POST Exception]', err);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}

