<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import QuoteBox from '$lib/components/QuoteBox.svelte';
    import type QuoteType from '$lib/types/QuoteType';
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

<div>
    {#each favouriteQuotes as favouriteQuote}
        <QuoteBox
            quote={favouriteQuote}
            isStarred={true}
            starQuote={() => unstarQuote(favouriteQuote.id)}
        />
    {:else}
        <p>No favourite quotes yet.</p>
    {/each}
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 20px;

        p {
            font-size: 1rem;
            color: #f5f5f5;
        }
    }
</style>
