import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM ?? 'The Closing Column <onboarding@resend.dev>'
const ADMIN = process.env.ADMIN_EMAIL ?? ''

const PACKAGE_LABELS: Record<string, string> = {
  standard: 'Standard ($89)',
  premium:  'Premium ($139)',
  featured: 'Featured ($199)',
}

const TURNAROUND: Record<string, string> = {
  standard: '5 business days',
  premium:  '3 business days',
  featured: '2 business days',
}

export async function sendBuyerConfirmation(meta: Record<string, string>) {
  const pkg       = meta.package ?? ''
  const name      = meta.contactName ?? 'there'
  const firstName = name.split(' ')[0]
  const title     = meta.articleTitle ?? '(untitled)'
  const turnaround = TURNAROUND[pkg] ?? '5 business days'

  return resend.emails.send({
    from:    FROM,
    to:      meta.contactEmail,
    subject: 'Your guest post submission is confirmed — The Closing Column',
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e293b">
        <div style="background:#0F172A;padding:32px 40px;border-radius:8px 8px 0 0">
          <p style="color:#f59e0b;font-weight:700;font-size:13px;letter-spacing:.1em;text-transform:uppercase;margin:0 0 8px">The Closing Column</p>
          <h1 style="color:#fff;font-size:24px;margin:0">Submission Confirmed</h1>
        </div>
        <div style="background:#fff;padding:32px 40px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">
          <p style="margin:0 0 16px">Hi ${firstName},</p>
          <p style="margin:0 0 16px">We've received your guest post submission and payment is confirmed. Here's a summary:</p>

          <table style="width:100%;border-collapse:collapse;margin:0 0 24px">
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:10px 0;color:#64748b;font-size:14px;width:40%">Package</td>
              <td style="padding:10px 0;font-size:14px;font-weight:600">${PACKAGE_LABELS[pkg] ?? pkg}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:10px 0;color:#64748b;font-size:14px">Article Title</td>
              <td style="padding:10px 0;font-size:14px;font-weight:600">${title}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:10px 0;color:#64748b;font-size:14px">Target URL</td>
              <td style="padding:10px 0;font-size:14px">${meta.targetUrl ?? '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#64748b;font-size:14px">Turnaround</td>
              <td style="padding:10px 0;font-size:14px;font-weight:600">${turnaround}</td>
            </tr>
          </table>

          <p style="margin:0 0 16px;font-size:14px;color:#475569">
            Our editorial team will begin review within one business day. We'll reach out if we have any questions before publication.
          </p>
          <p style="margin:0 0 32px;font-size:14px;color:#475569">
            All links will carry <code style="background:#f1f5f9;padding:1px 4px;border-radius:3px;font-size:13px">rel=sponsored</code> per our editorial policy.
          </p>

          <p style="margin:0;font-size:14px;color:#94a3b8">— The Closing Column Editorial Team</p>
        </div>
      </div>
    `,
  })
}

export async function sendAdminNotification(meta: Record<string, string>, amountTotal: number | null) {
  const amount = amountTotal ? `$${(amountTotal / 100).toFixed(2)}` : '—'

  return resend.emails.send({
    from:    FROM,
    to:      ADMIN,
    subject: `New paid submission: ${meta.articleTitle ?? '(untitled)'} [${meta.package}]`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e293b">
        <div style="background:#0F172A;padding:24px 32px;border-radius:8px 8px 0 0">
          <p style="color:#f59e0b;font-weight:700;font-size:12px;letter-spacing:.1em;text-transform:uppercase;margin:0 0 6px">New Submission</p>
          <h1 style="color:#fff;font-size:20px;margin:0">${meta.articleTitle ?? '(untitled)'}</h1>
        </div>
        <div style="background:#fff;padding:24px 32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse">
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:8px 0;color:#64748b;font-size:14px;width:40%">Amount</td>
              <td style="padding:8px 0;font-size:14px;font-weight:700;color:#16a34a">${amount}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:8px 0;color:#64748b;font-size:14px">Package</td>
              <td style="padding:8px 0;font-size:14px">${PACKAGE_LABELS[meta.package] ?? meta.package}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:8px 0;color:#64748b;font-size:14px">Name</td>
              <td style="padding:8px 0;font-size:14px">${meta.contactName ?? '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:8px 0;color:#64748b;font-size:14px">Email</td>
              <td style="padding:8px 0;font-size:14px">${meta.contactEmail ?? '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:8px 0;color:#64748b;font-size:14px">Target URL</td>
              <td style="padding:8px 0;font-size:14px">${meta.targetUrl ?? '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:8px 0;color:#64748b;font-size:14px">Anchor Text</td>
              <td style="padding:8px 0;font-size:14px">${meta.anchorText ?? '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:8px 0;color:#64748b;font-size:14px">Anchor Placement</td>
              <td style="padding:8px 0;font-size:14px">${meta.anchorPlacement || '—'}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#64748b;font-size:14px;vertical-align:top">Article Preview</td>
              <td style="padding:8px 0;font-size:13px;color:#475569;white-space:pre-wrap">${meta.articlePreview || '—'}</td>
            </tr>
          </table>
        </div>
      </div>
    `,
  })
}
