import M  from "@mui/material/Materialize";

document.addEventListener('DOMContentLoaded', function(){
//modal
const modals=document.querySelectorAll('.modal');
M.Modal.init(modals);
var elems = document.querySelectorAll('select');
M.FormSelect.init(elems);
   
}) 

