# YoungMinds ET website

Next.js 16 site for YoungMinds ET Inc., a 501(c)(3) supporting students in Ethiopia. Donations run through Stripe Checkout and the newsletter runs through Resend.

## Run locally

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm dev
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm lint` | ESLint |
| `pnpm test` | Unit tests (Node test runner) |

## How giving works

- **One-time gifts:** `/donate` posts the chosen amount to `POST /api/checkout`. The server validates it ($1–$10,000) and creates a Stripe Checkout Session. The donor pays on Stripe's hosted page and returns to `/donate/thank-you`.
- **Monthly gifts:** `/donate/subscribe` lists the four tiers ($3, $10, $25, $50). The tier prices live in `src/lib/campaigns.ts`, never in the browser.
- **Campaigns:** `/donate?campaign=good-drinks` tags the payment with `metadata.campaign`. The live tracker adds up succeeded, non-refunded one-time payments with that tag. Pages refresh it every 60 seconds.
- **Products:** the server creates the Stripe Products it needs (`ym_donation`, `ym_monthly_gift`, `ym_campaign_good_drinks`, `ym_project_adina`) on first use. No Dashboard setup is needed.
- **Managing a monthly gift:** donors use the Stripe customer portal (link in `src/lib/site.ts`). The fallback form emails `subscriptions@youngmindset.org`.

## Stripe setup

1. **API key.** Create a restricted key (Developers → API keys → Create restricted key) with:
   - Checkout Sessions: Write
   - Products: Write
   - Prices: Write
   - PaymentIntents: Read
   - Charges: Read

   Put it in `STRIPE_SECRET_KEY`. Use a test-mode key for local work.
2. **Webhook.** Add an endpoint at `https://www.youngmindset.org/api/stripe-webhook` for the event `checkout.session.completed`. Put its signing secret in `STRIPE_WEBHOOK_SECRET`. The webhook adds donors who tick Stripe's "send me updates" box to the newsletter.
3. **Receipts.** Settings → Customer emails: turn on "Successful payments", so every donor gets an emailed receipt.
4. **Branding.** Settings → Branding: upload the logo and set the brand color `#2F4A2A` and accent `#F2B33D`, so Checkout matches the site.
5. **Payment methods.** Settings → Payment methods: turn on Apple Pay, Google Pay and Link for faster mobile giving.
6. **Customer portal.** Settings → Billing → Customer portal: allow updating payment methods, switching plans and canceling.
7. **Local testing.** `stripe listen --forward-to localhost:3000/api/stripe-webhook` gives a local webhook secret. Use the test card `4242 4242 4242 4242`.

The old Payment Links env vars (`STRIPE_PAYMENT_LINK_ID`, `STRIPE_PAYMENT_LINK_ID_MATRIMONY`) are no longer used. Existing monthly subscribers who joined through old Payment Links are not affected.

## Newsletter setup (Resend)

1. In Resend, create a segment named "Newsletter" and put its ID in `RESEND_NEWSLETTER_SEGMENT_ID`.
2. People join it from the newsletter forms (home, events, thank-you, footer), from the optional box on the Join form, or by opting in at Stripe Checkout.
3. Write and send newsletters from Resend → Broadcasts to that segment. Resend adds the unsubscribe link and honors unsubscribes.

## Updating content

- **Live campaign and events:** `src/lib/campaigns.ts` (`liveCampaign`, `pastCampaigns`). The calendar file is `public/events/good-drinks-brighter-futures.ics`.
- **2025–26 annual report:** `src/content/impact-report.ts`. Sections stay hidden until their data is filled in. Put the PDF in `public/reports/` and set `pdf`.
- **Site details** (email, phone, Instagram, portal link): `src/lib/site.ts`.
- **Design tokens and components:** `src/app/globals.css`.
