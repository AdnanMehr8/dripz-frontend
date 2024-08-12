function TextInput (props) {
    return (
        <div >
            <input {...props} />
            {props.error && (
            <p >{props.errormessage}</p>
            )}
        </div>
    )

}

export default TextInput;