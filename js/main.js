

function showTime(){
    let date = new Date();
    // noinspection JSAnnotator
    let year = date.getFullYear();
    let month = date.getMonth();
    let d = date.getDate();
    let h=date.getHours();
    let m=date.getMinutes();

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