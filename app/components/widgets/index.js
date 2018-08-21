import { Fragment } from 'react'

export function optionSelect(props){
  return (
    <div className={`reggora-option ${props.isSelected && 'reggora-option--selected'}`} onClick={() => props.onSelect(props.option)}>
      <p className='reggora-option__name'>{props.children}</p>
      <p className='reggora-option__score'>Score: <span className="font-weight-bold">4.5</span></p>
      <input type="checkbox" checked={props.isSelected} onChange={() => props.onSelect(props.option)}/>
    </div>
  )
}

export function valueSelect(props){
  return (
    <div className="reggora-values">
      <p className="reggora-values__name">{props.children}</p>
      <p className="reggora-values__score">Score: <span className="font-weight-bold">4.5</span></p>
      <span className="reggora-values__action"
        onMouseDown={(e) => {
          e.stopPropagation()
          props.onRemove(props.value)
        }}
      >×</span>
    </div>
  )
}
export function valueLoanFile(props){
  const { number = '', address = '', city = '', state = '' } = props.value
  return (
    <Fragment>
      <div className="Select-value black-color">
        {`#${number} - `}
        <span className="font-weight-bold">${address + ' ' + city}</span>
        {`, ${state}`}
      </div>
    </Fragment>
  )
}

