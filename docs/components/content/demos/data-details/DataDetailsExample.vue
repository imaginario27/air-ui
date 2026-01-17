<template>
    <DataDetails>
        <DataDetailsRow>
            <DataField 
                id="first-name"
                label="First Name"
                text="John"
            />
            <DataField 
                id="last-name"
                label="Last Name"
                text="Doe"
            />
        </DataDetailsRow>

        <Divider hide-on-mobile />

        <DataDetailsRow>
            <DataField 
                id="email"
                label="Email"
                text="john.doe@example.com"
            />
        </DataDetailsRow>

        <Divider hide-on-mobile />

        <DataDetailsRow>
            <DataField
                id="phone"
                label="Phone"
            />
            <DataField 
                id="type"
                label="Type"
            >
                <Badge 
                    :color="ColorAccent.INFO" 
                    text="Mobile"
                />
            </DataField>
        </DataDetailsRow>

        <DataDetailsFieldGroup 
            title="Address Information"
        >
            <DataDetailsRow>
                <DataField 
                    id="address"
                    label="Address"
                    text="123 Main St, Springfield"
                />
                <DataField 
                    id="country"
                    label="Country"
                    text="USA"
                />
            </DataDetailsRow>

            <DataDetailsRow>
                <DataField 
                    id="city"
                    label="City"
                    text="Springfield"
                />
                <DataField 
                    id="zip"
                    label="ZIP Code"
                    text="12345"
                />
            </DataDetailsRow>
        </DataDetailsFieldGroup>
        <DataDetailsActions class="justify-end">
            <ActionButton 
                text="Edit"
                :iconPosition="IconPosition.LEFT"
                icon="mdi:pencil-outline"
                :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
            />
            <ActionButton 
                text="Delete"
                :styleType="ButtonStyleType.DELETE_SOFT"
            />
        </DataDetailsActions>
    </DataDetails>
</template>