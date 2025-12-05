<template>
    <TableWrapper>
        <Table>
            <TableHeader>
                <TableHeaderCell>Column 1</TableHeaderCell>
                <TableHeaderCell>Column 2</TableHeaderCell>
                <TableHeaderCell>Column 3</TableHeaderCell>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(item, index) in paginatedData" :key="index">
                    <TableCell>{{ item.col1 }}</TableCell>
                    <TableCell>{{ item.col2 }}</TableCell>
                    <TableCell>{{ item.col3 }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <ButtonPagination 
            v-model:modelValue="currentPage"
            v-model:items-per-page="currentItemsPerPage"
            :totalItems="exampleTableData.length"
        />
    </TableWrapper>
</template>

<script setup lang="ts">
// States
const currentPage = ref(1)
const currentItemsPerPage = ref(10)

// Static example data
const exampleTableData = [
    { col1: 'John Doe', col2: 'johndoe@example.com', col3: 'Active' },
    { col1: 'Jane Smith', col2: 'janesmith@example.com', col3: 'Inactive' },
    { col1: 'Alice Johnson', col2: 'alice.j@example.com', col3: 'Pending' },
    { col1: 'Bob Brown', col2: 'bob.brown@example.com', col3: 'Active' },
    { col1: 'Charlie Davis', col2: 'charlie.davis@example.com', col3: 'Inactive' },
    { col1: 'Emma Wilson', col2: 'emma.wilson@example.com', col3: 'Pending' },
    { col1: 'Liam Taylor', col2: 'liam.taylor@example.com', col3: 'Active' },
    { col1: 'Olivia Moore', col2: 'olivia.moore@example.com', col3: 'Inactive' },
    { col1: 'Noah Miller', col2: 'noah.miller@example.com', col3: 'Active' },
    { col1: 'Ava Martin', col2: 'ava.martin@example.com', col3: 'Pending' },
    { col1: 'Sophia Clark', col2: 'sophia.clark@example.com', col3: 'Active' },
    { col1: 'Mason Lewis', col2: 'mason.lewis@example.com', col3: 'Inactive' },
    { col1: 'Isabella Young', col2: 'isabella.young@example.com', col3: 'Active' },
    { col1: 'Logan Hall', col2: 'logan.hall@example.com', col3: 'Pending' },
    { col1: 'Mia Allen', col2: 'mia.allen@example.com', col3: 'Active' },
    { col1: 'Ethan Wright', col2: 'ethan.wright@example.com', col3: 'Inactive' },
    { col1: 'Amelia Scott', col2: 'amelia.scott@example.com', col3: 'Pending' },
    { col1: 'James Green', col2: 'james.green@example.com', col3: 'Active' },
    { col1: 'Harper Adams', col2: 'harper.adams@example.com', col3: 'Inactive' },
    { col1: 'Benjamin Baker', col2: 'benjamin.baker@example.com', col3: 'Active' },
    { col1: 'Ella Perez', col2: 'ella.perez@example.com', col3: 'Pending' },
    { col1: 'Lucas Campbell', col2: 'lucas.campbell@example.com', col3: 'Active' },
    { col1: 'Chloe Mitchell', col2: 'chloe.mitchell@example.com', col3: 'Inactive' },
    { col1: 'Henry Rivera', col2: 'henry.rivera@example.com', col3: 'Active' },
    { col1: 'Grace Cooper', col2: 'grace.cooper@example.com', col3: 'Pending' },
    { col1: 'Alexander Ramirez', col2: 'alex.ramirez@example.com', col3: 'Active' },
    { col1: 'Lily Stewart', col2: 'lily.stewart@example.com', col3: 'Inactive' },
    { col1: 'Sebastian Morris', col2: 'seb.morris@example.com', col3: 'Active' },
    { col1: 'Zoe Rogers', col2: 'zoe.rogers@example.com', col3: 'Pending' },
    { col1: 'Daniel Reed', col2: 'daniel.reed@example.com', col3: 'Active' },
    { col1: 'Hannah Cook', col2: 'hannah.cook@example.com', col3: 'Inactive' },
    { col1: 'Matthew Morgan', col2: 'matt.morgan@example.com', col3: 'Active' },
    { col1: 'Avery Bell', col2: 'avery.bell@example.com', col3: 'Pending' },
    { col1: 'Jack Murphy', col2: 'jack.murphy@example.com', col3: 'Active' },
    { col1: 'Victoria Bailey', col2: 'victoria.bailey@example.com', col3: 'Inactive' },
    { col1: 'Samuel Rivera', col2: 'samuel.r@example.com', col3: 'Pending' },
    { col1: 'Natalie Foster', col2: 'natalie.foster@example.com', col3: 'Active' },
    { col1: 'David Kim', col2: 'david.kim@example.com', col3: 'Inactive' },
    { col1: 'Aria Gonzalez', col2: 'aria.g@example.com', col3: 'Active' },
    { col1: 'Owen Torres', col2: 'owen.torres@example.com', col3: 'Pending' },
    { col1: 'Leah Barnes', col2: 'leah.barnes@example.com', col3: 'Inactive' },
    { col1: 'Isaac Powell', col2: 'isaac.powell@example.com', col3: 'Active' },
    { col1: 'Nora Patterson', col2: 'nora.patterson@example.com', col3: 'Pending' },
    { col1: 'Elijah Hughes', col2: 'elijah.hughes@example.com', col3: 'Active' },
    { col1: 'Layla Simmons', col2: 'layla.simmons@example.com', col3: 'Inactive' },
    { col1: 'Wyatt Bryant', col2: 'wyatt.bryant@example.com', col3: 'Pending' },
    { col1: 'Ellie Hayes', col2: 'ellie.hayes@example.com', col3: 'Active' },
    { col1: 'Gabriel Russell', col2: 'gabriel.russell@example.com', col3: 'Inactive' },
    { col1: 'Scarlett Griffin', col2: 'scarlett.griffin@example.com', col3: 'Pending' },
    { col1: 'Julian Diaz', col2: 'julian.diaz@example.com', col3: 'Active' },
    { col1: 'Luna Edwards', col2: 'luna.edwards@example.com', col3: 'Inactive' },
    { col1: 'Carter Stevens', col2: 'carter.stevens@example.com', col3: 'Active' },
    { col1: 'Savannah Warren', col2: 'savannah.warren@example.com', col3: 'Pending' },
    { col1: 'Anthony Bishop', col2: 'anthony.bishop@example.com', col3: 'Active' },
    { col1: 'Stella Dean', col2: 'stella.dean@example.com', col3: 'Inactive' },
    { col1: 'Hudson Craig', col2: 'hudson.craig@example.com', col3: 'Pending' },
    { col1: 'Paisley Armstrong', col2: 'paisley.armstrong@example.com', col3: 'Active' },
    { col1: 'Lincoln Hunter', col2: 'lincoln.hunter@example.com', col3: 'Inactive' },
    { col1: 'Penelope Johnston', col2: 'penelope.johnston@example.com', col3: 'Active' },
    { col1: 'Grayson Ray', col2: 'grayson.ray@example.com', col3: 'Pending' },
    { col1: 'Riley Black', col2: 'riley.black@example.com', col3: 'Active' },
    { col1: 'Zachary Daniels', col2: 'zachary.daniels@example.com', col3: 'Inactive' },
    { col1: 'Brooklyn Watkins', col2: 'brooklyn.watkins@example.com', col3: 'Pending' },
    { col1: 'Eli Austin', col2: 'eli.austin@example.com', col3: 'Active' },
    { col1: 'Aubrey Kelley', col2: 'aubrey.kelley@example.com', col3: 'Inactive' },
    { col1: 'Nathan Keller', col2: 'nathan.keller@example.com', col3: 'Pending' },
    { col1: 'Hazel Holland', col2: 'hazel.holland@example.com', col3: 'Active' },
    { col1: 'Caleb Fuller', col2: 'caleb.fuller@example.com', col3: 'Inactive' },
    { col1: 'Violet Fleming', col2: 'violet.fleming@example.com', col3: 'Pending' },
    { col1: 'Christian Baldwin', col2: 'christian.baldwin@example.com', col3: 'Active' },
    { col1: 'Aurora Holt', col2: 'aurora.holt@example.com', col3: 'Inactive' },
    { col1: 'Aaron Burke', col2: 'aaron.burke@example.com', col3: 'Pending' },
    { col1: 'Samantha Cain', col2: 'samantha.cain@example.com', col3: 'Active' },
    { col1: 'Jason Wolfe', col2: 'jason.wolfe@example.com', col3: 'Inactive' },
    { col1: 'Camila Sherman', col2: 'camila.sherman@example.com', col3: 'Pending' },
    { col1: 'Dylan Barrett', col2: 'dylan.barrett@example.com', col3: 'Active' },
    { col1: 'Eva Norman', col2: 'eva.norman@example.com', col3: 'Inactive' },
    { col1: 'Dominic Brady', col2: 'dominic.brady@example.com', col3: 'Active' },
    { col1: 'Naomi Swanson', col2: 'naomi.swanson@example.com', col3: 'Pending' },
    { col1: 'Jeremiah Parks', col2: 'jeremiah.parks@example.com', col3: 'Active' },

]

// Computed
const paginatedData = computed(() =>
    getPaginatedData(exampleTableData, currentPage.value, currentItemsPerPage.value)
)
</script>
