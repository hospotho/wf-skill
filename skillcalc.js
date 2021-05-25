/*V1.0*/
/*---------------UI---------------*/
var table = document.querySelector("#dataTables");
var div = document.createElement("div");
div.id = "add-menu";
div.style = "text-align: center";
div.innerHTML = "<select id='extra-type'><option value='skillsw'>開技充能</option><option value='skillacc'>充能速度</option><option value='exboost'>額外充能</option></select><input type='button' value='+' onclick='insertTable()'>";
table.appendChild(div);
document.querySelectorAll("input,select").forEach(e => {
    e.addEventListener("change", drawTimeline);
})

const skillswTable = "<table><tbody><tr><td colspan='4'>開技充能</td></tr><tr><td>+U1</td><td><input class='U1skillsw1' size='4'>%<br><select class='U1skillsw-counter1'><option value='0'>無限次</option><option value='1'>1次</option><option value='2'>2次</option><option value='3'>3次</option><option value='4'>4次</option><option value='5'>5次</option></select></td><td><input class='U1skillsw2' size='4'>%<br><select class='U1skillsw-counter2'><option value='0'>無限次</option><option value='1'>1次</option><option value='2'>2次</option><option value='3'>3次</option><option value='4'>4次</option><option value='5'>5次</option></select></td><td><input class='U1skillsw3' size='4'>%<br><select class='U1skillsw-counter3'><option value='0'>無限次</option><option value='1'>1次</option><option value='2'>2次</option><option value='3'>3次</option><option value='4'>4次</option><option value='5'>5次</option></select></td></tr><tr><td>+U2</td><td><input class='U2skillsw1' size='4'>%<br><select class='U2skillsw-counter1'><option value='0'>無限次</option><option value='1'>1次</option><option value='2'>2次</option><option value='3'>3次</option><option value='4'>4次</option><option value='5'>5次</option></select></td><td><input class='U2skillsw2' size='4'>%<br><select class='U2skillsw-counter2'><option value='0'>無限次</option><option value='1'>1次</option><option value='2'>2次</option><option value='3'>3次</option><option value='4'>4次</option><option value='5'>5次</option></select></td><td><input class='U2skillsw3' size='4'>%<br><select class='U2skillsw-counter3'><option value='0'>無限次</option><option value='1'>1次</option><option value='2'>2次</option><option value='3'>3次</option><option value='4'>4次</option><option value='5'>5次</option></select></td></tr><tr><td>+U3</td><td><input class='U3skillsw1' size='4'>%<br><select class='U3skillsw-counter1'><option value='0'>無限次</option><option value='1'>1次</option><option value='2'>2次</option><option value='3'>3次</option><option value='4'>4次</option><option value='5'>5次</option></select></td><td><input class='U3skillsw2' size='4'>%<br><select class='U3skillsw-counter2'><option value='0'>無限次</option><option value='1'>1次</option><option value='2'>2次</option><option value='3'>3次</option><option value='4'>4次</option><option value='5'>5次</option></select></td><td><input class='U3skillsw3' size='4'>%<br><select class='U3skillsw-counter3'><option value='0'>無限次</option><option value='1'>1次</option><option value='2'>2次</option><option value='3'>3次</option><option value='4'>4次</option><option value='5'>5次</option></select></td></tr><tr><td colspan='4'><hr></td></tr></tbody></table>";
const skillaccTable = "<table><tbody><tr><td colspan='4'>開技充能速度加速</td></tr><tr><td>每次</td><td> <input class='U1skillacc' size='4'>%</td><td> <input class='U2skillacc' size='4'>%</td><td> <input class='U3skillacc' size='4'>%</td></tr><tr><td>上限</td><td> <input class='U1skillacc-max' size='4'>%</td><td> <input class='U2skillacc-max' size='4'>%</td><td> <input class='U3skillacc-max' size='4'>%</td></tr><tr><td colspan='4'><hr></td></tr></tbody></table>";
const exboostTable = "<table><tbody><tr><td colspan='4'>額外充能</td></tr><tr><td>時點</td><td> <input class='U1exboost-time' size='4'></td><td> <input class='U2exboost-time' size='4'></td><td> <input class='U3exboost-time' size='4'></td></tr><tr><td>充能</td><td> <input class='U1exboost-charge' size='2'>%</td><td> <input class='U2exboost-charge' size='2'>%</td><td> <input class='U3exboost-charge' size='2'>%</td></tr><tr><td colspan='4'><hr></td></tr></tbody></table>";

function insertTable() {
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

var U1skillacc = [];
var U2skillacc = [];
var U3skillacc = [];
var skillacc = [1, 1, 1];

var exboost = [];

var eventlist = [];

function update() {
    //init
    sw = [0, 0, 0];
    sw_max = [1, 1, 1];
    U1skillsw = [];
    U2skillsw = [];
    U3skillsw = [];
    U1skillacc = [];
    U2skillacc = [];
    U3skillacc = [];
    skillacc = [1, 1, 1];
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
    sw_max[0] = document.querySelector("#U1max").value ? Number(document.querySelector("#U1max").value) / 100 : 1;
    sw_max[1] = document.querySelector("#U2max").value ? Number(document.querySelector("#U2max").value) / 100 : 1;
    sw_max[2] = document.querySelector("#U3max").value ? Number(document.querySelector("#U3max").value) / 100 : 1;
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
    if (U1skillsw1.length && U1skillsw1.length == U1skillsw_counter1.length) {
        U1skillsw1.forEach((e, i) => { if (e) { U1skillsw.push([1, e, U1skillsw_counter1[i]]) } });
    }
    if (U1skillsw2.length && U1skillsw2.length == U1skillsw_counter2.length) {
        U1skillsw2.forEach((e, i) => { if (e) { U2skillsw.push([1, e, U1skillsw_counter2[i]]) } });
    }
    if (U1skillsw3.length && U1skillsw3.length == U1skillsw_counter3.length) {
        U1skillsw3.forEach((e, i) => { if (e) { U3skillsw.push([1, e, U1skillsw_counter3[i]]) } });
    }
    if (U2skillsw1.length && U2skillsw1.length == U2skillsw_counter1.length) {
        U2skillsw1.forEach((e, i) => { if (e) { U1skillsw.push([2, e, U2skillsw_counter1[i]]) } });
    }
    if (U2skillsw2.length && U2skillsw2.length == U2skillsw_counter2.length) {
        U2skillsw2.forEach((e, i) => { if (e) { U2skillsw.push([2, e, U2skillsw_counter2[i]]) } });
    }
    if (U2skillsw3.length && U2skillsw3.length == U2skillsw_counter3.length) {
        U2skillsw3.forEach((e, i) => { if (e) { U3skillsw.push([2, e, U2skillsw_counter3[i]]) } });
    }
    if (U3skillsw1.length && U3skillsw1.length == U3skillsw_counter1.length) {
        U3skillsw1.forEach((e, i) => { if (e) { U1skillsw.push([3, e, U3skillsw_counter1[i]]) } });
    }
    if (U3skillsw2.length && U3skillsw2.length == U3skillsw_counter2.length) {
        U3skillsw2.forEach((e, i) => { if (e) { U2skillsw.push([3, e, U3skillsw_counter2[i]]) } });
    }
    if (U3skillsw3.length && U3skillsw3.length == U3skillsw_counter3.length) {
        U3skillsw3.forEach((e, i) => { if (e) { U3skillsw.push([3, e, U3skillsw_counter3[i]]) } });
    }
    //skillacc
    var U1skillacc_rate = Array.from(document.querySelectorAll(".U1skillacc")).map(e => e.value ? Number(e.value) : 0);
    var U1skillacc_max = Array.from(document.querySelectorAll(".U1skillacc-max")).map(e => e.value ? Number(e.value) : 0);
    var U2skillacc_rate = Array.from(document.querySelectorAll(".U2skillacc")).map(e => e.value ? Number(e.value) : 0);
    var U2skillacc_max = Array.from(document.querySelectorAll(".U2skillacc-max")).map(e => e.value ? Number(e.value) : 0);
    var U3skillacc_rate = Array.from(document.querySelectorAll(".U3skillacc")).map(e => e.value ? Number(e.value) : 0);
    var U3skillacc_max = Array.from(document.querySelectorAll(".U3skillacc-max")).map(e => e.value ? Number(e.value) : 0);
    if (U1skillacc_rate.length && U1skillacc_rate.length == U1skillacc_max.length) {
        U1skillacc_rate.forEach((e, i) => { if (e) { U1skillacc.push([e / 100, U1skillacc_max[i] / 100]) } });
    }
    if (U2skillacc_rate.length && U2skillacc_rate.length == U2skillacc_max.length) {
        U2skillacc_rate.forEach((e, i) => { if (e) { U2skillacc.push([e / 100, U2skillacc_max[i] / 100]) } });
    }
    if (U3skillacc_rate.length && U3skillacc_rate.length == U3skillacc_max.length) {
        U3skillacc_rate.forEach((e, i) => { if (e) { U3skillacc.push([e / 100, U3skillacc_max[i] / 100]) } });
    }
    //exboost
    var U1_exboost_time = Array.from(document.querySelectorAll(".U1exboost-time")).map(e => e.value ? Number(e.value) : 0);
    var U1_exboost_charge = Array.from(document.querySelectorAll(".U1exboost-charge")).map(e => e.value ? Number(e.value) : 0);
    var U2_exboost_time = Array.from(document.querySelectorAll(".U2exboost-time")).map(e => e.value ? Number(e.value) : 0);
    var U2_exboost_charge = Array.from(document.querySelectorAll(".U2exboost-charge")).map(e => e.value ? Number(e.value) : 0);
    var U3_exboost_time = Array.from(document.querySelectorAll(".U3exboost-time")).map(e => e.value ? Number(e.value) : 0);
    var U3_exboost_charge = Array.from(document.querySelectorAll(".U3exboost-charge")).map(e => e.value ? Number(e.value) : 0);
    //exboost to list
    if (U1_exboost_time.length && U1_exboost_time.length == U1_exboost_charge.length) {
        U1_exboost_time.forEach((e, i) => { if (e) { exboost.push([e, 1, U1_exboost_charge[i]]); } });
    }
    if (U2_exboost_time.length && U2_exboost_time.length == U2_exboost_charge.length) {
        U2_exboost_time.forEach((e, i) => { if (e) { exboost.push([e, 2, U2_exboost_charge[i]]); } });
    }
    if (U3_exboost_time.length && U3_exboost_time.length == U3_exboost_charge.length) {
        U3_exboost_time.forEach((e, i) => { if (e) { exboost.push([e, 3, U3_exboost_charge[i]]); } });
    }
    if (exboost.length) {
        exboost.sort((a, b) => a[0] - b[0]);
    }
}

function timeline() {
    if (!(sw[0] && sw[1] && sw[2])) { return; }
    //init
    eventlist = [];
    var curCharge = [0, 0, 0];
    var skillcounter = [0, 0, 0];
    var currentPoint = 0;
    var nextPoint = 0;
    curCharge[0] = document.querySelector("#U1start").value ? Math.min(sw[0] * Number(document.querySelector("#U1start").value) / 100, sw_max[0] * sw[0]) : 0;
    curCharge[1] = document.querySelector("#U2start").value ? Math.min(sw[1] * Number(document.querySelector("#U2start").value) / 100, sw_max[1] * sw[1]) : 0;
    curCharge[2] = document.querySelector("#U3start").value ? Math.min(sw[2] * Number(document.querySelector("#U3start").value) / 100, sw_max[2] * sw[2]) : 0;

    function nextTimePoint() {
        if (sw[0] > curCharge[0] && sw[1] > curCharge[1] && sw[2] > curCharge[2]) {
            var next_sw = Math.min((sw[0] - curCharge[0]) / skillacc[0], (sw[1] - curCharge[1]) / skillacc[1], (sw[2] - curCharge[2]) / skillacc[2]);
            if (exboost.length) {
                return Math.ceil(currentPoint + Math.min(next_sw, exboost[0][0]));
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
                    curCharge[e[0] - 1] = curCharge[e[0] - 1] + e[1] / 100 * sw[e[0] - 1];
                }
            })
            skillcounter[0] += 1;
            skillacc[0] = 1 + U1skillacc.map(e => Math.min(e[1], e[0] * skillcounter[0])).reduce((a, b) => a + b, 0);
            eventlist.push([1, currentPoint]);
            return;
        }
        if (sw[1] <= curCharge[1]) {
            curCharge[1] -= sw[1];
            U2skillsw.forEach(e => {
                if (e[2] == 0 || skillcounter[1] < e[2]) {
                    curCharge[e[0] - 1] = curCharge[e[0] - 1] + e[1] / 100 * sw[e[0] - 1];
                }
            })
            skillcounter[1] += 1;
            skillacc[1] = 1 + U2skillacc.map(e => Math.min(e[1], e[0] * skillcounter[1])).reduce((a, b) => a + b, 0);
            eventlist.push([2, currentPoint]);
            return;
        }
        if (sw[2] <= curCharge[2]) {
            curCharge[2] -= sw[2];
            U3skillsw.forEach(e => {
                if (e[2] == 0 || skillcounter[2] < e[2]) {
                    curCharge[e[0] - 1] = curCharge[e[0] - 1] + e[1] / 100 * sw[e[0] - 1];
                }
            })
            skillcounter[2] += 1;
            skillacc[2] = 1 + U3skillacc.map(e => Math.min(e[1], e[0] * skillcounter[2])).reduce((a, b) => a + b, 0);
            eventlist.push([3, currentPoint]);
            return;
        }
    }

    function settleCharge() {
        if (exboost.length && currentPoint == exboost[0][0]) {
            curCharge[exboost[0][1] - 1] += exboost[0][2] * sw[exboost[0][1] - 1];
            exboost.shift();
        }
        curCharge[0] = Math.min(sw_max[0] * sw[0], curCharge[0]);
        curCharge[1] = Math.min(sw_max[1] * sw[1], curCharge[1]);
        curCharge[2] = Math.min(sw_max[2] * sw[2], curCharge[2]);
    }

    while (currentPoint < 3000 || eventlist.length < 30) {
        nextPoint = nextTimePoint();
        if (nextPoint == currentPoint) {
            settleSkill();
        } else {
            curCharge[0] += (nextPoint - currentPoint) * skillacc[0];
            curCharge[1] += (nextPoint - currentPoint) * skillacc[1];
            curCharge[2] += (nextPoint - currentPoint) * skillacc[2];
            currentPoint = nextPoint;
        }
        settleCharge();
    }
}

function draw() {
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

    eventlist.forEach(e => {
        var white = document.createElement("div");
        var div = document.createElement("div");
        if (lastEvent[e[0] - 1][0] !== null) {
            if (e[1] - 100 > lastEvent[e[0] - 1][0]) {
                white.style.height = String((e[1] - lastEvent[e[0] - 1][0]) / 5 - 20 - overflow[e[0] - 1]) + "px";
                overflow[e[0] - 1] = 0;
            } else {
                lastEvent[e[0] - 1][1].innerHTML += "/" + String(e[1]);
                lastEvent[e[0] - 1][1].style.height = String(Math.max(20, Number(lastEvent[e[0] - 1][1].style.height.slice(0, -2))) + (e[1] - lastEvent[e[0] - 1][0]) / 5) + "px";
                overflow[e[0] - 1] += (e[1] - lastEvent[e[0] - 1][0]) / 5;
                return;
            }
        } else {
            white.style.height = String(e[1] / 5) + "px";
        }
        div.innerHTML = e[1];
        lastEvent[e[0] - 1] = [e[1], div];
        white.style.backgroundColor = "transparent";
        document.querySelector("#U" + String(e[0])).appendChild(white);
        document.querySelector("#U" + String(e[0])).appendChild(div);
    })
}

function drawTimeline() {
    console.log("start simulation");
    var startTime = Date.now();
    update();
    timeline();
    draw();
    console.log(String(Date.now() - startTime) + "ms");
}