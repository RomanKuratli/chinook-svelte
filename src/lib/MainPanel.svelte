<script lang="ts">
import type { RestClient } from "./api/rest_client";
  import Artists from "./views/Artists.svelte";
  import Employees from "./views/Employees.svelte";

interface MainPanelProps {
    client: RestClient
    selectedMenuItem: string
}

const { client, selectedMenuItem }: MainPanelProps = $props()
</script>

<main>
    <div id="mainBox">
        {#if selectedMenuItem === "Artists"}
            <Artists {client} />
        {:else if selectedMenuItem === "Customers"}
            <h2>Customers</h2>
        {:else if selectedMenuItem === "Employees"}
            <Employees {client} />
        {/if}
    </div>
</main>

<style>
    main {
    padding: 2rem;
    background-color: #1a2436;
    height: 100vh;
}

:global(.cardBox) {
    display: grid;
    max-height: 500px;
}

:global(.card) {
    margin-right: 1rem;
}

:global(.scrollable-list) {
  overflow-y: auto;  /* Macht es scrollbar */
}

:global(.search-input) {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #1e1e1e; /* Passend zu deinem Dark Theme */
  color: white;
}
</style>