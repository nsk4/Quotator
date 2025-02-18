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

    let selectedCategory: string | undefined = $state();
    let currentQuote: QuoteType | undefined = $state();

    const getRandomQuote = (): void => {
        if (!selectedCategory) {
            // Category not selected, for example during first page load
            currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
            selectedCategory = currentQuote.category;
        } else {
            // Category selected, get random quote from that category
            const categoryQuotes = quotes.filter((quote) => quote.category === selectedCategory);
            currentQuote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
            selectedCategory = currentQuote.category;
        }
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

    const starQuote = async (quoteId: number): Promise<void> => {
        let response;
        if (favourites.includes(quoteId)) {
            // Create delete request to delete a starred quote
            response = await fetch('/api/favourites', {
                method: 'DELETE',
                body: JSON.stringify(quoteId)
            });
        } else {
            // Create post request to add starred quote
            response = await fetch('/api/favourites', {
                method: 'POST',
                body: JSON.stringify(quoteId)
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

{#if currentQuote}
    <QuoteBox
        quote={currentQuote}
        isStarred={favourites.includes(currentQuote.id)}
        starQuote={() => currentQuote && starQuote(currentQuote.id)}
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
{:else}
    <div class="loading-container">
        <div class="loading-icon"></div>
    </div>
{/if}

<style lang="scss">
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        .loading-icon {
            width: 50px;
            height: 50px;
            border: 5px solid #444;
            border-top-color: #f5f5f5;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            @keyframes spin {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
        }
    }

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
