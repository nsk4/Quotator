<script lang="ts">
	// your script goes here
	import MaterialSymbolsHomeOutline from 'virtual:icons/material-symbols/home-outline';
	import MaterialSymbolsStarOutline from 'virtual:icons/material-symbols/star-outline';
</script>

<div class="container">
	<header>
		<ul>
			<li>
				<a href="/">
					<MaterialSymbolsHomeOutline width="48" height="48" alt="Home" />
				</a>
			</li>
			<li>
				<a href="favourites/">
					<MaterialSymbolsStarOutline width="48" height="48" alt="Favourites" />
				</a>
			</li>
		</ul>
	</header>
	<main><slot /></main>
	<footer>footer</footer>
</div>

<style lang="scss">
	:global(body) {
		// Set global styles
		background-color: #121212;
		color: #f5f5f5;
		font-family: Arial, sans-serif;
		margin: 0;
		padding: 0;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 100vh;
		box-sizing: border-box;

		header {
			padding: 10px;
			ul {
				padding: 0 10px;
				li {
					display: inline;
					a {
						color: #333;
						&:hover {
							color: #444;
						}
					}
				}
			}
		}

		main {
			padding: 10px;
			align-self: center;
			box-sizing: border-box;
			width: 100%;
			max-width: 700px;
		}

		footer {
			padding: 10px;
			background-color: #333;
			color: #fff;
			text-align: center;
		}
	}
</style>
