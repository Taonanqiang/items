require.config({
    baseUrl: "module",
    paths: {
        Magnifier: "Magnifier",
        trans: "trans",
        jq: "../libs/jquery.1.12.4"
    }
});

require(["jq", "trans", "Magnifier"], function (_, t, m) {
    new t({
        tu: $(".tu-t"),
        nm: $(".nm"),
        cankao: $(".cankao"),
        tips: $(".tips"),
        price: $(".price"),
        url: "http://localhost/project/taocaixia/data/goods.json"
    }, function () {
        new m({
            sBox: $(".sbox"),
            bBox: $(".xq").find(".b_box"),
            bImg: $(".xq").find(".b_box").find("img")
        });
    });
});