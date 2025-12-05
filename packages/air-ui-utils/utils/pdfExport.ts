import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import type { Headers } from "@/models/types/pdfExportTable"

/**
 * Exports data to a PDF file.
 * @param {Array<Record<string, any>>} data - The data to export.
 * @param {string} title - The title of the PDF.
 * @param {string} fileName - The name of the exported file.
 * @param {Headers} headers - Custom headers structured like the Excel headers.
 */
export function exportDataToPDF(
    data: Array<Record<string, any>>,
    title: string,
    fileName: string,
    headers: Headers
): void {
    const doc = new jsPDF()

    // Transform headers object into an array of formatted headers
    const formattedHeaders = Object.entries(headers).map(([label, config]) => ({
        label,
        field: typeof config === "string" ? config : config.field,
        callback:
            typeof config === "object" && config.callback
                ? config.callback
                : null,
    }))

    // Map data rows to match headers
    const tableData = data.map((row) =>
        formattedHeaders.map(({ field, callback }) => {
            const value = field
                .split(".")
                .reduce((obj, key) => obj && obj[key], row)
            return callback ? callback(value) : value
        })
    )

    doc.text(title, 14, 15)

    // Use only the header keys for the `head` property in autoTable
    autoTable(doc, {
        head: [formattedHeaders.map(({ label }) => label)],
        body: tableData,
        startY: 20,
        styles: { font: "helvetica", fontSize: 10, overflow: "linebreak" },
        headStyles: { fillColor: [22, 160, 133] },
    })

    doc.save(fileName)
}
