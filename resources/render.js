const { shell } = require('electron')
var Crawler = require("crawler");
const { strict } = require("assert");
var table = document.getElementById("myTable");
function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}
async function delayedGreeting() {
    var header = table.createTHead();
    var row = header.insertRow(0);
    row.insertCell(0).innerHTML = "<b>標題</b>";
    row.insertCell(1).innerHTML = "<b>公告單位</b>";
    row.insertCell(2).innerHTML = "<b>公告日期</b>";
    var c = new Crawler({
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                for (i = 1; i < 10; i++) {
                    var row = table.insertRow();
                    row.insertCell(0).innerHTML = '<a href="' + 'microsoft-edge:' + "https://news.stust.edu.tw" + $("a#ctl00_ContentPlaceHolder1_Repeater1_ctl" + "0" + i.toString() + "_HyperLink5").attr('href').substr(2) + '">' + $("a#ctl00_ContentPlaceHolder1_Repeater1_ctl" + "0" + i.toString() + "_HyperLink5").text();//標題+網址
                    row.insertCell(1).innerHTML = $("span#ctl00_ContentPlaceHolder1_Repeater1_ctl" + "0" + i.toString() + "_lbl_sortname").text();//單位
                    row.insertCell(2).innerHTML = $("span#ctl00_ContentPlaceHolder1_Repeater1_ctl" + "0" + i.toString() + "_lbl_time").text();//日期
                }
                for (i = 10; i < 21; i++) {
                    var row = table.insertRow();
                    row.insertCell(0).innerHTML = '<a href="' + 'microsoft-edge:' + "https://news.stust.edu.tw" + $("a#ctl00_ContentPlaceHolder1_Repeater1_ctl" + i.toString() + "_HyperLink5").attr('href').substr(2) + '">' + $("a#ctl00_ContentPlaceHolder1_Repeater1_ctl" + i.toString() + "_HyperLink5").text();//標題+網址
                    row.insertCell(1).innerHTML = $("span#ctl00_ContentPlaceHolder1_Repeater1_ctl" + i.toString() + "_lbl_sortname").text();//單位
                    row.insertCell(2).innerHTML = $("span#ctl00_ContentPlaceHolder1_Repeater1_ctl" + i.toString() + "_lbl_time").text();//日期
                }
            }
            done();
        }
    });
    for (var n = 1; n < 6; n++) {
        c.queue('https://news.stust.edu.tw/User/RwdNewsList.aspx?page=' + n.toString());
        await sleep(500);
    }
} delayedGreeting();