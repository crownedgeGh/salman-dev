import Link from 'next/link';
import { FaBuilding, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <FaBuilding className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">
                Broker<span className="text-primary">Boss</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Raipur&apos;s most trusted property listing platform. Find houses, shops, flats, plots and more — all with verified broker contacts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { href: '/', label: 'Home' },
                { href: '/properties', label: 'Properties' },
                { href: '/services', label: 'Services' },
                { href: '/contact', label: 'Contact Us' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Property Types</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { label: 'Houses', type: 'house' },
                { label: 'Flats', type: 'flat' },
                { label: 'Shops', type: 'shop' },
                { label: 'Plots', type: 'plot' },
                { label: 'Offices', type: 'office' },
                { label: 'Warehouses', type: 'warehouse' }
              ].map(({ label, type }) => (
                <li key={type}>
                  <Link href={`/properties?type=${type}`} className="hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Shankar Nagar, Raipur, CG – 492007</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="h-4 w-4 shrink-0" />
                <a href="tel:+917714000000" className="hover:text-foreground transition-colors">
                  +91 77140 00000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="h-4 w-4 shrink-0" />
                <a href="mailto:contact@brokerboss.in" className="hover:text-foreground transition-colors">
                  contact@brokerboss.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© 2026 BrokerBoss. All rights reserved.</p>
          <p>Raipur, Chhattisgarh, India</p>
        </div>
      </div>
    </footer>
  );
}
