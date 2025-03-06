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

    let jsonRes;
    try {
        jsonRes = await results.json();
    } catch (e) {
        error(404, {
            message: 'Error while fetch or parsing quotes.'
        });
    }

    const quotes = jsonRes['quotes'] as QuoteType[];
    return { quotes };
};
