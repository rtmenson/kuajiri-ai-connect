import { useState, useEffect } from 'react';

interface LocationData {
  countryCode: string;
  countryName: string;
  currency: string;
  currencySymbol: string;
  phoneCode: string;
  flagEmoji: string;
  city: string;
  isLoading: boolean;
}

// Map of country codes to their currency and phone codes
const COUNTRY_DATA: Record<string, { currency: string; currencySymbol: string; phoneCode: string; flagEmoji: string }> = {
  GH: { currency: "GHC", currencySymbol: "GH₵", phoneCode: "+233", flagEmoji: "🇬🇭" },
  US: { currency: "USD", currencySymbol: "$", phoneCode: "+1", flagEmoji: "🇺🇸" },
  GB: { currency: "GBP", currencySymbol: "£", phoneCode: "+44", flagEmoji: "🇬🇧" },
  NG: { currency: "NGN", currencySymbol: "₦", phoneCode: "+234", flagEmoji: "🇳🇬" },
  KE: { currency: "KES", currencySymbol: "KSh", phoneCode: "+254", flagEmoji: "🇰🇪" },
  ZA: { currency: "ZAR", currencySymbol: "R", phoneCode: "+27", flagEmoji: "🇿🇦" },
  CI: { currency: "CFA", currencySymbol: "CFA", phoneCode: "+225", flagEmoji: "🇨🇮" },
  AU: { currency: "AUD", currencySymbol: "A$", phoneCode: "+61", flagEmoji: "🇦🇺" },
  CA: { currency: "CAD", currencySymbol: "C$", phoneCode: "+1", flagEmoji: "🇨🇦" },
  DE: { currency: "EUR", currencySymbol: "€", phoneCode: "+49", flagEmoji: "🇩🇪" },
  FR: { currency: "EUR", currencySymbol: "€", phoneCode: "+33", flagEmoji: "🇫🇷" },
  IT: { currency: "EUR", currencySymbol: "€", phoneCode: "+39", flagEmoji: "🇮🇹" },
  ES: { currency: "EUR", currencySymbol: "€", phoneCode: "+34", flagEmoji: "🇪🇸" },
  NL: { currency: "EUR", currencySymbol: "€", phoneCode: "+31", flagEmoji: "🇳🇱" },
  BE: { currency: "EUR", currencySymbol: "€", phoneCode: "+32", flagEmoji: "🇧🇪" },
  PT: { currency: "EUR", currencySymbol: "€", phoneCode: "+351", flagEmoji: "🇵🇹" },
  IE: { currency: "EUR", currencySymbol: "€", phoneCode: "+353", flagEmoji: "🇮🇪" },
  IN: { currency: "INR", currencySymbol: "₹", phoneCode: "+91", flagEmoji: "🇮🇳" },
  SG: { currency: "SGD", currencySymbol: "S$", phoneCode: "+65", flagEmoji: "🇸🇬" },
  AE: { currency: "AED", currencySymbol: "د.إ", phoneCode: "+971", flagEmoji: "🇦🇪" },
  JP: { currency: "JPY", currencySymbol: "¥", phoneCode: "+81", flagEmoji: "🇯🇵" },
  CN: { currency: "CNY", currencySymbol: "¥", phoneCode: "+86", flagEmoji: "🇨🇳" },
  BR: { currency: "BRL", currencySymbol: "R$", phoneCode: "+55", flagEmoji: "🇧🇷" },
  MX: { currency: "MXN", currencySymbol: "$", phoneCode: "+52", flagEmoji: "🇲🇽" },
  RW: { currency: "RWF", currencySymbol: "FRw", phoneCode: "+250", flagEmoji: "🇷🇼" },
  TZ: { currency: "TZS", currencySymbol: "TSh", phoneCode: "+255", flagEmoji: "🇹🇿" },
  UG: { currency: "UGX", currencySymbol: "USh", phoneCode: "+256", flagEmoji: "🇺🇬" },
  EG: { currency: "EGP", currencySymbol: "E£", phoneCode: "+20", flagEmoji: "🇪🇬" },
  MA: { currency: "MAD", currencySymbol: "د.م.", phoneCode: "+212", flagEmoji: "🇲🇦" },
  PH: { currency: "PHP", currencySymbol: "₱", phoneCode: "+63", flagEmoji: "🇵🇭" },
  PK: { currency: "PKR", currencySymbol: "₨", phoneCode: "+92", flagEmoji: "🇵🇰" },
  BD: { currency: "BDT", currencySymbol: "৳", phoneCode: "+880", flagEmoji: "🇧🇩" },
};

// Default fallback data (USD)
const DEFAULT_DATA = {
  currency: "USD",
  currencySymbol: "$",
  phoneCode: "+1",
  flagEmoji: "🇺🇸",
};

export const useLocation = () => {
  const [locationData, setLocationData] = useState<LocationData>({
    countryCode: "US",
    countryName: "United States",
    currency: DEFAULT_DATA.currency,
    currencySymbol: DEFAULT_DATA.currencySymbol,
    phoneCode: DEFAULT_DATA.phoneCode,
    flagEmoji: DEFAULT_DATA.flagEmoji,
    city: "",
    isLoading: true,
  });

  useEffect(() => {
    const getLocationFromIP = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const countryCode = data.country_code || "US";
        const countryData = COUNTRY_DATA[countryCode] || DEFAULT_DATA;
        
        setLocationData({
          countryCode,
          countryName: data.country_name || "United States",
          currency: countryData.currency,
          currencySymbol: countryData.currencySymbol,
          phoneCode: countryData.phoneCode,
          flagEmoji: countryData.flagEmoji,
          city: data.city || "",
          isLoading: false,
        });
      } catch (error) {
        console.log('Could not detect location from IP:', error);
        setLocationData(prev => ({ ...prev, isLoading: false }));
      }
    };

    getLocationFromIP();
  }, []);

  return locationData;
};

// Export country data for use in dropdowns
export const COUNTRY_CODES = Object.entries(COUNTRY_DATA).map(([code, data]) => ({
  code: data.phoneCode,
  country: code,
  flag: data.flagEmoji,
})).filter((item, index, self) => 
  // Remove duplicates (like US/CA both having +1)
  index === self.findIndex(t => t.code === item.code)
).sort((a, b) => a.code.localeCompare(b.code));

export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "GHC", symbol: "GH₵", name: "Ghana Cedi" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "CFA", symbol: "CFA", name: "CFA Franc" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
];
