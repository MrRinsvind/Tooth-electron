import { Progress } from 'reactstrap'
import keys from 'lodash/keys'

const statuses = {
  'created': 'secondary',
  'looking for appraiser': 'dark',
  'assigned': 'warning',
  'in process of appraising': 'primary',
  'done': 'success',
}

function renderProgress(status,striped,animated) {
  return <Progress
    key={status}
    animated={animated}
    striped={striped}
    bar
    color={statuses[status]}
    value="20">{status}</Progress>
}

export default function ReggoraProgress({status}) {
  if(status) {
    const arr = keys(statuses)
    const animatedProgress = arr.indexOf(status.toLowerCase())
    const striped = arr.slice(0, animatedProgress)
    let arrProgress = striped.map(progress => (
      renderProgress(progress,true,false)
    ))
    arrProgress.push(renderProgress(status.toLowerCase(),false,true))
    return (
      <Progress multi>
        {arrProgress}
      </Progress>
    )
  }
}
