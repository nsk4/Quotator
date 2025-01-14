import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({fetch}) => {
    const results = await fetch("/quotes.json");
    if(!results.ok) {
        error(results.status, {
			message: results.statusText
		});
    }

    const quotes = await results.json();
    return {quotes};
}) satisfies PageServerLoad;