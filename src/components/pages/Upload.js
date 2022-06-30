import {useNavigate} from 'react-router-dom'
import { projectStorage,ref,getDownloadURL,uploadBytesResumable} from '../../FirebaseConfig/FirebaseConfig';
const Upload=()=>{
    const navigate=useNavigate();
        const photo=document.querySelector('#photo');
        const types=['image/png', 'image/jpeg']
        photo.addEventListener('change',(e)=>{
              let photoName=e.target.files[0];
                const li=document.querySelector('.error');
                const valid=document.querySelector('.valid');
                const error=`
                <p className="light red-text">Please select an image file(png or jpeg)<p>
                `
                const validFile= photoName.name;
              if(photoName && types.includes(photoName.type)){
                valid.innerHTML=validFile;
                  li.innerHTML=''
                  //uploading image to storage
                  const storageRef=ref(projectStorage,photoName.name);
                  const uploadTask = uploadBytesResumable(storageRef, photoName);
                  uploadTask.on('state_changed',
                   async()=>{
                           await getDownloadURL(storageRef).then((url)=>{
                            console.log(url);
                            localStorage.setItem('pic',url);
                           })
                           })
                           .then(()=>{
                             navigate('/register')
                           }).catch(()=>{
                             alert('Try again!!')
                           })
                           
                       
                }else{
                li.innerHTML=error;
                valid.innerHTML='';
              }
          })
    return(
        <div id="form" className='container'>
            <label>
                <input type="file" id="photo" name="photo"/>
                <span> Press the button to add an image to your blog: <br/>
                <div className="btn-floating purple">
                    <i className="material-icons" style={{color: '#f7eaf0'}}>add</i>
                </div> 
                </span>
            </label>
            <div className="output">
                <div className="valid"></div>
                <div className="error"></div>
            </div>
        </div>

    )
}
export default Upload;