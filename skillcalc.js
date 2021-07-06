(function() {
    'use strict';
    /*V1.9*/
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
    if (document.documentElement.lang != lang) { changeUI(); }

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
        for (let a = 1; a < 4; a++) {
            let msw = Number(document.querySelector(`#U${a}mainsw`).value);
            let ssw = Number(document.querySelector(`#U${a}subsw`).value);
            sw[a - 1] = msw && ssw ? (msw + ssw) / 2 : msw || ssw;
        }
        //sw_max
        for (let a = 1; a < 4; a++) {
            let max = document.querySelector(`#U${a}max`).value;
            sw_max[a - 1] = max ? max / 100 : 1;
        }
        //skillsw
        for (let a = 1; a < 4; a++) {
            for (let b = 1; b < 4; b++) {
                let skillsw_array = Array.from(document.querySelectorAll(`.U${a}skillsw${b}`)).map(e => e.value ? Number(e.value) : 0);
                let skillsw_counter_array = Array.from(document.querySelectorAll(`.U${a}skillsw-counter${b}`)).map(e => e.value ? Number(e.value) : 0);
                skillsw_array.forEach((e, i) => { if (e) { skillsw[b - 1].push([a - 1, e, skillsw_counter_array[i]]) } });
            }
        }
        //baseacc
        for (let a = 1; a < 4; a++) {
            let speed = document.querySelector(`#U${a}speed`).value;
            baseacc[a - 1] = speed ? Number(speed) / 100 : 1;
        }
        //skillacc
        for (let a = 1; a < 4; a++) {
            let skillacc_rate_array = Array.from(document.querySelectorAll(`.U${a}skillacc`)).map(e => e.value ? Number(e.value) : 0);
            let skillacc_max_array = Array.from(document.querySelectorAll(`.U${a}skillacc-max`)).map(e => e.value ? Number(e.value) : 0);
            skillacc_rate_array.forEach((e, i) => { if (e) { skillacc[a - 1].push([e / 100, skillacc_max_array[i] / 100]) } });
        }
        //exboost
        for (let a = 1; a < 4; a++) {
            let exboost_time_array = Array.from(document.querySelectorAll(`.U${a}exboost-time`)).map(e => e.value != "" ? Number(e.value) : "");
            let exboost_charge_array = Array.from(document.querySelectorAll(`.U${a}exboost-charge`)).map(e => e.value ? Number(e.value) : 0);
            exboost_time_array.forEach((e, i) => { if (e !== "") { exboost.push([Math.ceil(e), a - 1, exboost_charge_array[i] / 100]); } });
        }
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
    const header = {
        UNSIGNED_INT: "00",
        SIGNED_INT: "01",
        UNSIGNED_2DP: "10",
        SIGNED_2DP: "11"
    }
    const dataSize = {
        header: 2,
        start: 9,
        max: 9,
        speed: 9,
        sw: 11,
        sk: 8,
        skc: 3,
        sa: 8,
        ext: 13,
        exc: 8,
        pr: 5
    };
    const nts_dict = {
        hts: function(number, bit = 2) { return ("000" + number.toString(2)).slice(-bit) },
        uits: function(number, bit) { return number ? "1" + ("0000000000000" + number.toString(2)).slice(1 - bit) : "0" },
        sits: function(number, bit) { return number ? "1" + (number < 0 ? "1" + ("0000000000000" + (-number).toString(2)).sliFce(1 - bit) : ("00000000000000" + number.toString(2)).slice(-bit)) : "0" },
        ufts: function(number, bit) { return number ? "1" + ("00000000000000000000" + (number * 100).toString(2)).slice(1 - bit) : "0" },
        sfts: function(number, bit) { return number ? "1" + (number < 0 ? "1" + ("00000000000000000000" + (number * -100).toString(2)).slice(1 - bit) : ("000000000000000000000" + (number * 100).toString(2)).slice(-bit)) : "0" }
    }
    const stn_dict = {
        sth: function(input) { return parseInt(input, 2) },
        stui: function(input) { return input[0] == 0 ? 0 : parseInt(input.slice(1 - input.length), 2) },
        stsi: function(input) { var temp = parseInt(input.slice(2 - input.length), 2); return input[0] == 0 ? 0 : (input[1] == 1 ? -temp : temp) },
        stuf: function(input) { return input[0] == 0 ? 0 : parseInt(input.slice(1 - input.length), 2) * 0.01 },
        stsf: function(input) { var temp = parseInt(input.slice(2 - input.length), 2); return input[0] == 0 ? 0 : (input[1] == 1 ? temp * -0.01 : temp * 0.01) }
    }

    function base64Tobit(input) {
        const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._"
        var temp = input;
        var result = "";
        for (let i = 0; i < temp.length; i++) {
            result += ("000000" + charSet.indexOf(temp[i]).toString(2)).slice(-6);
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

    function serialize() {
        //start_sw
        var u1start = Number(document.querySelector("#U1start").value);
        var u2start = Number(document.querySelector("#U2start").value);
        var u3start = Number(document.querySelector("#U3start").value);
        //sw_max
        var u1max = Number(document.querySelector("#U1max").value);
        var u2max = Number(document.querySelector("#U2max").value);
        var u3max = Number(document.querySelector("#U3max").value);
        //baseacc
        var U1speed = Number(document.querySelector("#U1speed").value);
        var U2speed = Number(document.querySelector("#U2speed").value);
        var U3speed = Number(document.querySelector("#U3speed").value);
        //sw
        var u1msw = Number(document.querySelector("#U1mainsw").value);
        var u1ssw = Number(document.querySelector("#U1subsw").value);
        var u2msw = Number(document.querySelector("#U2mainsw").value);
        var u2ssw = Number(document.querySelector("#U2subsw").value);
        var u3msw = Number(document.querySelector("#U3mainsw").value);
        var u3ssw = Number(document.querySelector("#U3subsw").value);
        //array init
        var skillsw_array = [];
        var skillsw_counter_array = [];
        var skillacc_rate_array = [];
        var skillacc_max_array = [];
        var exboost_time_array = [];
        var exboost_charge_array = [];
        for (let a = 1; a < 4; a++) {
            //skillsw
            for (let b = 1; b < 4; b++) {
                skillsw_array.push(Array.from(document.querySelectorAll(`.U${a}skillsw${b}`)).map(e => e.value ? Number(e.value) : 0));
                skillsw_counter_array.push(Array.from(document.querySelectorAll(`.U${a}skillsw-counter${b}`)).map(e => e.value ? Number(e.value) : 0));
            }
            //skillacc
            skillacc_rate_array.push(Array.from(document.querySelectorAll(`.U${a}skillacc`)).map(e => e.value ? Number(e.value) : 0));
            skillacc_max_array.push(Array.from(document.querySelectorAll(`.U${a}skillacc-max`)).map(e => e.value ? Number(e.value) : 0));
            //exboost
            exboost_time_array.push(Array.from(document.querySelectorAll(`.U${a}exboost-time`)).map(e => e.value != "" ? Number(e.value) : ""));
            exboost_charge_array.push(Array.from(document.querySelectorAll(`.U${a}exboost-charge`)).map(e => e.value ? Number(e.value) : 0));
        }
        //priority
        var U1priority = Number(document.querySelector("#U1priority").value);
        var U2priority = Number(document.querySelector("#U2priority").value);
        var U3priority = Number(document.querySelector("#U3priority").value);
        //flag
        var negFlag = 0;
        var floatFlag = 0;
        if (u1start < 0 || u2start < 0 || u3start < 0) {
            negFlag = 1;
        }
        if (u1start % 1 || u2start % 1 || u3start % 1) {
            floatFlag = 1;
        }
        if (u1max < 0 || u2max < 0 || u3max < 0) {
            negFlag = 1;
        }
        if (u1max % 1 || u2max % 1 || u3max % 1) {
            floatFlag = 1;
        }
        if (U1speed < 0 || U2speed < 0 || U3speed < 0) {
            negFlag = 1;
        }
        if (U1speed % 1 || U2speed % 1 || U3speed % 1) {
            floatFlag = 1;
        }
        if (u1msw < 0 || u1ssw < 0 || u2msw < 0 || u2ssw < 0 || u3msw < 0 || u3ssw < 0) {
            negFlag = 1;
        }
        if (u1msw % 1 || u1ssw % 1 || u2msw % 1 || u2ssw % 1 || u3msw % 1 || u3ssw % 1) {
            floatFlag = 1;
        }
        if (skillsw_array.some(a => a.some(v => v < 0))) {
            negFlag = 1;
        }
        if (skillsw_array.some(a => a.some(v => v % 1))) {
            floatFlag = 1;
        }
        if (skillacc_rate_array[0].length != 0 && (skillacc_rate_array.some(a => a.some(v => v < 0)) || skillacc_max_array.some(a => a.some(v => v < 0)))) {
            negFlag = 1;
        }
        if (skillacc_rate_array[0].length != 0 && (skillacc_rate_array.some(a => a.some(v => v % 1)) || skillacc_max_array.some(a => a.some(v => v % 1)))) {
            floatFlag = 1;
        }
        if (exboost_time_array[0].length != 0 && (exboost_time_array.some(a => a.some(v => v < 0)) || exboost_charge_array.some(a => a.some(v => v < 0)))) {
            negFlag = 1;
        }
        if (exboost_time_array[0].length != 0 && (exboost_time_array.some(a => a.some(v => v % 1)) || exboost_charge_array.some(a => a.some(v => v % 1)))) {
            floatFlag = 1;
        }
        var startFlag = u1start || u2start || u3start ? 1 : 0;
        var maxFlag = u1max || u2max || u3max ? 1 : 0;
        var speedFlag = U1speed || U2speed || U3speed ? 1 : 0;
        var swFlag = (u1msw || u2msw || u3msw ? 1 : 0) + (u1ssw || u2ssw || u3ssw ? 2 : 0);
        var skFlag = Math.min(skillsw_array[0].length, 3);
        var saFlag = skillacc_rate_array[0].length ? 1 : 0;
        var exFlag = Math.min(exboost_time_array[0].length, 3);
        var prFlag = U1priority || U2priority || U3priority ? 1 : 0;
        //join data
        var result = "";
        var thisDataSize = dataSize;
        var nts = null;
        if (negFlag) {
            if (floatFlag) {
                result += header.SIGNED_2DP;
                for (var key in thisDataSize) { thisDataSize[key] += 9; }
                nts = nts_dict.sfts;
            } else {
                result += header.SIGNED_INT;
                for (var key in thisDataSize) { thisDataSize[key] += 1; }
                nts = nts_dict.sits;
            }
        } else {
            if (floatFlag) {
                result += header.UNSIGNED_2DP;
                for (var key in thisDataSize) { thisDataSize[key] += 8; }
                nts = nts_dict.ufts;
            } else {
                result += header.UNSIGNED_INT;
                nts = nts_dict.uits;
            }
        }
        result += nts_dict.hts(startFlag) + nts_dict.hts(maxFlag) + nts_dict.hts(speedFlag) + nts_dict.hts(swFlag) + nts_dict.hts(skFlag) + nts_dict.hts(saFlag) + nts_dict.hts(exFlag) + nts_dict.hts(prFlag);
        //start_sw
        if (startFlag) {
            result += nts(u1start, thisDataSize.start) + nts(u2start, thisDataSize.start) + nts(u3start, thisDataSize.start);
        }
        //sw_max
        if (maxFlag) {
            result += nts(u1max, thisDataSize.max) + nts(u2max, thisDataSize.max) + nts(u3max, thisDataSize.max);
        }
        //baseacc
        if (speedFlag) {
            result += nts(U1speed, thisDataSize.speed) + nts(U2speed, thisDataSize.speed) + nts(U3speed, thisDataSize.speed);
        }
        //sw
        if (swFlag == 1 || swFlag == 3) {
            result += nts(u1msw, thisDataSize.sw) + nts(u2msw, thisDataSize.sw) + nts(u3msw, thisDataSize.sw);
        }
        if (swFlag == 2 || swFlag == 3) {
            result += nts(u1ssw, thisDataSize.sw) + nts(u2ssw, thisDataSize.sw) + nts(u3ssw, thisDataSize.sw);
        }
        //skillsw
        for (let i = 0; i < skFlag; i++) {
            for (let j = 0; j < 9; j++) {
                result += nts(skillsw_array[j][i], thisDataSize.sk) + nts_dict.hts(skillsw_counter_array[j][i], dataSize.skc);
            }
        }
        //sa
        for (let i = 0; i < saFlag; i++) {
            for (let j = 0; j < 3; j++) {
                result += nts(skillacc_rate_array[j][i], thisDataSize.sa) + nts(skillacc_max_array[j][i], thisDataSize.sa);
            }
        }
        //exbost
        for (let i = 0; i < exFlag; i++) {
            for (let j = 0; j < 3; j++) {
                result += nts(exboost_time_array[j][i], thisDataSize.ext) + nts(exboost_charge_array[j][i], thisDataSize.exc);
            }
        }
        //priority
        if (prFlag) {
            result += nts_dict.hts(U1priority * 9 + U2priority * 3 + U3priority, dataSize.pr)
        }
        document.querySelector("#sharelink").value = document.location.origin + document.location.pathname + "?" + bitToBase64(result);

    }

    function deserialize() {
        if (Object.keys(jsondata).length === 0 || jsondata.language != document.documentElement.lang) {
            setTimeout(deserialize, 10);
            return;
        }
        console.log("restoring data");
        var temp = base64Tobit(document.location.search.slice(1 - document.location.search.length));
        var stn = null;
        var thisDataSize = dataSize;
        var index = 0;
        var headerList = [];
        for (index = 0; index < dataSize.header * 9; index += 2) {
            headerList.push(stn_dict.sth(temp.slice(index, index + 2)));
        }
        if (headerList[0] == header.UNSIGNED_INT) {
            stn = stn_dict.stui;
        } else if (headerList[0] == header.SIGNED_INT) {
            for (var key in thisDataSize) { thisDataSize[key] += 1; }
            stn = stn_dict.stsi;
        } else if (headerList[0] == header.UNSIGNED_2DP) {
            for (var key in thisDataSize) { thisDataSize[key] += 7; }
            stn = stn_dict.stuf;
        } else if (headerList[0] == header.SIGNED_2DP) {
            for (var key in thisDataSize) { thisDataSize[key] += 8; }
            stn = stn_dict.stsf;
        }

        function tempGetNext(bit) {
            let result = stn(temp.slice(index, index + bit));
            if (result == "0") {
                index++;
                return "";
            } else {
                index += bit
                return result;
            }
        }
        //start
        if (headerList[1]) {
            document.querySelector("#U1start").value = tempGetNext(thisDataSize.start);
            document.querySelector("#U2start").value = tempGetNext(thisDataSize.start);
            document.querySelector("#U3start").value = tempGetNext(thisDataSize.start);
        }
        //max
        if (headerList[2]) {
            document.querySelector("#Max").click();
            document.querySelector("#U1max").value = tempGetNext(thisDataSize.max);
            document.querySelector("#U2max").value = tempGetNext(thisDataSize.max);
            document.querySelector("#U3max").value = tempGetNext(thisDataSize.max);
        }
        //baseacc
        if (headerList[3]) {
            document.querySelector("#Speed").click();
            document.querySelector("#U1speed").value = tempGetNext(thisDataSize.speed);
            document.querySelector("#U2speed").value = tempGetNext(thisDataSize.speed);
            document.querySelector("#U3speed").value = tempGetNext(thisDataSize.speed);
        }
        //sw
        if (headerList[4] == 1 || headerList[4] == 3) {
            document.querySelector("#U1mainsw").value = tempGetNext(thisDataSize.sw);
            document.querySelector("#U2mainsw").value = tempGetNext(thisDataSize.sw);
            document.querySelector("#U3mainsw").value = tempGetNext(thisDataSize.sw);
        }
        if (headerList[4] == 2 || headerList[4] == 3) {
            document.querySelector("#U1subsw").value = tempGetNext(thisDataSize.sw);
            document.querySelector("#U2subsw").value = tempGetNext(thisDataSize.sw);
            document.querySelector("#U3subsw").value = tempGetNext(thisDataSize.sw);
        }
        //sk
        for (let i = 0; i < headerList[5]; i++) {
            if (i) { insertTable("skillsw"); }
            for (let a = 1; a < 4; a++) {
                for (let b = 1; b < 4; b++) {
                    document.querySelectorAll(`.U${a}skillsw${b}`)[i].value = tempGetNext(thisDataSize.sk);
                    document.querySelectorAll(`.U${a}skillsw-counter${b}`)[i].value = ((r) => { index += dataSize.skc; return r ? r : 0 })(stn_dict.sth(temp.slice(index, index + dataSize.skc), dataSize.skc));
                }
            }
        }
        //sa
        if (headerList[6]) {
            insertTable("skillacc");
            for (let a = 1; a < 4; a++) {
                document.querySelector(`.U${a}skillacc`).value = tempGetNext(thisDataSize.sa);
                document.querySelector(`.U${a}skillacc-max`).value = tempGetNext(thisDataSize.sa);
            }
        }
        //ex
        for (let i = 0; i < headerList[7]; i++) {
            insertTable("exboost");
            for (let a = 1; a < 4; a++) {
                document.querySelectorAll(`.U${a}exboost-time`)[i].value = tempGetNext(thisDataSize.ext);
                document.querySelectorAll(`.U${a}exboost-charge`)[i].value = tempGetNext(thisDataSize.exc);
            }
        }
        //pr
        if (headerList[8]) {
            document.querySelector("#Priority").click();
            var prSum = ((r) => { return r ? r : 0 })(stn_dict.sth(temp.slice(index, index + dataSize.pr), dataSize.pr));
            document.querySelector("#U1priority").value = Math.floor(prSum / 9);
            document.querySelector("#U2priority").value = Math.floor(prSum % 9 / 3);
            document.querySelector("#U3priority").value = prSum % 3;
        }
        drawTimeline();
    }

    document.querySelector("#copy").onclick = serialize;
    if (document.location.search.length > 1) { deserialize(); }
    document.querySelector("#sharelink").value = document.location.origin + document.location.pathname;
})()