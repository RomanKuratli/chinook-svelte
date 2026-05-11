<script>
    import { toastState } from './toast.svelte.js';
</script>

{#if toastState.visible}
    <div class="toast {toastState.type}">
        {toastState.message}
    </div>
{/if}

<style>
    .toast {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        /* Animation wäre hier noch cool */
    }
    .success { background-color: #10b981; }
    .error { background-color: #ef4444; }
</style>