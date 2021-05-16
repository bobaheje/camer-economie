let form=null;

const init=()=>{
  // eslint-disable-next-line no-undef
  form=document.getElementById('form-upd-user');
  form.addEventListener('submit', updateUser);
  //console.log(form);
};

const updateUser= async(event)=>{
  // eslint-disable-next-line no-unused-expressions
  //event.preventdefault;
  const form_data=new FormData();

  form_data.append('email', event.target.elements.email.value);
  form_data.append('nom', event.target.elements.nom.value);
  form_data.append('prenom', event.target.elements.prenom.value);
  form_data.append('phone', event.target.elements.phone.value);
  //form_data.append('role', event.target.elements.role.value);
  form_data.append('id', event.target.elements.hiddenid.value);

  console.log(form_data);
  
  // eslint-disable-next-line no-undef
  try{
      await fetch(`http://localhost:3000/dashboard/user/update/${event.target.elements.hiddenid.value}`, {
      method:'PUT',
      body:JSON.stringify(form_data)
    });
  }
  catch(e){
    console.log(e);
  }
  
  

  console.log(form_data);
};

window.addEventListener('load', init);
