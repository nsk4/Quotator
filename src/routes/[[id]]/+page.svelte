<script lang="ts">
    import type { PageData } from './$types';
    import type QuoteType from '$lib/types/QuoteType';
    import QuoteBox from '$lib/components/QuoteBox.svelte';
    import { slide } from 'svelte/transition';
    import { favouritesStore } from '$lib/stores/favourites';

    let { data }: { data: PageData } = $props();
    let quotes: QuoteType[] = $derived(data.quotes);

    let categories: string[] = $derived([
        ...new Set(
            quotes
                .map((quote) => {
                    return quote.categories;
                })
                .flat()
        )
    ]);

    let currentQuote: QuoteType | undefined = $state();
    let selectedCategory: string = $state('');
    $effect(() => {
        if (data?.initialQuote) {
            currentQuote = data.initialQuote;
            selectedCategory = data.initialQuote.categories[0];
        }
    });

    const getRandomQuote = (): void => {
        const categoryQuotes = quotes.filter((quote) =>
            quote.categories.includes(selectedCategory)
        );
        currentQuote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
    };

    const starQuote = async (quoteId: number): Promise<void> => {
        if ($favouritesStore.includes(quoteId)) {
            // Unstar quote
            $favouritesStore = $favouritesStore.filter((favourite) => favourite !== quoteId);
        } else {
            // Star quote
            $favouritesStore = [...$favouritesStore, quoteId];
        }
    };
</script>

{#if currentQuote}
    {#key currentQuote}
        <div transition:slide>
            <QuoteBox
                quote={currentQuote}
                isStarred={$favouritesStore.includes(currentQuote.id)}
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
