<script lang="ts">
    import type { RestClient } from "./api/rest_client";


    interface MenuProps {
        menuItems: string[],
        handleMenuItemClicked: (item: string) => void
    }

    const { menuItems, handleMenuItemClicked }: MenuProps = $props()
    let selectedMenuItem: string = $state<string>(menuItems[0])
</script>
<aside>
    <!--
    <div class="dbg">
        <p>activeMenuItem: <span class="dbgVal">{selectedMenuItem}</span></p>
    </div>
    -->


    <h2>Menu</h2>
    <ul>
        {#each menuItems as item}
            <li
                class="menu-item"
                class:active={item == selectedMenuItem}
            >
            <button 
                onclick={() => handleMenuItemClicked(item)}
            >{item}</button>    
        </li>
        {/each}
    </ul>
</aside>

<style>
aside {
    background-color: #162032;
    height: 100vh;
    padding: 1rem;
}

button {
    all: unset; /* Entfernt Standard-Button-Styling */
    display: block;
    width: 100%;
    cursor: pointer;
    padding: 0.5rem 0.5rem 0.5rem 2rem;
    text-align: left;
}
</style>