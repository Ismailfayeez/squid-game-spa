const { MODE, VITE_API_URL } = import.meta.env

const baseUrl =
    MODE === 'production'
        ? `https://${VITE_API_URL}`
        : `https://${VITE_API_URL}`

export const fetchData = async (body, method = 'GET') => {
    try {
        const res = await fetch(`${baseUrl}/join`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        })

        return { res }
    } catch (err) {
        return { err }
    }
}
