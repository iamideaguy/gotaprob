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
              Surfacing real problems from everyday life. Not to hand you a business plan, but to spark curiosity.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://x.com/iamideaguy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                @iamideaguy
              </a>
              <span className="text-border">·</span>
              <a
                href="https://www.threads.net/@iamideaguy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink transition-colors"
              >
                <svg viewBox="0 0 192 192" className="h-3.5 w-3.5 fill-current"><path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 9.966 15.861 12.64 26.148l16.19-4.32c-3.337-12.396-8.795-23.259-16.285-32.432C147.933 10.907 126.051 1.208 97.07 1 68.255 1.208 46.57 10.933 31.882 28.955 18.906 45.098 12.282 67.742 12.01 96c.272 28.258 6.896 50.902 19.872 67.045C46.57 181.067 68.255 190.792 97.07 191c26.286-.189 44.885-7.423 60.168-23.613 20.597-21.677 19.926-48.699 13.151-65.326-4.79-11.162-13.944-20.223-28.852-26.073Z"/><path d="M119.008 100.858c-.542-.259-1.083-.511-1.625-.756-2.003-19.214-12.138-29.372-31.227-29.499h-.259c-11.29 0-20.735 4.82-26.465 13.587l10.426 7.147c4.328-6.575 11.151-7.974 16.131-7.974h.172c6.228.04 10.938 1.853 13.996 5.389 2.212 2.572 3.697 6.134 4.432 10.618-5.525-.939-11.503-1.228-17.887-.861-18.004 1.036-29.576 11.536-28.794 26.128.395 7.404 4.084 13.783 10.384 17.926 5.327 3.517 12.187 5.237 19.322 4.847 9.415-.516 16.802-4.11 21.963-10.677 3.912-4.989 6.391-11.455 7.484-19.614 4.489 2.71 7.818 6.274 9.651 10.565 3.125 7.286 3.306 19.264-6.463 29.018-8.56 8.549-18.842 12.248-34.41 12.36-17.246-.128-30.314-5.659-38.813-16.437C67.26 140.66 63.156 125.54 63 103.973c.156-21.617 4.305-36.65 12.311-44.692 7.787-7.828 20.635-11.825 37.932-12h.259c17.38.129 30.507 5.698 39.038 16.554 4.32 5.313 7.537 11.998 9.561 19.784l12.254-3.273c-2.523-9.376-6.659-17.592-12.327-24.52-10.614-13.04-26.477-19.747-47.526-19.943h-.259c-21.089.196-37.144 6.94-47.729 20.044-9.538 12.071-14.43 29.633-14.556 52.073.126 22.44 5.018 40.003 14.556 52.073 10.585 13.104 26.64 19.848 47.729 20.044 18.974-.162 32.376-5.24 43.556-16.982 14.824-15.619 14.369-35.108 9.571-47.225-3.624-8.447-10.554-15.29-21.633-19.017Z"/></svg>
                @iamideaguy
              </a>
            </div>
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
