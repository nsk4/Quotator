import type QuoteType from '$lib/types/QuoteType';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    const favouritesCookie = cookies.get('favourites');
    let favourites = [] as QuoteType[];
    if (favouritesCookie !== undefined) {
        favourites = JSON.parse(favouritesCookie) as QuoteType[];
    }
    return { favourites };
}) satisfies PageServerLoad;
