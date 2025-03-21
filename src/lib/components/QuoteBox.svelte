<script lang="ts">
    import type QuoteType from '$lib/types/QuoteType';
    import { base } from '$app/paths';
    import MaterialSymbolsStarOutline from 'virtual:icons/material-symbols/star-outline';
    import MaterialSymbolsStar from 'virtual:icons/material-symbols/star';
    import MaterialSymbolsShare from 'virtual:icons/material-symbols/share';

    let props = $props();
    let quote: QuoteType = $derived(props.quote);
    let isStarred: boolean = $derived(props.isStarred);
    let starQuote: () => void = $derived(props.starQuote);

    const shareQuote: () => void = () => {
        const shareData = {
            title: 'Quotator Quote',
            text: `Here is an inspiring quote by ${quote.author} for you: "${quote.text}"`,
            url: base + '/' + quote.id
        };

        if (navigator.share) {
            navigator.share(shareData).catch(console.error);
        } else {
            alert('Sharing is not supported on your device.');
        }
    };
</script>

<div class="quote-box">
    <p class="quote">"{quote.text}"</p>
    <hr />
    <p class="author">- {quote.author}</p>

    <p class="quote-controls">
        {#if starQuote != undefined}
            <button class="star-button" onclick={starQuote}>
                {#if isStarred}
                    <MaterialSymbolsStar />
                {:else}
                    <MaterialSymbolsStarOutline />
                {/if}
            </button>
        {/if}

        <button class="share-button" onclick={shareQuote}>
            <MaterialSymbolsShare />
        </button>
    </p>
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
</style>
