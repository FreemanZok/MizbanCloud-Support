async function getCharts() {
    let method = "POST",body = new FormData();
    body.append("dt", fromDate.value);
    const res = await fetch("/submit/cloud/servers/get-charts", { method, body })
    .then(r=>r.json()).then(j=>j).catch(ex => window.location.reload());
    showAlert(res.status, res.message);
    serverHistoryUpdate();
}

async function linearRange(range) {

    const route = '/submit/cdn/overview/website/linear2-scale';
    rBody =  new FormData();
    rBody.append("domain", $domain);
    rBody.append("wid", $wid);
    rBody.append("time", range);
    
 
    if(typeof chart !== 'undefined') chart.destroy();
    let result = await fetch(route, { method: "POST", body: rBody }).then(r => r.json()).then(j => j).catch(ex => window.location.reload());
 //    linear = JSON.parse(result);
    linearK = Object.values(JSON.parse(result).keys);
    linearV = Object.values(JSON.parse(result).values);
 
     chart = new ApexCharts(document.querySelector("#viewRepoerChart"), options);
     chart.render();
 }

 



 let pending1 = false, pending2 = false, pending3 = false, pending4 = false;
 let lock1 = false, lock2 = false, lock3 = false, lock4 = false;
 async function timeShift(chart, time) {
     const IS_REALTIME = time === "realtime";
     time = time === "realtime" ? '5m' : time;
     if(time === '5m' && chart == "1" && lock1) return console.log("1 is locked"); else if (chart == "1" && time !== '5m') lock1 = true ;
     if(time === '5m' && chart == "2" && lock2) return console.log("2 is locked"); else if (chart == "2" && time !== '5m') lock2 = true ;
     if(time === '5m' && chart == "3" && lock3) return console.log("3 is locked"); else if (chart == "3" && time !== '5m') lock3 = true ;
     if(time === '5m' && chart == "4" && lock4) return console.log("4 is locked"); else if (chart == "4" && time !== '5m') lock4 = true ;
     rBody =  new FormData();
     rBody.append("time", time);
     rBody.append("sid", $serverID);
     if(chart == "1" && pending1) return setTimeout(() => timeShift("1", IS_REALTIME ? 'realtime' :time), 1000);
     if(chart == "2" && pending2) return setTimeout(() => timeShift("2", IS_REALTIME ? 'realtime' :time), 1000);
     if(chart == "3" && pending3) return setTimeout(() => timeShift("3", IS_REALTIME ? 'realtime' :time), 1000);
     if(chart == "4" && pending4) return setTimeout(() => timeShift("4", IS_REALTIME ? 'realtime' :time), 1000);
     if(chart1) pending1 = true;
     if(chart2) pending2 = true;
     if(chart3) pending3 = true;
     if(chart4) pending4 = true;
     const result = await fetch(`/submit/cloud/servers/charts/${chart}`, { method: "POST", body: rBody })
     .then(r => r.json()).then(j => j)//.catch(ex => window.location.reload());
     if(chart1) pending1 = false;
     if(chart2) pending2 = false;
     if(chart3) pending3 = false;
     if(chart4) pending4 = false;
     if(!IS_REALTIME) {
         if (chart == 1) {
         X1r = Object.values(result.outgoing.keys);
         X1w = Object.values(result.incoming.keys);
         Y1r = Object.values(result.outgoing.values);
         Y1w = Object.values(result.incoming.values);
         options1 = {
             series: [{
             data: Y1r
           }, {data: Y1w}],
             colors: ['#70b5ef', '#9191d8'],
             chart: {
               type: 'area',
               width: '100%',
               height: 152,
               sparkline: {
                   enabled: true
               },
               locales: [{
                   "name": "en",
                   "options": {
                       "toolbar": {
                           "exportToSVG": "دانلود SVG",
                           "exportToPNG": "دانلود PNG",
                           "exportToCSV": "دانلود CSV",
                       }
                   }
                   }],
                   defaultLocale: "en",
               toolbar: {
                   show: false,
                   offsetX: 0,
                   offsetY: 0,
                   tools: {
                       download: true,
                       selection: true,
                       pan: true,
                       reset: true | '<img src="/static/icons/reset.png" width="20">',
                       customIcons: []
                   },
   
               },
               
               export: {
                   csv: {
                       filename: undefined,
                       columnDelimiter: ',',
                       headerCategory: 'category',
                       headerValue: 'value',
                       dateFormatter(timestamp) {
                       return new Date(timestamp).toDateString()
                       }
                   },
                   svg: {
                       filename: undefined,
                   },
                   png: {
                       filename: undefined,
                   }
               },
           },
           tooltip: {
               custom: function({ series, seriesIndex, dataPointIndex, w }) {
                 console.log(series, seriesIndex, dataPointIndex, w);
                   let size = series[0][dataPointIndex], unit = 'bytes';
                   let size2 = series[1][dataPointIndex], unit2 = 'bytes';
                   if(size > 1024000000000) {
                         size /= 1024000000000;
                         unit = "TB/s";
                   }
                   else if(size > 1024000000) {
                         size /= 1024000000;
                         unit = "GB/s";
                   }
                   else if(size > 1024000) {
                         size /= 1024000;
                         unit = "MB/s";
                   }
                   else if(size > 1024) {
                         size /= 1024;
                         unit = "KB/s";
                   }
                   size = parseFloat(size).toFixed(2);
                   if(size2 > 1024000000000) {
                         size2 /= 1024000000000;
                         unit2 = "TB/s";
                   }
                   else if(size2 > 1024000000) {
                         size2 /= 1024000000;
                         unit2 = "GB/s";
                   }
                   else if(size2 > 1024000) {
                         size2 /= 1024000;
                         unit2 = "MB/s";
                   }
                   else if(size2 > 1024) {
                         size2 /= 1024;
                         unit2 = "KB/s";
                   }
                   size2 = parseFloat(size2).toFixed(2);
                   return (
                     '<div class="arrow_box">' + '<p class="tooltip-date-ltr">' + X1r[dataPointIndex] + '</p>' +
                     "<span> Write: " +
                         size + ' '+ unit +
                       "</span><br/>" + 
                         "<span> Read: " +
                             size2 + ' '+ unit2 +
                       "</span>" +
                       
                       "</div>"
                     );
               },
             fixed: {
               enabled: false
             },
             x: {
             //   show: false
             },
             y: {
               title: {
                 formatter: function (seriesName) {
                   return ''
                 }
               },
             },
             marker: {
               show: true
             },
           },
 
           xaxis: {
             crosshairs: {
               width: 1
             },
           },
         //   yaxis: {
         //     min: 0,
         //     show: true
         //   },
 
         };
     if(typeof chart1 !== 'undefined') chart1.destroy();
         chart1 = new ApexCharts(document.querySelector("#sparkDisk"), options1);
         chart1.render();
         } else if (chart == 2) {
             X2 = Object.values(result.keys);
             Y2 = Object.values(result.values);
             options2 = {
                 series: [{
                 data: Y2
             }],
                 colors: ['#9191d8'],
                 chart: {
                 type: 'area',
                 width: '100%',
                 height: 152,
                 sparkline: {
                     enabled: true
                 },
                 locales: [{
                     "name": "en",
                     "options": {
                         "toolbar": {
                             "exportToSVG": "دانلود SVG",
                             "exportToPNG": "دانلود PNG",
                             "exportToCSV": "دانلود CSV",
                         }
                     }
                     }],
                     defaultLocale: "en",
                 toolbar: {
                     show: false,
                     offsetX: 0,
                     offsetY: 0,
                     tools: {
                         download: true,
                         selection: true,
                         pan: true,
                         reset: true | '<img src="/static/icons/reset.png" width="20">',
                         customIcons: []
                     }
                 },
                 export: {
                     csv: {
                         filename: undefined,
                         columnDelimiter: ',',
                         headerCategory: 'category',
                         headerValue: 'value',
                         dateFormatter(timestamp) {
                         return new Date(timestamp).toDateString()
                         }
                     },
                     svg: {
                         filename: undefined,
                     },
                     png: {
                         filename: undefined,
                     }
                 },
             },
             tooltip: {
                 custom: function({ series, seriesIndex, dataPointIndex, w }) {
                         let size = series[seriesIndex][dataPointIndex], unit = 'bytes';
                         if(size > 1024000000000) {
                             size /= 1024000000000;
                             unit = "TB/s";
                         }
                         else if(size > 1024000000) {
                             size /= 1024000000;
                             unit = "GB/s";
                         }
                         else if(size > 1024000) {
                             size /= 1024000;
                             unit = "MB/s";
                         }
                         else if(size > 1024) {
                             size /= 1024;
                             unit = "KB/s";
                         }
                         size = parseFloat(size).toFixed(2);
                     return (
                         '<div class="arrow_box">' + '<p class="tooltip-date-ltr">' + X2[dataPointIndex] + '</p>' +
                         "<span> usage: " +
                         size + ' ' + unit +
                         "</span>" +
                         "</div>"
                     );
                 },
                 fixed: {
                 enabled: false
                 },
                 x: {
                 show: false
                 },
                 y: {
                 title: {
                     formatter: function (seriesName) {
                     return ''
                    }
                 }
                 },
                 marker: {
                 show: true
                 },
             },
             yaxis: {
                labels: {
                  minWidth: 40,
                  maxWidth: 100,
                  style: {
                    colors: "#e7e8ec",
                  },
                  offsetX: -50,
                  formatter: function (val) {
                    return val.toLocaleString();
                  },
                },
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
              },
          
             };
     
             if(typeof chart2 !== 'undefined') chart2.destroy();
             chart2 = new ApexCharts(document.querySelector("#sparkTraffic"), options2);
             chart2.render();
 
         } else if (chart == 3) {
             X3 = Object.values(result.keys);
             Y3 = Object.values(result.values);
             options3 = {
                 series: [{
                 data: Y3
             }],
                 colors: ['#13c1d4'],
                 chart: {
                 type: 'area',
                 width: '100%',
                 height: 152,
                 sparkline: {
                     enabled: true
                 },
                 locales: [{
                     "name": "en",
                     "options": {
                         "toolbar": {
                             "exportToSVG": "دانلود SVG",
                             "exportToPNG": "دانلود PNG",
                             "exportToCSV": "دانلود CSV",
                         }
                     }
                     }],
                     defaultLocale: "en",
                 toolbar: {
                     show: false,
                     offsetX: 0,
                     offsetY: 0,
                     tools: {
                         download: true,
                         selection: true,
                         pan: true,
                         reset: true | '<img src="/static/icons/reset.png" width="20">',
                         customIcons: []
                     }
                 },
                 export: {
                     csv: {
                         filename: undefined,
                         columnDelimiter: ',',
                         headerCategory: 'category',
                         headerValue: 'value',
                         dateFormatter(timestamp) {
                         return new Date(timestamp).toDateString()
                         }
                     },
                     svg: {
                         filename: undefined,
                     },
                     png: {
                         filename: undefined,
                     }
                 },
             },
             tooltip: {
                 custom: function({ series, seriesIndex, dataPointIndex, w }) {
                     let size = series[seriesIndex][dataPointIndex], unit = parseInt($('.SHOWCPUMAIN').html());
                     let cp = parseInt(size/unit) > 100 ? 100 : parseInt(size/unit);
                     const cpusage = cp + "%";
                     return `
                         <div class="arrow_box">
                             <p class="tooltip-date-ltr">${X3[dataPointIndex]}</p>
                             <span>usage: ${cpusage}</span>
                         </div>`;
                 },
                 fixed: {
                 enabled: false
                 },
                 x: {
                 show: false
                 },
                 y: {
                 title: {
                     formatter: function (seriesName) {
                     return ''
                     }
                 }
                 },
                 marker: {
                 show: true
                 },
             }
             };
             if(typeof chart3 !== 'undefined') chart3.destroy();
             chart3 = new ApexCharts(document.querySelector("#sparkCpu"), options3);
             chart3.render();
 
         } else if (chart == 4) {
             X4 = Object.values(result.keys);
             Y4 = Object.values(result.values);
             options4 = {
                 series: [{
                 data: Y4
             }],
                 colors: ['#ce67bb'],
                 chart: {
                 type: 'area',
                 width: '100%',
                 height: 152,
                 sparkline: {
                     enabled: true
                 },
                 locales: [{
                     "name": "en",
                     "options": {
                         "toolbar": {
                             "exportToSVG": "دانلود SVG",
                             "exportToPNG": "دانلود PNG",
                             "exportToCSV": "دانلود CSV",
                         }
                     }
                     }],
                     defaultLocale: "en",
                 toolbar: {
                     show: false,
                     offsetX: 0,
                     offsetY: 0,
                     tools: {
                         download: true,
                         selection: true,
                         pan: true,
                         reset: true | '<img src="/static/icons/reset.png" width="20">',
                         customIcons: []
                     }
                 },
                 export: {
                     csv: {
                         filename: undefined,
                         columnDelimiter: ',',
                         headerCategory: 'category',
                         headerValue: 'value',
                         dateFormatter(timestamp) {
                         return new Date(timestamp).toDateString()
                         }
                     },
                     svg: {
                         filename: undefined,
                     },
                     png: {
                         filename: undefined,
                     }
                 },
             },
             tooltip: {
                 custom: function({ series, seriesIndex, dataPointIndex, w }) {
                         let size = series[seriesIndex][dataPointIndex], unit = 'bytes';
                         if(size > 1024000000000) {
                             size /= 1024000000000;
                             unit = "TB/s";
                         }
                         else if(size > 1024000000) {
                             size /= 1024000000;
                             unit = "GB/s";
                         }
                         else if(size > 1024000) {
                             size /= 1024000;
                             unit = "MB/s";
                         }
                         else if(size > 1024) {
                             size /= 1024;
                             unit = "KB/s";
                         }
                         size = parseFloat(size).toFixed(2);
                     return (
                         '<div class="arrow_box">' + '<p class="tooltip-date-ltr">' + X4[dataPointIndex] + '</p>' +
                         "<span> usage: " +
                         size + ' ' + unit +
                         "</span>" +
                         "</div>"
                     );
                 },
                 fixed: {
                 enabled: false
                 },
                 x: {
                 show: false
                 },
                 y: {
                 title: {
                     formatter: function (seriesName) {
                     return ''
                     }
                 }
                 },
                 marker: {
                 show: true
                 },
             }
             };
             if(typeof chart4 !== 'undefined') chart4.destroy();
             chart4 = new ApexCharts(document.querySelector("#sparkRam"), options4);
             chart4.render();
 
         }
     } else {
         setTimeout(() => {
             timeShift('1', "realtime");
             timeShift('2', "realtime");
             timeShift('3', "realtime");
             timeShift('4', "realtime");
         }, 5000);
         switch (chart) {
             case "1":
                 if(!lock1) {
                 X1r = Object.values(result.outgoing.keys);
                 X1w = Object.values(result.incoming.keys);
                 Y1r = Object.values(result.outgoing.values);
                 Y1w = Object.values(result.incoming.values);
                 chart1.updateSeries([{ data: Y1r }, {data: Y1w}]);
                 }
                 break;
             case "2":
                 if(!lock2) {
                 X2 = Object.values(result.keys);
                 Y2 = Object.values(result.values);
                 chart2.updateSeries([{ data: Y2 }]);
                 }
                 break;
             case "3":
                 if(!lock3) {
                 X3 = Object.values(result.keys);
                 Y3 = Object.values(result.values);
                 chart3.updateSeries([{data: Y3}]);
                 }
                 break;
             case "4":
                 if(!lock4) {
                 X4 = Object.values(result.keys);
                 Y4 = Object.values(result.values);
                 chart4.updateSeries([{data: Y4}]);
                 }
                 break;
         }
     }
 }
