"use strict";
exports.__esModule = true;
var https_1 = require("https");
var i = 0;
while (i < 2000) {
    i++;
    (function (i) {
        https_1.get('https://wscats.gallery.vsassets.io/_apis/public/gallery/publisher/Wscats/extension/vue/0.0.2/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage?redirect=true&install=true', {
            headers: {
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "zh-CN",
                "cookie": "EnableExternalSearchForVSCode=true",
                "user-agent": "VSCode 1.39.2",
                "x-market-client-id": "VSCode 1.39.2",
                "x-market-user-id": "f2500034-c981-4f54-bcdb-45bbf63994b3"
            }
        }, function (res) {
            console.log(i);
        }).on('error', function (e) {
            console.error("\u51FA\u73B0\u9519\u8BEF: " + e.message);
        });
    })(i);
}