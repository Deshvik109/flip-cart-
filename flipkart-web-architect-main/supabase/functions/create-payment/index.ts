
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1"
import Stripe from "https://esm.sh/stripe@14.21.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log("Processing payment request...");
    const { addressForm, cartItems, cartTotal } = await req.json()
    
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error("Invalid cart items");
    }
    
    // Initialize Stripe with the secret key
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    console.log("Creating Stripe checkout session...");
    // Create Stripe checkout session without requiring authentication
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map((item: any) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/orders?success=true`,
      cancel_url: `${req.headers.get('origin')}/checkout?canceled=true`,
    })

    console.log("Checkout session created:", session.id);

    // Try to get the user if authenticated
    let userId = null
    const authHeader = req.headers.get('Authorization')
    if (authHeader) {
      console.log("Authenticating user...");
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      )

      try {
        const { data } = await supabaseClient.auth.getUser(
          authHeader.replace('Bearer ', '')
        )
        if (data.user) {
          userId = data.user.id
          console.log("User authenticated:", userId);
        }
      } catch (error) {
        console.error("Auth error:", error)
        // Continue without user authentication
      }
    }

    // Create order in database if possible
    if (userId) {
      console.log("Creating order record...");
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      )

      await supabaseClient
        .from('orders')
        .insert({
          user_id: userId,
          full_name: addressForm.fullName,
          phone_number: addressForm.phoneNumber,
          street_address: addressForm.streetAddress,
          city: addressForm.city,
          state: addressForm.state,
          zip_code: addressForm.zipCode,
          total_amount: Math.round(cartTotal * 100),
          items: cartItems,
        })
    }

    console.log("Returning checkout session URL");
    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error("Error in create-payment function:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
