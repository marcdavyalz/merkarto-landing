import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Route segment config for Next.js App Router
export const maxDuration = 10;

export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const { 
      email, 
      language, 
      country, 
      ageRange, 
      investorType, 
      ticketSize, 
      investmentInterests, 
      motivation,
      referredBy 
    } = await req.json();
    
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Get current max position
    const { data: maxPositionData } = await supabaseAdmin
      .from('waitlist')
      .select('position')
      .order('position', { ascending: false })
      .limit(1);

    const nextPosition = maxPositionData?.[0]?.position ? maxPositionData[0].position + 1 : 101;

    // Insert into database
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert([
        {
          email,
          country,
          age_range: ageRange,
          investor_type: investorType,
          ticket_size: ticketSize,
          investment_interests: investmentInterests,
          motivation,
          referred_by: referredBy,
          position: nextPosition,
          language
        }
      ])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ error: "Email already registered" }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ 
      ok: true, 
      position: data.position,
      message: language === 'fr' 
        ? `Merci ! Vous êtes le numéro ${data.position} sur la liste d'attente.`
        : `Thank you! You are number ${data.position} on the waitlist.`
    });
  } catch (error) {
    console.error('Waitlist registration error:', error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

// Optional: GET endpoint to retrieve waitlist stats
export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const { count } = await supabaseAdmin
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({ 
      total_registrations: count || 0 
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: "Failed to get stats" }, { status: 500 });
  }
}


