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
    const { 
      jobTitle, 
      salaryMin, 
      salaryMax, 
      requirements, 
      primaryColor, 
      secondaryColor, 
      companyName, 
      hasLogo, 
      currency, 
      shortDescription, 
      applyMethods = [], 
      applyValues = {},
      imageContentOptions = ["jobTitle", "companyName", "salary", "hiringBadge"]
    } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const currencySymbol = getCurrencySymbol(currency || "GHC");
    console.log("Generating job post for:", jobTitle, "with colors:", primaryColor, secondaryColor, "options:", imageContentOptions);

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
${formatApplyMethodsForPrompt(applyMethods, applyValues)}

Please provide:
1. A professional job description (150-200 words) including responsibilities, requirements, and a compelling call to action${applyMethods.length > 0 ? ` (include the application method(s) at the end)` : ''}
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

    // Build image prompt based on selected content options
    const primaryColorName = getColorName(primaryColor);
    const secondaryColorName = secondaryColor ? getColorName(secondaryColor) : null;
    
    const colorScheme = secondaryColor 
      ? `${primaryColorName} (${primaryColor}) as the primary color and ${secondaryColorName} (${secondaryColor}) as an accent/secondary color`
      : `${primaryColorName} (${primaryColor}) as the primary accent color`;

    // Build content elements based on user selection
    const contentElements: string[] = [];
    
    if (imageContentOptions.includes("hiringBadge")) {
      contentElements.push('- Have "WE\'RE HIRING!" as a headline at the top');
    }
    if (imageContentOptions.includes("jobTitle")) {
      contentElements.push(`- Feature the text "${jobTitle}" prominently in large bold letters`);
    }
    if (imageContentOptions.includes("companyName")) {
      contentElements.push(`- Include company name "${companyName}" prominently`);
    }
    if (imageContentOptions.includes("salary") && salaryMin && salaryMax) {
      contentElements.push(`- Include "${getImageCurrencySymbol(currency || "GHC")}${salaryMin.toLocaleString()} - ${getImageCurrencySymbol(currency || "GHC")}${salaryMax.toLocaleString()}" as salary range`);
    }
    if (imageContentOptions.includes("requirements") && requirements?.length > 0) {
      contentElements.push(`- Include key requirements: "${requirements[0]}", "${requirements[1]}", "${requirements[2]}"`);
    }
    if (imageContentOptions.includes("applyMethod") && applyMethods.length > 0) {
      const applyTexts = formatApplyMethodsForImage(applyMethods, applyValues);
      if (applyTexts) {
        contentElements.push(`- Include how to apply: "${applyTexts}"`);
      }
    }

    const imagePrompt = `Create a modern, professional job posting graphic for social media. 
    The design should be:
    - Clean and corporate with ${colorScheme}
    ${contentElements.join('\n    ')}
    - IMPORTANT: Include a subtle branded watermark "Powered by Kuajiri AI" with a sparkle/star icon in the bottom right corner, styled like a professional logo
    - Square format (1:1 ratio) suitable for Instagram and LinkedIn
    - Modern, minimalist style with geometric elements and clean typography
    - Professional business aesthetic
    - Use the brand colors for key elements like headers, borders, or accents${secondaryColor ? ` - use ${secondaryColorName} for accents and highlights` : ''}`;

    console.log("Generating image with prompt:", imagePrompt);
    
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

function formatApplyMethodsForPrompt(methods: string[], values: Record<string, string>): string {
  if (!methods || methods.length === 0) return '';
  
  const parts: string[] = [];
  if (methods.includes('email') && values.email) {
    parts.push(`Send CV to ${values.email}`);
  }
  if (methods.includes('url') && values.url) {
    parts.push(`Apply at ${values.url}`);
  }
  if (methods.includes('phone') && values.phone) {
    parts.push(`Call/WhatsApp ${values.phone}`);
  }
  
  if (parts.length === 0) return '';
  return `How to Apply: ${parts.join(' OR ')}`;
}

function formatApplyMethodsForImage(methods: string[], values: Record<string, string>): string {
  if (!methods || methods.length === 0) return '';
  
  const parts: string[] = [];
  if (methods.includes('email') && values.email) {
    parts.push(`Email: ${values.email}`);
  }
  if (methods.includes('url') && values.url) {
    parts.push(`Apply: ${values.url}`);
  }
  if (methods.includes('phone') && values.phone) {
    parts.push(`Call/WhatsApp: ${values.phone}`);
  }
  
  return parts.join(' | ');
}

function getImageCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    "GHC": "GHS ",
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "CFA": "CFA ",
    "AUD": "A$",
  };
  return symbols[currency] || "GHS ";
}
