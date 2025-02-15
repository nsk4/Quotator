import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type QuoteType from '$lib/types/QuoteType';

export const load = (async ({ fetch, cookies }) => {
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

    return { quotes, favourites };
}) satisfies PageServerLoad;
