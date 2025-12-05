
::component-code
---
srcDir: 'content/demos/tabs/TabsDemo.vue'
previewBackground: "white"
isCodePreviewEnabled: false
componentSource: 'docs'
---
::

```vue
<template>
    <TabsContainer>
        <TabBar 
            v-model="activeTabIndex"
            :tabs
        />
            <TabContent v-if="activeTabIndex === 0">
                <ContentPlaceholder text="Content 1"/>
            </TabContent>
            <TabContent v-else-if="activeTabIndex === 1">
                <ContentPlaceholder text="Content 2"/>
            </TabContent>
            <TabContent v-else-if="activeTabIndex === 2">
                <ContentPlaceholder text="Content 3"/>
            </TabContent>
    </TabsContainer>
</template>
<script setup lang="ts">
// States
const activeTabIndex = ref(0)

// Data
const tabs: TabItem[] = [
    { 
        text: 'Tab 1',
    },
    { 
        text: 'Tab 2',
    },
    { 
        text: 'Tab 3',
    },
]
</script>
```

## Components
::components-table
---
components: [
    {
        name: "TabBar",
        description: "Displays the tabs items.",
    },
    {
        name: "TabContent",
        description: "Displays the tab item content.",
    },
    {
        name: "TabContainer",
        description: "Groups and styles the TabBar and the TabContent.",
    },
]
---
::

## TabBar

::component-code
---
srcDir: 'tabs/TabBar.vue'
props: 
    modelValue: 0
    tabStyle: "underline"
    decoration: "none"
    tabs:
        - text: "Tab 1"
        - text: "Tab 2"
        - text: "Tab 3"
items:
    tabStyle: 
        - value: underline
          text: UNDERLINE
        - value: pill
          text: PILL
        - value: pill-monochrome
          text: PILL_MONOCRHOME
    decoration: 
        - value: none
          text: NONE
        - value: icon
          text: ICON
        - value: image
          text: IMAGE
external:
  - tabs
  - modelValue
externalTypes:
  - TabItem[]
propsSettingsExcludedProps: ['tabs', 'modelValue']
previewBackground: 'white'
---
::

### Props

::props-table
---
props: [
    {
        "name": "tabs",
        "default": "`An example array`",
        "type": "TabItem[]",
    },
    {
        "name": "modelValue",
        "default": "0",
        "type": "number",
    },
    {
        "name": "tabStyle",
        "default": "TabStyle.UNDERLINE",
        "type": "TabStyle",
    },
    {
        "name": "decoration",
        "default": "TabDecoration.NONE",
        "type": "TabDecoration",
    },
]
---
::

#### tabs

Sets the tab items.

```vue
<template>
    <TabBar :tabs="exampleTabs" />
</template>
<script setup lang="ts">
const exampleTabs: TabItem[] = [
    { 
        text: 'Tab 1',
    },
    { 
        text: 'Tab 2',
    },
    { 
        text: 'Tab 3',
    },
]
</script>
```

#### TypeScript interface
```ts
interface TabItem {
    text: string
    icon?: string
    imgUrl?: string
    badgeValue?: number | string
    to?: string
}
```

- **text:** Sets the label for the tab.
- **icon:** Sets the icon for `ICON` decoration type.
- **imgUrl:** Sets the image for `IMAGE` decoration type.
- **badgeValue:** Sets the value for an optional badge at the right side of the tab label. Displays the badge only if the value is passed through the object.
- **to:** Defines a navigation target for the tab. When provided, the tab behaves as a link and triggers a route navigation instead of updating the modelValue (active index).

#### modelValue
The value of the currently active tab.

```vue
<template>
    <TabBar v-model="activeTabIndex" />
</template>
<script setup lang="ts">
const activeTabIndex = ref(0)
</script>
```

- **Type:** `number`
- **Default:** `0`

#### tabStyle
The style of the tabs. It uses the `TabStyle` enum.

```vue
<template>
    <TabBar :tabStyle="TabStyle.PILL" />
</template>
```

##### Options

::options-table
---
options: [
    {
        value: "UNDERLINE",
        description: "Underline-styled tab"
    },
    {
        value: "PILL",
        description: "Primary brand pill-styled tab"
    },
    {
        value: "PILL_MONOCRHOME",
        description: "Neutral color pill-styled tab"
    },
]
---
::

#### decoration
Sets the type of decoration of the tabs. It uses the `TabDecoration` enum.

```vue
<template>
    <TabBar 
        :TabDecoration="TabDecoration.IMAGE" />
        :tabs="exampleTabs" 
    />
</template>
<script setup lang="ts">
const exampleTabs: TabItem[] = [
    { 
        text: 'Tab 1',
        imgUrl : '....'
    },
    { 
        text: 'Tab 2',
        imgUrl : '....'
    },
    { 
        text: 'Tab 3',
        imgUrl : '....'
    },
]
</script>
```

##### Options

::options-table
---
options: [
    {
        value: "NONE",
        description: "Does not use decoration."
    },
    {
        value: "IMAGE",
        description: "Displays an image at the left side of the tab text. Requires to use the 'imgUrl' key inside the object array."
    },
    {
        value: "ICON",
        description: "Displays an icon at the left side of the tab text. Requires to use the 'icon' key inside the object array."
    },
]
---
::

## TabContent

Wraps the content of the tab. 

Use `v-if` directive to display the correct index content.

```vue
<template>
    <TabsContainer>
        <TabBar 
            ...
        />
            <TabContent v-if="activeTabIndex === 0">
                <!-- Content 1 -->
            </TabContent>
            <TabContent v-else-if="activeTabIndex === 1">
                <!-- Content 2 -->
            </TabContent>
            <!-- More tabs -->
    </TabsContainer>
</template>
<script setup lang="ts">
// States
const activeTabIndex = ref(0)
</script>
```

## TabsContainer

Wraps the `TabBar` and `TabContent` components.

```vue
<template>
    <TabsContainer>
        <TabBar 
            ...
        />
            <TabContent v-if="activeTabIndex === 0">
                <!-- Content 1 -->
            </TabContent>
            ...
    </TabsContainer>
</template>
```