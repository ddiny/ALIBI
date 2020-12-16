let dat;

function getUserData(){
    return new Promise((resolve)=>{
        let tmp = localStorage.getItem("id");
    

        let token = localStorage.getItem(tmp)
    
        axios.defaults.headers.common = {'Authorization': 'Bearer '  + token }
    
        axios.post('http://34.64.100.169:8080/user/userdata', {userid :tmp}) 
        .then(res =>{
            console.log(res.data);
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

function toggle(){
    var div = document.getElementById("toggleData")
    var myBtn = document.getElementById("toggleBtn");
    if(div.style.display=='none'){
        myBtn.innerText="↑";
        div.style.display='block';
    }else{
        myBtn.innerText="↓";
        div.style.display="none";
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

function getCertlist(){
    return new Promise((resolve)=>{
        let tmp = localStorage.getItem("id");
    

        let token = localStorage.getItem(tmp)
    
        axios.defaults.headers.common = {'Authorization': 'Bearer '  + token }
        axios.get('http://34.64.100.169:8080/user/usercertlist',
        {params: { userid: tmp}}) 
        .then(res =>{
            console.log(res.data);
            resolve(res.data);
        }).catch(err =>{
             alert("ERR" + err);
        })
    })
}

function createEdittable(n){
    return new Promise((resolve)=>{
  const ul = document.getElementById("exam");
    for(let i = 0; i < n; i ++){
        const newA = document.createElement("a");
        newA.setAttribute("id", "editA"+i);
        newA.setAttribute("href", "certifibox.html");
        ul.appendChild(newA);
        resolve(1);
    }

    
    })
}

function addP(n){
    return new Promise(resolve=>{
        for(let i =0; i < n; i ++){
            const target_a = document.getElementById("editA"+i);
            const linebreak = document.createElement("br");
            const newP = document.createElement('p');
            newP.setAttribute("value","zz")
            newP.setAttribute("id", "editP"+i)
            target_a.appendChild(newP);
            //target_a.appendChild(linebreak);
            resolve(1);
        }
    })
}

function statusParse(n){
        switch(n){
            case 1:
                return "계약서 작성 중";
            case 2:
                return "계약서 작성완료";
            case 3:
                return "퇴직서 작성 중";
            case 4:
                return "작성완료";
            default:
                break;

        }
}

function getNFT(){
    return new Promise((resolve,reject) =>{
        const privkey = document.getElementById("privKey");

        let tmp = localStorage.getItem("id");
    

        let token = localStorage.getItem(tmp)
    
        axios.defaults.headers.common = {'Authorization': 'Bearer '  + token }
        axios.post('http://34.64.100.169:8080/nft/getmynft',
         { userid: tmp, privatekey: privkey.value}) 
        .then(res =>{
            console.log(res);
            dat = res;
            if(!res.data.Arr.length){ alert("발급된 NFT가 없습니다."); }
            else{
                localStorage.setItem("isNFT", res.data.Arr.length);

                if(localStorage.getItem("isNFT")){
                    const i = document.getElementById("inputPRIV");
                    i.style.display="none";
                    const k = document.getElementById("nftBoxes");
                    k.style.display="block";

                    createNFT_a(res.data.Arr.length);
                    createNFT_div(res.data.Arr.length);
                    createNFT_p(res.data.Arr.length);
                  
                    for(let i = 0; i < res.data.Arr.length; i ++){
                        const m = document.getElementById("nftP"+i);
                        const m2 = document.getElementById("nftP_under"+i);
                        
                        const tmpstr = res.data.Arr[i].id;
                        const tmpstr2 = res.data.Com[i];

                        m.innerText = "nftid : " + tmpstr;
                        m2.innerText = "사업체 : " + tmpstr2;
                        m.style="font-size:10px";
                        m2.style="font-size:12px";
                    }

                    localStorage.removeItem("isNFT");   
                  }
               
                resolve(res);
            }        
        }).catch(err =>{
             alert("잘못된 프라이빗키입니다");
        })
    })
}

function myPop(n){
    const id = dat.data.Arr[n].id;
    window.open("nftbox.html?val="+id, "nftbox" ,"width=650, height=800, left=100, top=100")
}

function getNFT_by_num(){
    let nftid = document.getElementById("first_n").innerText;
    nftid = nftid.split(" ")[1];
    const privkey = document.getElementById("privKey");

    let tmp = localStorage.getItem("id");
    let token = localStorage.getItem(tmp)
    axios.defaults.headers.common = {'Authorization': 'Bearer '  + token }

    axios.post('http://34.64.100.169:8080/nft/getnftByNumber',
     { userid: tmp, privatekey: privkey.value, nftid: Number(nftid)}) 
    .then(res =>{
        if(!res.data){ alert("발급된 NFT가 없습니다."); }
        else{
            const myData = JSON.parse(res.data);
            document.getElementById("first").style.display="none";
            document.getElementById("start").style.display="block";

            document.getElementById("n").innerText = nftid;
            document.getElementById("a").innerText = myData.user;
            document.getElementById("b").innerText = myData.target;
            document.getElementById("c").innerText = myData.company;
            document.getElementById("d").innerText = myData.start_date;
            document.getElementById("e").innerText = myData.end_date;
            document.getElementById("f").innerText = myData.retire_date;
            document.getElementById("g").innerText = myData.contents;    
        }        
    }).catch(err =>{
         alert("잘못된 프라이빗키입니다");
    })

}



function createNFT_a(n){
    return new Promise((resolve)=>{
        const div = document.getElementById("nftBoxes");
          for(let i = 0; i < n; i ++){
              const newA = document.createElement("a");
              newA.setAttribute("id", "nftA"+i);
              newA.setAttribute("style", "width:auto")
              newA.setAttribute("onclick", "myPop(" + i + ")")
              div.appendChild(newA);
              resolve(1);
          }
    })
}

function createNFT_div(n){
    return new Promise((resolve)=>{
   
          for(let i = 0; i < n; i ++){
              const tar_a = document.getElementById("nftA"+i);
              const newDiv = document.createElement("div");
              newDiv.setAttribute("id", "nftdiv"+i);
              newDiv.setAttribute("class", "nftBox");
              
              tar_a.appendChild(newDiv);
              resolve(1);
          }
    })
}


function createNFT_p(n){
    return new Promise((resolve)=>{
          for(let i = 0; i < n; i ++){
            const target_div = document.getElementById("nftdiv"+i);
            const newP = document.createElement("p");
            const newP2 = document.createElement("p");
            const linebreak = document.createElement("br");
            newP.setAttribute("id", "nftP"+i);
            newP2.setAttribute("id", "nftP_under"+i);
            
            target_div.appendChild(newP);
            target_div.appendChild(newP2);
            
            resolve(1);
          }
    })
}


