import { ContentfulContentSource } from "@stackbit/cms-contentful";
import { generateTextAction } from '@/utils/actions';

const config = {
  stackbitVersion: "~0.6.0",
  ssgName: "nextjs",
  nodeVersion: "18",
  contentSources: [
    new ContentfulContentSource({
      spaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || "master",
      previewToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN,
    }),
  ],
  modelExtensions: [
    { name: "page", type: "page", urlPath: "/{slug}" },
    {
      name: "brandSection",
      fields: [
        {
          name: "title",
          type: "string",
          actions: [generateTextAction]
        },
        {
          name: "description",
          type: "markdown",
          actions: [generateTextAction]
        }
      ]
    },
    {
      name: 'bulletPoint',
      fields: [
        {
          name: 'text',
          type: 'markdown',
          actions: [generateTextAction]
        }
      ]
    },
    {
      name: 'statItem',
      fields: [
        {
          name: 'value',
          type: 'string',
          actions: [generateTextAction]
        }
      ]
    },
    {
      name: 'footerSection',
      fields: [
        {
          name: 'title',
          type: 'string',
          actions: [generateTextAction]
        }
      ]
    }
  ],
};

export default config;
