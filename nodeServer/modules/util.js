const zp = n => n < 10 ? "0" + n : n;

const isoDate = (d) => {
    if(!d) d = new Date();
    var year = d.getFullYear();
    var month = zp( d.getMonth() + 1);
    var day = zp( d.getDate() );
    var hour = zp(d.getHours() );
    var min = zp(d.getMinutes() );
    var second = zp( d.getSeconds() );

    return `${year}-${month}-${day} ${hour}:${min}:${second}`
}

//export하겠다는 의미
module.exports = {
    zp, isoDate
}