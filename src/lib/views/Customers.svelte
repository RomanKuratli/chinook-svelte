<script lang="ts">
    import { onMount } from "svelte";
    import type { RestClient } from "$lib/api/rest_client";
    import type { Customer, Invoice, InvoiceLine } from "$lib/api/types";

    const CUSTOMERS_URL = "customers"

    interface CustomersProps {
        client: RestClient
    }

    const { client }: CustomersProps = $props()

    let customers: Customer[] = $state<Customer[]>([])
    let selectedCustomer: number | null = $state<number | null>(null)

    let invoices = $state<Invoice[]>([])
    let selectedInvoice: number | null = $state<number | null>(null)

    let invoiceLines = $state<InvoiceLine[]>([])


    onMount(async () => {
        customers = await client.get<Customer[]>(CUSTOMERS_URL);
        console.log("Customers:", customers);
    })

    async function onSelectCustomer(customerId: number) {
        selectedCustomer = customerId
        invoiceLines = []
        invoices = await client.get<Invoice[]>(`customers/${customerId}/invoices`)
    }

    async function onSelectInvoice(invoiceId: number) {
        selectedInvoice = invoiceId
        invoiceLines = await client.get<InvoiceLine[]>(`invoices/${invoiceId}/lines`)
    }



    function displayCustomerName(cust: Customer): string {
        if (cust.company !== null && cust.company.trim() !== "") {
            return `${cust.company} ${cust.firstname} ${cust.lastname}`
        }
        return `${cust.firstname} ${cust.lastname}`
    }

</script>

<h2>Customers</h2>
<div class="cardBox">
    <div id="crdCusts" class="card">
        <h3>Please select a customer</h3>
        <div class="scrollable-list">
            <ul>
                {#each customers as cust}
                <li
                    class:active={cust.id === selectedCustomer}
                >
                    <button onclick={() => onSelectCustomer(cust.id)}>
                        {displayCustomerName(cust)}
                    </button>
                </li>
                {/each}
            </ul>
        </div>
    </div>

    <div id="crdCustDetails" class="card">
        <h3>Customer Details</h3>
        {#if selectedCustomer !== null}
            {#each customers.filter(c => c.id === selectedCustomer) as cust}
                <p><strong>Name:</strong> {displayCustomerName(cust)}</p>
                <p><strong>Email:</strong> {cust.email}</p>
                <p><strong>Address:</strong> {cust.address}, {cust.city}, {cust.state}, {cust.country}, {cust.postalcode}</p>
            {/each}
        {/if}
    </div>
    <div id="invoices" class="card">
        <h3>Customer Invoices</h3>
        <div class="scrollable-list">
            <ul>
                {#each invoices as invoice}
                <li
                    class:active={invoice.id === selectedInvoice}
                >
                    <button onclick={() => onSelectInvoice(invoice.id)}>
                        Invoice #{invoice.id} - {new Date(invoice.invoicedate).toLocaleDateString()} - ${invoice.total.toFixed(2)}
                    </button>
                </li>
                {/each}
            </ul>
        </div>
    </div>
    <div id="invoiceLines" class="card">
        <h3>Invoice Lines</h3>
        {#if selectedInvoice !== null}
            <div class="scrollable-list">
                <ul>
                    {#each invoiceLines as line}
                    <li>
                        Track #{line.track.name}: {line.quantity} x ${line.unitprice.toFixed(2)} = ${(line.quantity * line.unitprice).toFixed(2)}
                    </li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
</div>


<style>
    #crdCusts {
        grid-column: 1;
        grid-row-start: 1;
        grid-row-end: 3;
        max-height: 100%;
    }

    #crdCustDetails {
        grid-column: 2;
        grid-row: 1;
        max-height: 100%;
    }

    #invoices {
        grid-column: 3;
        grid-row: 1;
        max-height: 100%;
    }
    
    #invoiceLines {
        grid-column-start: 2;
        grid-column-end: 4;
        grid-row: 2;
        max-height: 100%;
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