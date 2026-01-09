function reset(){
 auth.sendPasswordResetEmail(email.value)
 .then(()=>{
  alert("Password reset link sent to email");
 })
 .catch(err=>{
  alert(err.message);
 });
}

function goLogin(){
 window.location.href="login.html";
}
