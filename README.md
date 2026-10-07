# TinkrLabz website

Next.js App Router website. Use Node 24 and pnpm 11.19.0.

## Validate

- `pnpm install --frozen-lockfile`
- `pnpm typecheck`
- `node --experimental-strip-types --test tests/*.test.mjs`
- `pnpm build`
- `pnpm start`

## Vercel preview

Import Muhammad-Umer/TinkrLabz with the Next.js preset and select `suggested-changes`. Use `pnpm build` and the default Next.js output. Configure `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in the Preview environment. The sender must be verified in Resend. Messages go to `hello@tinkrlabz.com`; confirm that inbox before enabling delivery. Missing credentials produce a visible 503 error, never a false success. The form includes server validation, origin checks, payload limits, and a honeypot. Add Vercel Firewall rate limiting for `/api/contact` before public launch.

Preview builds have an X-Robots-Tag noindex header and disallow crawling. Production metadata uses https://www.tinkrlabz.com. In Vercel, designate www as primary and redirect the apex domain; verify HTTPS and canonical redirects after deployment.

For Search Console, obtain the property verification token, set `GOOGLE_SITE_VERIFICATION`, deploy to production, verify ownership, submit `/sitemap.xml`, and request homepage indexing. Search Console access is not configured in this workspace.

## Content requiring owner input

TK-31 is blocked: no approved project evidence is available. `/work` is prepared but does not fabricate case studies. Supply at least two verified summaries before completing that issue. No LinkedIn URL was supplied, so no speculative social link is published. Review Privacy Policy and Website Terms against actual company practices before production. Technology groups follow the Linear issue's supplied list; confirm supported capabilities before launch.

Typography matches main exactly: Montserrat headings (weights 500, 600, 700, 800) and Nunito Sans body text, Latin subsets, loaded through next/font/google.

## Products and positioning

`lib/products.ts` is the approved public product catalog. It starts empty because no product details have been supplied. Add a unique slug, name, description, and a working product URL to publish a product in both the homepage section and `/products`. Keep unpublished concepts out of this catalog. The site supports both TinkrLabz products and client engineering services. Copy focuses on software outcomes and uses no hyphens or dash punctuation in visible text. Cloud provider names are consistently written as Amazon Web Services, Microsoft Azure, and Google Cloud.

## AI positioning

AI services cover applications, retrieval, agents, automation, evaluation, and operational controls. Product availability comes only from the approved catalog. Navigation and inquiry links work directly, and the independent contact form preserves validation and explicit submission.
