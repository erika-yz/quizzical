import Option from '../components/Option'

export default function Question (props){
    const he = require('he')
    const triviaOptions = props.answers.map((options)=>{
        return (<Option 
            key = {options.id}
            {...options}
            {...props}
        />)
    })

    return(
        <div>
            <h2
                className="question--title"
                key={props.id}
            >
                {he.decode(props.question)}
            </h2>
            <hr/>
            <div  className = "question--answers">
                {triviaOptions}
            </div>
        </div>  
    )
}