/* eslint-disable no-undef */
const handleFormatMessage = async (message) => {
    if (!globalThis.prettier) {
        await Promise.all([
            import("https://cdn.jsdelivr.net/npm/prettier@3.5.2/standalone.js"),
            import(
                "https://cdn.jsdelivr.net/npm/prettier@3.5.2/plugins/babel.js"
            ),
            import(
                "https://cdn.jsdelivr.net/npm/prettier@3.5.2/plugins/estree.js"
            ),
            import(
                "https://cdn.jsdelivr.net/npm/prettier@3.5.2/plugins/html.js"
            ),
            import(
                "https://cdn.jsdelivr.net/npm/prettier@3.5.2/plugins/markdown.js"
            ),
            import(
                "https://cdn.jsdelivr.net/npm/prettier@3.5.2/plugins/typescript.js"
            ),
        ])
    }

    const { options, source } = message
    const formatted = await prettier.format(source, {
        parser: "markdown",
        plugins: prettierPlugins,
        ...options,
    })

    return formatted
}

const handleMessage = (message) => {
    switch (message.type) {
        case "format":
            return handleFormatMessage(message)
    }
}

self.onmessage = async (event) => {
    self.postMessage({
        uid: event.data.uid,
        message: await handleMessage(event.data.message),
    })
}
