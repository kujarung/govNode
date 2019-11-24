
function revData(id) {
    

}

function sendData(f) {
    if( f.username.value.trim() == "") {
        alert("이름을 입력하세요.")
        f.username.focus();
        return false;
    }
    axios.post("/seq", {
        username : f.username.value
    }).then(function(result) {
        console.log(result);
        if(result.status == 200) {
            getData();
            document.wrForm.username.value="";
        }; 
    });
}

function changData(id, name) {
    var username = name
    var userid = id
    document.upForm.id.value = userid;
    document.upForm.username.value = username;
}

function putDate(f) {
    if(f.username.value == "") {
        alert("이름을 입력하세요.");
        f.username.focus();
        return false;
    }
    axios.put("/seq", {
        id : f.id.value, username : f.username.value
    }).then(function(res) {
        console.log(res);
        if(res.status == 200) {
            getData();
            document.upForm.id.value = "";
            document.upForm.username.value = "";
        }
    });
}
