/*V1.8*/
/*-----------------i18n----------------*/
var jsondata = {};

function getJson(lang) {
    var d = new Date()
    d.setTime(d.getTime() + 2592000000);
    document.cookie = "lang=" + lang + "; expires=" + d.toUTCString;
    fetch("https://raw.githubusercontent.com/hospotho/wf-skill/gh-pages/i18n/" + lang + ".json")
        .then(r => r.json())
        .then(r => jsondata = r)
}

function changeUI() {
    if (Object.keys(jsondata).length === 0 || jsondata.language == document.documentElement.lang) {
        setTimeout(changeUI, 0);
        return;
    }
    document.title = jsondata.title;
    document.documentElement.lang = jsondata.language;
    document.querySelector("#title").innerHTML = jsondata.title;
    document.querySelector("#rowStart>td").innerHTML = jsondata.rowStart;
    document.querySelector("#rowMax>td").innerHTML = jsondata.rowMax;
    document.querySelector("#rowSpeed>td").innerHTML = jsondata.rowSpeed;
    document.querySelector("#rowSW>td").innerHTML = jsondata.rowSW;
    //skillsw
    document.querySelectorAll("#dataTables > div.skillsw > table > tbody > tr:nth-child(1) > td").forEach(e => { e.innerHTML = jsondata.skillsw.title });
    document.querySelectorAll("#dataTables select").forEach(e => { e.innerHTML = `<option value="0">${jsondata.skillsw.option[0]}</option><option value="1">${jsondata.skillsw.option[1]}</option><option value="2">${jsondata.skillsw.option[2]}</option><option value="3">${jsondata.skillsw.option[3]}</option><option value="4">${jsondata.skillsw.option[4]}</option><option value="5">${jsondata.skillsw.option[5]}</option>` });
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
    //modal
    document.querySelector("#setHidden > label:nth-child(2)").innerHTML = jsondata.rowStart;
    document.querySelector("#setHidden > label:nth-child(4)").innerHTML = jsondata.rowMax;
    document.querySelector("#setHidden > label:nth-child(6)").innerHTML = jsondata.rowSpeed;
    document.querySelector("#setPriority > label").innerHTML = jsondata.priority;
    document.querySelector("#copy").innerHTML = jsondata.share;
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
document.querySelector("#add-menu > input[type=button]").addEventListener("click", () => { insertTable() });

document.querySelectorAll("input,select").forEach(e => {
    e.addEventListener("change", drawTimeline);
})

var modal = document.querySelector("#modal");
document.querySelector("#setting_icon").onclick = () => {
    modal.style.display = "block";
}
document.querySelector("#modal > div > span").onclick = () => {
    modal.style.display = "none";
}
window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

document.querySelectorAll("#setHidden input[type=checkbox]").forEach(e => {
    e.onclick = () => {
        document.querySelectorAll("#setHidden input[type=checkbox]").forEach(e => {
            var row = document.querySelector("#row" + e.id)
            if (e.checked) {
                row.style = "";
                row.nextElementSibling.style = "";
                row.nextElementSibling.nextElementSibling.style = "";
            } else {
                row.style.display = "none";
                row.nextElementSibling.style.display = "none";
                row.nextElementSibling.nextElementSibling.style.display = "none";
            }
        })
    }
})
document.querySelector("#Start").click();

document.querySelector("#Priority").onclick = (e) => {
    var table = document.querySelector("#setPriority>table");
    if (e.target.checked) {
        table.style.display = "block";
    } else {
        table.style.display = "none";
    }
}

if (document.documentElement.lang != lang) { changeUI(); }

function insertTable(input = "") {
    const skillswTable = `<table><tbody><tr><td colspan='4'>${jsondata.skillsw.title}</td></tr><tr><td>+U1</td><td><input class='U1skillsw1'>%<br><select class='U1skillsw-counter1'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td><td><input class='U1skillsw2'>%<br><select class='U1skillsw-counter2'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td><td><input class='U1skillsw3'>%<br><select class='U1skillsw-counter3'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td></tr><tr><td>+U2</td><td><input class='U2skillsw1'>%<br><select class='U2skillsw-counter1'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td><td><input class='U2skillsw2'>%<br><select class='U2skillsw-counter2'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td><td><input class='U2skillsw3'>%<br><select class='U2skillsw-counter3'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td></tr><tr><td>+U3</td><td><input class='U3skillsw1'>%<br><select class='U3skillsw-counter1'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td><td><input class='U3skillsw2'>%<br><select class='U3skillsw-counter2'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td><td><input class='U3skillsw3'>%<br><select class='U3skillsw-counter3'><option value='0'>${jsondata.skillsw.option[0]}</option><option value='1'>${jsondata.skillsw.option[1]}</option><option value='2'>${jsondata.skillsw.option[2]}</option><option value='3'>${jsondata.skillsw.option[3]}</option><option value='4'>${jsondata.skillsw.option[4]}</option><option value='5'>${jsondata.skillsw.option[5]}</option></select></td></tr><tr><td colspan='4'><hr></td></tr></tbody></table>`;
    const skillaccTable = `<table><tbody><tr><td colspan='4'>${jsondata.skillacc.title}</td></tr><tr><td>${jsondata.skillacc.each}</td><td> <input class='U1skillacc'>%</td><td> <input class='U2skillacc'>%</td><td> <input class='U3skillacc'>%</td></tr><tr><td>${jsondata.skillacc.limit}</td><td> <input class='U1skillacc-max'>%</td><td> <input class='U2skillacc-max'>%</td><td> <input class='U3skillacc-max'>%</td></tr><tr><td colspan='4'><hr></td></tr></tbody></table>`;
    const exboostTable = `<table><tbody><tr><td colspan='4'>${jsondata.exboost.title}</td></tr><tr><td>${jsondata.exboost.time}</td><td> <input class='U1exboost-time'></td><td> <input class='U2exboost-time'></td><td> <input class='U3exboost-time'></td></tr><tr><td>${jsondata.exboost.charge}</td><td> <input class='U1exboost-charge' size='2'>%</td><td> <input class='U2exboost-charge' size='2'>%</td><td> <input class='U3exboost-charge' size='2'>%</td></tr><tr><td colspan='4'><hr></td></tr></tbody></table>`;
    var type = input;
    if (!type) {
        type = document.querySelector("#extra-type").value;
    }
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
    document.querySelector("#dataTables").insertBefore(div, document.querySelector("#add-menu"));
    document.querySelectorAll("input,select").forEach(e => {
        e.addEventListener("change", drawTimeline);
    })
}

/*---------------timeline---------------*/
var sw = [0, 0, 0];
var sw_max = [1, 1, 1];
var skillsw = [
    [],
    [],
    []
];
var baseacc = [1, 1, 1];
var skillacc = [
    [],
    [],
    []
];
var exacc = [0, 0, 0];
var exboost = [];
var priority = [0, 0, 0]

var eventlist = [];

function update() {
    //init
    sw = [0, 0, 0];
    sw_max = [1, 1, 1];
    skillsw = [
        [],
        [],
        []
    ];
    baseacc = [1, 1, 1];
    skillacc = [
        [],
        [],
        []
    ];
    exacc = [0, 0, 0];
    exboost = [];
    priority = [0, 0, 0];
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
    var u1max = Number(document.querySelector("#U1max").value);
    var u2max = Number(document.querySelector("#U2max").value);
    var u3max = Number(document.querySelector("#U3max").value);
    sw_max[0] = u1max ? u1max / 100 : 1;
    sw_max[1] = u2max ? u2max / 100 : 1;
    sw_max[2] = u3max ? u3max / 100 : 1;
    //skillsw
    var U1skillsw1 = Array.from(document.querySelectorAll(".U1skillsw1")).map(e => e.value ? Number(e.value) : 0);
    var U1skillsw_counter1 = Array.from(document.querySelectorAll(".U1skillsw-counter1")).map(e => e.value ? Number(e.value) : 0);
    var U1skillsw2 = Array.from(document.querySelectorAll(".U1skillsw2")).map(e => e.value ? Number(e.value) : 0);
    var U1skillsw_counter2 = Array.from(document.querySelectorAll(".U1skillsw-counter2")).map(e => e.value ? Number(e.value) : 0);
    var U1skillsw3 = Array.from(document.querySelectorAll(".U1skillsw3")).map(e => e.value ? Number(e.value) : 0);
    var U1skillsw_counter3 = Array.from(document.querySelectorAll(".U1skillsw-counter3")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw1 = Array.from(document.querySelectorAll(".U2skillsw1")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw_counter1 = Array.from(document.querySelectorAll(".U2skillsw-counter1")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw2 = Array.from(document.querySelectorAll(".U2skillsw2")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw_counter2 = Array.from(document.querySelectorAll(".U2skillsw-counter2")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw3 = Array.from(document.querySelectorAll(".U2skillsw3")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw_counter3 = Array.from(document.querySelectorAll(".U2skillsw-counter3")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw1 = Array.from(document.querySelectorAll(".U3skillsw1")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw_counter1 = Array.from(document.querySelectorAll(".U3skillsw-counter1")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw2 = Array.from(document.querySelectorAll(".U3skillsw2")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw_counter2 = Array.from(document.querySelectorAll(".U3skillsw-counter2")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw3 = Array.from(document.querySelectorAll(".U3skillsw3")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw_counter3 = Array.from(document.querySelectorAll(".U3skillsw-counter3")).map(e => e.value ? Number(e.value) : 0);
    //skillsw to list
    U1skillsw1.forEach((e, i) => { if (e) { skillsw[0].push([0, e, U1skillsw_counter1[i]]) } });
    U1skillsw2.forEach((e, i) => { if (e) { skillsw[1].push([0, e, U1skillsw_counter2[i]]) } });
    U1skillsw3.forEach((e, i) => { if (e) { skillsw[2].push([0, e, U1skillsw_counter3[i]]) } });
    U2skillsw1.forEach((e, i) => { if (e) { skillsw[0].push([1, e, U2skillsw_counter1[i]]) } });
    U2skillsw2.forEach((e, i) => { if (e) { skillsw[1].push([1, e, U2skillsw_counter2[i]]) } });
    U2skillsw3.forEach((e, i) => { if (e) { skillsw[2].push([1, e, U2skillsw_counter3[i]]) } });
    U3skillsw1.forEach((e, i) => { if (e) { skillsw[0].push([2, e, U3skillsw_counter1[i]]) } });
    U3skillsw2.forEach((e, i) => { if (e) { skillsw[1].push([2, e, U3skillsw_counter2[i]]) } });
    U3skillsw3.forEach((e, i) => { if (e) { skillsw[2].push([2, e, U3skillsw_counter3[i]]) } });
    //baseacc
    var U1speed = document.querySelector("#U1speed").value;
    var U2speed = document.querySelector("#U2speed").value;
    var U3speed = document.querySelector("#U3speed").value;
    baseacc[0] = U1speed ? Number(U1speed) / 100 : 1;
    baseacc[1] = U2speed ? Number(U2speed) / 100 : 1;
    baseacc[2] = U3speed ? Number(U3speed) / 100 : 1;
    //skillacc
    var U1skillacc_rate = Array.from(document.querySelectorAll(".U1skillacc")).map(e => e.value ? Number(e.value) : 0);
    var U1skillacc_max = Array.from(document.querySelectorAll(".U1skillacc-max")).map(e => e.value ? Number(e.value) : 0);
    var U2skillacc_rate = Array.from(document.querySelectorAll(".U2skillacc")).map(e => e.value ? Number(e.value) : 0);
    var U2skillacc_max = Array.from(document.querySelectorAll(".U2skillacc-max")).map(e => e.value ? Number(e.value) : 0);
    var U3skillacc_rate = Array.from(document.querySelectorAll(".U3skillacc")).map(e => e.value ? Number(e.value) : 0);
    var U3skillacc_max = Array.from(document.querySelectorAll(".U3skillacc-max")).map(e => e.value ? Number(e.value) : 0);
    U1skillacc_rate.forEach((e, i) => { if (e) { skillacc[0].push([e / 100, U1skillacc_max[i] / 100]) } });
    U2skillacc_rate.forEach((e, i) => { if (e) { skillacc[1].push([e / 100, U2skillacc_max[i] / 100]) } });
    U3skillacc_rate.forEach((e, i) => { if (e) { skillacc[2].push([e / 100, U3skillacc_max[i] / 100]) } });
    //exboost
    var U1_exboost_time = Array.from(document.querySelectorAll(".U1exboost-time")).map(e => e.value != "" ? Number(e.value) : "");
    var U1_exboost_charge = Array.from(document.querySelectorAll(".U1exboost-charge")).map(e => e.value ? Number(e.value) : 0);
    var U2_exboost_time = Array.from(document.querySelectorAll(".U2exboost-time")).map(e => e.value != "" ? Number(e.value) : "");
    var U2_exboost_charge = Array.from(document.querySelectorAll(".U2exboost-charge")).map(e => e.value ? Number(e.value) : 0);
    var U3_exboost_time = Array.from(document.querySelectorAll(".U3exboost-time")).map(e => e.value != "" ? Number(e.value) : "");
    var U3_exboost_charge = Array.from(document.querySelectorAll(".U3exboost-charge")).map(e => e.value ? Number(e.value) : 0);
    //exboost to list
    U1_exboost_time.forEach((e, i) => { if (e !== "") { exboost.push([Math.ceil(e), 0, U1_exboost_charge[i] / 100]); } });
    U2_exboost_time.forEach((e, i) => { if (e !== "") { exboost.push([Math.ceil(e), 1, U2_exboost_charge[i] / 100]); } });
    U3_exboost_time.forEach((e, i) => { if (e !== "") { exboost.push([Math.ceil(e), 2, U3_exboost_charge[i] / 100]); } });
    exboost.sort((a, b) => a[0] - b[0]);
    //priority
    if (document.querySelector("#Priority").checked) {
        document.querySelectorAll("#setPriority select").forEach((e, i) => {
            priority[i] = e.value;
        })
    }
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
            var next_sw = Math.min((sw[0] - curCharge[0]) * 100 / (baseacc[0] * 100 + exacc[0] * 100), (sw[1] - curCharge[1]) * 100 / (baseacc[1] * 100 + exacc[1] * 100), (sw[2] - curCharge[2]) * 100 / (baseacc[2] * 100 + exacc[2] * 100));
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
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (priority[j] == i) {
                    //check
                    if (sw[j] <= curCharge[j]) {
                        curCharge[j] -= sw[j];
                        skillsw[j].forEach(e => {
                            if (e[2] == 0 || skillcounter[j] < e[2]) {
                                curCharge[e[0]] = curCharge[e[0]] + e[1] * sw[e[0]] / 100;
                            }
                        })
                        skillcounter[j] += 1;
                        exacc[j] = skillacc[j].map(e => Math.min(e[1], e[0] * skillcounter[j])).reduce((a, b) => a + b, 0);
                        eventlist.push([j, currentPoint]);
                        return;
                    }
                }
            }
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
            curCharge[0] += (nextPoint - currentPoint) * (baseacc[0] + exacc[0]);
            curCharge[1] += (nextPoint - currentPoint) * (baseacc[1] + exacc[1]);
            curCharge[2] += (nextPoint - currentPoint) * (baseacc[2] + exacc[2]);
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
/*---------------share---------------*/
function uits(number, bit) {
    return ("000000000000" + number.toString(2)).slice(-bit);
}

function stui(input) {
    return parseInt(input, 2) ? parseInt(input, 2) : "";
}

function sits(number, bit) {
    if (number < 0) {
        return "1" + ("000000000000" + (-number).toString(2)).slice(1 - bit);
    } else {
        return ("0000000000000" + number.toString(2)).slice(-bit);
    }
}

function stsi(input) {
    var temp = parseInt(input.slice(1 - input.length), 2);
    if (input[0] == 1) {
        return temp ? -temp : "";
    } else {
        return temp ? temp : "";
    }
}

function fits(number, bit) {
    if (number < 0) {
        return "1" + ("0000000000000000000" + (-number * 100).toString(2)).slice(-bit + 1);
    } else {
        return ("00000000000000000000" + (number * 100).toString(2)).slice(-bit);
    }
}

function stfi(input) {
    var temp = stsi(input);
    return temp ? temp / 100 : temp;
}

function base64Tobit(input) {
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._"
    var temp = input;
    var result = "";
    for (let i = 0; i < temp.length; i++) {
        result += uits(charSet.indexOf(temp[i]), 6)
    }
    return result;
}

function bitToBase64(input) {
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._"
    var temp = input;
    var result = "";
    if (temp.length % 6 != 0) {
        temp += "00000".slice(temp.length % 6 - 6);
    }
    for (let i = 0; i < temp.length; i += 6) {
        result += charSet[parseInt(temp.slice(i, i + 6), 2)];
    }
    return result;
}

function searchToUI() {
    if (Object.keys(jsondata).length === 0 || jsondata.language != document.documentElement.lang) {
        setTimeout(searchToUI, 10);
        return;
    }
    console.log("restoring data");
    var temp = base64Tobit(document.location.search.slice(1 - document.location.search.length));
    var sti = null;
    const headerSize = 2;
    const encode = {
        Base64: 0,
        Arithmetic_encoding: 1,
        preserved1: 2,
        preserved2: 3
    };
    const header = {
        SAMLL_UNSIGNED: 0,
        SAMLL_SIGNED: 1,
        SAMLL_FLOAT: 2,
        preserved_MAX_SAFE_INTEGER: 3
    }
    var dataSize = {
        start: 8,
        max: 8,
        speed: 8,
        sw: 10,
        sk: 7,
        skc: 3,
        sa: 7,
        ext: 12,
        exc: 7
    };
    var encodeHeader = parseInt(temp.slice(0, 2), 2);
    if (encodeHeader) {
        temp = temp.slice(2);
    } else {
        temp = temp.slice(2);
    }
    var index = 0;
    var debug = ""

    function tempGetNext(bit) {
        index += bit;
        debug += temp.slice(index - bit, index);
        return sti(temp.slice(index - bit, index));
    }
    var headerList = [];
    for (index = 0; index < headerSize * 8; index += 2) {
        headerList.push(parseInt(temp.slice(index, index + 2), 2));
    }
    if (headerList[0] == header.SAMLL_FLOAT) {
        for (var key in dataSize) { dataSize[key] += 8; }
        sti = stfi;
    } else if (headerList[0] == header.SAMLL_SIGNED) {
        for (var key in dataSize) { dataSize[key] += 1; }
        sti = stsi;
    } else if (headerList[0] == header.SAMLL_UNSIGNED) {
        sti = stui;
    } else {
        alert("Invaild share link");
        return -1;
    }
    //start
    if (headerList[1]) {
        document.querySelector("#U1start").value = tempGetNext(dataSize.start);
        document.querySelector("#U2start").value = tempGetNext(dataSize.start);
        document.querySelector("#U3start").value = tempGetNext(dataSize.start);
    }
    //max
    if (headerList[2]) {
        document.querySelector("#Max").click();
        document.querySelector("#U1max").value = tempGetNext(dataSize.max);
        document.querySelector("#U2max").value = tempGetNext(dataSize.max);
        document.querySelector("#U3max").value = tempGetNext(dataSize.max);
    }
    //baseacc
    if (headerList[3]) {
        document.querySelector("#Speed").click();
        document.querySelector("#U1speed").value = tempGetNext(dataSize.speed);
        document.querySelector("#U2speed").value = tempGetNext(dataSize.speed);
        document.querySelector("#U3speed").value = tempGetNext(dataSize.speed);
    }
    //sw
    if (headerList[4] == 1 || headerList[4] == 3) {
        document.querySelector("#U1mainsw").value = tempGetNext(dataSize.sw);
        document.querySelector("#U2mainsw").value = tempGetNext(dataSize.sw);
        document.querySelector("#U3mainsw").value = tempGetNext(dataSize.sw);
    }
    if (headerList[4] == 2 || headerList[4] == 3) {
        document.querySelector("#U1subsw").value = tempGetNext(dataSize.sw);
        document.querySelector("#U2subsw").value = tempGetNext(dataSize.sw);
        document.querySelector("#U3subsw").value = tempGetNext(dataSize.sw);
    }
    //sk
    for (let i = 0; i < headerList[5]; i++) {
        if (i) { insertTable("skillsw"); }
        document.querySelectorAll(".U1skillsw1")[i].value = tempGetNext(dataSize.sk);
        document.querySelectorAll(".U1skillsw-counter1")[i].value = ((r) => { return r ? r : 0 })(tempGetNext(dataSize.skc));
        document.querySelectorAll(".U1skillsw2")[i].value = tempGetNext(dataSize.sk);
        document.querySelectorAll(".U1skillsw-counter2")[i].value = ((r) => { return r ? r : 0 })(tempGetNext(dataSize.skc));
        document.querySelectorAll(".U1skillsw3")[i].value = tempGetNext(dataSize.sk);
        document.querySelectorAll(".U1skillsw-counter3")[i].value = ((r) => { return r ? r : 0 })(tempGetNext(dataSize.skc));
        document.querySelectorAll(".U2skillsw1")[i].value = tempGetNext(dataSize.sk);
        document.querySelectorAll(".U2skillsw-counter1")[i].value = ((r) => { return r ? r : 0 })(tempGetNext(dataSize.skc));
        document.querySelectorAll(".U2skillsw2")[i].value = tempGetNext(dataSize.sk);
        document.querySelectorAll(".U2skillsw-counter2")[i].value = ((r) => { return r ? r : 0 })(tempGetNext(dataSize.skc));
        document.querySelectorAll(".U2skillsw3")[i].value = tempGetNext(dataSize.sk);
        document.querySelectorAll(".U2skillsw-counter3")[i].value = ((r) => { return r ? r : 0 })(tempGetNext(dataSize.skc));
        document.querySelectorAll(".U3skillsw1")[i].value = tempGetNext(dataSize.sk);
        document.querySelectorAll(".U3skillsw-counter1")[i].value = ((r) => { return r ? r : 0 })(tempGetNext(dataSize.skc));
        document.querySelectorAll(".U3skillsw2")[i].value = tempGetNext(dataSize.sk);
        document.querySelectorAll(".U3skillsw-counter2")[i].value = ((r) => { return r ? r : 0 })(tempGetNext(dataSize.skc));
        document.querySelectorAll(".U3skillsw3")[i].value = tempGetNext(dataSize.sk);
        document.querySelectorAll(".U3skillsw-counter3")[i].value = ((r) => { return r ? r : 0 })(tempGetNext(dataSize.skc));
    }
    //sa
    if (headerList[6]) {
        insertTable("skillacc");
        document.querySelector(".U1skillacc").value = tempGetNext(dataSize.sa);
        document.querySelector(".U1skillacc-max").value = tempGetNext(dataSize.sa);
        document.querySelector(".U2skillacc").value = tempGetNext(dataSize.sa);
        document.querySelector(".U2skillacc-max").value = tempGetNext(dataSize.sa);
        document.querySelector(".U3skillacc").value = tempGetNext(dataSize.sa);
        document.querySelector(".U3skillacc-max").value = tempGetNext(dataSize.sa);
    }
    //ex
    for (let i = 0; i < headerList[7]; i++) {
        insertTable("exboost");
        document.querySelectorAll(".U1exboost-time")[i].value = tempGetNext(dataSize.ext);
        document.querySelectorAll(".U1exboost-charge")[i].value = tempGetNext(dataSize.exc);
        document.querySelectorAll(".U2exboost-time")[i].value = tempGetNext(dataSize.ext);
        document.querySelectorAll(".U2exboost-charge")[i].value = tempGetNext(dataSize.exc);
        document.querySelectorAll(".U3exboost-time")[i].value = tempGetNext(dataSize.ext);
        document.querySelectorAll(".U3exboost-charge")[i].value = tempGetNext(dataSize.exc);
    }
    console.log(temp.slice(16));
    console.log(debug);
    drawTimeline();
}

function share() {
    const encode = {
        Base64: "00",
        Arithmetic_encoding: "01",
        preserved1: "10",
        preserved2: "11"
    }
    const header = {
        SAMLL_UNSIGNED: "00",
        SAMLL_SIGNED: "01",
        SAMLL_FLOAT: "10",
        preserved_MAX_SAFE_INTEGER: "11"
    }
    const headerSize = 2;
    var result = encode.Base64;
    var negFlag = 0;
    var floatFlag = 0;
    var dataSize = {
        start: 8,
        max: 8,
        speed: 8,
        sw: 10,
        sk: 7,
        skc: 3,
        sa: 7,
        ext: 12,
        exc: 7
    };
    var its = null;
    //start_sw
    var u1start = Number(document.querySelector("#U1start").value);
    var u2start = Number(document.querySelector("#U2start").value);
    var u3start = Number(document.querySelector("#U3start").value);
    if (u1start < 0 || u2start < 0 || u3start < 0) {
        negFlag = 1;
    }
    if (u1start % 1 || u2start % 1 || u3start % 1) {
        floatFlag = 1;
    }
    var startFlag = u1start || u2start || u3start ? 1 : 0;
    //sw_max
    var u1max = Number(document.querySelector("#U1max").value);
    var u2max = Number(document.querySelector("#U2max").value);
    var u3max = Number(document.querySelector("#U3max").value);
    if (u1max < 0 || u2max < 0 || u3max < 0) {
        negFlag = 1;
    }
    if (u1max % 1 || u2max % 1 || u3max % 1) {
        floatFlag = 1;
    }
    var maxFlag = u1max || u2max || u3max ? 1 : 0;
    //baseacc
    var U1speed = Number(document.querySelector("#U1speed").value);
    var U2speed = Number(document.querySelector("#U2speed").value);
    var U3speed = Number(document.querySelector("#U3speed").value);
    if (U1speed < 0 || U2speed < 0 || U3speed < 0) {
        negFlag = 1;
    }
    if (U1speed % 1 || U2speed % 1 || U3speed % 1) {
        floatFlag = 1;
    }
    var speedFlag = U1speed || U2speed || U3speed ? 1 : 0;
    //sw
    var u1msw = Number(document.querySelector("#U1mainsw").value);
    var u1ssw = Number(document.querySelector("#U1subsw").value);
    var u2msw = Number(document.querySelector("#U2mainsw").value);
    var u2ssw = Number(document.querySelector("#U2subsw").value);
    var u3msw = Number(document.querySelector("#U3mainsw").value);
    var u3ssw = Number(document.querySelector("#U3subsw").value);
    if (u1msw < 0 || u1ssw < 0 || u2msw < 0 || u2ssw < 0 || u3msw < 0 || u3ssw < 0) {
        negFlag = 1;
    }
    if (u1msw % 1 || u1ssw % 1 || u2msw % 1 || u2ssw % 1 || u3msw % 1 || u3ssw % 1) {
        floatFlag = 1;
    }
    var swFlag = (u1msw || u2msw || u3msw ? 1 : 0) + (u1ssw || u2ssw || u3ssw ? 2 : 0);
    //skillsw
    var U1skillsw1 = Array.from(document.querySelectorAll(".U1skillsw1")).map(e => e.value ? Number(e.value) : 0);
    var U1skillsw_counter1 = Array.from(document.querySelectorAll(".U1skillsw-counter1")).map(e => e.value ? Number(e.value) : 0);
    var U1skillsw2 = Array.from(document.querySelectorAll(".U1skillsw2")).map(e => e.value ? Number(e.value) : 0);
    var U1skillsw_counter2 = Array.from(document.querySelectorAll(".U1skillsw-counter2")).map(e => e.value ? Number(e.value) : 0);
    var U1skillsw3 = Array.from(document.querySelectorAll(".U1skillsw3")).map(e => e.value ? Number(e.value) : 0);
    var U1skillsw_counter3 = Array.from(document.querySelectorAll(".U1skillsw-counter3")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw1 = Array.from(document.querySelectorAll(".U2skillsw1")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw_counter1 = Array.from(document.querySelectorAll(".U2skillsw-counter1")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw2 = Array.from(document.querySelectorAll(".U2skillsw2")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw_counter2 = Array.from(document.querySelectorAll(".U2skillsw-counter2")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw3 = Array.from(document.querySelectorAll(".U2skillsw3")).map(e => e.value ? Number(e.value) : 0);
    var U2skillsw_counter3 = Array.from(document.querySelectorAll(".U2skillsw-counter3")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw1 = Array.from(document.querySelectorAll(".U3skillsw1")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw_counter1 = Array.from(document.querySelectorAll(".U3skillsw-counter1")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw2 = Array.from(document.querySelectorAll(".U3skillsw2")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw_counter2 = Array.from(document.querySelectorAll(".U3skillsw-counter2")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw3 = Array.from(document.querySelectorAll(".U3skillsw3")).map(e => e.value ? Number(e.value) : 0);
    var U3skillsw_counter3 = Array.from(document.querySelectorAll(".U3skillsw-counter3")).map(e => e.value ? Number(e.value) : 0);
    if (U1skillsw.some(v => v[1] < 0) || U2skillsw.some(v => v[1] < 0) || U3skillsw.some(v => v[1] < 0)) {
        negFlag = 1;
    }
    if (U1skillsw.some(v => v[1] % 1) || U2skillsw.some(v => v[1] % 1) || U3skillsw.some(v => v[1] % 1)) {
        floatFlag = 1;
    }
    var skFlag = Math.min(U1skillsw1.length, 3);
    //skillacc
    var U1skillacc_rate = Array.from(document.querySelectorAll(".U1skillacc")).map(e => e.value ? Number(e.value) : 0);
    var U1skillacc_max = Array.from(document.querySelectorAll(".U1skillacc-max")).map(e => e.value ? Number(e.value) : 0);
    var U2skillacc_rate = Array.from(document.querySelectorAll(".U2skillacc")).map(e => e.value ? Number(e.value) : 0);
    var U2skillacc_max = Array.from(document.querySelectorAll(".U2skillacc-max")).map(e => e.value ? Number(e.value) : 0);
    var U3skillacc_rate = Array.from(document.querySelectorAll(".U3skillacc")).map(e => e.value ? Number(e.value) : 0);
    var U3skillacc_max = Array.from(document.querySelectorAll(".U3skillacc-max")).map(e => e.value ? Number(e.value) : 0);
    if (U1skillacc_rate.length != 0 && (U1skillacc_rate[0] < 0 || U1skillacc_max[0] < 0 || U2skillacc_rate[0] < 0 || U2skillacc_max[0] < 0 || U3skillacc_rate[0] < 0 || U3skillacc_max[0] < 0)) {
        negFlag = 1;
    }
    if (U1skillacc_rate.length != 0 && (U1skillacc_rate[0] % 1 || U1skillacc_max[0] % 1 || U2skillacc_rate[0] % 1 || U2skillacc_max[0] % 1 || U3skillacc_rate[0] % 1 || U3skillacc_max[0] % 1)) {
        floatFlag = 1;
    }
    var saFlag = U1skillacc_rate.length ? 1 : 0;
    //exboost
    var U1_exboost_time = Array.from(document.querySelectorAll(".U1exboost-time")).map(e => e.value ? Number(e.value) : 0);
    var U1_exboost_charge = Array.from(document.querySelectorAll(".U1exboost-charge")).map(e => e.value ? Number(e.value) : 0);
    var U2_exboost_time = Array.from(document.querySelectorAll(".U2exboost-time")).map(e => e.value ? Number(e.value) : 0);
    var U2_exboost_charge = Array.from(document.querySelectorAll(".U2exboost-charge")).map(e => e.value ? Number(e.value) : 0);
    var U3_exboost_time = Array.from(document.querySelectorAll(".U3exboost-time")).map(e => e.value ? Number(e.value) : 0);
    var U3_exboost_charge = Array.from(document.querySelectorAll(".U3exboost-charge")).map(e => e.value ? Number(e.value) : 0);
    if (U1_exboost_time.length != 0 && (U1_exboost_time.some(v => v < 0) || U1_exboost_charge.some(v => v < 0) || U2_exboost_time.some(v => v < 0) || U2_exboost_charge.some(v => v < 0) || U3_exboost_time.some(v => v < 0) || U3_exboost_charge.some(v => v < 0))) {
        negFlag = 1;
    }
    if (U1_exboost_time.length != 0 && (U1_exboost_time.some(v => v % 1) || U1_exboost_charge.some(v => v % 1) || U2_exboost_time.some(v => v % 1) || U2_exboost_charge.some(v => v % 1) || U3_exboost_time.some(v => v % 1) || U3_exboost_charge.some(v => v % 1))) {
        floatFlag = 1;
    }
    var exFlag = Math.min(U1_exboost_time.length, 3);
    //join data
    if (floatFlag) {
        result += header.SAMLL_FLOAT;
        for (var key in dataSize) { dataSize[key] += 8; }
        its = fits;
    } else if (negFlag) {
        result += header.SAMLL_SIGNED;
        for (var key in dataSize) { dataSize[key] += 1; }
        its = sits;
    } else {
        result += header.SAMLL_UNSIGNED;
        its = uits;
    }
    result += uits(startFlag, headerSize) + uits(maxFlag, headerSize) + uits(speedFlag, headerSize) + uits(swFlag, headerSize) + uits(skFlag, headerSize) + uits(saFlag, headerSize) + uits(exFlag, headerSize);
    //start_sw
    if (startFlag) {
        result += its(u1start, dataSize.start) + its(u2start, dataSize.start) + its(u3start, dataSize.start);
    }
    //sw_max
    if (maxFlag) {
        result += its(u1max, dataSize.max) + its(u2max, dataSize.max) + its(u3max, dataSize.max);
    }
    //baseacc
    if (speedFlag) {
        result += its(U1speed, dataSize.speed) + its(U2speed, dataSize.speed) + its(U3speed, dataSize.speed);
    }
    //sw
    if (swFlag == 1 || swFlag == 3) {
        result += its(u1msw, dataSize.sw) + its(u2msw, dataSize.sw) + its(u3msw, dataSize.sw);
    }
    if (swFlag == 2 || swFlag == 3) {
        result += its(u1ssw, dataSize.sw) + its(u2ssw, dataSize.sw) + its(u3ssw, dataSize.sw);
    }
    //skillsw
    for (let i = 0; i < skFlag; i++) {
        result += its(U1skillsw1[i], dataSize.sk) + its(U1skillsw_counter1[i], dataSize.skc) + its(U1skillsw2[i], dataSize.sk) + its(U1skillsw_counter2[i], dataSize.skc) + its(U1skillsw3[i], dataSize.sk) + its(U1skillsw_counter3[i], dataSize.skc);
        result += its(U2skillsw1[i], dataSize.sk) + its(U2skillsw_counter1[i], dataSize.skc) + its(U2skillsw2[i], dataSize.sk) + its(U2skillsw_counter2[i], dataSize.skc) + its(U2skillsw3[i], dataSize.sk) + its(U2skillsw_counter3[i], dataSize.skc);
        result += its(U3skillsw1[i], dataSize.sk) + its(U3skillsw_counter1[i], dataSize.skc) + its(U3skillsw2[i], dataSize.sk) + its(U3skillsw_counter2[i], dataSize.skc) + its(U3skillsw3[i], dataSize.sk) + its(U3skillsw_counter3[i], dataSize.skc);
    }
    //sa
    for (let i = 0; i < saFlag; i++) {
        result += its(U1skillacc_rate[i], dataSize.sa) + its(U1skillacc_max[i], dataSize.sa) + its(U2skillacc_rate[i], dataSize.sa) + its(U2skillacc_max[i], dataSize.sa) + its(U3skillacc_rate[i], dataSize.sa) + its(U3skillacc_max[i], dataSize.sa);
    }
    //exbost
    for (let i = 0; i < exFlag; i++) {
        result += its(U1_exboost_time[i], dataSize.ext) + its(U1_exboost_charge[i], dataSize.exc) + its(U2_exboost_time[i], dataSize.ext) + its(U2_exboost_charge[i], dataSize.exc) + its(U3_exboost_time[i], dataSize.ext) + its(U3_exboost_charge[i], dataSize.exc);
    }
    document.querySelector("#sharelink").value = document.location.origin + document.location.pathname + "?" + bitToBase64(result);
}

document.querySelector("#copy").onclick = share;
if (document.location.search.length > 1) { searchToUI(); }
document.querySelector("#sharelink").value = document.location.origin + document.location.pathname;