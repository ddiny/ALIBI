function checkid() {
    const tempid = document.getElementById("userid");
    if (tempid.value.length < 5) { return alert("아이디는 5글자 이상으로 입력해주세요. ") }

    axios.post('http://34.64.100.169:8080/user/register/checkid', { userid: tempid.value })
        .then(res => {
            alert("사용 가능합니다 !")
            tempid.disabled = true;
        }).catch(err => {
            alert("사용 할 수 없는 계정입니다.");
        })
}

function sendCode(){
    let phoneNum = document.getElementById("phone");
    if(phoneNum.value.length != 11){ alert("올바른 전화번호를 입력하세요.")}
    
    phoneNum = phoneNum.value.substring(3, phoneNum.value.length);

    axios.post('http://34.64.100.169:8080/user/register/phone', {phone_num :phoneNum}) 
    .then(res =>{
        localStorage.setItem("phone", res.data.token);
        document.getElementById("verifyDiv").style.visibility='visible';
        
    }).catch(err =>{
         alert("전송 오류 !" );
    })
    

}
function validateEmail() {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    var email = document.getElementById('useremail').value;
    if (email == '' || !re.test(email)) {
        document.getElementById('val').innerHTML='올바른 이메일 형식이 아닙니다. 다시 입력하세요.';
		document.getElementById('val').style.color='red';			
        //alert("올바른 이메일 주소를 입력하세요")         
    }
    else{
        document.getElementById('val').innerHTML='올바른 이메일 형식입니다.';
		document.getElementById('val').style.color='blue'; 
    }
}


    function checkCode() {
        const myCode = document.getElementById("verifyText");
        if (myCode.value.length != 6) { alert("인증코드는 6자리입니다.") }
        let phone_token = localStorage.getItem("phone");

        axios.defaults.headers.common = { 'Authorization': 'Bearer ' + phone_token }


        axios.post('http://34.64.100.169:8080/user/register/phone/check', { verifycode: myCode.value })
            .then(res => {
                alert("인증 완료 !");
                document.getElementById("phone").disabled = true;
                document.getElementById("verifyText").disabled = true;
                localStorage.removeItem("phone");
                localStorage.setItem("register", res.data.token);

            }).catch(err => {
                alert("인증 실패 !");
            })

    }

    function checkeosid() {
        const eosid = document.getElementById("eosid");
        console.log(eosid.value.length);
        if (eosid.value.length != 12) { alert("EOS계정은 12글자로 정해야합니다.") }
        else {
            axios.post('http://34.64.100.169:8080/user/register/checkeosid', { eosid: eosid.value })
                .then(res => {
                    alert("사용 가능한 계정입니다.");
                    document.getElementById("eosid").disabled = true;
                }).catch(err => {
                    alert("사용 불가능한 계정입니다 !");
                })
        }



    }

    function register() {
        const userid = document.getElementById("userid");
        const password = document.getElementById("password");
        const name = document.getElementById("name");
        const phone = document.getElementById("phone");
        const phone_check = document.getElementById("verifyText");
        const eosid = document.getElementById("eosid");

        if (!(userid.disabled && phone.disabled && phone_check.disabled/*&&eosid.disabled*/)) { alert("아직 작성하지 않은 항목이 있습니다.") }

        let register_token = localStorage.getItem("register");
        axios.defaults.headers.common = { 'Authorization': 'Bearer ' + register_token }


        axios.post('http://34.64.100.169:8080/user/register',
            {
                userid: userid.value, password: password.value, name: name.value, phone: phone.value
                , eos_accountname: eosid.value
            }
        )
            .then(res => {
                localStorage.removeItem("register");
                confirm("회원가입성공 ! 해당 화면에 출력된 프라이빗키를 안전한 곳에 보관해주세요. 　　　　　　　　　　　　　　　　　　　　　　　　　Private Key : " + res.data.privatekey);

                window.location.href = "index.html";

            }).catch(err => {
                alert("회원가입 실패..." + err);
            })


    }