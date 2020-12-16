function createContents(n, Arr){
  return new Promise( resolve =>{

      
      const myul = document.getElementById("contentUL");
      for(let i = 0; i < n; i ++){
          const newLi = document.createElement("li");
          const newP = document.createTextNode(Arr[i]);

          newLi.setAttribute("id", "editLi"+i);
          
          newLi.appendChild(newP);
          myul.appendChild(newLi);

          resolve(1);
        }
  })
}

function toggle_s(){
  var div = document.getElementById("sign_div")
  var myBtn = document.getElementById("signbutton");
  if(div.style.display=='none'){
      div.style.display='block';
  }else{
      div.style.display="none";
  }
}

function toggle_b(){
  var div = document.getElementById("bye_div")
  if(div.style.display=='none'){
      div.style.display='block';
  }else{
      div.style.display="none";
  }
}

function toggle_n(){
    var div = document.getElementById("nft_div")
    if(div.style.display=='none'){
        div.style.display='block';
    }else{
        div.style.display="none";
    }
  }

function signbtn(){


  const flag = localStorage.getItem("stat");
  
  const privatekey = document.getElementById("privKey").value;
  const certifinum = document.getElementById("n").innerText;


  let tmp = localStorage.getItem("id");
  let token = localStorage.getItem(tmp)

  axios.defaults.headers.common = {'Authorization': 'Bearer '  + token }

  if(flag == 1){
    axios.post('http://34.64.100.169:8080/cert/receivecert', 
    {userid :tmp, certifinum : Number(certifinum), privatekey: privatekey}) 
    .then(res =>{
        localStorage.removeItem("stat");
        alert(tmp + "님의 서명이 완료되었습니다.")
        window.location.href="userPage.html"
    }).catch(err =>{
        alert("잘못된 입력입니다." );
    })
  }
  else if(flag ==3){
    axios.post('http://34.64.100.169:8080/cert/receiveretirement', 
    {userid :tmp, certifinum : Number(certifinum), privatekey: privatekey}) 
    .then(res =>{
        localStorage.removeItem("stat");
        alert(tmp + "님의 서명이 완료되었습니다.")
        window.location.href="userPage.html"
    }).catch(err =>{
        alert("잘못된 입력입니다." );
    })
  }
  else{
      localStorage.removeItem("stat");
      alert("잘못된 입력입니다.");
  }


}

function getCertnum(n){
  return new Promise((resolve)=>{
      let tmp = localStorage.getItem("id");
  

      let token = localStorage.getItem(tmp)
  
      axios.defaults.headers.common = {'Authorization': 'Bearer '  + token }
      console.log('http://34.64.100.169:8080/cert/getcert/:' + n)

      axios.get('http://34.64.100.169:8080/cert/getcert/:' + n, 
      {params: {userid : tmp}}) 
      .then(res =>{
          resolve(res.data);
      }).catch(err =>{
          alert("ERR" + err);
      })
  })

}

function logout(){
  const userid = localStorage.getItem("id");

  if(localStorage.getItem(userid)){
      localStorage.removeItem(userid);
      localStorage.removeItem("id");
      alert(" 로그아웃 완료 !");
      window.location.href="index.html"
  }else{
      alert("로그인부터 하세요");
      window.location.href="index.html"
  }
  
}


function statusParse(n){
  switch(n){
      case 1:
          return "계약서 작성 중" + ' ( '+ document.getElementById("b").innerText  +  "님이 서명할 차례입니다. ) ";
      case 2:
          return "계약서 작성완료 ";
      case 3:
          return "퇴직서 작성 중"  + ' ( '+ document.getElementById("b").innerText  +  "님이 서명할 차례입니다. )" ;
      case 4:
          return "작성완료";
      default:
          break;

  }
}


function retire_input(){
    return new Promise( (resolve, reject) => {
        let tmp = localStorage.getItem("id");
  
        let token = localStorage.getItem(tmp)
    
        axios.defaults.headers.common = {'Authorization': 'Bearer '  + token }
    
        const certifinum = document.getElementById("n").innerText;
        const privKey = document.getElementById("retire_privKey").value;
        let retire_date = document.getElementById("retire_input").value;
        retire_date = retire_date.replace('-', "년");
        retire_date = retire_date.replace('-', "월");
        retire_date += "일";

        axios.post('http://34.64.100.169:8080/cert/inputretirement', 
        {userid :tmp, retirement: retire_date ,certifinum : Number(certifinum), privatekey: privKey}) 
        .then(res =>{
            alert("퇴직일 입력 완료 !");
            window.location.href="userPage_cert.html"
        }).catch(err =>{
            alert("잘못된 입력입니다. : " + err );
        })
    }) 
}

function issue_nft(){

    let tmp = localStorage.getItem("id");
    let token = localStorage.getItem(tmp)
    axios.defaults.headers.common = {'Authorization': 'Bearer '  + token }

    const certifinum = document.getElementById("n").innerText;
    const privKey = document.getElementById("nft_privKey").value;
    

    axios.post('http://34.64.100.169:8080/nft/issuenft', 
        { userid:tmp, certifinum : Number(certifinum), privatekey: privKey}) 
        .then(res =>{
            alert("발급 완료 !");
            window.location.href="userPage.html"
        }).catch(err =>{
            alert("잘못된 입력입니다. : " + err );
        })

}