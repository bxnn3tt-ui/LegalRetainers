import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, Linkedin, Youtube, Facebook } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "./sheet";
import { useState } from "react";
export function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/cases?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/cases');
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return <header className="bg-card border-b-4 border-primary">
      <div className="lr-width-container">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex shrink-0 items-center whitespace-nowrap px-3 py-2 md:px-2 md:py-1 transition-colors lr-focus touch-manipulation border-2 border-black bg-[#FFD900]" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            letterSpacing: '-0.03em'
          }}>
            <span className="inline-block text-black text-[26px] leading-none md:text-[25px]">LegalRetainers</span>
          </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/cases" className="lr-link lr-focus">Find a case</Link>
            <Link to="/request-clients" className="lr-link lr-focus">Request clients</Link>
            <Link to="/insights" className="lr-link lr-focus">Insights</Link>
            <Link to="/contact" className="lr-link lr-focus">Contact us</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2">
              <Input type="search" placeholder="Search case types" className="w-48 lr-focus" aria-label="Search case types" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
              <Button variant="brutalist-green" size="sm" aria-label="Search" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden lr-focus p-2 min-h-[44px] min-w-[44px]" aria-label="Open menu">
                  <Menu className="h-7 w-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]" onOpenAutoFocus={e => e.preventDefault()}>
                <nav className="flex flex-col gap-0 mt-12">
                  <Link to="/cases" className="lr-focus text-lg py-4 px-2 min-h-[48px] flex items-center border-b-2 border-black font-bold hover:bg-gray-100 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Find a case
                  </Link>
                  <Link to="/request-clients" className="lr-focus text-lg py-4 px-2 min-h-[48px] flex items-center border-b-2 border-black font-bold hover:bg-gray-100 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Request clients
                  </Link>
                  <Link to="/insights" className="lr-focus text-lg py-4 px-2 min-h-[48px] flex items-center border-b-2 border-black font-bold hover:bg-gray-100 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Insights
                  </Link>
                  <Link to="/contact" className="lr-focus text-lg py-4 px-2 min-h-[48px] flex items-center border-b-2 border-black font-bold hover:bg-gray-100 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Contact us
                  </Link>
                  <div className="py-4 px-2 border-b-2 border-black">
                    <p className="text-sm font-bold mb-3">Follow us</p>
                    <div className="flex gap-3">
                      <a 
                        href="https://linkedin.com/company/legalretainers" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 border-2 border-black hover:bg-gray-100 transition-colors lr-focus min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a 
                        href="https://youtube.com/@legalretainers" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 border-2 border-black hover:bg-gray-100 transition-colors lr-focus min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="YouTube"
                      >
                        <Youtube className="h-5 w-5" />
                      </a>
                      <a 
                        href="https://facebook.com/legalretainers" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 border-2 border-black hover:bg-gray-100 transition-colors lr-focus min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className="flex flex-col gap-3">
                      <Input type="search" placeholder="Search case types" className="lr-focus border-2 border-black" aria-label="Search case types" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} autoFocus={false} />
                      <Button variant="brutalist-green" size="sm" aria-label="Search" onClick={() => {
                      handleSearch();
                      setIsMobileMenuOpen(false);
                    }} className="w-full">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>;
}
