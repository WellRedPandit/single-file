/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2021
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("SingleTest", function ($asm, globals) {
    "use strict";

    Bridge.define("background.Background", {
        main: function Main () {
            new background.Background();
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                console.log(System.String.format("{0}: {1}", Common.Cmn.extension_name, Bridge.Reflection.getTypeName(Bridge.getType(this))));
                this.Initialize();
            }
        },
        methods: {
            Initialize: function () {
                var appendScript = null;
                appendScript = function (type, src) {
                    var $t;
                    var element = ($t = document.createElement("script"), $t.type = type, $t.src = chrome.runtime.getURL(src), $t);
                    document.head.appendChild(element);
                };
                System.Array.init([System.Array.init(["module", "/lib/single-file/extension/lib/single-file/fetch/bg/fetch.js"], System.String), System.Array.init(["module", "/lib/single-file/extension/lib/single-file/frame-tree/bg/frame-tree.js"], System.String)], System.Array.type(System.String)).forEach(function (item) {
                        appendScript(item[System.Array.index(0, item)], item[System.Array.index(1, item)]);
                    });

                chrome.runtime.onMessage.addListener(function (message, sender, callback) {
                    var msg = Bridge.unbox(message);
                    if (System.String.isNullOrWhiteSpace(msg != null ? msg.Type : null)) {
                        return;
                    }
                    switch (msg.Type) {
                        case "background.singlefile.inject": 
                            console.log("onMessage: background.singlefile.inject");
                            Common.Cmn.GetTab(function (tab) {
                                singlefile_inject(tab.id);
                            });
                            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                                if (tabs != null && tabs.length > 0) {
                                    singlefile_inject(tabs[0]);
                                }
                            });
                            break;
                    }
                });
            }
        }
    });
});
