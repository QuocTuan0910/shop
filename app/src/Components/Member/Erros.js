
function Erros(props){

    function renderList(){
        let {errE} = props
        if(Object.keys(errE).length > 0){
            return Object.keys(errE).map((key, index) =>{
                return(
                    <li key={key} className="err">
                        {errE[key]}
                    </li>
                )
            })
        }

    }
    return (
       <ul>
        {renderList()}
       </ul>
    )
}
export default Erros;