export function fromExpiry(expiry: number): string {
    return new Date(expiry * 1000).toLocaleDateString()
}

export function fromExpiryToDate(expiry: number): string {
    const date = new Date(expiry * 1000)
    const year = date.getUTCFullYear()
    const monthIndex = date.getUTCMonth()
    const day = date.getUTCDate()
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    const monthName = monthNames[monthIndex]
    const formattedDay = day < 10 ? `0${day}` : day

    return `${formattedDay} ${monthName} ${year}`
}

export function daysUntilDate(expiry: number): number {
    const currentDate = new Date()
    const targetDate = new Date(expiry * 1000)

    // Calculate the difference in milliseconds
    const differenceInMilliseconds =
        targetDate.getTime() - currentDate.getTime()

    // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const differenceInDays = Math.ceil(
        differenceInMilliseconds / (1000 * 60 * 60 * 24)
    )

    return differenceInDays
}
