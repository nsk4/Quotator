import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type QuoteType from '$lib/types/QuoteType';
import { base } from '$app/paths';

export const ssr = false;

export const load: PageLoad = async ({ fetch, params }) => {
    const results = await fetch(base + '/quotes.json');
    if (!results.ok) {
        error(results.status, {
            message: results.statusText
        });
    }

    let jsonRes;
    try {
        jsonRes = await results.json();
    } catch (e) {
        error(404, {
            message: 'Error while fetch or parsing quotes.'
        });
    }

    const quotes = jsonRes['quotes'] as QuoteType[];

    // Check if quote was shared via link.
    let sharedQuote: QuoteType | undefined = undefined;
    if (!isNaN(Number(params.id))) {
        sharedQuote = quotes.find((quote) => quote.id === Number(params.id));
    }

    let initialQuote: QuoteType;
    if (sharedQuote === undefined) {
        // Quote was either not shared or contained an invalid id. Pick a random quote for initial quote.
        initialQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } else {
        // Quote was shared via link.
        initialQuote = sharedQuote;
    }

    return { quotes, initialQuote };
};
