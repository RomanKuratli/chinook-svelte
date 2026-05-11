<script lang="ts">
    import Menu from '$lib/Menu.svelte'
    import Toast from '$lib/Toast.svelte'
    import { RestClient } from '$lib/api/rest_client'
    import MainPanel from '$lib/MainPanel.svelte'

    const client = new RestClient("localhost", 8081)
    const menuItems = ["Artists", "Customers", "Employees"]

    let selectedMenuItem: string = $state<string>(menuItems[0])

    function handleMenuItemClicked(item: string) {
        selectedMenuItem = item
        console.log("Menu item clicked:", item)
    }
</script>

<Toast />
<header>
    <h1>Welcome to Chinook-Shop Svelte</h1>
    <p>Welcome to Chinook-Shop Svelte. Feel free to have a look around!</p>
</header>
<div id="mainRow">
    <Menu {menuItems} {handleMenuItemClicked} />
    <MainPanel {client} {selectedMenuItem} />
    
</div>

<style>
header {
    text-align: center;
    padding: 2rem;
}

h1 {
    color: #304c74;
}

#mainRow {
    display: grid;
    grid-template-columns: 20% 80%;
    height: 100vh;
}

:global(h2, h3) {
    text-align: center;
    color: #94a3b8; 
}

:global(.dbg) {
    border: blue solid 1px;
    border-radius: 25px;;
    margin: 1rem;
    padding: 2rem;
    background-color: #222;
    font-family: 'Mono'
}

:global(.dbgVal) {
    font-weight: 600;
    color: green;
}

:global(.cardBox) {
    padding: 1rem;
    margin: 1rem;
    display: flex;
    flex-direction: row;
}

:global(.card) {
    width: 100%;
    background-color: #1e293b;
    border-radius: 25px;
    padding-top: 1rem;
}

:global(.table) {
    padding: 1rem;
}

:global(.tr) {
    padding-top: 0.5rem;
}

:global(li) {
    display: flex;
    list-style-type: none;
    cursor: pointer;
    padding: 0.5rem;
    border-bottom: 1px solid #304c74;
    text-align: center;
    
}
:global(li:hover) {
    background-color: #304c74;
}
:global(li.active) {
    /*background-color: #9095ea;; /* Etwas heller als hover, damit es auffällt */
    font-weight: 600;
    color: #ddaa77; /* Ein schönes Blau für den Text der aktiven Liste */
    border-left: 4px solid #304c74; /* Der "Indikator-Strich" */
}
</style>
