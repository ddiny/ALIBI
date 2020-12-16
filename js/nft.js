function getPermission(){
    //userid, nftid, privatekey
    // return nftid , nftpassword ...
    alert("작업 완료시 나오는 nftid, nftpassword 를 제출 상대에게 알려주세요.\n분실시 복구가 불가능합니다.")
    const privatekey = document.getElementById("privKey").value;
    const nftid = document.getElementById("n").innerText;

    let tmp = localStorage.getItem("id");
    let token = localStorage.getItem(tmp)
    axios.defaults.headers.common = {'Authorization': 'Bearer '  + token }

    axios.post('http://34.64.100.169:8080/nft/setpermission',
    { userid: tmp, privatekey: privatekey, nftid: Number(nftid)}) 
   .then(res =>{
       if(!res.data){ alert("발급된 NFT가 없습니다."); }
       else{
            alert("NFT ID : " + res.data.nftid +'　　　　　　　　　　　　　　　　　　　　　　' + 
                       "NFT PASSWORD : " + res.data.nftpassword +
                       '　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　' + "※저장해주세요")
       }        
   }).catch(err =>{
        alert("잘못된 프라이빗키이거나 이미 발급된 상태입니다.");
   })

}

function rmPermission(){
    //nftid, userid, auth
  const nftid = document.getElementById("n").innerText;

  let tmp = localStorage.getItem("id");
  let token = localStorage.getItem(tmp)
  axios.defaults.headers.common = {'Authorization': 'Bearer '  + token }

  axios.post('http://34.64.100.169:8080/nft/rmpermission',
    { userid: tmp, nftid: Number(nftid)}) 
    .then(res =>{
        console.log(res.data);
        if(res.data=="Not exist permission"){  alert("공유하신 NFT가 없습니다."); }
        else{
            console.log(res.data);
            alert(nftid +" 번 NFT제출이 해제되었습니다.")
            
        }        
    }).catch(err =>{
        alert("err" +  err);
    })



}

function verify(){
    document.getElementById("result").style.display = "block";
    const nftid = document.getElementById("nftid").value;
    const sessionkey = document.getElementById("sessionkey").value;

    axios.post('http://34.64.100.169:8080/nft/getpermission',
    { nftid: nftid, sessionkey:sessionkey}) 
   .then(res =>{
       if(!res.data){ 
           document.getElementById("result").style.display = "none"; 
            alert("발급된 NFT가 없습니다.");
         }
       else{
           let myData = JSON.parse(res.data.idata);
           myData = JSON.parse(myData);
           
            document.getElementById("a").innerText = myData.user;
            document.getElementById("b").innerText = myData.target;
            document.getElementById("c").innerText = myData.company;
            document.getElementById("d").innerText = myData.start_date + " ~ ";
            document.getElementById("e").innerText = myData.end_date;
            document.getElementById("f").innerText = myData.retire_date;
            document.getElementById("g").innerText = myData.contents;
            
    
    }        
   }).catch(err =>{
        document.getElementById("result").style.display = "none"; 
        alert("NFT PASSWORD가 다릅니다. ");
   })

}