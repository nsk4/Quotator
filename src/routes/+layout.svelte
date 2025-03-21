<script lang="ts">
    import { base } from '$app/paths';
    import MaterialSymbolsHomeOutline from 'virtual:icons/material-symbols/home-outline';
    import MaterialSymbolsStarOutline from 'virtual:icons/material-symbols/star-outline';
</script>

<div class="container">
    <header>
        <ul>
            <li>
                <a href="{base}/">
                    <MaterialSymbolsHomeOutline width="48" height="48" alt="Home" />
                </a>
            </li>
            <li>
                <a href="{base}/favourites/">
                    <MaterialSymbolsStarOutline width="48" height="48" alt="Favourites" />
                </a>
            </li>
        </ul>
    </header>
    <main><slot /></main>
    <footer>
        <p>
            &copy; 2025 Nejc Smrkolj Koželj. All rights reserved. (<a
                href="https://github.com/nsk4/Quotator/blob/main/LICENSE">MIT License</a
            >)
        </p>
        <p><a href="https://github.com/nsk4/Quotator">Github</a></p>
        <p>
            <a href="https://github.com/nsk4/Quotator/issues/new?labels=bug">Report a bug</a>
        </p>
    </footer>
</div>

<style lang="scss">
    :global(body) {
        // Set global styles
        background-color: #121212;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        color: #f5f5f5;
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
                        color: #a5a5a5;
                        &:hover {
                            color: #f5f5f5;
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
            background-color: #333;
            color: #f5f5f5;
            text-align: center;

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 20px;

            a {
                color: #a5a5a5;
                text-decoration: none;
                transition: color 0.2s ease;

                &:hover {
                    color: #f5f5f5;
                }
            }
        }
    }
</style>
