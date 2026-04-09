import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { GenerateArticleAction } from '@/sanity/actions/GenerateArticle'
import { GenerateImageAction } from '@/sanity/actions/GenerateImage'
import { AutoPublishAction } from '@/sanity/actions/AutoPublish'

export default defineConfig({
  name: 'closing-column',
  title: 'The Closing Column',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Pending Review')
              .child(
                S.documentList()
                  .title('Pending Review')
                  .filter('_type == "guestPost" && reviewStatus == "pending"')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Approved Posts')
              .child(
                S.documentList()
                  .title('Approved')
                  .filter('_type == "guestPost" && reviewStatus == "approved"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('All Guest Posts')
              .child(
                S.documentList()
                  .title('All Guest Posts')
                  .filter('_type == "guestPost"')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Authors')
              .child(S.documentList().title('Authors').filter('_type == "author"')),
          ]),
    }),
  ],

  document: {
    actions: (prev, ctx) => {
      if (ctx.schemaType === 'guestPost') {
        return [
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
        fields: [
          { name: 'title', type: 'string', title: 'Article Headline', validation: (Rule: any) => Rule.required() },
          { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
          { name: 'author', type: 'reference', title: 'Author', to: [{ type: 'author' }] },
          {
            name: 'category',
            type: 'string',
            title: 'Category',
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
          { name: 'excerpt', type: 'text', title: 'Excerpt', rows: 2, validation: (Rule: any) => Rule.max(300) },
          {
            name: 'coverImage',
            type: 'image',
            title: 'Cover Image',
            description: 'Displayed at the top of the article and on article cards',
            options: { hotspot: true },
            fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
          },
          {
            name: 'body',
            type: 'array',
            title: 'Article Body',
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
          { name: 'rawSubmission', type: 'text', title: 'Raw Submission', description: 'Original submitted content — do not edit', readOnly: true },
          { name: 'submissionFile', type: 'file', title: 'Submission File (.docx)' },
          {
            name: 'submittedBy',
            type: 'object',
            title: 'Submitted By',
            fields: [
              { name: 'name', type: 'string', title: 'Name' },
              { name: 'email', type: 'string', title: 'Email' },
            ],
          },
          { name: 'targetUrl', type: 'url', title: 'Target URL' },
          { name: 'anchorText', type: 'string', title: 'Anchor Text' },
          { name: 'anchorPlacement', type: 'text', title: 'Anchor Placement Notes', rows: 2 },
          {
            name: 'package',
            type: 'string',
            title: 'Package',
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
          { name: 'stripePaymentId', type: 'string', title: 'Stripe Payment Intent ID', readOnly: true },
          {
            name: 'reviewStatus',
            type: 'string',
            title: 'Review Status',
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
          { name: 'homepageFeatured', type: 'boolean', title: "Editor's Pick", initialValue: false },
          {
            name: 'featuredExpiry',
            type: 'datetime',
            title: 'Featured Expiry',
            hidden: ({ document }: any) => !document?.homepageFeatured,
          },
          { name: 'publishedAt', type: 'datetime', title: 'Published At' },
        ],
      },
    ],
  },
})
