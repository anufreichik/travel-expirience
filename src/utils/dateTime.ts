import moment from 'moment';

const formatDateTimeFull = 'MM/DD/yyyy h:mm a';
const formatterDateTimeFull = (date: string) => moment(date).local().format(formatDateTimeFull);

const formatDateFull = 'MM/DD/yyyy';
const formatterDateFull = (date: string) => moment(date).local().format(formatDateFull);

export { formatterDateTimeFull, formatterDateFull };
