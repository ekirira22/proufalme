import { NextResponse } from 'next/server';
import getSongsByUserId from '@/actions/getSongsByUserId';

export async function GET() {
  const songs = await getSongsByUserId();
  return NextResponse.json(songs);
}
