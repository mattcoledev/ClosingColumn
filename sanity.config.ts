import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import {
  ClockIcon,
  CheckmarkCircleIcon,
  CloseCircleIcon,
  DocumentsIcon,
  UsersIcon,
  EditIcon,
  ComposeIcon,
  LinkIcon,
  DashboardIcon,
  StarIcon,
  CreditCardIcon,
  InboxIcon,
} from '@sanity/icons'
import { ExcerptInput } from '@/sanity/components/ExcerptInput'
import { GenerateArticleAction } from '@/sanity/actions/GenerateArticle'
import { GenerateImageAction } from '@/sanity/actions/GenerateImage'
import { AutoPublishAction } from '@/sanity/actions/AutoPublish'
import { ImportMarkdownAction } from '@/sanity/actions/ImportMarkdown'

export default defineConfig({
  name: 'closing-column',
  title: 'The Closing Column',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      name: 'content',
      title: 'Content',
      icon: DashboardIcon,
      structure: (S) =>
        S.list()
          .title('The Closing Column')
          .items([
            S.listItem()
              .title('Pending Review')
              .icon(ClockIcon)
              .schemaType('guestPost')
              .child(
                S.documentList()
                  .title('Pending Review')
                  .schemaType('guestPost')
                  .filter('_type == "guestPost" && reviewStatus == "pending"')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Approved & Published')
              .icon(CheckmarkCircleIcon)
              .schemaType('guestPost')
              .child(
                S.documentList()
                  .title('Approved & Published')
                  .schemaType('guestPost')
                  .filter('_type == "guestPost" && reviewStatus == "approved"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Rejected')
              .icon(CloseCircleIcon)
              .schemaType('guestPost')
              .child(
                S.documentList()
                  .title('Rejected')
                  .schemaType('guestPost')
                  .filter('_type == "guestPost" && reviewStatus == "rejected"')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('All Submissions')
              .icon(DocumentsIcon)
              .schemaType('guestPost')
              .child(
                S.documentList()
                  .title('All Submissions')
                  .schemaType('guestPost')
                  .filter('_type == "guestPost"')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Authors')
              .icon(UsersIcon)
              .schemaType('author')
              .child(S.documentList().title('Authors').schemaType('author').filter('_type == "author"')),
          ]),
    }),
    visionTool({ defaultApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-04-08' }),
  ],

  document: {
    actions: (prev, ctx) => {
      if (ctx.schemaType === 'guestPost') {
        return [
          ImportMarkdownAction,
          GenerateArticleAction,
          GenerateImageAction,
          // Replace the default Publish with AutoPublish (stamps publishedAt = now if not set)
          ...prev.map((action: any) =>
            action.action === 'publish' ? AutoPublishAction : action
          ),
        ]
      }
      return prev
    },
  },

  schema: {
    types: [
      {
        name: 'author',
        type: 'document',
        title: 'Author',
        icon: UsersIcon,
        preview: {
          select: {
            title: 'name',
            media: 'avatar',
          },
        },
        fields: [
          { name: 'name', type: 'string', title: 'Display Name', validation: (Rule: any) => Rule.required() },
          { name: 'bio', type: 'text', title: 'Bio', rows: 3 },
          { name: 'avatar', type: 'image', title: 'Headshot', options: { hotspot: true } },
          { name: 'website', type: 'url', title: 'Website' },
        ],
      },
      {
        name: 'guestPost',
        type: 'document',
        title: 'Guest Post',
        icon: ComposeIcon,
        groups: [
          { name: 'content', title: 'Content', icon: EditIcon, default: true },
          { name: 'link', title: 'Link Details', icon: LinkIcon },
          { name: 'submission', title: 'Submission', icon: InboxIcon },
          { name: 'payment', title: 'Payment & Status', icon: CreditCardIcon },
          { name: 'editorial', title: 'Editorial', icon: StarIcon },
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'submittedBy.name',
            media: 'coverImage',
            status: 'reviewStatus',
            pkg: 'package',
          },
          prepare({ title, subtitle, media, status, pkg }: any) {
            const statusLabel: Record<string, string> = {
              pending: 'Pending',
              approved: 'Approved',
              rejected: 'Rejected',
              'revision-requested': 'Revision Requested',
            }
            const pkgLabel: Record<string, string> = {
              standard: 'Standard',
              premium: 'Premium',
              featured: 'Featured',
            }
            const parts = [
              subtitle,
              pkgLabel[pkg],
              statusLabel[status],
            ].filter(Boolean)
            return {
              title,
              subtitle: parts.join(' · '),
              media,
            }
          },
        },
        fields: [
          // ── Content ──────────────────────────────────────────────────────────
          {
            name: 'title',
            type: 'string',
            title: 'Article Headline',
            group: 'content',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            group: 'content',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'author',
            type: 'reference',
            title: 'Author',
            group: 'content',
            to: [{ type: 'author' }],
          },
          {
            name: 'category',
            type: 'string',
            title: 'Category',
            group: 'content',
            options: {
              list: [
                { title: 'Homebuying', value: 'homebuying' },
                { title: 'Investing', value: 'investing' },
                { title: 'Market Analysis', value: 'market-analysis' },
                { title: 'Agents & Industry', value: 'agents-industry' },
                { title: 'Property Types', value: 'property-types' },
                { title: 'Local Markets', value: 'local-markets' },
              ],
              layout: 'radio',
            },
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'excerpt',
            type: 'text',
            title: 'Excerpt',
            group: 'content',
            rows: 2,
            validation: (Rule: any) => Rule.max(300),
            components: { input: ExcerptInput },
          },
          {
            name: 'coverImage',
            type: 'image',
            title: 'Cover Image',
            group: 'content',
            description: 'Displayed at the top of the article and on article cards',
            options: { hotspot: true },
            fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
          },
          {
            name: 'body',
            type: 'array',
            title: 'Article Body',
            group: 'content',
            of: [
              { type: 'block' },
              {
                type: 'image',
                options: { hotspot: true },
                fields: [
                  { name: 'alt', type: 'string', title: 'Alt text' },
                  { name: 'caption', type: 'string', title: 'Caption' },
                ],
              },
            ],
          },

          // ── Link Details ─────────────────────────────────────────────────────
          { name: 'targetUrl', type: 'url', title: 'Target URL', group: 'link' },
          { name: 'anchorText', type: 'string', title: 'Anchor Text', group: 'link' },
          {
            name: 'anchorPlacement',
            type: 'text',
            title: 'Anchor Placement Notes',
            group: 'link',
            rows: 2,
          },

          // ── Submission ───────────────────────────────────────────────────────
          {
            name: 'submittedBy',
            type: 'object',
            title: 'Submitted By',
            group: 'submission',
            fields: [
              { name: 'name', type: 'string', title: 'Name' },
              { name: 'email', type: 'string', title: 'Email' },
            ],
          },
          {
            name: 'rawSubmission',
            type: 'text',
            title: 'Raw Submission',
            group: 'submission',
            description: 'Original submitted content — do not edit',
            readOnly: true,
          },
          { name: 'submissionFile', type: 'file', title: 'Submission File (.docx)', group: 'submission' },

          // ── Payment & Status ─────────────────────────────────────────────────
          {
            name: 'package',
            type: 'string',
            title: 'Package',
            group: 'payment',
            options: {
              list: [
                { title: 'Standard ($89)', value: 'standard' },
                { title: 'Premium ($139)', value: 'premium' },
                { title: 'Featured ($199)', value: 'featured' },
              ],
              layout: 'radio',
            },
          },
          {
            name: 'paymentStatus',
            type: 'string',
            title: 'Payment Status',
            group: 'payment',
            options: {
              list: [
                { title: 'Paid', value: 'paid' },
                { title: 'Unpaid', value: 'unpaid' },
                { title: 'Refunded', value: 'refunded' },
              ],
              layout: 'radio',
            },
            initialValue: 'unpaid',
          },
          {
            name: 'stripePaymentId',
            type: 'string',
            title: 'Stripe Payment Intent ID',
            group: 'payment',
            readOnly: true,
          },
          {
            name: 'reviewStatus',
            type: 'string',
            title: 'Review Status',
            group: 'payment',
            options: {
              list: [
                { title: 'Pending', value: 'pending' },
                { title: 'Approved', value: 'approved' },
                { title: 'Rejected', value: 'rejected' },
                { title: 'Revision Requested', value: 'revision-requested' },
              ],
              layout: 'radio',
            },
            initialValue: 'pending',
          },
          { name: 'publishedAt', type: 'datetime', title: 'Published At', group: 'payment' },

          // ── Editorial ────────────────────────────────────────────────────────
          {
            name: 'homepageFeatured',
            type: 'boolean',
            title: "Editor's Pick",
            group: 'editorial',
            initialValue: false,
          },
          {
            name: 'featuredExpiry',
            type: 'datetime',
            title: 'Featured Expiry',
            group: 'editorial',
            hidden: ({ document }: any) => !document?.homepageFeatured,
          },
        ],
      },
    ],
  },
})
