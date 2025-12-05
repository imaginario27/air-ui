import type { Options } from 'prettier'
import { defu } from 'defu'

export interface SimplePrettier {
    format: (source: string, options?: Options) => Promise<string>
}

function createPrettierWorkerApi(worker: Worker): SimplePrettier {
    let counter = 0
    const handlers: Record<number, [(value: any) => void, (reason?: any) => void]> = {}

    worker.addEventListener('message', (event) => {
        const { uid, message, error } = event.data
        const [resolve, reject] = handlers[uid] || []
        const { [uid]: removed, ...rest } = handlers
        Object.assign(handlers, rest)
        if (error) {
            reject?.(error)
        } else {
            resolve?.(message)
        }
    })

    function postMessage<T>(message: any) {
        const uid = ++counter
        return new Promise<T>((resolve, reject) => {
            handlers[uid] = [resolve, reject]
            worker.postMessage({ uid, message })
        })
    }

    return {
        format(source: string, options?: Options) {
            return postMessage({ type: 'format', source, options })
        }
    }
}

export default defineNuxtPlugin(async () => {
    let prettier: SimplePrettier

    if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
        const PrettierWorker = (await import('@/workers/prettier.js?worker&inline')).default
        const worker = new PrettierWorker()
        prettier = createPrettierWorkerApi(worker)
    } else {
        const prettierModule = await import('prettier')
        prettier = {
            format(source, options = {}) {
                return prettierModule.format(source, defu(options, {
                    parser: 'markdown'
                }))
            }
        }
    }

    return {
        provide: {
            prettier
        }
    }
})
