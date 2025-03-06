import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type QuoteType from '$lib/types/QuoteType';

export const prerender = true;
export const ssr = false;

export const load: PageLoad = async ({ fetch }) => {
    const results = await fetch('/quotes.json');
    if (!results.ok) {
        error(results.status, {
            message: results.statusText
        });
    }
    const jsonRes = await results.json();
    const quotes = jsonRes['quotes'] as QuoteType[];

    return { quotes };
};
