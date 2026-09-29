export function Die(props){
    return(
        <button onClick = {props.onClick} className="dice-buttons" aria-label={`Die is held ${props.value} ${props.isHeld? "Held":"Not held"}`} aria-pressed={props.isHeld} style={{backgroundColor: props.isHeld? "#59e391": "wheat" }}>{props.num}</button>
    )
}