import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type QuoteType from '$lib/types/QuoteType';

export const load = (async ({ fetch, cookies, params }) => {
    const results = await fetch('/quotes.json');
    if (!results.ok) {
        error(results.status, {
            message: results.statusText
        });
    }

    const jsonRes = await results.json();
    const quotes = jsonRes['quotes'] as QuoteType[];
    const favouritesCookie = cookies.get('favourites');
    let favourites: number[] = [];
    if (favouritesCookie !== undefined) {
        favourites = JSON.parse(favouritesCookie) as number[];
    }

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

    return { quotes, favourites, initialQuote };
}) satisfies PageServerLoad;
