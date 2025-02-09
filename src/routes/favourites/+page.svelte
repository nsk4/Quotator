<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    let favourites = $derived(data.favourites);

    $inspect(favourites);
</script>

<div>TODO: List of starred quotes</div>

<style lang="scss">
    div {
        color: #f5f5f5;
    }
</style>
