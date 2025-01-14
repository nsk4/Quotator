<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();
	let quotes = data.quotes;
	let categories = Object.keys(quotes);
	let selectedCategory = $state(categories[Math.floor(Math.random() * categories.length)]);
	let currentQuote = $state('');
	let currentAuthor = $state('');

	const getRandomQuote = (): void => {
		const categoryQuotes = quotes[selectedCategory];
		const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
		[currentQuote, currentAuthor] = categoryQuotes[randomIndex];
		console.log(quotes, categories, selectedCategory, currentQuote, currentAuthor);
	};

	onMount(() => {
		getRandomQuote();
	});

	const shareQuote = (quote: string): void => {
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
	};
</script>

<main>
	<div class="quote-box">
		<p class="quote">"{currentQuote}"</p>
		<hr />
		<p class="author">- {currentAuthor}</p>
		<button class="share-button" onclick={() => shareQuote(currentQuote)}>Share</button>
	</div>

	<div class="controls">
		<select class="category-select" bind:value={selectedCategory}>
			{#each categories as category}
				<option value={category}>{category}</option>
			{/each}
		</select>
		<button class="new-quote-button" onclick={getRandomQuote}>Get Another Quote</button>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		width: 100vw;
		padding: 20px;
		box-sizing: border-box;
		background-color: #121212;
		color: #f5f5f5;
	}

	.quote-box {
		text-align: center;
		padding: 20px;
		border: 1px solid #333;
		border-radius: 10px;
		background: #1e1e1e;
		position: relative;
		color: #e0e0e0;
	}

	.quote {
		font-size: 1.8rem;
		font-weight: bold;
		margin: 0;
	}

	.author {
		font-size: 1rem;
		color: #a5a5a5;
		margin-top: 10px;
	}

	hr {
		margin: 10px 0;
		border: 0;
		border-top: 1px solid #444;
	}

	.share-button {
		position: absolute;
		bottom: 10px;
		right: 10px;
		font-size: 0.8rem;
		padding: 5px 10px;
		background: #333;
		color: #f5f5f5;
		border: 1px solid #444;
		border-radius: 4px;
		cursor: pointer;
	}

	.share-button:hover {
		background: #444;
	}

	.controls {
		display: flex;
		gap: 10px;
		margin-top: 20px;
	}

	.category-select {
		padding: 10px;
		font-size: 1rem;
		background: #1e1e1e;
		color: #f5f5f5;
		border: 1px solid #333;
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
	}

	.new-quote-button:hover {
		background: #444;
	}
</style>
