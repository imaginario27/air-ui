export interface TabStep {
    title: string
    description?: string
    icon?: string
}

export interface CircleStep {
    icon?: string
}

export interface VerticalStepperItem {
    title: string
    metaTitle?: string
    description: string
    stepStatus?: StepStatus
    stepIcon?: any
}
