const peopleSelector = document.getElementById("people");
const info = document.getElementById("info");

function EnterPress(e){ // detect key down
    var e = e || window.event;
    if(e.keyCode === 13){
        document.getElementById("addMoney").click();
    }
}

moneyBag = {
    0: [],
    1: [],
    2: [],
    3: []
};


nameMap = {
    0: "Chenyu Xi",
    1: "Chen Huang",
    2: "Tong Wu",
    3: "Fan Li"
};

getPeople = function(){
    let currentPeople = $("#people").val();
    document.cookie = 'people_id='+ currentPeople +';';
    console.log('create cookie')
};


selectPeople = function () {
    let id = 0;
    let cookieFile = document.cookie;
    console.log(cookieFile);
    try{
        let people = cookieFile.split('people_id=')[1].split(';')[0];
        peopleSelector.selectedIndex = parseInt(people);
    }catch (e) {
        console.error('No Cookie!');
    }
};

moneyAdder = function () {
    let people = peopleSelector.selectedIndex;
    let money = $("#inputMoney").val();
    money = parseFloat(money);

    if (!money){
        info.innerText = "You entered a invalid value";
        info.className = "error";
        info.style.display="block";
        document.getElementById("inputMoney").value = null;
        return;
    }
    info.className = "flash";
    moneyBag[people].push(money);
    let textE = document.getElementById(people.toString());
    textE.innerText = textE.innerText.split(' Empty Now')[0] + " $" + money.toString();

    let peopleName = peopleSelector.options[people].text;
    let voice = `You add $${money} for ${peopleName}!`;
    info.innerText = voice;
    info.style.display = "block";
    console.log('add');
    console.log(JSON.stringify(moneyBag));
    document.getElementById("inputMoney").value = null;
};

function moneyRemover(){
    let people = peopleSelector.selectedIndex;
    let peopleName = peopleSelector.options[people].text;
    let money = moneyBag[people].pop();
    let textE = document.getElementById(people.toString());

    let voice = '';
    if (money){
        info.className = "flash";
        voice = `You remove $${money} for ${peopleName}!`;



        let test = moneyBag[people].join(" $");

        if (moneyBag[people].length===0){
            textE.innerText = textE.innerText.split(":")[0]+': Empty Now';
        }

        else{
            textE.innerText = textE.innerText.split('$')[0]+"$" +test;
        }

    }
    else {
        info.className = "error";
        voice = `${peopleName}'s moneybag is empty!`;
        if (textE.innerText.split(' Empty Now').length===1){
            textE.innerText = textE.innerText.split(":")[0]+': Empty Now';
        }
    }
    info.innerText = voice;
    info.style.display = "block";
    console.log(JSON.stringify(moneyBag));
}

function sortNumber(a,b)
{
    return a - b
}

function getResult() {
    let sum_value = 0;
    let result_bag = {};
    let transfer_bag = {};
    let output = [];
    let transfer = [];
    let result;

    for (let i=0; i<=3; i++){

        let peopleBag = moneyBag[i];
        if (!peopleBag || (peopleBag.length < 1)){
            result_bag[Math.random()/(10**5)] = i;
            continue;
        }

        result = eval(peopleBag.join("+")); // compute the sum


        if (result_bag[result]!=null){
            result = result + Math.random()/(10**5);  // prevent cover value
            console.log('add');
        }

        result_bag[result] = i;
        sum_value += result;
    }



    let average = sum_value/4;

    for (let key in result_bag){
        output.push(key);
        transfer_bag[key-average] = result_bag[key]; // there are not object, thus is acceptable
        transfer.push(key-average);
    }

    output.sort(sortNumber);
    output.reverse();
    transfer.sort(sortNumber);
    transfer.reverse();

    // console.log(output);
    // console.log(transfer);


    let recorder = {
        0: [],
        1: [],
        2: [],
        3: []
    };
    for(let i=0; i<transfer.length; i++){
        let money = transfer[i];
        if (money >= 0){
            continue;
        }

        for (let k=0; k<i; k++){
            if (0 >= (transfer[k] + money)){
                money += transfer[k];
                recorder[i].push([k, transfer[k]]);
                transfer[k] = 0;
                transfer[i] = money;
            }
            else{
                recorder[i].push([k, - 1 * money]);
                transfer[k] += money;
                transfer[i] = 0;
                break;
            }
        }
    }

    let resultList = document.getElementById('resultList');
    resultList.innerHTML = ''; //remove all list
    document.getElementById('964card').style.display = "block";
    document.getElementById('info').style.display = "block";

    document.getElementById('info').innerText = `The average cost is $${average.toFixed(2)}`;

    for(let key in recorder){
        let people = result_bag[output[key]];
        people = nameMap[people];
        let transfer_array = recorder[key];
        for (let i=0; i<transfer_array.length; i++){
            let t = transfer_array[i];
            let target = result_bag[output[t[0]]];
            target = nameMap[target];
            let value = t[1].toFixed(2);

            let voice = `${people} should transfer $${value} to ${target}`;
            let item = document.createElement('li');
            item.innerText = voice;
            resultList.appendChild(item)
        }

    }
}

function reset() {
    moneyBag = {
        0: [],
        1: [],
        2: [],
        3: []
    };
    for (let people in moneyBag){
        let textE = document.getElementById(people.toString());
        textE.innerText = textE.innerText.split(":")[0]+': Empty Now';
    }
    document.getElementById('964card').style.display = "none";
    document.getElementById('info').style.display = "none";

}