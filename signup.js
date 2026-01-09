function togglePass(){
 const p=document.getElementById("password");
 p.type = p.type==="password" ? "text" : "password";
}

function goLogin(){
 window.location.href="login.html";
}

function signup(){
 auth.createUserWithEmailAndPassword(
  email.value,
  password.value
 ).then(cred=>{
  return db.collection("users").doc(cred.user.uid).set({
   name: name.value,
   phone: phone.value,
   email: email.value
  });
 }).then(()=>{
  alert("Signup successful. Please login.");
  window.location.href="login.html";
 }).catch(err=>{
  msg.innerText=err.message;
 });
}
