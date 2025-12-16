import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobTitle, location, experience, marketAverage, underpaidAmount, lowRange, highRange } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating salary graphic for:", jobTitle, location);

    const formatCurrency = (amount: number) => `GHS ${amount.toLocaleString()}`;
    
    const underpaidText = underpaidAmount 
      ? `- Prominently display "You might be underpaid by ${formatCurrency(underpaidAmount)}/month" in red/warning color`
      : "";

    const imagePrompt = `Create a modern, professional salary comparison infographic for social media sharing.
    
Design specifications:
- Square format (1:1 ratio) suitable for Instagram, LinkedIn, and Twitter
- Clean, bold typography with high contrast
- Modern gradient background (dark blue to purple or teal gradient)
- The design should look like a professional career/salary report card

Content to include:
- Header: "SALARY REALITY CHECK" in bold
- Job title: "${jobTitle}" prominently displayed
- Location badge: "${location}, Ghana"
- Experience level: "${experience}"
- Large salary range display showing:
  - Low: ${formatCurrency(lowRange)}
  - Market Average: ${formatCurrency(marketAverage)} (highlighted, larger)
  - High: ${formatCurrency(highRange)}
${underpaidText}
- A subtle "Check yours at kuajiri.com" call-to-action at the bottom
- Small watermark "Powered by Kuajiri AI" with sparkle icon in corner

Style:
- Use modern sans-serif fonts
- Include subtle geometric shapes or graph elements
- Professional but eye-catching
- High contrast for readability
- Colors: primarily deep blue/teal with gold/yellow accents for salary numbers`;

    console.log("Generating image...");
    
    const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: imagePrompt
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!imageResponse.ok) {
      const errorText = await imageResponse.text();
      console.error("Image generation failed:", imageResponse.status, errorText);
      
      if (imageResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("Failed to generate image");
    }

    const imageData = await imageResponse.json();
    console.log("Image response received");
    
    let imageUrl = null;
    if (imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url) {
      imageUrl = imageData.choices[0].message.images[0].image_url.url;
    }

    if (!imageUrl) {
      throw new Error("No image generated");
    }

    return new Response(JSON.stringify({ imageUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
    console.error("Error in generate-salary-graphic:", error);
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
