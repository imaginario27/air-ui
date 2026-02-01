/**
 * Returns an error message depending on the environment.
 *
 * @param devErrorMessage - Error message shown in development mode
 * (usually raw details).
 * @param prodErrorMessage - Error message shown in production mode
 * (user-friendly localized message).
 * @returns A string with the appropriate message.
 *
 */
export const getEnvErrorMessage = (
    devErrorMessage: string | Error,
    prodErrorMessage: string
): string => {
    const devMessage =
        typeof devErrorMessage === 'string'
            ? devErrorMessage
            : devErrorMessage.message

    return import.meta.dev ? devMessage : prodErrorMessage
}
