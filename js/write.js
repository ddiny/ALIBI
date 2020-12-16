function check(){
  const value = confirm("사업자등록번호를 도용할 시, 그 책임은 도용자 본인에게 있습니다.\n사업자등록번호 사용 내역은 블록체인에 저장되어 안전하게 보관됩니다.");
  if(value){
      return new Promise((resolve, reject)=>{
          let tmp = localStorage.getItem("id");
          let token = localStorage.getItem(tmp)
          axios.defaults.headers.common = {'Authorization': 'Bearer '  + token }

          const regi_num = document.getElementById("verify_RN");
          if(regi_num.value.length != 10){ return alert("올바른 사업자 등록번호를 입력해주세요.")}
      
          axios.post('http://34.64.100.169:8080/cert/writecert/inspection', {userid:tmp ,register_number :regi_num.value}) 
          .then(res =>{
              document.getElementById("comInfo").style.display = "block";

              document.getElementById("regNum").innerText = res.data.Bnumber;
              document.getElementById("comName").innerText = res.data.BCOname;
              document.getElementById("CEOName").innerText = res.data.BCEOname;
              

              resolve(res.data);
          }).catch(err =>{
               alert("존재하지 않는 사업자 등록번호입니다." + err);
          })
      })
  } 
}

function confirm_no () {
  alert(`다시 인증해주세요.`);
  document.getElementById("verify_RN").value = "";
  document.getElementById("comInfo").style.display = "none";
}




function startWrite(){
  localStorage.setItem("certification", 1); // 계약서 제출시 certification이 1인지 확인. 그 후 바로 삭제...

    document.getElementById("verify_RN").disabled = true;
    
    document.getElementById("firstDiv").style.display = "none";
    document.getElementById("comInfo").style.display = "none";
    document.getElementById("write_div").style.display = "block";

    document.getElementById("userid").value = localStorage.getItem("id");
    document.getElementById("comid").value = document.getElementById("comName").innerText;
    

    document.getElementById("userid").disabled = true;
    document.getElementById("comid").disabled = true;
    
}


function checkid(){
  const tempid = document.getElementById("targetid");
      if(tempid.value.length < 5 ) { return alert("아이디는 5글자 이상으로 입력해주세요. ")}
      if(tempid.value == document.getElementById("userid").value){ return alert("자신의 아이디는 입력할 수 없습니다.")}

      axios.post('http://34.64.100.169:8080/user/register/checkid', {userid :tempid.value}) 
      .then(res =>{
          alert("존재하지 않는 아이디입니다.");
          
      }).catch(err =>{
           if(confirm(tempid.value + " 가 맞나요?")){
              tempid.disabled = true;
              localStorage.setItem("register", 1);
              document.getElementById("")
           }else{
              tempid.disabled = false;
               tempid.value="";
           }
           
      })
}

function register() {
  const targetid = document.getElementById("targetid");
  const useraddress = document.getElementById("useraddress");
  const userphone = document.getElementById("userphone");
  const start_year = document.getElementById("start_year");
  const start_month = document.getElementById("start_month");
  const start_day = document.getElementById("start_day");
  const end_year = document.getElementById("end_year");
  const end_month = document.getElementById("end_month");
  const end_day = document.getElementById("end_day");
  const storename = document.getElementById("storename");
  const doing = document.getElementById("do");
  const start_work = document.getElementById("start_work");
  const end_work = document.getElementById("end_work");
  const pay = document.getElementById("pay");
  const payday = document.getElementById("payday");
  const way = document.getElementById("way");
  const privkey = document.getElementById("privkey");

  { alert("아직 작성하지 않은 항목이 존재합니다.") }


  return new Promise((resolve,reject) =>{
      if(localStorage.getItem("register")){
          const privkey = document.getElementById("privKey");
          let tmp = localStorage.getItem("id");
      
  
          let token = localStorage.getItem(tmp)
      
          axios.defaults.headers.common = {'Authorization': 'Bearer '  + token }

          const user = document.getElementById("userid").value;
          const target = document.getElementById("targetid").value;
          const company = document.getElementById("comid").value;
          //const start_date = document.getElementById("start_date").value;
         // const end_date = document.getElementById("end_date").value;
         
          const privatekey = document.getElementById("privkey").value;

          let start_y = document.getElementById("start_year");
          let start_m = document.getElementById("start_month");
          let start_d = document.getElementById("start_day");
          let end_y = document.getElementById("end_year");
          let end_m = document.getElementById("end_month");
          let end_d = document.getElementById("end_day");
          const start_date = start_y.options[start_y.selectedIndex].text + start_m.options[start_m.selectedIndex].text 
           + start_d.options[start_d.selectedIndex].text;
          const end_date = end_y.options[end_y.selectedIndex].text + end_m.options[end_m.selectedIndex].text 
           + end_d.options[end_d.selectedIndex].text;
          
          //const S_period = "계약기간 : " + _start_date + " ~ " + _end_date + "\n";/*******/

          const S_storename = "근무장소 : " + document.getElementById("storename").value + '\n';/*******/
          const S_do = "업무내용 : " + document.getElementById("do").value + '\n';/*******/

          const start_work = document.getElementById("start_work").value;
          const end_work = document.getElementById("end_work").value;
          const S_worktime = "근로시간 : " + start_work + " ~ " + end_work + '\n';/*******/

         
          /////////////////////////////////////////////////////////////////////////
          let workday = "근무일 : ";
          let len = document.getElementsByName("day").length;
          for( let i=0; i < len; i ++){
            if(document.getElementsByName("day")[i].checked == true){
             workday += document.getElementsByName("day")[i].value;
             // alert(document.getElementById("day_" +i).innerText)
            }
          }
          /////////////////////////////////////////////////////////////////////////
          let restday = "주휴일 : ";
          len = document.getElementsByName("rest").length;
          for( let i=0; i < len; i ++){
            if(document.getElementsByName("rest")[i].checked == true){
              restday += document.getElementsByName("rest")[i].value + " ";
            }
          }
          restday += '\n';
          const S_days = workday + ', ' + restday; /*******/
          /////////////////////////////////////////////////////////////////////////
          let S_payment = ""; /*******/
          len = document.getElementsByName("pay").length;
          for( let i=0; i < len; i ++){
            if(document.getElementsByName("pay")[i].checked == true){
             S_payment += document.getElementsByName("pay")[i].value;
             // alert(document.getElementById("day_" +i).innerText)
            }
          }
          S_payment += " : " + document.getElementById("pay").value + '\n';
          /////////////////////////////////////////////////////////////////////////
          let S_pay_day = "임금지급일 : "; /*******/
          len = document.getElementsByName("payday").length;
          for( let i=0; i < len; i ++){
            if(document.getElementsByName("payday")[i].checked == true){
             S_pay_day += document.getElementsByName("payday")[i].value;
             if(i==0){ S_pay_day += " " + document.getElementById("number").value  + "일"}
             // alert(document.getElementById("day_" +i).innerText)
            }
          }
          S_pay_day += '\n';
          /////////////////////////////////////////////////////////////////////////
          let S_way = "지급방법 : "; /*******/
          len = document.getElementsByName("way").length;
          for( let i=0; i < len; i ++){
            if(document.getElementsByName("way")[i].checked == true){
             S_way += document.getElementsByName("way")[i].value + '\n\n';
             // alert(document.getElementById("day_" +i).innerText)
            }
          }
          console.log(S_way)
          /////////////////////////////////////////////////////////////////////////

         
        const contents = S_storename + S_do + S_worktime + S_days + S_payment + S_pay_day + S_way;
          
          axios.post('http://34.64.100.169:8080/cert/writecert',
           { 
               userid: tmp, target:target, company: company, start_date: start_date, 
               end_date: end_date, contents: contents, privatekey: privatekey
          }) 
          .then(res =>{
              alert("계약서 작성 완료 !");   
              localStorage.removeItem("register");       
              window.location.href = "index_login.html";
                     
          }).catch(err =>{

               alert("잘못된 프라이빗키입니다" + err);
          })
          
    }else { alert("잘못된 접근 ! ")}

  
  })
}