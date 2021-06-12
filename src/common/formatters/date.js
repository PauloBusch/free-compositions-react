import moment from 'moment'; 

export function formatDate(raw) {
  if (!raw) return false;
  return moment(raw, 'YYYY-MM-DD').format('DD/MM/YYYY');
}

export function formatDateTime(raw) {
  if (!raw) return false;
  return moment(raw, 'YYYY-MM-DD').format('DD/MM/YYYY HH:mm:ss');
}
