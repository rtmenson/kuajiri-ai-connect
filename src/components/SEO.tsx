import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object | object[];
  noIndex?: boolean;
  alternateLanguages?: { lang: string; url: string }[];
}

export const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = 'https://kuajiriapp.com/lovable-uploads/ecae5e42-da12-4a99-ab6b-2cffb77b9585.png',
  ogType = 'website',
  structuredData,
  noIndex = false,
  alternateLanguages = [],
}: SEOProps) => {
  const baseUrl = 'https://kuajiriapp.com';
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : undefined;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Kuajiri AI" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {fullCanonicalUrl && <meta name="twitter:url" content={fullCanonicalUrl} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@KuajiriAI" />
      
      {/* Alternate Languages for International SEO */}
      {alternateLanguages.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={fullCanonicalUrl || baseUrl} />
      
      {/* Structured Data */}
      {structuredData && (
        Array.isArray(structuredData) ? (
          structuredData.map((data, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(data)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )
      )}
    </Helmet>
  );
};

// Salary Checker specific SEO configuration
export const getSalaryCheckerSEO = (userCountry?: string) => {
  const country = userCountry || 'your country';
  const countryFormatted = userCountry ? ` in ${userCountry}` : '';
  
  return {
    title: `Free Salary Checker 2025 - Check Your Market Value${countryFormatted} | Kuajiri AI`,
    description: `Discover your true market value with our free AI-powered salary checker. Get accurate 2025 salary data for 200+ job titles across 40+ countries. Compare salaries${countryFormatted}, get negotiation tips, and know your worth.`,
    keywords: `salary checker, salary calculator, salary comparison, how much should I earn, market salary${countryFormatted}, salary benchmark, salary guide 2025, salary negotiation, pay scale, compensation calculator, salary range, salary data, software engineer salary, developer salary, marketing salary, finance salary, remote work salary, tech salary, entry level salary, senior salary, salary by experience, salary by location, worldwide salary data`,
    canonicalUrl: '/salary-checker',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Kuajiri AI Salary Checker",
        "url": "https://kuajiriapp.com/salary-checker",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Free AI-powered salary checker with 2025 data for 200+ job titles across 40+ countries. Get personalized salary insights and negotiation tips.",
        "featureList": [
          "200+ job titles covered",
          "40+ countries supported",
          "2025 salary data",
          "Experience-based adjustments",
          "Regional cost of living adjustments",
          "Salary negotiation tips",
          "Shareable salary reports"
        ],
        "screenshot": "https://kuajiriapp.com/lovable-uploads/ecae5e42-da12-4a99-ab6b-2cffb77b9585.png"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How accurate is the salary data?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our salary data is sourced from industry benchmarks, job postings, and anonymous salary submissions. Data is updated for 2025 and adjusted for regional cost of living differences."
            }
          },
          {
            "@type": "Question",
            "name": "Which countries are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We support 40+ countries including the United States, United Kingdom, Germany, France, Canada, Australia, India, Nigeria, Ghana, Kenya, South Africa, UAE, Singapore, and many more."
            }
          },
          {
            "@type": "Question",
            "name": "Is the salary checker free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our salary checker is completely free. Get instant salary estimates, market comparisons, and negotiation tips without any cost."
            }
          },
          {
            "@type": "Question",
            "name": "How do experience levels affect salary?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We calculate salaries based on four experience levels: Entry (0-2 years), Mid (3-5 years), Senior (6-10 years), and Lead/Expert (10+ years). Each level has different salary multipliers."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://kuajiriapp.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Tools",
            "item": "https://kuajiriapp.com/#tools"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Salary Checker",
            "item": "https://kuajiriapp.com/salary-checker"
          }
        ]
      }
    ]
  };
};

// Job Post Generator specific SEO configuration
export const getJobPostGeneratorSEO = (userCountry?: string) => {
  const countryFormatted = userCountry ? ` in ${userCountry}` : '';
  
  return {
    title: `Free AI Job Post Generator - Create Professional Job Listings${countryFormatted} | Kuajiri AI`,
    description: `Generate professional job posts in seconds with our free AI-powered tool. Create compelling job descriptions, social media graphics, and recruitment content${countryFormatted}. Perfect for recruiters, HR teams, and hiring managers.`,
    keywords: `job post generator, AI job description, job listing creator, job ad generator, recruitment tool, hiring post generator, job description template, job posting tool, HR recruitment software, free job post maker, social media job post, LinkedIn job post, job advertisement creator, hiring manager tools, recruitment marketing, job vacancy template, professional job description, AI recruitment, job content generator${countryFormatted ? `, jobs ${userCountry}, hiring ${userCountry}` : ''}`,
    canonicalUrl: '/job-post-generator',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Kuajiri AI Job Post Generator",
        "url": "https://kuajiriapp.com/job-post-generator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Free AI-powered job post generator that creates professional job descriptions, social media graphics, and recruitment content in seconds.",
        "featureList": [
          "AI-generated job descriptions",
          "Social media graphics",
          "One-liner summaries",
          "Customizable branding",
          "Multi-currency support",
          "Instant download and sharing",
          "LinkedIn and Twitter optimized"
        ],
        "screenshot": "https://kuajiriapp.com/lovable-uploads/ecae5e42-da12-4a99-ab6b-2cffb77b9585.png"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the AI job post generator work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply enter your job title, salary range, and key requirements. Our AI analyzes the information and generates a complete job description, social media copy, and a professional graphic in seconds."
            }
          },
          {
            "@type": "Question",
            "name": "Is the job post generator free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can generate job posts for free. Create professional job descriptions, social media graphics, and recruitment content without any cost."
            }
          },
          {
            "@type": "Question",
            "name": "Can I customize the generated content?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! You can customize your brand colors, upload your company logo, select which elements appear on the graphic, and edit the generated text before downloading or sharing."
            }
          },
          {
            "@type": "Question",
            "name": "What formats can I download?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can download your job post graphic as a high-quality image, copy the job description text, and share directly to social media platforms like LinkedIn and Twitter."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://kuajiriapp.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Tools",
            "item": "https://kuajiriapp.com/#tools"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Job Post Generator",
            "item": "https://kuajiriapp.com/job-post-generator"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Create a Professional Job Post",
        "description": "Step-by-step guide to creating a professional job post using AI",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Enter Your Details",
            "text": "Provide your name and contact information for the job posting"
          },
          {
            "@type": "HowToStep",
            "name": "Add Job Details",
            "text": "Enter the job title, salary range, and 3 key requirements"
          },
          {
            "@type": "HowToStep",
            "name": "Customize Branding",
            "text": "Upload your logo, select brand colors, and choose what to include in the graphic"
          },
          {
            "@type": "HowToStep",
            "name": "Generate & Share",
            "text": "Click generate and download or share your professional job post"
          }
        ],
        "totalTime": "PT2M"
      }
    ]
  };
};
