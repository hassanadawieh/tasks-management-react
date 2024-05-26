import React , { useState} from 'react';
import "./DropArea.css";


const DropArea = ({onDrop}) => {

    const [showDrop , setShowDrop] = useState(false)
  return (
    <div className={ showDrop ?'drop-area':'hide-drop'} 
    onDrop={() => 
        {
            onDrop();
            setShowDrop(false);
        }
    } 
    onDragOver={e => e.preventDefault()}
    onDragEnter={() => setShowDrop(true)} 
    onDragLeave={() => setShowDrop(false)}
    >
    drop
    </div>
  )
}

export default DropArea
