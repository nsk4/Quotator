<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import QuoteBox from '$lib/components/QuoteBox.svelte';
    import type QuoteType from '$lib/types/QuoteType';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    let favourites: QuoteType[] = $derived(data.favourites);

    const unstarQuote = async (quote: QuoteType): Promise<void> => {
        let response;
        response = await fetch('/api/favourites', {
            method: 'DELETE',
            body: JSON.stringify(quote)
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
    {#each favourites as quote}
        <QuoteBox {quote} isStarred={true} starQuote={() => unstarQuote(quote)} />
    {/each}
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 20px;
    }
</style>
