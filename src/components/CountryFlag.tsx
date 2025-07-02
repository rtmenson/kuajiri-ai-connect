
import { useState, useEffect } from 'react';
import { Flag } from 'lucide-react';

const CountryFlag = () => {
  const [country, setCountry] = useState<string>('');
  const [flagEmoji, setFlagEmoji] = useState<string>('🌍');

  useEffect(() => {
    // Function to get country from IP
    const getCountryFromIP = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country) {
          setCountry(data.country_name || data.country);
          
          // Convert country code to flag emoji
          const countryCode = data.country_code?.toUpperCase();
          if (countryCode) {
            const flagEmoji = countryCode
              .split('')
              .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
              .join('');
            setFlagEmoji(flagEmoji);
          }
        }
      } catch (error) {
        console.log('Could not detect country:', error);
        // Fallback to Ghana flag if detection fails
        setFlagEmoji('🇬🇭');
        setCountry('Ghana');
      }
    };

    getCountryFromIP();
  }, []);

  return (
    <div className="flex items-center space-x-1 text-sm text-gray-600">
      <span className="text-lg">{flagEmoji}</span>
      {country && <span className="hidden sm:inline">{country}</span>}
    </div>
  );
};

export default CountryFlag;
