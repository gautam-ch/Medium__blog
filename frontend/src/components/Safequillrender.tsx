import DOMPurify  from "dompurify";

interface  Quillprop{
      content:string
}

export  const Safequillrender=({content}:Quillprop)=>{
       
    const sanitize_content = DOMPurify.sanitize(content);
    
    return (
        <div className="prose" dangerouslySetInnerHTML={{__html:sanitize_content}}/>
     )
}