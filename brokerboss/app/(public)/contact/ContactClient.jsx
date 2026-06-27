'use client';

import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';

const officeDetails = [
  {
    icon: FaMapMarkerAlt,
    label: 'Address',
    value: 'Plot No. 12, Civic Centre Road, Shankar Nagar, Raipur, Chhattisgarh – 492007',
  },
  {
    icon: FaPhone,
    label: 'Phone',
    value: '+91 77140 00000',
    href: 'tel:+917714000000',
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'contact@brokerboss.in',
    href: 'mailto:contact@brokerboss.in',
  },
  {
    icon: FaClock,
    label: 'Working Hours',
    value: 'Mon – Sat, 9:00 AM – 7:00 PM',
  },
];

export default function ContactClient() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // UI only — no backend submission
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-muted/40 border-b py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Contact Us</h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Have questions about a property or want to list with us? Reach out to our Raipur team — we&apos;re happy to help.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Office Info + Form */}
          <div className="space-y-8">
            {/* Office Details */}
            <div>
              <h2 className="text-lg font-semibold mb-5">Our Office</h2>
              <div className="space-y-4">
                {officeDetails.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        {label}
                      </p>
                      {href ? (
                        <a href={href} className="text-sm hover:text-primary transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-lg font-semibold mb-5">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="text-xs font-medium text-muted-foreground block mb-1.5">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-xs font-medium text-muted-foreground block mb-1.5">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-phone" className="text-xs font-medium text-muted-foreground block mb-1.5">
                    Phone <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="+91 98930 XXXXX"
                    className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-xs font-medium text-muted-foreground block mb-1.5">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell us about your property requirements..."
                    className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <FaPaperPlane className="h-3.5 w-3.5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Right: Map */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Find Us on Map</h2>
            <div className="rounded-xl overflow-hidden border flex-1 min-h-[400px]">
              <iframe
                id="contact-map"
                title="BrokerBoss Office — Raipur, Chhattisgarh"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117952.53297063637!2d81.5785!3d21.2514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd91a0c4e0ab%3A0xf0f08b39d2fc8f35!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ minHeight: '400px', border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
