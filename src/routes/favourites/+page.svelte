<script lang="ts">
    import QuoteBox from '$lib/components/QuoteBox.svelte';
    import type QuoteType from '$lib/types/QuoteType';
    import { flip } from 'svelte/animate';
    import { blur, slide } from 'svelte/transition';
    import type { PageData } from './$types';
    import { favouritesStore } from '$lib/stores/favourites';

    let { data }: { data: PageData } = $props();
    let quotes: QuoteType[] = $derived(data.quotes);
    let favouriteQuotes = $derived(quotes.filter((quote) => $favouritesStore.includes(quote.id)));

    const unstarQuote = async (quoteId: number): Promise<void> => {
        $favouritesStore = $favouritesStore.filter((favourite) => favourite !== quoteId);
    };
</script>

<div class="content">
    {#each favouriteQuotes as favouriteQuote (favouriteQuote.id)}
        <div class="quote-box" transition:slide animate:flip>
            <QuoteBox
                quote={favouriteQuote}
                isStarred={true}
                starQuote={() => unstarQuote(favouriteQuote.id)}
            />
        </div>
    {:else}
        <div class="no-results-text" transition:blur={{ delay: 500 }}>No favourite quotes yet.</div>
    {/each}
</div>

<style lang="scss">
    .content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;

        .quote-box {
            width: 100%;
        }

        .no-results-text {
            font-size: 1rem;
            color: #f5f5f5;
        }
    }
</style>
