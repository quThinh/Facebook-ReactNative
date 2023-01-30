export function beautifulDate(date) {
    date = new Date(String(date));
    date =
    ('00' + date.getUTCDate()).slice(-2) + '/' + 
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2)
    console.log(date)
    return date;
}