<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import type QuoteType from '$lib/types/QuoteType';
    import { invalidateAll } from '$app/navigation';
    import QuoteBox from '$lib/components/QuoteBox.svelte';
    import { page } from '$app/state';

    let { data }: { data: PageData } = $props();
    let quotes: QuoteType[] = $derived(data.quotes);
    let favourites: number[] = $derived(data.favourites);

    let categories: string[] = $derived([
        ...new Set(
            quotes.map((quote) => {
                return quote.category;
            })
        )
    ]);

    let selectedCategory = $state('');
    let currentQuote: QuoteType = $state({ id: NaN, text: '', author: '', category: '' });

    //let currentQuote: QuoteType = data?.selectedQuote;

    const getRandomQuote = (): void => {
        // TODO: search within set category
        currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
        selectedCategory = currentQuote.category;
    };

    onMount(() => {
        const quoteParam = page.url.searchParams.get('id');
        if (!quoteParam) {
            // Quote was not passed as parameter
            getRandomQuote();
        }

        const quoteid = Number(quoteParam);
        const foundQuote = quotes.find((quote) => quote.id === quoteid);
        if (foundQuote !== undefined) {
            currentQuote = foundQuote;
            selectedCategory = currentQuote.category;
        } else {
            // Invalid parameter, get random quote
            getRandomQuote();
        }
    });

    const starQuote = async (): Promise<void> => {
        let response;
        if (favourites.includes(currentQuote.id)) {
            // Create delete request to delete a starred quote
            response = await fetch('/api/favourites', {
                method: 'DELETE',
                body: JSON.stringify(currentQuote.id)
            });
        } else {
            // Create post request to add starred quote
            response = await fetch('/api/favourites', {
                method: 'POST',
                body: JSON.stringify(currentQuote.id)
            });
        }

        const responseJSON = await response.json();
        if (response.ok) {
            invalidateAll();
        } else {
            // TODO: Display error message to the user
            alert(responseJSON.message);
        }
    };

    const shareQuote = (): void => {
        /*
        const shareData = {
            title: 'Daily Quote',
            text: `Here is an inspiring quote for you: "${quote}"`,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData).catch(console.error);
        } else {
            alert('Sharing is not supported on your device.');
        }
        */
    };
</script>

<QuoteBox
    quote={currentQuote}
    isStarred={favourites.includes(currentQuote.id)}
    {starQuote}
    {shareQuote}
/>

<div class="controls">
    <select class="category-select" bind:value={selectedCategory}>
        {#each categories as category}
            <option value={category}>{category}</option>
        {/each}
    </select>
    <button class="new-quote-button" onclick={getRandomQuote}>Get Another Quote</button>
</div>

<style lang="scss">
    .controls {
        display: flex;
        gap: 10px;
        margin-top: 20px;

        .category-select {
            padding: 10px;
            font-size: 1rem;
            background: #1e1e1e;
            color: #f5f5f5;
            border: 1px solid #444;
            border-radius: 8px;
            cursor: pointer;
        }

        .new-quote-button {
            padding: 10px 20px;
            font-size: 1rem;
            background: #333;
            color: #f5f5f5;
            border: 1px solid #444;
            border-radius: 8px;
            cursor: pointer;

            &:hover {
                background: #444;
            }
        }
    }
</style>
