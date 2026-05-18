<script lang="ts">
    import { onMount } from "svelte";
    import type { RestClient } from "$lib/api/rest_client";
    import type { Employee } from "$lib/api/types";

    const EMPLOYEES_URL = "employees"

    interface EmployeesProps {
        client: RestClient
    }

    const { client }: EmployeesProps = $props()
    let employees: Employee[] = $state<Employee[]>([])
    let selectedEmployee: number | null = $state<number | null>(null)

    onMount(async () => {
        employees = await client.get<Employee[]>(EMPLOYEES_URL);
        console.log("Employees:", employees);
    })

    function onSelectEmployee(employeeId: number) {
        selectedEmployee = employeeId
    }

</script>

<!--
<div class="dbg">
    <p>selectedEmp: <span class="dbgVal">{selectedEmployee}</span></p>
</div>
-->

<h2>Employees</h2>
<div class="cardBox">
    <div id="crdEmps" class="card">
        <h3>Please select an employee</h3>
        <div class="scrollable-list">
            <ul>
                {#each employees as emp}
                <li
                    class:active={emp.id === selectedEmployee}
                >
                    <button onclick={() => onSelectEmployee(emp.id)}>
                        {emp.firstname} {emp.lastname}: {emp.title}
                    </button>
                </li>
                {/each}
            </ul>
        </div>
    </div>

    <div id="crdEmpDetails" class="card">
        <h3>Employee Details</h3>
        {#if selectedEmployee !== null}
            {#each employees.filter(e => e.id === selectedEmployee) as emp}
                <p><strong>Name:</strong> {emp.firstname} {emp.lastname}</p>
                <p><strong>Title:</strong> {emp.title}</p>
                <p><strong>Birth Date:</strong> {new Date(emp.birthdate).toLocaleDateString()}</p>
                <p><strong>Hire Date:</strong> {new Date(emp.hiredate).toLocaleDateString()}</p>
                <p><strong>Address:</strong> {emp.address}, {emp.city}, {emp.state}, {emp.country}, {emp.postalcode}</p>
                <p><strong>Phone:</strong> {emp.phone}</p>
                <p><strong>Email:</strong> {emp.email}</p>
            {/each}
        {:else}
            <p>Please select an employee to see details.</p>
        {/if}
    </div>
</div>

<style>
#crdEmps {
    grid-column: auto;
    grid-row: auto;
    max-height: 100%;
}

#crdEmpDetails {
    grid-column: auto;
    grid-row: auto;
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