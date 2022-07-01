import { useState } from 'react';
import img from '../../img.png';
import {Link, useNavigate} from 'react-router-dom'
import { projectStorage,ref,getDownloadURL,uploadBytesResumable} from '../../FirebaseConfig/FirebaseConfig';
const Upload=()=>{
    const navigate=useNavigate();
    const [error,setError]=useState(null);
    const [file,setFile]=useState(null);
        const types=['image/png', 'image/jpeg'];

          const changeHandler=(e)=>{
            let selected=e.target.files[0]
            if(selected&&types.includes(selected.type)){
                setFile(selected)
                setError('')
                //uploading image to storage
                const storageRef=ref(projectStorage,selected.name);
                const uploadTask = uploadBytesResumable(storageRef, selected);
                uploadTask.on('state_changed',
                 async()=>{
                         await getDownloadURL(storageRef).then((url)=>{
                          console.log(url);
                          localStorage.setItem('pic',url);
                         }).then(()=>{
                            navigate('/register')
                          })
                         })
                         
            }else{
                setFile(null);
                setError('Please select an image file(png or jpeg)')
            }
          }
    return(
            <div id='form' className='container center'>
            <label>
                <input type="file" onChange={changeHandler}/>
                <span>  
                    <img src={img} className="avatar circle img" alt='avatar' width='100'/>
                <br/>
                Set your profile pic:
                </span>
            </label>
            <div className="output">
                {error&&<div className='error'>{error}</div>}
                {file&&<div>{file.name}</div>}
            </div>
            <div className='center not'>
                <Link to='/register'>Not Now</Link>
            </div>
        </div>

    )
}
export default Upload;