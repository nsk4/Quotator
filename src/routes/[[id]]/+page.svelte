<script lang="ts">
    import type { PageData } from './$types';
    import type QuoteType from '$lib/types/QuoteType';
    import { invalidateAll } from '$app/navigation';
    import QuoteBox from '$lib/components/QuoteBox.svelte';
    import { slide } from 'svelte/transition';

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

    let currentQuote: QuoteType | undefined = $state();
    let selectedCategory: string = $state('');
    $effect(() => {
        if (data?.initialQuote) {
            currentQuote = data.initialQuote;
            selectedCategory = data.initialQuote.category;
        }
    });

    const getRandomQuote = (): void => {
        const categoryQuotes = quotes.filter((quote) => quote.category === selectedCategory);
        currentQuote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
    };

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
            // Store and restore quote since invalidateAll() will reacquire quotes from backend and thus reset it.
            const oldCurrentQuote = currentQuote;
            const oldSelectedCategory = selectedCategory;
            await invalidateAll();
            currentQuote = oldCurrentQuote;
            selectedCategory = oldSelectedCategory;
        } else {
            // TODO: Display error message to the user
            alert(responseJSON.message);
        }
    };
</script>

{#if currentQuote}
    {#key currentQuote}
        <div transition:slide>
            <QuoteBox
                quote={currentQuote}
                isStarred={favourites.includes(currentQuote.id)}
                starQuote={() => currentQuote && starQuote(currentQuote.id)}
            />
        </div>
    {/key}
    <div class="controls">
        <select class="category-select" bind:value={selectedCategory}>
            {#each categories as category}
                <option value={category} selected={category === selectedCategory}>{category}</option
                >
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
