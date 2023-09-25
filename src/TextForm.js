import React, {useState} from 'react'
import './TextForm.css'

export default function TextForm(props) {
    const handleUpClick = () => {
        if( text === ''){
          setIsUpperCase(isUpperCase);
          props.showAlert("Enter the text", "danger");
                   
        }else{

            let NewText = text.toUpperCase();
            setText(NewText);
  setIsUpperCase(!isUpperCase);
  props.showAlert("Converted to uppercase", "success");
        }
              
                 }
    const handleDownClick = () => {
              let NewText = text.toLowerCase();
              setText(NewText);
              setIsUpperCase(!isUpperCase);
              props.showAlert("Converted to lowercase", "success");
            
    }
    
    const Reset = () => {
        if( text ===''){
            props.showAlert("Please! Enter the text", "danger");
        }else {

            setText('');
            setCopied(false);
            props.showAlert("Text is reset", "success");
        }
                 }
     const CopyToClipboard = () => {
        if ( text === ''){
            props.showAlert("Enter Text to copy", "danger");
        } else {
            navigator.clipboard.writeText(text);
            setCopied(true);
            props.showAlert("Text copied", "success");
        }

    }
    const Download = () => {
        const element = document.createElement("a");
        const file = new Blob([text], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "myTextFile.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        props.showAlert("Text Downloaded", "success");

    }
    const TextToSpeech = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        if (text === ''){
            msg.text = "Please Enter the text"
        }
        window.speechSynthesis.speak(msg);
    }
    const RemoveExtraSpaces = () => {
        let NewText = text.split(/[ ]+/);
        setText(NewText.join(" "));
        if(text === ''){
            props.showAlert("Enter the text", "danger");
        }else{
            props.showAlert("Spaces removed", "success");
        }

    }
    const handleChange = (event) => {
        setText(event.target.value)
    }
    const [text, setText] = useState('')
    const [copied, setCopied] = useState(false);
    const [isUpperCase, setIsUpperCase] = useState(true);
  return (
    <>
    <div className={`container my-3 ${props.mode === 'dark' ? 'dark-mode' : ''}`} style={{ color: props.mode === 'light' ? 'black' : 'white' }}>

    <h1 >{props.heading}</h1>
    <div className="mb-8 my-3">
    <textarea className="form-control" value={text} onChange={handleChange}  style = {{backgroundColor: props.mode === 'light' ? 'white' : '#343a40', 
    color: props.mode === 'light' ? '#000' : '#fff'}} id="myBox" rows="6"  placeholder={props.mode === 'light' ? 'Enter text' : 'Enter text'}
    ></textarea>
    </div>
    <button type="submitU" className="btn btn-grey" onClick={isUpperCase ? handleUpClick : handleDownClick}>Convert to {isUpperCase ? 'UpperCase' : 'LowerCase'}</button>
    {/* <button type="submitL" className="btn btn-grey" onClick={handleDownClick}>Convert to LowerCase</button> */}
    <button type="submitR" className="btn btn-grey" onClick={Reset}>Reset</button>
    <button type="submitC" className="btn btn-grey" onClick={CopyToClipboard}>Copy to clipboard</button>
    <button type="submitD" className="btn btn-grey" onClick={Download}>Download text</button>
    <button type="submitS" className="btn btn-grey" onClick={TextToSpeech}>Text to Speech</button>
    <button type="submitE" className="btn btn-grey" onClick={RemoveExtraSpaces}>Remove Extra Spaces</button>
        </div>
        <div className='container' style = {{color: props.mode === 'light' ? 'black' : 'white'}}>
            <h2>Your Text Summary</h2>
            <p>
                Total words <h5 className='colorr' >{text.trim().split(/\s+/).filter(Boolean).length}</h5> 
                Total characters<h5 className='colorr'>{text.length}</h5> 
                Total character without spaces <h5 className='colorr'>{text.replace(/\s/g, '').length}</h5>
            </p>
            <h2>Preview</h2>
            <p placeholder={text} >{text === '' ? "Enter something to preview": text}</p>

        </div>
        </>
  )
}
