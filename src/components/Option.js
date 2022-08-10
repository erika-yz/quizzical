export default function Option (props) {
    const he = require('he')
    function setStyle() {
        if(props.answersChecked){
            if(props.score === 0 && props.selected){
                return{
                    backgroundColor:"#F8BCBC",
                    border:"none"
                }
            }
            
            if(props.correct_answer === props.value){
                return{
                    backgroundColor: "#94D7A2",
                    border:"none"
                }
            }
        }
        else{
            return{
                backgroundColor: props.selected ? "#D6DBF5" : "#FFFFFF",
            }
        }
        
    }
    return(
        <div 
            key={props.id}
		    className="question--option" 
            style={setStyle()}
            onClick={(event)=>props.selectAnswer(props.triviaId, props.id)}
		>
			{he.decode(props.value)}
		</div>
    )
}