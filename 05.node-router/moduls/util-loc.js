const alertLoc = (str, loc) => {
    let html = 
    `
    <script>
        alert("${str}");
        location.href = "${loc}";
    </script>
    `
    return html;
}

module.exports = {alertLoc}