import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1a1612" },
      { name: "format-detection", content: "telephone=yes" },
      { name: "geo.region", content: "IN-GJ" },
      { name: "geo.placename", content: "Nehrunagar, Ahmedabad" },
      { name: "geo.position", content: "23.0307;72.5497" },
      { name: "ICBM", content: "23.0307, 72.5497" },
      { name: "google-site-verification", content: "EsiEUaZCt4V6r35C8aHJ_9CWa_2q9xwuLWriwS-vPzY" },
      { title: "Venus Universe Nehrunagar" },
      { property: "og:title", content: "Venus Universe Nehrunagar" },
      { name: "twitter:title", content: "Venus Universe Nehrunagar" },
      { name: "description", content: "Venus Universe is a luxury real estate platform with advanced EOI, lead management, and integrated SEO tools." },
      { property: "og:description", content: "Venus Universe is a luxury real estate platform with advanced EOI, lead management, and integrated SEO tools." },
      { name: "twitter:description", content: "Venus Universe is a luxury real estate platform with advanced EOI, lead management, and integrated SEO tools." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0f8b61e5-8bdb-4a06-90ec-149d1f474955/id-preview-f0a8d03d--06061fcf-9626-45a1-b3af-0692a3aac4c3.lovable.app-1784182925615.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0f8b61e5-8bdb-4a06-90ec-149d1f474955/id-preview-f0a8d03d--06061fcf-9626-45a1-b3af-0692a3aac4c3.lovable.app-1784182925615.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" },
      { rel: "preconnect", href: "https://www.googletagmanager.com" },
      { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
    ],
    scripts: [
      { src: "https://www.googletagmanager.com/gtag/js?id=G-0ZYZ0P3K5W", async: true },
      {
        children:
          "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-0ZYZ0P3K5W');",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
