import {NextResponse} from 'next/server';

import {supabaseAdmin} from '@/lib/supabase';

const mockCollections = {
  guides: [{title: 'Double nationalité', premium: true}, {title: 'Visa', premium: true}],
  courses: [{title: 'Darija', premium: true}, {title: 'Amazigh', premium: true}],
  providers: [{name: 'Palais Atlas', city: 'Paris'}]
};

// Route utilitaire pour brancher rapidement Supabase sur des contenus mockés.
export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const collection = searchParams.get('collection') as keyof typeof mockCollections | null;

  if (!collection || !mockCollections[collection]) {
    return NextResponse.json({data: mockCollections});
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({data: mockCollections[collection], source: 'mock'});
  }

  const {data, error} = await supabaseAdmin.from(collection).select('*').limit(20);

  if (error) {
    return NextResponse.json({data: mockCollections[collection], source: 'mock', error: error.message});
  }

  return NextResponse.json({data, source: 'supabase'});
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    collection?: keyof typeof mockCollections;
    payload?: Record<string, unknown>;
  };

  if (!body.collection) {
    return NextResponse.json({message: 'collection requise'}, {status: 400});
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      {
        source: 'mock',
        inserted: {
          id: crypto.randomUUID(),
          ...body.payload
        }
      },
      {status: 201}
    );
  }

  const {data, error} = await supabaseAdmin
    .from(body.collection)
    .insert(body.payload ?? {})
    .select()
    .single();

  if (error) {
    return NextResponse.json({message: error.message}, {status: 400});
  }

  return NextResponse.json({source: 'supabase', inserted: data}, {status: 201});
}
