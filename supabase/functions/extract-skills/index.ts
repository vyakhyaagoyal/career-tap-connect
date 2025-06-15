
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// Make sure to add the GEMINI_API_KEY to your Supabase project's secrets
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in Supabase secrets.");
    }

    const { text } = await req.json();
    if (!text) {
      throw new Error("No text provided.");
    }

    const prompt = `
      Extract all technical skills, soft skills, and programming languages from the following text.
      Return the result as a single, flat JSON array of unique strings. For example: ["React", "JavaScript", "Leadership", "SQL"].
      Do not include any other text, comments, or explanations in your response. Only output the raw JSON array.
      Text: "${text}"
    `;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Gemini API request failed: ${res.status} ${errorBody}`);
    }

    const data = await res.json();
    const responseText = data.candidates[0].content.parts[0].text;
    
    // Clean the response to get only the JSON array
    const jsonStringMatch = responseText.match(/\[.*\]/s);
    if (!jsonStringMatch) {
      throw new Error("Could not find a JSON array in the Gemini response.");
    }
    const skills = JSON.parse(jsonStringMatch[0]);

    return new Response(JSON.stringify({ skills }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in extract-skills function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
