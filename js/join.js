function login(){
    if(localStorage.getItem("id")){
        localStorage.removeItem("id");
        alert("ERR");
    }

    var userid = document.getElementById("userid");
    var password = document.getElementById("password");
    var mydata = {
        userid: userid.value,
        password : password.value
    };
    axios.post('http://34.64.100.169:8080/user/login', mydata)
    .then(function(response){
        localStorage.setItem( response.data.user.id, response.data.token);
        localStorage.setItem("id", response.data.user.id )
        window.location.href='index_login.html';
     })
    .catch(err =>{
         alert("로그인 실패");
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