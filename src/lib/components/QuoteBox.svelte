<script lang="ts">
    import MaterialSymbolsStarOutline from 'virtual:icons/material-symbols/star-outline';
    import MaterialSymbolsStar from 'virtual:icons/material-symbols/star';
    import MaterialSymbolsShare from 'virtual:icons/material-symbols/share';
    import type QuoteType from '$lib/types/QuoteType';

    let {
        quote,
        isStarred,
        starQuote,
        shareQuote
    }: {
        quote: QuoteType;
        isStarred: boolean;
        starQuote: () => void;
        shareQuote: () => void;
    } = $props();
</script>

<div class="quote-box">
    <p class="quote">"{quote.text}"</p>
    <hr />
    <p class="author">- {quote.author}</p>

    <p class="quote-controls">
        <button class="star-button" onclick={() => starQuote()}>
            {#if isStarred}
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
