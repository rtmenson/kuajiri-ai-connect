
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CountryFlag = () => {
  const [currency, setCurrency] = useState<string>('USD');
  const [flagEmoji, setFlagEmoji] = useState<string>('🇺🇸');

  const currencies = [
    { code: 'USD', flag: '🇺🇸', country: 'United States' },
    { code: 'GHS', flag: '🇬🇭', country: 'Ghana' },
    { code: 'EUR', flag: '🇪🇺', country: 'Europe' },
    { code: 'GBP', flag: '🇬🇧', country: 'United Kingdom' },
    { code: 'CAD', flag: '🇨🇦', country: 'Canada' },
    { code: 'AUD', flag: '🇦🇺', country: 'Australia' },
  ];

  useEffect(() => {
    // Function to get country from IP and set appropriate currency
    const getCountryFromIP = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code) {
          const countryCode = data.country_code?.toUpperCase();
          
          // Set currency based on country
          let detectedCurrency = 'USD';
          let detectedFlag = '🇺🇸';
          
          const currencyMap: { [key: string]: { currency: string, flag: string } } = {
            'GH': { currency: 'GHS', flag: '🇬🇭' },
            'GB': { currency: 'GBP', flag: '🇬🇧' },
            'CA': { currency: 'CAD', flag: '🇨🇦' },
            'AU': { currency: 'AUD', flag: '🇦🇺' },
            'DE': { currency: 'EUR', flag: '🇪🇺' },
            'FR': { currency: 'EUR', flag: '🇪🇺' },
            'IT': { currency: 'EUR', flag: '🇪🇺' },
            'ES': { currency: 'EUR', flag: '🇪🇺' },
          };
          
          if (currencyMap[countryCode]) {
            detectedCurrency = currencyMap[countryCode].currency;
            detectedFlag = currencyMap[countryCode].flag;
          }
          
          setCurrency(detectedCurrency);
          setFlagEmoji(detectedFlag);
        }
      } catch (error) {
        console.log('Could not detect country:', error);
        // Fallback to Ghana
        setFlagEmoji('🇬🇭');
        setCurrency('GHS');
      }
    };

    getCountryFromIP();
  }, []);

  const handleCurrencyChange = (newCurrency: string) => {
    const selectedCurrency = currencies.find(c => c.code === newCurrency);
    if (selectedCurrency) {
      setCurrency(newCurrency);
      setFlagEmoji(selectedCurrency.flag);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
        <span className="text-lg">{flagEmoji}</span>
        <span className="font-medium">{currency}</span>
        <ChevronDown className="h-3 w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border shadow-lg">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => handleCurrencyChange(curr.code)}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50"
          >
            <span>{curr.flag}</span>
            <span className="font-medium">{curr.code}</span>
            <span className="text-gray-500 text-xs">{curr.country}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CountryFlag;
