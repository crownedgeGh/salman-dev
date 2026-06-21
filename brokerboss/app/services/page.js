import { services } from '@/data/services';
import {
  FaListAlt,
  FaShieldAlt,
  FaChartBar,
  FaFileContract,
  FaLightbulb,
  FaKey,
} from 'react-icons/fa';

const iconMap = {
  FaListAlt,
  FaShieldAlt,
  FaChartBar,
  FaFileContract,
  FaLightbulb,
  FaKey,
};

export const metadata = {
  title: 'Our Services – BrokerBoss Raipur',
  description:
    'Explore BrokerBoss services: property listing, broker verification, market valuation, legal assistance, investment advisory, and rental management in Raipur.',
};

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-muted/40 border-b py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Our Services
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            BrokerBoss offers a complete suite of real estate services to help buyers, sellers, and brokers in Raipur, Chhattisgarh navigate the property market with confidence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.iconName] || FaListAlt;
            return (
              <div
                key={service.id}
                className="group p-6 rounded-xl border bg-card hover:shadow-md transition-shadow duration-200"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-base font-semibold mb-2">{service.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/40 border-t py-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-xl font-bold mb-2">Ready to get started?</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Contact our team to learn more about any service or to list your property on BrokerBoss today.
          </p>
        </div>
      </section>
    </div>
  );
}
