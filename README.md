# TinkrLabz website

Next.js App Router website. Use Node 24 and pnpm 11.19.0.

## Validate

- `pnpm install --frozen-lockfile`
- `pnpm typecheck`
- `node --experimental-strip-types --test tests/contact.test.mjs`
- `pnpm build`
- `pnpm start`

## Vercel preview

Import Muhammad-Umer/TinkrLabz with the Next.js preset and select `suggested-changes`. Use `pnpm build` and the default Next.js output. Configure `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in the Preview environment. The sender must be verified in Resend. Messages go to `hello@tinkrlabz.com`; confirm that inbox before enabling delivery. Missing credentials produce a visible 503 error, never a false success. The form includes server validation, origin checks, payload limits, and a honeypot. Add Vercel Firewall rate limiting for `/api/contact` before public launch.

Preview builds have an X-Robots-Tag noindex header and disallow crawling. Production metadata uses https://www.tinkrlabz.com. In Vercel, designate www as primary and redirect the apex domain; verify HTTPS and canonical redirects after deployment.

For Search Console, obtain the property verification token, set `GOOGLE_SITE_VERIFICATION`, deploy to production, verify ownership, submit `/sitemap.xml`, and request homepage indexing. Search Console access is not configured in this workspace.

## Content requiring owner input

TK-31 is blocked: no approved project evidence is available. `/work` is prepared but does not fabricate case studies. Supply at least two verified summaries before completing that issue. No LinkedIn URL was supplied, so no speculative social link is published. Review Privacy Policy and Website Terms against actual company practices before production. Technology groups follow the Linear issue's supplied list; confirm supported capabilities before launch.

System fonts avoid build-time requests to Google Fonts. To restore custom typography, add licensed, self-hosted Montserrat and Nunito Sans files with `next/font/local`.

## Products and positioning

`lib/products.ts` is the approved public product catalog. It starts empty because no product details have been supplied. Add a unique slug, name, description, and a working product URL to publish a product in both the homepage section and `/products`. Keep unpublished concepts out of this catalog. The site supports both TinkrLabz products and client engineering services. Copy focuses on software outcomes and uses no hyphens or dash punctuation in visible text. Cloud capabilities include AWS, Azure, and Google Cloud Platform (GCP).
