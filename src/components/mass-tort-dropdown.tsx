import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MassTortDropdownProps {
  onSelect?: (category: string) => void;
  className?: string;
}

interface LawCategory {
  id: string;
  title: string;
  summary: string;
  urlParam: string;
}

export function MassTortDropdown({ onSelect, className = "" }: MassTortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<LawCategory | null>(null);
  const navigate = useNavigate();

  // Law categories for the dropdown
  const lawCategories: LawCategory[] = [
    {
      id: 'personal-injury',
      title: 'Personal Injury & Accidents',
      summary: 'Car accidents, workplace injuries, slip & falls',
      urlParam: 'personal-injury'
    },
    {
      id: 'mass-tort',
      title: 'Mass Torts & Product Liability',
      summary: 'Product liability, defective drugs, environmental contamination',
      urlParam: 'mass-tort'
    },
    {
      id: 'abuse',
      title: 'Institutional Abuse & Negligence',
      summary: 'Clergy abuse, institutional negligence, survivor claims',
      urlParam: 'abuse'
    },
    {
      id: 'employment',
      title: 'Employment & Benefits',
      summary: 'Employment disputes, benefits denial, workplace exposure',
      urlParam: 'employment'
    },
    {
      id: 'other',
      title: 'Other Legal Matters',
      summary: 'Additional practice areas and specialized cases',
      urlParam: 'other'
    }
  ];

  const handleSelect = (category: LawCategory) => {
    setSelectedCategory(category);
    setIsOpen(false);
    onSelect?.(category.id);
    // Auto-redirect to cases page with category filter
    navigate(`/cases?category=${category.urlParam}`);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white text-left p-4 border-2 border-primary rounded-none lr-focus flex items-center justify-between hover:bg-muted/50 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div>
          <div className="lr-body font-medium text-foreground">
            {selectedCategory ? selectedCategory.title : "Select Your Practice Area"}
          </div>
          <div className="lr-body-s text-muted-foreground">
            {selectedCategory ? "Click to change selection" : "Choose from available practice areas"}
          </div>
        </div>
        <ChevronDown className={`h-5 w-5 text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-2 border-primary border-t-0 rounded-none shadow-lg z-50 max-h-80 overflow-y-auto">
          {lawCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleSelect(category)}
              className="w-full text-left p-4 hover:bg-muted/50 border-b border-border last:border-b-0 lr-focus transition-colors bg-white"
            >
              <div className="lr-body font-medium text-foreground">{category.title}</div>
              <div className="lr-body-s text-muted-foreground mt-1">
                {category.summary}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="lr-body-s text-accent font-medium">
                  Available Now
                </span>
                <ArrowRight className="h-3 w-3 text-accent" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}