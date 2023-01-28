import { DateTime } from 'luxon';

export function formatDate(d: Date): string {
    return DateTime.fromFormat(d.toString(), 'yyyy-MM-dd').toFormat('MMM d, yyyy');
}
