/**
 * @return {string}
 */
function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}


function showTime(){
    let date = new Date();
    // noinspection JSAnnotator
    let year = PrefixInteger(date.getFullYear(), 4);
    let month = PrefixInteger(date.getMonth(), 2);
    let d = PrefixInteger(date.getDate(),2);
    let h=PrefixInteger(date.getHours(),2);
    let m=PrefixInteger(date.getMinutes(),2);


    document.getElementById('timeStamp').innerHTML = ` ${d}-${month}-${year} ${h}:${m}  `;
    setTimeout(showTime,60000);
}


function clickshow(id){
    let element = document.getElementById(id);
    if(element.style.display === 'none'){
        element.style.display = ""
    }
    else{
        element.style.display="none"
    }
}