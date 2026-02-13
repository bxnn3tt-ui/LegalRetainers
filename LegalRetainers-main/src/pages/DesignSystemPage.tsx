import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SEOHead } from "@/components/SEOHead";

const DesignSystemPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Design System | LegalRetainers"
        description="LegalRetainers Design System - A production-ready design system for building consistent user interfaces."
        canonical="https://legalretainers.com/design-system"
      />
      <Header />

      <main className="py-12">
        <div className="lr-container">
          <h1 className="lr-heading-xl mb-2">LegalRetainers Design System</h1>
          <p className="lr-body-l text-muted-foreground mb-12">
            Version 1.0.0 — A production-ready design system for building consistent, accessible interfaces.
          </p>

          {/* Table of Contents */}
          <nav className="mb-16 p-6 lr-card">
            <h2 className="lr-heading-m mb-4">Contents</h2>
            <ul className="lr-list--bullet">
              <li><a href="#colors" className="lr-link">Colors</a></li>
              <li><a href="#typography" className="lr-link">Typography</a></li>
              <li><a href="#spacing" className="lr-link">Spacing</a></li>
              <li><a href="#components" className="lr-link">Components</a></li>
              <li><a href="#forms" className="lr-link">Form Elements</a></li>
              <li><a href="#utilities" className="lr-link">Utility Classes</a></li>
            </ul>
          </nav>

          {/* Colors Section */}
          <section id="colors" className="mb-16 scroll-mt-8">
            <h2 className="lr-heading-l border-b-4 border-black pb-2 mb-8">Colors</h2>
            
            <h3 className="lr-heading-m mb-4">Brand Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <ColorSwatch name="Primary Blue" hex="#002966" cssVar="--lr-blue" />
              <ColorSwatch name="Yellow" hex="#FFD900" cssVar="--lr-yellow" />
              <ColorSwatch name="Green" hex="#00703C" cssVar="--lr-green" />
              <ColorSwatch name="Red" hex="#D4351C" cssVar="--lr-red" />
            </div>

            <h3 className="lr-heading-m mb-4">Neutral Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <ColorSwatch name="Black" hex="#0B0C0C" cssVar="--lr-black" />
              <ColorSwatch name="White" hex="#FFFFFF" cssVar="--lr-white" />
              <ColorSwatch name="Text Secondary" hex="#505A5F" cssVar="--lr-text-secondary" />
              <ColorSwatch name="Border" hex="#B1B4B6" cssVar="--lr-border" />
            </div>

            <div className="p-4 bg-muted border-l-4 border-primary">
              <p className="lr-body-s"><strong>Usage:</strong> Use CSS variables for colors: <code className="bg-white px-1">hsl(var(--lr-blue))</code></p>
            </div>
          </section>

          {/* Typography Section */}
          <section id="typography" className="mb-16 scroll-mt-8">
            <h2 className="lr-heading-l border-b-4 border-black pb-2 mb-8">Typography</h2>
            
            <h3 className="lr-heading-m mb-6">Headings</h3>
            <div className="space-y-6 mb-8">
              <div className="p-4 lr-card">
                <p className="lr-heading-xl mb-2">Heading XL — Page Titles</p>
                <code className="lr-body-s text-muted-foreground">.lr-heading-xl</code>
              </div>
              <div className="p-4 lr-card">
                <p className="lr-heading-l mb-2">Heading L — Section Titles</p>
                <code className="lr-body-s text-muted-foreground">.lr-heading-l</code>
              </div>
              <div className="p-4 lr-card">
                <p className="lr-heading-m mb-2">Heading M — Subsections</p>
                <code className="lr-body-s text-muted-foreground">.lr-heading-m</code>
              </div>
              <div className="p-4 lr-card">
                <p className="lr-heading-s mb-2">Heading S — Card Titles</p>
                <code className="lr-body-s text-muted-foreground">.lr-heading-s</code>
              </div>
            </div>

            <h3 className="lr-heading-m mb-6">Body Text</h3>
            <div className="space-y-6 mb-8">
              <div className="p-4 lr-card">
                <p className="lr-body-l mb-2">Body Large — Lead paragraphs and introductions</p>
                <code className="lr-body-s text-muted-foreground">.lr-body-l</code>
              </div>
              <div className="p-4 lr-card">
                <p className="lr-body mb-2">Body — Default paragraph text throughout the site</p>
                <code className="lr-body-s text-muted-foreground">.lr-body</code>
              </div>
              <div className="p-4 lr-card">
                <p className="lr-body-s mb-2">Body Small — Captions, metadata, fine print</p>
                <code className="lr-body-s text-muted-foreground">.lr-body-s</code>
              </div>
            </div>

            <h3 className="lr-heading-m mb-4">Responsive Scale</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-black">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-3 text-left border-b-2 border-[#FFD900]">Class</th>
                    <th className="p-3 text-left border-b-2 border-[#FFD900]">Mobile (&lt;640px)</th>
                    <th className="p-3 text-left border-b-2 border-[#FFD900]">Tablet (≥640px)</th>
                    <th className="p-3 text-left border-b-2 border-[#FFD900]">Desktop (≥1536px)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-mono">.lr-heading-xl</td>
                    <td className="p-3">32px / 35px</td>
                    <td className="p-3">48px / 50px</td>
                    <td className="p-3">56px / 60px</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="p-3 font-mono">.lr-heading-l</td>
                    <td className="p-3">27px / 30px</td>
                    <td className="p-3">36px / 40px</td>
                    <td className="p-3">42px / 46px</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-mono">.lr-heading-m</td>
                    <td className="p-3">21px / 25px</td>
                    <td className="p-3">24px / 30px</td>
                    <td className="p-3">28px / 35px</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="p-3 font-mono">.lr-heading-s</td>
                    <td className="p-3">19px / 25px</td>
                    <td className="p-3">19px / 25px</td>
                    <td className="p-3">22px / 30px</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-mono">.lr-body-l</td>
                    <td className="p-3">21px / 25px</td>
                    <td className="p-3">24px / 30px</td>
                    <td className="p-3">28px / 35px</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="p-3 font-mono">.lr-body</td>
                    <td className="p-3">19px / 25px</td>
                    <td className="p-3">19px / 25px</td>
                    <td className="p-3">22px / 30px</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">.lr-body-s</td>
                    <td className="p-3">16px / 20px</td>
                    <td className="p-3">16px / 20px</td>
                    <td className="p-3">18px / 25px</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Spacing Section */}
          <section id="spacing" className="mb-16 scroll-mt-8">
            <h2 className="lr-heading-l border-b-4 border-black pb-2 mb-8">Spacing</h2>
            
            <p className="lr-body mb-6">Use CSS variables for consistent spacing throughout the application.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-black">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-3 text-left border-b-2 border-[#FFD900]">Variable</th>
                    <th className="p-3 text-left border-b-2 border-[#FFD900]">Value</th>
                    <th className="p-3 text-left border-b-2 border-[#FFD900]">Pixels</th>
                    <th className="p-3 text-left border-b-2 border-[#FFD900]">Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: '--lr-space-1', value: '0.25rem', px: '4px' },
                    { name: '--lr-space-2', value: '0.5rem', px: '8px' },
                    { name: '--lr-space-3', value: '0.75rem', px: '12px' },
                    { name: '--lr-space-4', value: '1rem', px: '16px' },
                    { name: '--lr-space-5', value: '1.25rem', px: '20px' },
                    { name: '--lr-space-6', value: '1.5rem', px: '24px' },
                    { name: '--lr-space-7', value: '2rem', px: '32px' },
                    { name: '--lr-space-8', value: '2.5rem', px: '40px' },
                    { name: '--lr-space-9', value: '3rem', px: '48px' },
                    { name: '--lr-space-10', value: '4rem', px: '64px' },
                  ].map((space, i) => (
                    <tr key={space.name} className={i % 2 === 1 ? 'bg-muted/30' : ''}>
                      <td className="p-3 font-mono">{space.name}</td>
                      <td className="p-3">{space.value}</td>
                      <td className="p-3">{space.px}</td>
                      <td className="p-3">
                        <div className="bg-primary h-4" style={{ width: space.px }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Components Section */}
          <section id="components" className="mb-16 scroll-mt-8">
            <h2 className="lr-heading-l border-b-4 border-black pb-2 mb-8">Components</h2>

            {/* Cards */}
            <h3 className="lr-heading-m mb-6">Cards</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 lr-card">
                <h4 className="lr-heading-s mb-2">Base Card</h4>
                <p className="lr-body-s text-muted-foreground mb-4">2px black border, no shadow</p>
                <code className="text-xs bg-muted px-2 py-1">.lr-card</code>
              </div>
              <div className="p-6 lr-card--shadow">
                <h4 className="lr-heading-s mb-2">Shadow Card</h4>
                <p className="lr-body-s text-muted-foreground mb-4">Static offset shadow</p>
                <code className="text-xs bg-muted px-2 py-1">.lr-card--shadow</code>
              </div>
              <div className="p-6 lr-card--lift cursor-pointer">
                <h4 className="lr-heading-s mb-2">Lift Card</h4>
                <p className="lr-body-s text-muted-foreground mb-4">Hover to see lift effect</p>
                <code className="text-xs bg-muted px-2 py-1">.lr-card--lift</code>
              </div>
            </div>

            {/* Badges */}
            <h3 className="lr-heading-m mb-6">Badges</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="lr-badge lr-badge--available">Available</span>
              <span className="lr-badge lr-badge--limited">Limited</span>
              <span className="lr-badge lr-badge--urgent">Urgent</span>
              <span className="lr-badge lr-badge--high-volume">High Volume</span>
              <span className="lr-badge lr-badge--default">Default</span>
              <span className="lr-badge lr-badge--yellow">Yellow</span>
              <span className="lr-badge lr-badge--green">Green</span>
            </div>
            <div className="p-4 bg-muted border-l-4 border-primary mb-8">
              <code className="text-sm">.lr-badge .lr-badge--available | .lr-badge--limited | .lr-badge--urgent | etc.</code>
            </div>

            {/* Buttons */}
            <h3 className="lr-heading-m mb-6">Buttons</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <Button variant="brutalist">CTA Button</Button>
              <Button variant="brutalist-outline">Outline Button</Button>
              <Button variant="lr">Primary Button</Button>
              <Button variant="outline">Default Outline</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
            <div className="p-4 bg-muted border-l-4 border-primary mb-8">
              <p className="lr-body-s mb-2"><strong>Usage:</strong> Import Button from @/components/ui/button</p>
              <code className="text-sm">{`<Button variant="brutalist">Text</Button>`}</code>
            </div>

            {/* Container */}
            <h3 className="lr-heading-m mb-6">Containers</h3>
            <div className="space-y-4 mb-8">
              <div className="p-4 lr-card">
                <code className="font-mono">.lr-container</code>
                <p className="lr-body-s text-muted-foreground mt-1">Max-width 1152px, expands on 2xl/3xl screens</p>
              </div>
              <div className="p-4 lr-card">
                <code className="font-mono">.lr-container-narrow</code>
                <p className="lr-body-s text-muted-foreground mt-1">Max-width 768px for content-heavy pages</p>
              </div>
              <div className="p-4 lr-card">
                <code className="font-mono">.lr-container-wide</code>
                <p className="lr-body-s text-muted-foreground mt-1">Max-width 1280px for dashboards</p>
              </div>
            </div>
          </section>

          {/* Forms Section */}
          <section id="forms" className="mb-16 scroll-mt-8">
            <h2 className="lr-heading-l border-b-4 border-black pb-2 mb-8">Form Elements</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="lr-label">Text Input</label>
                <Input placeholder="Enter text..." className="border-2 border-black" />
                <code className="text-xs text-muted-foreground mt-2 block">.lr-input or use Input component</code>
              </div>
              
              <div>
                <label className="lr-label">Select</label>
                <select className="lr-select">
                  <option>Select an option...</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <code className="text-xs text-muted-foreground mt-2 block">.lr-select</code>
              </div>
              
              <div className="md:col-span-2">
                <label className="lr-label">Textarea</label>
                <Textarea placeholder="Enter message..." className="border-2 border-black" />
                <code className="text-xs text-muted-foreground mt-2 block">.lr-textarea or use Textarea component</code>
              </div>
            </div>
          </section>

          {/* Utilities Section */}
          <section id="utilities" className="mb-16 scroll-mt-8">
            <h2 className="lr-heading-l border-b-4 border-black pb-2 mb-8">Utility Classes</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-black">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-3 text-left border-b-2 border-[#FFD900]">Class</th>
                    <th className="p-3 text-left border-b-2 border-[#FFD900]">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-mono">.lr-focus</td>
                    <td className="p-3">Yellow focus ring for keyboard navigation</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="p-3 font-mono">.lr-link</td>
                    <td className="p-3">Styled link with underline and hover state</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-mono">.lr-list--bullet</td>
                    <td className="p-3">Bulleted list with proper spacing</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="p-3 font-mono">.lr-list--number</td>
                    <td className="p-3">Numbered list with proper spacing</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-mono">.lr-readable</td>
                    <td className="p-3">Max-width 70ch for readable paragraphs</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="p-3 font-mono">.lr-prose</td>
                    <td className="p-3">Prose styling for articles</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-mono">.lr-article</td>
                    <td className="p-3">Full article styling with headings, lists, etc.</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="p-3 font-mono">.lr-skip-link</td>
                    <td className="p-3">Accessible skip-to-content link</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">.lr-touch</td>
                    <td className="p-3">Touch manipulation for mobile interactions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Neo-Brutalist Tokens */}
          <section className="mb-16">
            <h2 className="lr-heading-l border-b-4 border-black pb-2 mb-8">Neo-Brutalist Tokens</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 lr-card">
                <h3 className="lr-heading-s mb-4">Border Width</h3>
                <p className="lr-body mb-2">All borders use 2px solid black</p>
                <code className="text-sm bg-muted px-2 py-1">border-2 border-black</code>
              </div>
              
              <div className="p-6 lr-card--shadow">
                <h3 className="lr-heading-s mb-4">Offset Shadow</h3>
                <p className="lr-body mb-2">4px offset for primary elements</p>
                <code className="text-sm bg-muted px-2 py-1">--lr-shadow-offset</code>
              </div>
              
              <div className="p-6 lr-card" style={{ boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)' }}>
                <h3 className="lr-heading-s mb-4">Small Shadow</h3>
                <p className="lr-body mb-2">2px offset for subtle elements</p>
                <code className="text-sm bg-muted px-2 py-1">--lr-shadow-offset-sm</code>
              </div>
              
              <div className="p-6 lr-card">
                <h3 className="lr-heading-s mb-4">No Border Radius</h3>
                <p className="lr-body mb-2">Square corners throughout</p>
                <code className="text-sm bg-muted px-2 py-1">--radius: 0rem</code>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

// Color swatch component
const ColorSwatch = ({ name, hex, cssVar }: { name: string; hex: string; cssVar: string }) => (
  <div className="lr-card overflow-hidden">
    <div className="h-20" style={{ backgroundColor: hex }} />
    <div className="p-3">
      <p className="font-bold text-sm">{name}</p>
      <p className="text-xs text-muted-foreground font-mono">{hex}</p>
      <p className="text-xs text-muted-foreground font-mono">{cssVar}</p>
    </div>
  </div>
);

export default DesignSystemPage;
