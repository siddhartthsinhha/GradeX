// Auto redirect if already logged in
auth.onAuthStateChanged(user=>{
  if(user){
    window.location.href = "index.html";
  }
});

// Toggle password show/hide
function toggleLoginPass(){
  const p = document.getElementById("password");
  const eye = document.querySelector(".eye");

  if(p.type === "password"){
    p.type = "text";
    eye.textContent = "🙈";
  }else{
    p.type = "password";
    eye.textContent = "👁";
  }
}

// Login function
function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(!email || !password){
    msg.innerText = "Please fill all fields";
    return;
  }

  loginBtn.innerText = "Logging in...";
  loginBtn.disabled = true;

  auth.signInWithEmailAndPassword(email, password)
    .then(()=>{
      window.location.href = "index.html";
    })
    .catch(err=>{
      msg.innerText = err.message;
      loginBtn.innerText = "Login";
      loginBtn.disabled = false;
    });
}

// Go to signup page
function goSignup(){
  window.location.href = "signup.html";
}

// Forgot password
function forgotPassword(){
  const email = document.getElementById("email").value;

  if(!email){
    alert("Enter email first");
    return;
  }

  auth.sendPasswordResetEmail(email)
    .then(()=>{
      alert("Password reset link sent to your email");
    })
    .catch(err=>{
      alert(err.message);
    });
}

// Enter key support
document.addEventListener("keydown", e=>{
  if(e.key === "Enter") login();
});
