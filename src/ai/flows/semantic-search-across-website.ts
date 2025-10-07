'use server';

/**
 * @fileOverview Implements semantic search across the website using an LLM.
 *
 * - semanticSearch - A function that performs semantic search and returns relevant content.
 * - SemanticSearchInput - The input type for the semanticSearch function.
 * - SemanticSearchOutput - The return type for the semanticSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SemanticSearchInputSchema = z.object({
  query: z.string().describe('The search query.'),
  productCatalog: z.array(z.string()).optional().describe('The product catalog.'),
  serviceList: z.array(z.string()).optional().describe('The list of services.'),
  resourceLibrary: z.array(z.string()).optional().describe('The resource library content.'),
  blogContent: z.array(z.string()).optional().describe('The blog content.'),
});
export type SemanticSearchInput = z.infer<typeof SemanticSearchInputSchema>;

const SemanticSearchOutputSchema = z.object({
  searchResults: z.array(z.string()).describe('The semantically relevant search results.'),
});
export type SemanticSearchOutput = z.infer<typeof SemanticSearchOutputSchema>;

export async function semanticSearch(input: SemanticSearchInput): Promise<SemanticSearchOutput> {
  return semanticSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'semanticSearchPrompt',
  input: {schema: SemanticSearchInputSchema},
  output: {schema: SemanticSearchOutputSchema},
  prompt: `You are a search assistant that performs semantic searches across website content.

  Based on the user's query, find the most relevant content from the following sources:

  Product Catalog: {{#if productCatalog}}{{{productCatalog}}}{{else}} No product catalog provided. {{/if}}
  Service List: {{#if serviceList}}{{{serviceList}}}{{else}} No service list provided. {{/if}}
  Resource Library: {{#if resourceLibrary}}{{{resourceLibrary}}}{{else}} No resource library provided. {{/if}}
  Blog Content: {{#if blogContent}}{{{blogContent}}}{{else}} No blog content provided. {{/if}}

  Query: {{{query}}}

  Return the search results as a list of strings. Be concise.
  `,
});

const semanticSearchFlow = ai.defineFlow(
  {
    name: 'semanticSearchFlow',
    inputSchema: SemanticSearchInputSchema,
    outputSchema: SemanticSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
