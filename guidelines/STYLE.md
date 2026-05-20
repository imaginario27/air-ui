# Style cheat-sheet

### Component style

```vue
<template>
    <kbd
        :class="[
            'inline-flex',
            'items-center',
            'justify-center',
            'rounded',
            'border',
            'border-border-default',
            'px-1.5',
            'py-0.5',
            'text-xs',
            'font-semibold',
            'leading-none',
            'text-text-neutral-subtle',
            'whitespace-nowrap',
            'select-none',
        ]"
    >
        {{ text }}
    </kbd>
</template>

<script setup lang="ts">
// Props
defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Enter',
    },
})
</script>
```

### Docs page style

`docs/content/docs/components/kbd.md` (no front matter):

```md
## Component

::component-code
---
srcDir: 'kbds/Kbd.vue'
props:
    text: 'Ctrl'
previewBackground: 'white'
---
::
```

`docs/pages/docs/components/kbd.vue`:

```vue
<script setup lang="ts">
definePageMeta({ title: 'Kbd', layout: 'docs', overtitle: 'Components', description: '…' })
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])
const { data } = await useAsyncData(() =>
    queryCollection('content').path(cleanPath.value).first())
</script>
```

### Test style

```ts
import { mount } from '@vue/test-utils'
import Alert from '@/components/alerts/Alert.vue'
import { AlertType } from '@/models/enums/alerts'

describe('Alert.vue', () => {
    it('renders with description', () => {
        const wrapper = mount(Alert, {
            props: { title: 'Test', description: 'desc', type: AlertType.SUCCESS },
        })
        expect(wrapper.text()).toContain('Test')
    })
})
```
