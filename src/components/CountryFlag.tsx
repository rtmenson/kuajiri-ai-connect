
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrency } from '@/contexts/CurrencyContext';

const CountryFlag = () => {
  const { currency, setCurrency, flagEmoji } = useCurrency();

  const currencies = [
    { code: 'USD' as const, flag: '🇺🇸', country: 'United States' },
    { code: 'GHS' as const, flag: '🇬🇭', country: 'Ghana' },
  ];

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
            onClick={() => setCurrency(curr.code)}
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
