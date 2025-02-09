import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type QuoteType from '$lib/types/QuoteType';

export const POST: RequestHandler = async ({ request, cookies }) => {
    const quote = await request.json();
    if (!quote) {
        throw error(400, 'Quote is required!');
    }

    const favouritesCookie = cookies.get('favourites');
    let favourites = [] as QuoteType[];
    if (favouritesCookie !== undefined) {
        favourites = JSON.parse(favouritesCookie) as QuoteType[];
    }
    favourites = [...favourites, quote];
    cookies.set('favourites', JSON.stringify(favourites), { path: '/' });
    console.log('api post', favourites.length);

    return json({ success: true });
};
