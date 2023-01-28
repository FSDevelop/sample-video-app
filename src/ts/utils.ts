import { DateTime } from 'luxon';

export function formatDate(d: Date): string {
    return DateTime.fromFormat(d.toString(), 'yyyy-MM-dd').toFormat('MMM d, yyyy');
}

export async function request(url: string) {
    const response = await fetch(url);
    return await response.json();
}
