import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
    const quoteId: number = await request.json();
    if (!quoteId) {
        throw error(400, 'QuoteId is required!');
    }

    const favouritesCookie = cookies.get('favourites');
    let favourites: number[] = [];
    if (favouritesCookie !== undefined) {
        favourites = JSON.parse(favouritesCookie) as number[];
    }
    favourites = [...favourites, quoteId];
    cookies.set('favourites', JSON.stringify(favourites), { path: '/' });

    return json({ success: true });
};

export const DELETE: RequestHandler = async ({ request, cookies }) => {
    const quoteId: number = await request.json();
    if (!quoteId) {
        throw error(400, 'QuoteId is required!');
    }

    const favouritesCookie = cookies.get('favourites');
    if (favouritesCookie !== undefined) {
        let favourites: number[] = JSON.parse(favouritesCookie);
        favourites = favourites.filter((favourite) => favourite !== quoteId);
        cookies.set('favourites', JSON.stringify(favourites), { path: '/' });
    }

    return json({ success: true });
};
