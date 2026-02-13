import { useState, useMemo, useEffect } from "react";
import { Search, Filter, MapPin, DollarSign } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CaseCard } from "./case-card";
import { cases, practiceAreas, type CaseType } from "@/data/cases";
export function CaseFinder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState<string[]>([]);

  // Initialize search term and category from URL parameters
  useEffect(() => {
    const urlSearchTerm = searchParams.get("search");
    const urlCategory = searchParams.get("category");

    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }

    // Map URL category to practice area IDs
    if (urlCategory) {
      const categoryMapping: { [key: string]: string } = {
        "personal-injury": "injury-accidents",
        "mass-tort": "mass-torts",
        abuse: "institutional-abuse",
        employment: "work-benefits",
        other: "other",
      };

      const practiceAreaId = categoryMapping[urlCategory];
      if (practiceAreaId) {
        setSelectedPracticeAreas([practiceAreaId]);
      }
    }
  }, [searchParams]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedGeography, setSelectedGeography] = useState("");
  const filteredCases = useMemo(() => {
    // Filter cases while preserving original index for stable sorting
    const filtered = cases
      .map((caseItem: CaseType, index: number) => ({ caseItem, originalIndex: index }))
      .filter(({ caseItem }) => {
        const matchesSearch =
          (caseItem.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (caseItem.summary?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (caseItem.subcategory?.toLowerCase() || "").includes(searchTerm.toLowerCase());
        const matchesPracticeArea =
          selectedPracticeAreas.length === 0 || selectedPracticeAreas.includes(caseItem.practiceArea);
        const matchesSubcategory =
          selectedSubcategories.length === 0 || selectedSubcategories.includes(caseItem.subcategory);
        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(caseItem.status);
        const matchesGeography =
          selectedGeography === "all" ||
          selectedGeography === "" ||
          caseItem.geography?.some((geo) => geo?.toLowerCase().includes(selectedGeography.toLowerCase()));
        return matchesSearch && matchesPracticeArea && matchesSubcategory && matchesStatus && matchesGeography;
      });

    // Sort by original array order (cases.ts is ordered by real-world popularity)
    filtered.sort((a, b) => a.originalIndex - b.originalIndex);
    
    return filtered.map(({ caseItem }) => caseItem);
  }, [searchTerm, selectedPracticeAreas, selectedSubcategories, selectedStatuses, selectedGeography]);
  const handlePracticeAreaChange = (practiceAreaId: string, checked: boolean) => {
    if (checked) {
      setSelectedPracticeAreas([...selectedPracticeAreas, practiceAreaId]);
    } else {
      setSelectedPracticeAreas(selectedPracticeAreas.filter((id) => id !== practiceAreaId));
      // Clear related subcategories
      const practiceArea = practiceAreas.find((pa) => pa.id === practiceAreaId);
      if (practiceArea) {
        setSelectedSubcategories((prev) => prev.filter((sub) => !practiceArea.subcategories.includes(sub)));
      }
    }
  };
  const handleSubcategoryChange = (subcategory: string, checked: boolean) => {
    if (checked) {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    } else {
      setSelectedSubcategories(selectedSubcategories.filter((sub) => sub !== subcategory));
    }
  };
  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      setSelectedStatuses([...selectedStatuses, status]);
    } else {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    }
  };
  return (
    <div className="space-y-6">
      {/* Search and Sort */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black/60" />
            <Input
              type="search"
              placeholder="Search cases (e.g., 'mass tort', 'car accident', 'PFAS')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 lr-focus border-2 border-black bg-white"
              aria-label="Search cases"
            />
          </div>
          <Button variant="brutalist-green" className="px-6 w-full sm:w-auto">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <Accordion type="single" collapsible className="border-2 border-black rounded-none bg-white">
        <AccordionItem value="filters" className="border-0">
          <AccordionTrigger className="lr-heading-s px-4 py-3 hover:no-underline font-bold">
            <div className="flex items-center gap-2">Filter by practice area, status & geography</div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="lr-heading-s mb-3 flex items-center gap-2">Practice Areas</h4>
                <div className="space-y-3">
                  {practiceAreas.map((practiceArea) => (
                    <div key={practiceArea.id} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`practice-${practiceArea.id}`}
                          checked={selectedPracticeAreas.includes(practiceArea.id)}
                          onCheckedChange={(checked) => handlePracticeAreaChange(practiceArea.id, checked as boolean)}
                          className="lr-focus"
                        />
                        <label
                          htmlFor={`practice-${practiceArea.id}`}
                          className="lr-body-s font-medium leading-none"
                        >
                          {practiceArea.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="lr-heading-s mb-3">Case Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-available"
                      checked={selectedStatuses.includes("available")}
                      onCheckedChange={(checked) => handleStatusChange("available", checked as boolean)}
                      className="lr-focus"
                    />
                    <label htmlFor="status-available" className="lr-body-s">
                      Available
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-high-volume"
                      checked={selectedStatuses.includes("high-volume")}
                      onCheckedChange={(checked) => handleStatusChange("high-volume", checked as boolean)}
                      className="lr-focus"
                    />
                    <label htmlFor="status-high-volume" className="lr-body-s">
                      High Volume
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-limited"
                      checked={selectedStatuses.includes("limited")}
                      onCheckedChange={(checked) => handleStatusChange("limited", checked as boolean)}
                      className="lr-focus"
                    />
                    <label htmlFor="status-limited" className="lr-body-s">
                      Limited
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="lr-heading-s mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Geography
                </h4>
                <Select value={selectedGeography} onValueChange={setSelectedGeography}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any state</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="IL">Illinois</SelectItem>
                    <SelectItem value="GA">Georgia</SelectItem>
                    <SelectItem value="AZ">Arizona</SelectItem>
                    <SelectItem value="NJ">New Jersey</SelectItem>
                    <SelectItem value="WA">Washington</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Results */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-4">
            <h3 className="lr-heading-s mb-0">
              {filteredCases.length} case type{filteredCases.length !== 1 ? "s" : ""} available
            </h3>
          </div>
          {(selectedPracticeAreas.length > 0 ||
            selectedSubcategories.length > 0 ||
            selectedStatuses.length > 0 ||
            (selectedGeography && selectedGeography !== "all") ||
            searchTerm) && (
            <Button
              variant="link"
              onClick={() => {
                setSearchTerm("");
                setSelectedPracticeAreas([]);
                setSelectedSubcategories([]);
                setSelectedStatuses([]);
                setSelectedGeography("all");
              }}
              className="lr-focus"
            >
              Clear all filters
            </Button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCases.map((caseItem) => (
            <CaseCard key={caseItem.slug} case={caseItem} />
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-8">
            <p className="lr-body text-muted-foreground">
              No case packages match your criteria. Try adjusting your filters or contact us for custom case programs.
            </p>
            <Button variant="lr" className="mt-4" onClick={() => navigate("/contact")}>
              Request Custom Case Packages
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
