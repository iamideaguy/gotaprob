import Link from 'next/link'

const LINKS = {
  Browse: [
    { name: 'All Problems', href: '/browse' },
    { name: 'Categories', href: '/categories' },
    { name: 'Top Scored', href: '/browse?sort=top' },
    { name: 'Most Recent', href: '/browse?sort=recent' },
  ],
  Company: [
    { name: 'About', href: '/about' },
    { name: 'Submit a Problem', href: '/submit' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ],
  Legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream-200 mt-16">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-xl italic text-ink">
              gotaprob
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Surfacing real problems from everyday life. Not to hand you a business plan — to spark curiosity.
            </p>
          </div>
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <p className="mb-4 text-2xs font-medium uppercase tracking-widest text-muted">
                {section}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-ink hover:text-forest-600 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted">© {new Date().getFullYear()} gotaprob. All rights reserved.</p>
          <p className="text-xs text-muted">Made with curiosity.</p>
        </div>
      </div>
    </footer>
  )
}
