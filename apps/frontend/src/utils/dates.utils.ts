import { format } from 'date-fns';

const BOOKING_DATE_FORMAT = 'yyyy-MM-dd';
const BOOKING_TIME_FORMAT = 'kk:mm';

export const getNewDate = () => format(new Date(), BOOKING_DATE_FORMAT);
