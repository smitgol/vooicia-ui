import { NextRequest, NextResponse } from 'next/server';

// Keep map at module level to retain across requests (in dev or short-lived edge runtime)
const requests = new Map<string, { count: number; timestamp: number }>();

export const rateLimit = (limit: number, interval: number) => {
  return (req: NextRequest) => {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();

    // Cleanup outdated entries
    for (const [key, value] of requests) {
      if (now - value.timestamp > interval) {
        requests.delete(key);
      }
    }

    const record = requests.get(ip);

    if (!record) {
      requests.set(ip, { count: 1, timestamp: now });
      return NextResponse.next();
    }

    if (now - record.timestamp > interval) {
      requests.set(ip, { count: 1, timestamp: now });
      return NextResponse.next();
    }

    if (record.count >= limit) {
      return new NextResponse(
        JSON.stringify({ message: 'Too many requests, please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    requests.set(ip, { ...record, count: record.count + 1 });
    return NextResponse.next();
  };
};
