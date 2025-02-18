<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import QuoteBox from '$lib/components/QuoteBox.svelte';
    import type QuoteType from '$lib/types/QuoteType';
    import { fly } from 'svelte/transition';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    let favouriteQuotes: QuoteType[] = $derived(data.favouriteQuotes);

    const unstarQuote = async (quoteId: number): Promise<void> => {
        let response;
        response = await fetch('/api/favourites', {
            method: 'DELETE',
            body: JSON.stringify(quoteId)
        });

        const responseJSON = await response.json();
        if (response.ok) {
            invalidateAll();
        } else {
            // TODO: Display error message to the user
            alert(responseJSON.message);
        }
    };
</script>

<div class="content">
    {#each favouriteQuotes as favouriteQuote}
        <div class="quote-box" transition:fly>
            <QuoteBox
                quote={favouriteQuote}
                isStarred={true}
                starQuote={() => unstarQuote(favouriteQuote.id)}
            />
        </div>
    {:else}
        <div class="no-results-text">No favourite quotes yet.</div>
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
