export default function UserCardComponent(props){
  let emptyClass = ''
  if(!props.img){
    emptyClass='user-card--empty-logo'
  }
  return(
    <div className={`user-card ${emptyClass}`}>
      <div className="user-card__logo" style={{backgroundImage:`url(${props.img})`}}/>
      <div className="user-card__content">
        <h5 className="user-card__position">{props.position}</h5>
        <h4 className="user-card__name">{props.name}</h4>
        <p className="user-card__link-info">view info</p>
      </div>
    </div>
  )
}
