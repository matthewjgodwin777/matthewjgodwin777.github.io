var loginbt = document.getElementById('loginbt');
var logoutbt=document.getElementById('logoutbt');
var userdet = document.getElementById('userdet');
var schooldesc = document.getElementById('schooldesc');
var schoolpic = document.getElementById('schoolpic');
var logincard = document.getElementById('logincard');
var chkbxrm= document.getElementById('chkbxrm');
var remme = false;
var backbtn = document.getElementById('backbtn');
var mc = document.getElementById('mc');
var pageno = 1;
var userid = document.getElementById('userid');
var pswd = document.getElementById('password');
var requ1 = document.getElementById('requ1');
var requ2 = document.getElementById('requ2');
var loginbutton = document.getElementById('loginbutton');
var err = document.getElementById('err');
var tnu= document.getElementById('usernametag');
var lnk=' ';
var sjd=new Array(117,105,110,46,106,115,111,110);

document.cookie="SameSite=None";
if(localStorage.getItem('uid') !== null && localStorage.getItem('pswd') !== null)
{
    p(localStorage.getItem('uid'),localStorage.getItem('pswd'),function(tem){
       if(tem !== -1)
       {
           for(var i=0;i<8;i++){
           lnk += String.fromCharCode(sjd[i]);
           }
           lnk=lnk.substring(1);
        readTextFile(lnk, function(xtx){
            let lm = JSON.parse(xtx);
            tnu.innerText = lm[tem].ur;
            createMC(tem);
            displayMC();
        });
       }
    });
    lnk=' ';
}

loginbt.addEventListener('click',function(e){
    e.preventDefault();
    if(pageno === 1)
    displayLoginForm();
});

function displayLoginForm(){
    pageno=2;
    requ1.style.display = 'none';
    requ2.style.display = 'none';
    userdet.style.display = 'none';
    schooldesc.style.display = 'none';
    schoolpic.style.display = 'none';
    logincard.style.display = 'block';
    mc.style.display = 'none';
}

loginbutton.addEventListener('click',function(){
    if(userid.value === '' || pswd.value === '')
    {
        requ1.style.display = 'inline-block';
        requ2.style.display = 'inline-block';
    }
    else{
    p(userid.value,pswd.value,function(itemp){
        console.log(itemp);
        if(itemp !== -1)
         {
            if(remme)
            {
                localStorage.clear();
                localStorage.setItem('uid',userid.value);
                localStorage.setItem('pswd',pswd.value);
            }
            tnu.innerText = lm[itemp].ur;
            createMC(itemp);
            displayMC();
         }
         else
       {
        requ1.style.display = 'none';
        requ2.style.display = 'none';
        err.style.display = 'block';
        err.innerHTML = `<span class='left'>&#9888;</span>`;
        err.innerText += " Incorrect Login Credentials";
        setTimeout(function(){
            err.style.display = 'none';
        },5000);
       }
    });}
});
function readTextFile(leil, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", leil, true);
    rawFile.setRequestHeader("SameSite","None");
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
function p(uid,pd,callback)
{
    var tempdata;
    for(var i=0;i<8;i++){
        lnk += String.fromCharCode(sjd[i]);
        }
        lnk=lnk.substring(1);
        //lnk="uin.json";
    readTextFile(lnk, function(text){
        lm = JSON.parse(text);
        for(var i=0;i<lm.length;i++)
      {
      if(lm[i].ur === uid && lm[i].wd === pd)
      {
        callback(i);
      }  
      }});
     lnk=' ';
     callback(-1);
}

function createMC(xii)
{
    var fee1 = document.getElementById('fee1');
    var fee2 = document.getElementById('fee2');
    var fee3 = document.getElementById('fee3');
    tnu.innerText = lm[xii].ur;
        if(lm[xii].fs[0] === 2)
        {
           fee1.innerText = 'Fees Paid';
        }
        else if(lm[xii].fs[0] === 1)
        {
            fee1.innerText = 'Fees Not Paid';
        }
        if(lm[xii].fs[1] === 2)
        {
           fee2.innerText = 'Fees Paid';
        }
        else if(lm[xii].fs[1] === 1)
        {
            fee2.innerText = 'Fees Not Paid';
        }
        if(lm[xii].fs[2] === 2)
        {
           fee3.innerText = 'Fees Paid';
        }
        else if(lm[xii].fs[2] === 1)
        {
            fee3.innerText = 'Fees Not Paid';
        }
        if(lm[xii].ma[0] !== 0)
        document.getElementById('m1').innerText = JSON.stringify(lm[xii].ma[0]);
        if(lm[xii].ma[1] !== 0)
        document.getElementById('m2').innerText = JSON.stringify(lm[xii].ma[1]);
        if(lm[xii].ma[2] !== 0)
        document.getElementById('m3').innerText = JSON.stringify(lm[xii].ma[2]);
        if(lm[xii].ma[3] !== 0)
        document.getElementById('m4').innerText = JSON.stringify(lm[xii].ma[3]);
        if(lm[xii].ma[4] !== 0)
        document.getElementById('m5').innerText = JSON.stringify(lm[xii].ma[4]);
        if(lm[xii].gp === "bio")
        {
            document.getElementById('sub5').innerText = 'Biology';
        }
        else if(lm[xii].gp === "com")
        {
            document.getElementById('sub3').innerText = 'Economics';
            document.getElementById('sub4').innerText = 'Commerce';
            document.getElementById('sub5').innerText = 'Accountancy';
        }
        
}

chkbxrm.addEventListener('click',function(){
    if(!remme)
    chkbxrm.src = "https://user-images.githubusercontent.com/11351528/51387695-f564d000-1b4c-11e9-817d-5e6280f997d0.png";
    else
    chkbxrm.src = "https://spng.pngfind.com/pngs/s/614-6146317_check-box-empty-comments-casilla-de-verificacion-png.png";
    remme= !remme;
});

logoutbt.addEventListener('click',function(){
    if(pageno===3)
    {
    localStorage.clear();
    location.reload();
    }
});

backbtn.addEventListener('click',function(){
    userdet.style.display = 'block';
    pageno = 1;
    schooldesc.style.display = 'block';
    schoolpic.style.display = 'block';
    logincard.style.display = 'none';
});

function displayMC(){
    pageno=3;
    userdet.style.display = 'block';
    document.body.style.backgroundImage = "url('https://drive.google.com/uc?export=download&id=1kR0v47oko1It225wVgZw_9g1JOywMCn9')";
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = '100% 100%';
    loginbt.style.display = 'none';
    logoutbt.style.display = 'block';
    requ1.style.display = 'none';
    requ2.style.display = 'none';
    schooldesc.style.display = 'none';
    schoolpic.style.display = 'none';
    logincard.style.display = 'none';
    mc.style.display = 'block';
    colourRows();
}
function colourRows(){
    var fee1 = document.getElementById('fee1');
    var fee2 = document.getElementById('fee2');
    var fee3 = document.getElementById('fee3');
    fee1.style.backgroundColor = 'rgb(215,215,215)';
    fee2.style.backgroundColor = 'rgb(215,215,215)';
    fee3.style.backgroundColor = 'rgb(215,215,215)';
    if(fee1.innerText === "Fees Paid")
    {
        fee1.style.backgroundColor = 'rgb(173, 253, 153)';
    }
    else if(fee1.innerText === "Fees Not Paid")
    {
        fee1.style.backgroundColor = 'rgb(295, 192, 192)';
    }
    if(fee2.innerText === "Fees Paid")
    {
        fee2.style.backgroundColor = 'rgb(173, 253, 153)';
    }
    else if(fee2.innerText === "Fees Not Paid")
    {
        fee2.style.backgroundColor = 'rgb(295, 192, 192)';
    }
    if(fee3.innerText === "Fees Paid")
    {
        fee3.style.backgroundColor = 'rgb(173, 253, 153)';
    }
    else if(fee3.innerText === "Fees Not Paid")
    {
        fee3.style.backgroundColor = 'rgb(295, 192, 192)';
    }
    var m1 = document.getElementById('m1');
    var m2 = document.getElementById('m2');
    var m3 = document.getElementById('m3');
    var m4 = document.getElementById('m4');
    var m5 = document.getElementById('m5');
    var passstatus = document.getElementById('passstatus');
    passstatus.innerText = 'PASS';
    passstatus.style.color = 'green';

    if(parseInt(m1.innerText) < 35)
    {
        m1.style.color = 'red';
        m1.style.textDecoration = 'underline';
        passstatus.innerText = 'FAIL';
        passstatus.style.color = 'red';
    }
    if(parseInt(m2.innerText) < 35)
    {
        m2.style.color = 'red';
        m2.style.textDecoration = 'underline';
        passstatus.innerText = 'FAIL';
        passstatus.style.color = 'red';
    }
    if(parseInt(m3.innerText) < 35)
    {
        m3.style.color = 'red';
        m3.style.textDecoration = 'underline';
        passstatus.innerText = 'FAIL';
        passstatus.style.color = 'red';
    }
    if(parseInt(m4.innerText) < 35)
    {
        m4.style.color = 'red';
        m4.style.textDecoration = 'underline';
        passstatus.innerText = 'FAIL';
        passstatus.style.color = 'red';
    }
    if(parseInt(m5.innerText) < 35)
    {
        m5.style.color = 'red';
        m5.style.textDecoration = 'underline';
        passstatus.innerText = 'FAIL';
        passstatus.style.color = 'red';
    }
}