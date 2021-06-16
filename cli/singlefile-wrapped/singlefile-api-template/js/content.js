Bridge.assembly("SingleTest", function ($asm, globals) {
    "use strict";

    Bridge.define("content.Content", {
        main: function Main () {
            new content.Content();
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                console.log(System.String.format("{0}: {1}", Common.Cmn.extension_name, Bridge.Reflection.getTypeName(Bridge.getType(this))));
                setTimeout(Bridge.fn.bind(this, function () {
                    this.Test();
                }), 3000);
            }
        },
        methods: {
            Test: function () {
                var $t;
                console.log("sendMessage: background.singlefile.inject");
                chrome.runtime.sendMessage(($t = new Common.TestMessage(), $t.Type = "background.singlefile.inject", $t));
            }
        }
    });
});
