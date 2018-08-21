import OrderStatusBadge from '../components/widgets/OrderStatusBadge'
import moment from 'moment'
const colors = {
  'approved': 'success',
  'invited': 'success',
  'done': 'success',
  'completed': 'success',
  'looking for appraiser': 'secondary',
  'e&o outdated': 'warning',
  'pending': 'warning',
  'assigned': 'warning',
  'inspection completed': 'warning',
  'in process of appraising': 'primary',
  'completing report': 'primary',
  'blacklisted': 'danger',
  'created': 'danger',
  'assigning': 'danger',
  'activated': 'primary',
}


export function checkTableData(time){
  if(time === 'no data' || isNaN(Date.parse(time))) return 'no data'
  return moment(time).format('DD/MM/YYYY')
}
export function renderStatusBadge(status) {
  if(!status || status === 'no data') return 'no data'
  return <OrderStatusBadge color={colors[status]} status={status}/>
}
