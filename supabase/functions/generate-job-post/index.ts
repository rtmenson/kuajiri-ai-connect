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
    const { jobTitle, salaryMin, salaryMax, requirements, brandColor, companyName, hasLogo, currency, shortDescription, applyMethod, applyValue } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const currencySymbol = getCurrencySymbol(currency || "GHC");
    console.log("Generating job post for:", jobTitle, "with brand color:", brandColor, "currency:", currency);

    // Generate job description and social content
    const textResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a professional HR copywriter specializing in engaging job posts for the Ghanaian market. Generate content that is professional yet approachable, and culturally relevant to Ghana. The company name is "${companyName}".`
          },
          {
            role: "user",
            content: `Create a job post for the following position:

Company: ${companyName}
Job Title: ${jobTitle}
${salaryMin && salaryMax ? `Salary Range: ${currencySymbol}${salaryMin.toLocaleString()} - ${currencySymbol}${salaryMax.toLocaleString()}` : ''}
${shortDescription ? `Brief Description: ${shortDescription}` : ''}
Key Requirements:
1. ${requirements[0]}
2. ${requirements[1]}
3. ${requirements[2]}
${applyValue ? `How to Apply: ${applyMethod === 'email' ? `Send CV to ${applyValue}` : applyMethod === 'url' ? `Apply at ${applyValue}` : `Call/WhatsApp ${applyValue}`}` : ''}

Please provide:
1. A professional job description (150-200 words) including responsibilities, requirements, and a compelling call to action${applyValue ? ` (include the application method at the end)` : ''}
2. A witty one-liner for social media posts (max 100 characters, include relevant emoji)
3. A LinkedIn/Instagram caption (2-3 sentences with hashtags, mention the company name)

Format your response as JSON with keys: "description", "oneLiner", "socialCaption"`
          }
        ],
      }),
    });

    if (!textResponse.ok) {
      const errorText = await textResponse.text();
      console.error("AI gateway error:", textResponse.status, errorText);
      
      if (textResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (textResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("Failed to generate content");
    }

    const textData = await textResponse.json();
    const generatedText = textData.choices[0].message.content;
    console.log("Generated text:", generatedText);

    // Parse the JSON response
    let parsedContent;
    try {
      const jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/) || 
                        generatedText.match(/```\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : generatedText;
      parsedContent = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      parsedContent = {
        description: generatedText,
        oneLiner: salaryMin ? `🔥 We're hiring! ${jobTitle} | ${currencySymbol}${salaryMin.toLocaleString()}+ | Apply now!` : `🔥 We're hiring! ${jobTitle} | Apply now!`,
        socialCaption: `Exciting opportunity at ${companyName}! We're looking for a ${jobTitle}. #Hiring #GhanaJobs #Kuajiri`
      };
    }

    // Generate social media graphic with brand color
    const colorName = getColorName(brandColor);
    const salaryText = salaryMin && salaryMax ? `- Include "${currencySymbol}${salaryMin.toLocaleString()} - ${currencySymbol}${salaryMax.toLocaleString()}" as salary range` : '';
    const imagePrompt = `Create a modern, professional job posting graphic for social media. 
    The design should be:
    - Clean and corporate with ${colorName} (${brandColor}) as the primary accent color
    - Feature the text "${jobTitle}" prominently in large bold letters
    ${salaryText}
    - Have "WE'RE HIRING!" as a headline at the top
    - Include company name "${companyName}" prominently
    - IMPORTANT: Always include a subtle "Kuajiri AI" watermark text in the bottom right corner of the image
    - Square format (1:1 ratio) suitable for Instagram and LinkedIn
    - Modern, minimalist style with geometric elements and clean typography
    - Professional business aesthetic
    - Use the brand color ${brandColor} for key elements like headers, borders, or accents`;

    console.log("Generating image with brand color:", brandColor);
    
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

    let imageUrl = null;
    if (imageResponse.ok) {
      const imageData = await imageResponse.json();
      console.log("Image response received");
      if (imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url) {
        imageUrl = imageData.choices[0].message.images[0].image_url.url;
      }
    } else {
      console.error("Image generation failed:", await imageResponse.text());
    }

    return new Response(JSON.stringify({
      ...parsedContent,
      imageUrl,
      jobTitle,
      salaryMin,
      salaryMax,
      requirements
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
    console.error("Error in generate-job-post:", error);
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function getColorName(hex: string): string {
  const colors: Record<string, string> = {
    "#2563eb": "blue",
    "#7c3aed": "purple",
    "#16a34a": "green",
    "#dc2626": "red",
    "#ea580c": "orange",
    "#0d9488": "teal",
    "#db2777": "pink",
    "#4f46e5": "indigo",
  };
  return colors[hex.toLowerCase()] || "vibrant";
}

function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    "GHC": "GH₵",
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "CFA": "CFA ",
    "AUD": "A$",
  };
  return symbols[currency] || "GH₵";
}
