import { Link } from "react-router-dom";
export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted mt-8 border-t-4 border-primary">
      <div className="lr-width-container py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="border-2 border-black p-4 bg-white">
            <h3 className="lr-heading-s">Legal Services</h3>
            <ul className="space-y-2 lr-body-s">
              <li>
                <Link to="/cases" className="lr-link lr-focus">
                  Find your case type
                </Link>
              </li>
              <li>
                <Link to="/request-clients" className="lr-link lr-focus">
                  Start a case order
                </Link>
              </li>
              <li>
                <Link to="/insights" className="lr-link lr-focus">
                  Insights & updates
                </Link>
              </li>
              <li>
                <Link to="/about" className="lr-link lr-focus">
                  Why trust us
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-2 border-black p-4 bg-white">
            <h3 className="lr-heading-s">Support & Information</h3>
            <ul className="space-y-2 lr-body-s">
              <li>
                <Link to="/contact" className="lr-link lr-focus">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="lr-link lr-focus">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="lr-link lr-focus">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="lr-link lr-focus">
                  Accessibility statement
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-2 border-black p-4 bg-white">
            <h3 className="lr-heading-s">Legal Disclaimer</h3>
            <p className="lr-body-s text-muted-foreground">
              This is attorney advertising. We connect law firms with pre-signed legal cases. Cases are verified but outcomes and case value may vary.{" "}
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-4 sm:pt-6 mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <p className="lr-body-s text-muted-foreground">
              © {currentYear} LegalRetainers - A registered marketing provider.
            </p>
            <div className="flex gap-4">
              <Link to="/cookies" className="lr-link lr-body-s lr-focus inline-block leading-tight">
                Cookies
              </Link>
              <Link to="/editorial" className="lr-link lr-body-s lr-focus inline-block leading-tight">
                Editorial policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
