function makeRequest(url) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        let resp = JSON.parse(this.responseText);
        let dataArr = resp.records.locations[0].location;
        selectMaker(dataArr.map((o) => { return o.locationName; }), 'sel_loc');
        selectMaker(dataArr[0].weatherElement.map((o) => { return o.description; }), 'sel_wea');
        console.log(dataArr);
        let localVal = 0, weatherVal = 0;
        function dataDisplay(location, weatherType) {
            console.log(document.querySelectorAll('table').length);
            if(document.querySelectorAll('table').length != 0) {
                let curr = document.getElementById('rain');
                curr.remove();
            }
            let timeEle = dataArr[location].weatherElement[weatherType].time;
            makeHeader(Object.keys(timeEle[0]));
            for(let ele of timeEle) {
                let ar = Object.values(ele).slice(0, -1);
                HTMLoutput('rain', ar, ele.elementValue);
            }
        }
        document.getElementById('sel_wea').addEventListener('change', function() {
            weatherVal = this.value;
            dataDisplay(localVal, weatherVal);
        });
        document.getElementById('sel_loc').addEventListener('change', function() {
            localVal = this.value;
            dataDisplay(localVal, weatherVal);
        });
        // document.getElementById('weather').addEventListener
    }
    xhr.open("GET", url, true);
    xhr.send();
}
let url2 = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-019?Authorization=CWB-5E07439A-A246-43E2-AF1B-77B876BAC3F9&format=JSON";
let url1 = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-053?Authorization=CWB-5E07439A-A246-43E2-AF1B-77B876BAC3F9&format=JSON";
makeRequest(url1);
//選取所有資訊做下拉式選單
function selectMaker(nameArr, id) {
    let select = document.createElement('select');
    select.setAttribute('id', id);
    for(let i in nameArr) {
        let opt = document.createElement("option");
        opt.value = String(i);
        opt.text = nameArr[i];
        select.appendChild(opt);
    }
    document.body.append(select);
}

function HTMLoutput(id, arr, element) {
    let table = document.getElementById('rain');
    let tr = document.createElement('tr');
    for(let ele of arr) {
        let td = document.createElement('td');
        td.appendChild(document.createTextNode(ele));
        tr.append(td);
    }
    for(let ele of element) {
        let keyArr = Object.keys(ele);
        for(let key of keyArr) {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(key + ": " + ele[key]));
            tr.append(td);
        }
    }
    table.append(tr);
}

function makeHeader(arr) {
    let table = document.createElement('table');
    table.setAttribute('id', 'rain');
    table.setAttribute('style', 'width:800px');
    let tr = document.createElement('tr');
    for(let e of arr) {
        let td = document.createElement('td');
        td.appendChild(document.createTextNode(e));
        tr.append(td);
    }
    table.append(tr);
    document.body.append(table);
}