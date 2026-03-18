import Link from "next/link";
import { Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { config } from "@/lib/vertical.config";
import { crosslinks } from "@/lib/crosslinks";

const socialLinks = Object.entries(config.social)
  .map(([platform, href]) => {
    const icons: Record<string, typeof Instagram> = {
      instagram: Instagram,
      linkedin: Linkedin,
      facebook: Facebook,
      twitter: Twitter,
    };
    const icon = icons[platform];
    if (!icon) return null;
    return { href, label: platform.charAt(0).toUpperCase() + platform.slice(1), icon };
  })
  .filter(Boolean) as Array<{ href: string; label: string; icon: typeof Instagram }>;

const footerLinks = {
  product: [
    { href: "#how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ],
  bestFor: [
    { href: "/best-for", label: "All Use Cases" },
  ],
  alternatives: [
    { href: "/alternatives", label: "All Alternatives" },
  ],
  resources: [
    { href: "/blog", label: "Blog" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold font-heading text-primary">{config.brandName}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {config.tagline}. Respond, qualify, and book 24/7.
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-4 flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Product */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Best For */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Best For</h3>
            <ul className="space-y-3">
              {footerLinks.bestFor.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Alternatives */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Alternatives</h3>
            <ul className="space-y-3">
              {footerLinks.alternatives.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Network (cross-links) */}
          {crosslinks.length > 0 && (
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Network</h3>
              <ul className="space-y-3">
                {crosslinks.map((link) => (
                  <li key={link.domain}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {config.brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
