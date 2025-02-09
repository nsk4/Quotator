<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import MaterialSymbolsStarOutline from 'virtual:icons/material-symbols/star-outline';
    import MaterialSymbolsStar from 'virtual:icons/material-symbols/star';
    import MaterialSymbolsShare from 'virtual:icons/material-symbols/share';
    import type QuoteType from '$lib/types/QuoteType';
    import { invalidateAll } from '$app/navigation';

    let { data }: { data: PageData } = $props();
    let quotes: QuoteType[] = $derived(data.quotes);
    let favourites: QuoteType[] = $derived(data.favourites);
    $inspect('fav', favourites.length);

    let categories: string[] = $derived([
        ...new Set(
            quotes.map((quote) => {
                return quote.category;
            })
        )
    ]);
    let selectedCategory = $state('');
    let currentQuote: QuoteType | undefined = $state();

    const getRandomQuote = (): void => {
        // TODO: search within set category
        currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
        selectedCategory = currentQuote.category;
    };

    onMount(() => {
        getRandomQuote();
    });

    const isQuoteStarred = (): boolean => {
        return favourites.find((favourite) => favourite.text === currentQuote?.text) !== undefined;
    };

    const starQuote = async (): Promise<void> => {
        // TODO: remove from favourites if already on the list
        const response = await fetch('/api/favourites', {
            method: 'POST',
            body: JSON.stringify(currentQuote)
        });
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

<div class="quote-box">
    <p class="quote">"{currentQuote?.text}"</p>
    <hr />
    <p class="author">- {currentQuote?.author}</p>

    <p class="quote-controls">
        <button class="star-button" onclick={starQuote}>
            {#if isQuoteStarred()}
                <MaterialSymbolsStar />
            {:else}
                <MaterialSymbolsStarOutline />
            {/if}
        </button>

        <button class="share-button" onclick={() => shareQuote()}>
            <MaterialSymbolsShare />
        </button>
    </p>
</div>

<div class="controls">
    <select class="category-select" bind:value={selectedCategory}>
        {#each categories as category}
            <option value={category}>{category}</option>
        {/each}
    </select>
    <button class="new-quote-button" onclick={getRandomQuote}>Get Another Quote</button>
</div>

<style lang="scss">
    .quote-box {
        text-align: center;
        padding: 20px;
        border: 1px solid #444;
        border-radius: 10px;
        background: #1e1e1e;
        position: relative;
        color: #f5f5f5;

        .quote {
            font-size: 1.8rem;
            font-weight: bold;
            margin: 0;
        }

        hr {
            margin: 10px 0;
            border: 0;
            border-top: 1px solid #444;
        }

        .author {
            font-size: 1rem;
            color: #a5a5a5;
            margin-top: 10px;
        }

        .quote-controls {
            position: absolute;
            bottom: 10px;
            right: 10px;
            margin: 0;
            padding: 0;

            button {
                font-size: 1.5rem;
                background: inherit;
                color: #a5a5a5;
                border: none;
                cursor: pointer;

                &:hover {
                    color: #f5f5f5;
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
