import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ingredients } = await req.json();
    
    if (!ingredients || typeof ingredients !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Please provide ingredients description' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a nutrition expert AI. Analyze the ingredients and their quantities to calculate accurate nutritional information. 
            Return ONLY a JSON object with this exact structure:
            {
              "calories": number,
              "protein": number,
              "carbs": number,
              "fats": number,
              "mealName": "short descriptive name"
            }
            Be precise with calculations based on standard nutritional values.`
          },
          {
            role: 'user',
            content: `Calculate nutrition for: ${ingredients}`
          }
        ],
        tools: [{
          type: "function",
          function: {
            name: "calculate_nutrition",
            description: "Calculate nutritional values from ingredients",
            parameters: {
              type: "object",
              properties: {
                calories: { type: "number", description: "Total calories" },
                protein: { type: "number", description: "Protein in grams" },
                carbs: { type: "number", description: "Carbohydrates in grams" },
                fats: { type: "number", description: "Fats in grams" },
                mealName: { type: "string", description: "Short meal name" }
              },
              required: ["calories", "protein", "carbs", "fats", "mealName"],
              additionalProperties: false
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "calculate_nutrition" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to calculate calories' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error('No nutrition data returned');
    }

    const nutrition = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify(nutrition),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in calculate-calories function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});