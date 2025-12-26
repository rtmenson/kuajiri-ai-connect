import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { salaryData2025, JobSalaryData } from "@/data/salaryData2025";
import { Search, Briefcase } from "lucide-react";

interface JobTitleAutocompleteProps {
  value: string;
  onChange: (value: string, matchedJob?: JobSalaryData) => void;
  placeholder?: string;
}

export const JobTitleAutocomplete = ({
  value,
  onChange,
  placeholder = "e.g. Software Engineer, Accountant, Nurse",
}: JobTitleAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<JobSalaryData[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue);
    
    if (inputValue.length >= 2) {
      const query = inputValue.toLowerCase();
      const matches = salaryData2025.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.category.toLowerCase().includes(query)
      );
      // Sort by relevance - exact matches first, then starts with, then contains
      matches.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        
        const aExact = aTitle === query;
        const bExact = bTitle === query;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        
        const aStarts = aTitle.startsWith(query);
        const bStarts = bTitle.startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        
        return aTitle.localeCompare(bTitle);
      });
      
      setFilteredJobs(matches.slice(0, 10));
      setIsOpen(matches.length > 0);
    } else {
      setFilteredJobs([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (job: JobSalaryData) => {
    onChange(job.title, job);
    setIsOpen(false);
  };

  // Group jobs by category for better display
  const groupedJobs = filteredJobs.reduce((acc, job) => {
    if (!acc[job.category]) {
      acc[job.category] = [];
    }
    acc[job.category].push(job);
    return acc;
  }, {} as Record<string, JobSalaryData[]>);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => value.length >= 2 && filteredJobs.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-72 overflow-y-auto">
          {Object.entries(groupedJobs).map(([category, jobs]) => (
            <div key={category}>
              <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted/50 sticky top-0">
                {category}
              </div>
              {jobs.map((job) => (
                <button
                  key={job.title}
                  type="button"
                  className="w-full px-3 py-2 text-left hover:bg-accent transition-colors flex items-center gap-2"
                  onClick={() => handleSelect(job)}
                >
                  <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="truncate">{job.title}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
