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
    const { jobTitle, salaryMin, salaryMax, requirements } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating job post for:", jobTitle);

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
            content: `You are a professional HR copywriter specializing in engaging job posts for the Ghanaian market. Generate content that is professional yet approachable, and culturally relevant to Ghana.`
          },
          {
            role: "user",
            content: `Create a job post for the following position:

Job Title: ${jobTitle}
Salary Range: GH₵${salaryMin.toLocaleString()} - GH₵${salaryMax.toLocaleString()}
Key Requirements:
1. ${requirements[0]}
2. ${requirements[1]}
3. ${requirements[2]}

Please provide:
1. A professional job description (150-200 words) including responsibilities, requirements, and a compelling call to action
2. A witty one-liner for social media posts (max 100 characters, include relevant emoji)
3. A LinkedIn/Instagram caption (2-3 sentences with hashtags)

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
      // Extract JSON from markdown code blocks if present
      const jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/) || 
                        generatedText.match(/```\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : generatedText;
      parsedContent = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      parsedContent = {
        description: generatedText,
        oneLiner: `🔥 We're hiring! ${jobTitle} | GH₵${salaryMin.toLocaleString()}+ | Apply now!`,
        socialCaption: `Exciting opportunity! We're looking for a ${jobTitle}. #Hiring #GhanaJobs #Kuajiri`
      };
    }

    // Generate social media graphic
    const imagePrompt = `Create a modern, professional job posting graphic for social media. 
    The design should be:
    - Clean and corporate with a vibrant accent color (preferably green or blue)
    - Feature the text "${jobTitle}" prominently
    - Include "GH₵${salaryMin.toLocaleString()} - GH₵${salaryMax.toLocaleString()}" as salary
    - Have "WE'RE HIRING!" as a headline
    - Include a small watermark "Powered by Kuajiri AI" at the bottom
    - Square format (1:1 ratio) suitable for Instagram and LinkedIn
    - Modern, minimalist style with geometric elements
    - Professional business aesthetic suitable for Ghana's corporate environment`;

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

  } catch (error) {
    console.error("Error in generate-job-post:", error);
    return new Response(JSON.stringify({ error: error.message || "An error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
