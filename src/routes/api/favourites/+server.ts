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

    return json({ success: true });
};

export const DELETE: RequestHandler = async ({ request, cookies }) => {
    const quote = await request.json();
    if (!quote) {
        throw error(400, 'Quote is required!');
    }

    const favouritesCookie = cookies.get('favourites');
    if (favouritesCookie !== undefined) {
        let favourites: QuoteType[] = JSON.parse(favouritesCookie);
        favourites = favourites.filter((favourite) => favourite.text !== quote.text);
        cookies.set('favourites', JSON.stringify(favourites), { path: '/' });
    }

    return json({ success: true });
};
