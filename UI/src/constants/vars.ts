export const DEFAULT_HEADER = {
    "Content-type": "application/json",
};

export const DEFAULT_TABLE_HEAD = [
    'Date',
    'Name',
    'Start Time',
    'End Time',
    'Count',
];

export const getDateToMidnight = () => {
    const date = new Date();
    date.setHours( 0, 0, 0, 0 );
    return date;
}; 