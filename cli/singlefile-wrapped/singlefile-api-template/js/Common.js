Bridge.assembly("SingleTest", function ($asm, globals) {
    "use strict";

    Bridge.define("Common.Cmn", {
        statics: {
            fields: {
                extension_name: null
            },
            ctors: {
                init: function () {
                    this.extension_name = "single file API";
                }
            },
            methods: {
                GetTab: function (action) {
                    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                        if (tabs != null && tabs.length > 0) {
                            action(tabs[System.Array.index(0, tabs)]);
                        }
                    });
                }
            }
        }
    });

    Bridge.define("Common.TestMessage", {
        fields: {
            Type: null,
            Data: null
        }
    });
});
