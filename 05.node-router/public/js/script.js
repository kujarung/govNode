function changData(elem) {
    var userid      = elem.parentNode.parentNode.querySelector(".user-id").innerHTML;
    var username    = elem.parentNode.parentNode.querySelector(".user-name").innerHTML;

    document.querySelector("#id").value = userid;
    document.querySelector("#username").value = username;
}

function revDate(elem) {
    var id = elem.parentNode.parentNode.querySelector(".user-id").innerHTML;
    if(confirm("정말로 삭제 하시겠습니까?") ) {
        document.querySelector("#rev-id").value = id;
        document.querySelector("#revForm").submit();
    }
}