import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'USD' | 'GHS';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  flagEmoji: string;
  formatPrice: (usdPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// GHS to USD conversion rate (approximate)
const GHS_RATE = 16;

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [flagEmoji, setFlagEmoji] = useState<string>('🇺🇸');

  useEffect(() => {
    const getCountryFromIP = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code === 'GH') {
          setCurrency('GHS');
          setFlagEmoji('🇬🇭');
        } else {
          setCurrency('USD');
          setFlagEmoji('🇺🇸');
        }
      } catch (error) {
        console.log('Could not detect country:', error);
        setCurrency('USD');
        setFlagEmoji('🇺🇸');
      }
    };

    getCountryFromIP();
  }, []);

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    setFlagEmoji(newCurrency === 'GHS' ? '🇬🇭' : '🇺🇸');
  };

  const formatPrice = (usdPrice: number) => {
    if (currency === 'GHS') {
      return `GH₵ ${Math.round(usdPrice * GHS_RATE)}`;
    }
    return `$${usdPrice}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, flagEmoji, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
