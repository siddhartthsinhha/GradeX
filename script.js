/* 🔒 REAL-TIME INPUT CAP */
function capInput(el, max){
 if(el.value === "") return;
 let v = +el.value;
 if(v > max) el.value = max;
 if(v < 0) el.value = 0;
}

/* ✅ FULL SUBJECT LIST – GGSIPU 1st YEAR */
const subjectsData={
 CSE: [
  "Applied Physics-1",
  "Applied Mathematics-1",
  "Manufacturing Process",
  "Programming in C",
  "Environment Science"
 ],

 EEE: [
  "Applied Physics-1",
  "Applied Mathematics-1",
  "Manufacturing Process",
  "Programming in C",
  "Environment Science"
 ],

 IT: [
  "Applied Physics-1",
  "Applied Mathematics-1",
  "Applied Chemistry",
  "Manufacturing Process",
  "Communication Skills",
  "Electrical Science"
 ],

 ECE: [
  "Applied Physics-1",
  "Applied Mathematics-1",
  "Applied Chemistry",
  "Manufacturing Process",
  "Communication Skills",
  "Electrical Science"
 ]
};

/* CONVERSIONS */
function attendanceConvert(p){
 if(p>=90) return 5;
 if(p>=75) return 4;
 if(p>=50) return 3;
 if(p>=30) return 2;
 if(p>=20) return 1;
 return 0;
}

function ctConvert(v){
 if(v==="bad") return 1;
 if(v==="good") return 2;
 if(v==="verygood") return 3;
 if(v==="excellent") return 4;
 return 0;
}

/* INTERNAL */
function in_calculate(){
 const sub=in_subject.value;
 if(!sub){
  in_result.innerHTML="Select Subject";
  return;
 }

 const mid=Math.min(+in_mid.value||0,30);
 const att=Math.min(+in_attendance.value||0,100);
 const ct=in_ct.value;

 const internal=mid+attendanceConvert(att)+ctConvert(ct);

 in_result.innerHTML=
 `${sub}<br>Internal: ${internal} / 40`;
}

/* RENDER CGPA SUBJECTS */
function cg_render(){
 const br=cg_branch.value;
 if(!br) return;

 let html="";
 subjectsData[br].forEach((s,i)=>{
  html+=`
  <div class="row">
   <label>${s} – Mid (30)</label>
   <input class="cg_mid" oninput="capInput(this,30)">
   <label>${s} – End (60)</label>
   <input class="cg_end" oninput="capInput(this,60)">
   <label>${s} – Attendance %</label>
   <input class="cg_att" oninput="capInput(this,100)">
   <label>${s} – Class Test</label>
   <select class="cg_ct">
    <option value="bad">Bad</option>
    <option value="good">Good</option>
    <option value="verygood">Very Good</option>
    <option value="excellent">Excellent</option>
   </select>
   <div class="result" id="cg_sub${i}"></div>
  </div>`;
 });

 cg_subjects.innerHTML=html;
}

/* CGPA */
function gradePoint(total){
 return Math.min(total/10,10);
}

function cg_calculate(){

 const mids = document.querySelectorAll(".cg_mid");
 const ends = document.querySelectorAll(".cg_end");
 const atts = document.querySelectorAll(".cg_att");
 const cts  = document.querySelectorAll(".cg_ct");

 let weightedPoints = 0;
 let totalCredits = 0;

 mids.forEach((m,i)=>{

  const mid = Math.min(+m.value || 0, 30);
  const end = Math.min(+ends[i].value || 0, 60);
  const att = Math.min(+atts[i].value || 0, 100);
  const ct  = cts[i].value;

  // 🔹 INTERNAL MARKS (40)
  const internal =
    mid +
    attendanceConvert(att) +
    ctConvert(ct);

  // 🔹 TOTAL MARKS (100)
  const total = internal + end;

  // 🔹 GRADE POINT (MAX 10)
  const gp = Math.min(total / 10, 10);

  const credit = 3;

  weightedPoints += gp * credit;
  totalCredits += credit;

  document.getElementById("cg_sub"+i).innerHTML =
    `Internal: ${internal} / 40`;
 });

 // 🔹 FINAL CGPA
 let cgpa = weightedPoints / totalCredits;
 cgpa = Math.min(cgpa, 10); // 🔒 HARD LOCK

 cg_result.innerHTML =
  `Final CGPA: ${cgpa.toFixed(2)} / 10`;
}


/* ✅ LOGOUT FUNCTION – ALAG & SAHI */
function logout(){
  auth.signOut()
    .then(()=>{
      window.location.href = "login.html";
    })
    .catch(err=>{
      alert(err.message);
    });
}
