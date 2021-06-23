/*V1.6*/
/*-----------------i18n----------------*/
var jsondata = {};

function getJson(lang) {
    var d = new Date()
    d.setTime(d.getTime() + 2592000000);
    document.cookie = "lang=" + lang + "; expires=" + d.toUTCString;
    var r = new XMLHttpRequest();
    r.open("GET", "/i18n/" + lang + ".json", false);
    r.send(null);
    if (r.status === 200) {
        jsondata = JSON.parse(r.responseText);
    }
}

function changeUI() {
    document.title = jsondata.title;
    document.querySelector("#title").innerHTML = jsondata.title;
    document.querySelector("#rowStart>td").innerHTML = jsondata.rowStart;
    document.querySelector("#rowMax>td").innerHTML = jsondata.rowMax;
    document.querySelector("#rowSpeed>td").innerHTML = jsondata.rowSpeed;
    document.querySelector("#rowSW>td").innerHTML = jsondata.rowSW;
    //skillsw
    document.querySelectorAll("#dataTables > div.skillsw > table > tbody > tr:nth-child(1) > td").forEach(e => { e.innerHTML = jsondata.skillsw.title });
    document.querySelectorAll("select").forEach(e => { e.innerHTML = `<option value="0">${jsondata.skillsw.option[0]}</option><option value="1">${jsondata.skillsw.option[1]}</option><option value="2">${jsondata.skillsw.option[2]}</option><option value="3">${jsondata.skillsw.option[3]}</option><option value="4">${jsondata.skillsw.option[4]}</option><option value="5">${jsondata.skillsw.option[5]}</option>` });
    //skillacc
    document.querySelectorAll("#dataTables > div.skillacc > table > tbody > tr:nth-child(1) > td").forEach(e => { e.innerHTML = jsondata.skillacc.title });
    document.querySelectorAll("#dataTables > div.skillacc > table > tbody > tr:nth-child(2) > td:nth-child(1)").forEach(e => { e.innerHTML = jsondata.skillacc.each });
    document.querySelectorAll("#dataTables > div.skillacc > table > tbody > tr:nth-child(3) > td:nth-child(1)").forEach(e => { e.innerHTML = jsondata.skillacc.limit });
    //exboost
    document.querySelectorAll("#dataTables > div.exboost > table > tbody > tr:nth-child(1) > td").forEach(e => { e.innerHTML = jsondata.exboost.title });
    document.querySelectorAll("#dataTables > div.exboost > table > tbody > tr:nth-child(2) > td:nth-child(1)").forEach(e => { e.innerHTML = jsondata.exboost.time });
    document.querySelectorAll("#dataTables > div.exboost > table > tbody > tr:nth-child(3) > td:nth-child(1)").forEach(e => { e.innerHTML = jsondata.exboost.charge });
    //select
    document.querySelector("#extra-type").innerHTML = `<option value='skillsw'>${jsondata.skillsw.short}</option><option value='skillacc'>${jsondata.skillacc.short}</option><option value='exboost'>${jsondata.exboost.short}</option>`;
}
if (document.cookie) {
    var lang = document.cookie.substring(document.cookie.length - 2, document.cookie.length);
    getJson(lang);
} else {
    var lang = navigator.language.substring(0, 2);
    const supportLang = ["en", "zh", "ja"];
    if (supportLang.indexOf(lang) != -1) {
        getJson(lang);
    } else {
        getJson("en");
    }
}
document.querySelectorAll("#i18n>span").forEach((e) => {
    e.addEventListener("click", () => {
        getJson(e.id);
        changeUI();
    }, true);
})

/*---------------UI---------------*/
var table = document.querySelector("#dataTables");
var div = document.createElement("div");
div.id = "add-menu";
div.style.textAlign = "center";
div.innerHTML = `<select id='extra-type'><option value='skillsw'>${jsondata.skillsw.short}</option><option value='skillacc'>${jsondata.skillacc.short}</option><option value='exboost'>${jsondata.exboost.short}</option></select><input type='button' style='width: auto;' value='+'>`;
div.lastChild.addEventListener("click", insertTable);
table.appendChild(div);
document.querySelectorAll("input,select").forEach(e => {
    e.addEventListener("change", drawTimeline);
})
if (document.documentElement.lang != lang) {
    changeUI();
}

function insertTable() {
    const skillswTable = `<table><tbody><tr><td colspan='4'>${jsondata.skillsw.title}</td></tr><tr><td>+U1</td><td><input class='U1skillsw1'>%<br><select class='U1skillsw-counter1'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td><td><input class='U1skillsw2'>%<br><select class='U1skillsw-counter2'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td><td><input class='U1skillsw3'>%<br><select class='U1skillsw-counter3'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td></tr><tr><td>+U2</td><td><input class='U2skillsw1'>%<br><select class='U2skillsw-counter1'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td><td><input class='U2skillsw2'>%<br><select class='U2skillsw-counter2'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td><td><input class='U2skillsw3'>%<br><select class='U2skillsw-counter3'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td></tr><tr><td>+U3</td><td><input class='U3skillsw1'>%<br><select class='U3skillsw-counter1'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td><td><input class='U3skillsw2'>%<br><select class='U3skillsw-counter2'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td><td><input class='U3skillsw3'>%<br><select class='U3skillsw-counter3'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td></tr><tr><td colspan='4'><hr></td></tr></tbody></table>`;
    const skillaccTable = `<table><tbody><tr><td colspan='4'>${jsondata.skillacc.title}</td></tr><tr><td>${jsondata.skillacc.each}</td><td> <input class='U1skillacc'>%</td><td> <input class='U2skillacc'>%</td><td> <input class='U3skillacc'>%</td></tr><tr><td>${jsondata.skillacc.limit}</td><td> <input class='U1skillacc-max'>%</td><td> <input class='U2skillacc-max'>%</td><td> <input class='U3skillacc-max'>%</td></tr><tr><td colspan='4'><hr></td></tr></tbody></table>`;
    const exboostTable = `<table><tbody><tr><td colspan='4'>${jsondata.exboost.title}</td></tr><tr><td>${jsondata.exboost.time}</td><td> <input class='U1exboost-time'></td><td> <input class='U2exboost-time'></td><td> <input class='U3exboost-time'></td></tr><tr><td>${jsondata.exboost.charge}</td><td> <input class='U1exboost-charge' size='2'>%</td><td> <input class='U2exboost-charge' size='2'>%</td><td> <input class='U3exboost-charge' size='2'>%</td></tr><tr><td colspan='4'><hr></td></tr></tbody></table>`;

    var type = document.querySelector("#extra-type").value;
    var div = document.createElement("div");
    div.classList.add(type);
    if (type == "skillsw") {
        div.innerHTML = skillswTable;
    } else if (type == "skillacc") {
        div.innerHTML = skillaccTable;
    } else if (type == "exboost") {
        div.innerHTML = exboostTable;
    }
    var button = document.createElement("input");
    button.type = "button";
    button.value = "X";
    button.classList.add("delete");
    button.onclick = (event) => {
        event.target.parentElement.remove();
        drawTimeline();
    };
    div.appendChild(button);
    table.insertBefore(div, document.querySelector("#add-menu"));
    document.querySelectorAll("input,select").forEach(e => {
        e.addEventListener("change", drawTimeline);
    })
}

/*---------------timeline---------------*/
var sw = [0, 0, 0];
var sw_max = [1, 1, 1];

var U1skillsw = [];
var U2skillsw = [];
var U3skillsw = [];

var baseacc = [1, 1, 1];
var U1skillacc = [];
var U2skillacc = [];
var U3skillacc = [];
var skillacc = [0, 0, 0];

var exboost = [];

var eventlist = [];

function update() {
    //init
    sw = [0, 0, 0];
    sw_max = [1, 1, 1];
    U1skillsw = [];
    U2skillsw = [];
    U3skillsw = [];
    baseacc = [1, 1, 1];
    U1skillacc = [];
    U2skillacc = [];
    U3skillacc = [];
    skillacc = [0, 0, 0];
    exboost = [];
    //sw
    var u1msw = Number(document.querySelector("#U1mainsw").value);
    var u1ssw = Number(document.querySelector("#U1subsw").value);
    var u2msw = Number(document.querySelector("#U2mainsw").value);
    var u2ssw = Number(document.querySelector("#U2subsw").value);
    var u3msw = Number(document.querySelector("#U3mainsw").value);
    var u3ssw = Number(document.querySelector("#U3subsw").value);
    sw[0] = u1msw && u1ssw ? (u1msw + u1ssw) / 2 : u1msw || u1ssw;
    sw[1] = u2msw && u2ssw ? (u2msw + u2ssw) / 2 : u2msw || u2ssw;
    sw[2] = u3msw && u3ssw ? (u3msw + u3ssw) / 2 : u3msw || u3ssw;
    //sw_max
    sw_max[0] = document.querySelector("#U1max").value ? document.querySelector("#U1max").value / 100 : 1;
    sw_max[1] = document.querySelector("#U2max").value ? document.querySelector("#U2max").value / 100 : 1;
    sw_max[2] = document.querySelector("#U3max").value ? document.querySelector("#U3max").value / 100 : 1;
    //skillsw
    var U1skillsw1 = Array.from(document.querySelectorAll(".U1skillsw1")).map(e => e.value ? e.value : 0);
    var U1skillsw_counter1 = Array.from(document.querySelectorAll(".U1skillsw-counter1")).map(e => e.value ? Number(e.value) : 0);
    var U1skillsw2 = Array.from(document.querySelectorAll(".U1skillsw2")).map(e => e.value ? e.value : 0);
    var U1skillsw_counter2 = Array.from(document.querySelectorAll(".U1skillsw-counter2")).map(e => e.value ? Number(e.value) : 0);
    var U1skillsw3 = Array.from(document.querySelectorAll(".U1skillsw3")).map(e => e.value ? e.value : 0);
    var U1skillsw_counter3 = Array.from(document.querySelectorAll(".U1skillsw-counter3")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw1 = Array.from(document.querySelectorAll(".U2skillsw1")).map(e => e.value ? e.value : 0);
    var U2skillsw_counter1 = Array.from(document.querySelectorAll(".U2skillsw-counter1")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw2 = Array.from(document.querySelectorAll(".U2skillsw2")).map(e => e.value ? e.value : 0);
    var U2skillsw_counter2 = Array.from(document.querySelectorAll(".U2skillsw-counter2")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw3 = Array.from(document.querySelectorAll(".U2skillsw3")).map(e => e.value ? e.value : 0);
    var U2skillsw_counter3 = Array.from(document.querySelectorAll(".U2skillsw-counter3")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw1 = Array.from(document.querySelectorAll(".U3skillsw1")).map(e => e.value ? e.value : 0);
    var U3skillsw_counter1 = Array.from(document.querySelectorAll(".U3skillsw-counter1")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw2 = Array.from(document.querySelectorAll(".U3skillsw2")).map(e => e.value ? e.value : 0);
    var U3skillsw_counter2 = Array.from(document.querySelectorAll(".U3skillsw-counter2")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw3 = Array.from(document.querySelectorAll(".U3skillsw3")).map(e => e.value ? e.value : 0);
    var U3skillsw_counter3 = Array.from(document.querySelectorAll(".U3skillsw-counter3")).map(e => e.value ? Number(e.value) : 0);
    //skillsw to list
    U1skillsw1.forEach((e, i) => { if (e) { U1skillsw.push([0, e, U1skillsw_counter1[i]]) } });
    U1skillsw2.forEach((e, i) => { if (e) { U2skillsw.push([0, e, U1skillsw_counter2[i]]) } });
    U1skillsw3.forEach((e, i) => { if (e) { U3skillsw.push([0, e, U1skillsw_counter3[i]]) } });
    U2skillsw1.forEach((e, i) => { if (e) { U1skillsw.push([1, e, U2skillsw_counter1[i]]) } });
    U2skillsw2.forEach((e, i) => { if (e) { U2skillsw.push([1, e, U2skillsw_counter2[i]]) } });
    U2skillsw3.forEach((e, i) => { if (e) { U3skillsw.push([1, e, U2skillsw_counter3[i]]) } });
    U3skillsw1.forEach((e, i) => { if (e) { U1skillsw.push([2, e, U3skillsw_counter1[i]]) } });
    U3skillsw2.forEach((e, i) => { if (e) { U2skillsw.push([2, e, U3skillsw_counter2[i]]) } });
    U3skillsw3.forEach((e, i) => { if (e) { U3skillsw.push([2, e, U3skillsw_counter3[i]]) } });
    //baseacc
    var U1speed = document.querySelector("#U1speed").value;
    var U2speed = document.querySelector("#U2speed").value;
    var U3speed = document.querySelector("#U3speed").value;
    baseacc[0] = U1speed ? Number(U1speed) / 100 : 1;
    baseacc[1] = U2speed ? Number(U2speed) / 100 : 1;
    baseacc[2] = U3speed ? Number(U3speed) / 100 : 1;
    //skillacc
    var U1skillacc_rate = Array.from(document.querySelectorAll(".U1skillacc")).map(e => e.value ? e.value : 0);
    var U1skillacc_max = Array.from(document.querySelectorAll(".U1skillacc-max")).map(e => e.value ? e.value : 0);
    var U2skillacc_rate = Array.from(document.querySelectorAll(".U2skillacc")).map(e => e.value ? e.value : 0);
    var U2skillacc_max = Array.from(document.querySelectorAll(".U2skillacc-max")).map(e => e.value ? e.value : 0);
    var U3skillacc_rate = Array.from(document.querySelectorAll(".U3skillacc")).map(e => e.value ? e.value : 0);
    var U3skillacc_max = Array.from(document.querySelectorAll(".U3skillacc-max")).map(e => e.value ? e.value : 0);
    U1skillacc_rate.forEach((e, i) => { if (e) { U1skillacc.push([e / 100, U1skillacc_max[i] / 100]) } });
    U2skillacc_rate.forEach((e, i) => { if (e) { U2skillacc.push([e / 100, U2skillacc_max[i] / 100]) } });
    U3skillacc_rate.forEach((e, i) => { if (e) { U3skillacc.push([e / 100, U3skillacc_max[i] / 100]) } });
    //exboost
    var U1_exboost_time = Array.from(document.querySelectorAll(".U1exboost-time")).map(e => e.value ? Number(e.value) : 0);
    var U1_exboost_charge = Array.from(document.querySelectorAll(".U1exboost-charge")).map(e => e.value ? e.value : 0);
    var U2_exboost_time = Array.from(document.querySelectorAll(".U2exboost-time")).map(e => e.value ? Number(e.value) : 0);
    var U2_exboost_charge = Array.from(document.querySelectorAll(".U2exboost-charge")).map(e => e.value ? e.value : 0);
    var U3_exboost_time = Array.from(document.querySelectorAll(".U3exboost-time")).map(e => e.value ? Number(e.value) : 0);
    var U3_exboost_charge = Array.from(document.querySelectorAll(".U3exboost-charge")).map(e => e.value ? e.value : 0);
    //exboost to list
    U1_exboost_time.forEach((e, i) => { if (e) { exboost.push([e, 0, U1_exboost_charge[i] / 100]); } });
    U2_exboost_time.forEach((e, i) => { if (e) { exboost.push([e, 1, U2_exboost_charge[i] / 100]); } });
    U3_exboost_time.forEach((e, i) => { if (e) { exboost.push([e, 2, U3_exboost_charge[i] / 100]); } });
    exboost.sort((a, b) => a[0] - b[0]);
}

function timeline() {
    sw.forEach((e, i) => { sw[i] = e ? e : 100000; });
    //init
    eventlist = [];
    var curCharge = [0, 0, 0];
    var skillcounter = [0, 0, 0];
    var currentPoint = 0;
    var nextPoint = 0;
    curCharge[0] = document.querySelector("#U1start").value ? Math.min(sw[0] * document.querySelector("#U1start").value / 100, sw_max[0] * sw[0]) : 0;
    curCharge[1] = document.querySelector("#U2start").value ? Math.min(sw[1] * document.querySelector("#U2start").value / 100, sw_max[1] * sw[1]) : 0;
    curCharge[2] = document.querySelector("#U3start").value ? Math.min(sw[2] * document.querySelector("#U3start").value / 100, sw_max[2] * sw[2]) : 0;

    function nextTimePoint() {
        if (sw[0] > curCharge[0] && sw[1] > curCharge[1] && sw[2] > curCharge[2]) {
            var next_sw = Math.min((sw[0] - curCharge[0]) * 100 / (baseacc[0] * 100 + skillacc[0] * 100), (sw[1] - curCharge[1]) * 100 / (baseacc[1] * 100 + skillacc[1] * 100), (sw[2] - curCharge[2]) * 100 / (baseacc[2] * 100 + skillacc[2] * 100));
            if (exboost.length) {
                return Math.ceil(Math.min(currentPoint + next_sw, exboost[0][0]));
            } else {
                return Math.ceil(currentPoint + next_sw);
            }
        } else {
            return currentPoint;
        }
    }

    function settleSkill() {
        if (sw[0] <= curCharge[0]) {
            curCharge[0] -= sw[0];
            U1skillsw.forEach(e => {
                if (e[2] == 0 || skillcounter[0] < e[2]) {
                    curCharge[e[0]] = curCharge[e[0]] + e[1] * sw[e[0]] / 100;
                }
            })
            skillcounter[0] += 1;
            skillacc[0] = U1skillacc.map(e => Math.min(e[1], e[0] * skillcounter[0])).reduce((a, b) => a + b, 0);
            eventlist.push([0, currentPoint]);
            return;
        }
        if (sw[1] <= curCharge[1]) {
            curCharge[1] -= sw[1];
            U2skillsw.forEach(e => {
                if (e[2] == 0 || skillcounter[1] < e[2]) {
                    curCharge[e[0]] = curCharge[e[0]] + e[1] * sw[e[0]] / 100;
                }
            })
            skillcounter[1] += 1;
            skillacc[1] = U2skillacc.map(e => Math.min(e[1], e[0] * skillcounter[1])).reduce((a, b) => a + b, 0);
            eventlist.push([1, currentPoint]);
            return;
        }
        if (sw[2] <= curCharge[2]) {
            curCharge[2] -= sw[2];
            U3skillsw.forEach(e => {
                if (e[2] == 0 || skillcounter[2] < e[2]) {
                    curCharge[e[0]] = curCharge[e[0]] + e[1] * sw[e[0]] / 100;
                }
            })
            skillcounter[2] += 1;
            skillacc[2] = U3skillacc.map(e => Math.min(e[1], e[0] * skillcounter[2])).reduce((a, b) => a + b, 0);
            eventlist.push([2, currentPoint]);
            return;
        }
    }

    function settleCharge() {
        while (exboost.length && currentPoint == exboost[0][0]) {
            curCharge[exboost[0][1]] += exboost[0][2] * sw[exboost[0][1]];
            exboost.shift();
        }
        curCharge[0] = Math.min(sw_max[0] * sw[0], curCharge[0]);
        curCharge[1] = Math.min(sw_max[1] * sw[1], curCharge[1]);
        curCharge[2] = Math.min(sw_max[2] * sw[2], curCharge[2]);
    }

    var stop = 0
    while (eventlist.length < 30 && stop < 10 && currentPoint < 5000) {
        nextPoint = nextTimePoint();
        if (nextPoint == currentPoint) {
            settleSkill();
            stop += 1
        } else {
            curCharge[0] += (nextPoint - currentPoint) * (baseacc[0] + skillacc[0]);
            curCharge[1] += (nextPoint - currentPoint) * (baseacc[1] + skillacc[1]);
            curCharge[2] += (nextPoint - currentPoint) * (baseacc[2] + skillacc[2]);
            currentPoint = nextPoint;
            stop = 0
        }
        settleCharge();
    }
}

function draw() {
    sw.forEach((e, i) => { sw[i] = e == 100000 ? 0 : e; });

    document.querySelector("#U1").innerHTML = "";
    document.querySelector("#U2").innerHTML = "";
    document.querySelector("#U3").innerHTML = "";

    var u1td = document.querySelector("#U1_sw");
    u1td.innerHTML = sw[0];
    var u2td = document.querySelector("#U2_sw");
    u2td.innerHTML = sw[1];
    var u3td = document.querySelector("#U3_sw");
    u3td.innerHTML = sw[2];

    var lastEvent = [
        [null, null],
        [null, null],
        [null, null]
    ];
    var overflow = [0, 0, 0];

    eventlist.forEach((e, i) => {
        var white = document.createElement("div");
        var div = document.createElement("div");
        if (lastEvent[e[0]][0] !== null) {
            if (e[1] - 100 > lastEvent[e[0]][0]) {
                white.style.height = (e[1] - lastEvent[e[0]][0]) / 5 - 20 - overflow[e[0]] + "px";
                overflow[e[0]] = 0;
            } else {
                lastEvent[e[0]][1].innerHTML += "/" + e[1] + "(" + i + ")";
                lastEvent[e[0]][1].style.height = Math.max(20, lastEvent[e[0]][1].style.height.slice(0, -2)) + (e[1] - lastEvent[e[0]][0]) / 5 + "px";
                overflow[e[0]] += (e[1] - lastEvent[e[0]][0]) / 5;
                return;
            }
        } else {
            white.style.height = e[1] / 5 + "px";
        }
        div.innerHTML = e[1] + "(" + i + ")";
        lastEvent[e[0]] = [e[1], div];
        white.style.backgroundColor = "transparent";
        document.querySelector("#U" + (e[0] + 1)).appendChild(white);
        document.querySelector("#U" + (e[0] + 1)).appendChild(div);
    })
}

function drawTimeline() {
    console.log("start simulation");
    var startTime = Date.now();
    update();
    timeline();
    draw();
    console.log(Date.now() - startTime + "ms");
}