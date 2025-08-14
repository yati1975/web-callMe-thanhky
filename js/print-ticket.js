function printTicket(storename,callername,nowGetNumItem,initData,spacing,paper) {

  let title = storename;

  if (callername !== null) {
    title = storename + ' [' + callername + ']';
  }
  let url = "https://liff.line.me/2003918297-NKaR4P9w/?shop_name=";
  let nurl = url + encodeURI(storename);
  // 進行 URL 編碼（中文等特殊字元會被轉為百分比編碼）
  if (callername !== null) {
    nurl = url + encodeURI(storename) + "&caller_name=" + encodeURI(callername);
  }

  const qrurl = (typeof CONFIG !== "undefined" && CONFIG.QRCODEURL) ? CONFIG.QRCODEURL : nurl;


  // 目前取號項目名稱
  let nowGetNumItemTitle = "";
  if ((nowGetNumItem !== null) && ((initData.get_num_item_names !== null) && (initData.get_num_item_names !== ""))) {
    nowGetNumItemTitle = initData.get_num_item_names[nowGetNumItem];
  }

  // 定義58mm或80mm紙張，各種文字的尺寸
  const sizes58 = {
    space: 0,
    title: 37,
    subtitle: 30,
    category: 40,
    number: 100,
    tip: 30,
    time: 25,
    qrsize: 300
  };
  const sizes80 = {
    space: 0,
    title: 50,
    subtitle: 40,
    category: 55,
    number: 140,
    tip: 40,
    time: 35,
    qrsize: 300
  };

  // 根據 paper 選對字型組
  const sizes = parseInt(paper, 10) === 80 ? sizes80 : sizes58;

  // 組 content
  const content = [{
    text: title,
    align: "center",
    size: sizes.title
  }, {
    text: " ",
    align: "center",
    size: sizes.space
  }, {
    text: "您的號碼",
    align: "center",
    size: sizes.subtitle
  }, {
    text: " ",
    align: "center",
    size: sizes.space
  }, {
    text: String(nowGetNumItemTitle),
    align: "center",
    size: sizes.category
  }, {
    text: " ",
    align: "center",
    size: sizes.space
  }, {
    text: String(nowUserGetNumValue),
    align: "center",
    size: sizes.number
  }, {
    text: " ",
    align: "center",
    size: sizes.space
  }, {
    text: "請掃描下方QRCODE,可預先點餐",
    align: "center",
    size: sizes.tip
  }, {
    text: " ",
    align: "center",
    size: sizes.space
  }];

  fetch("https://127.0.0.1/print", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content,
        qrcode: qrurl,
        qrsize: sizes.qrsize,
        group: nowGetNumItemTitle,
        spacing: spacing,
        timesize: sizes.time,
        paper: paper
      })
    })
    .then(res => {
      if (res.ok) {
        //alert("✅ 列印請求已送出！");
      } else {
        //alert("❌ 列印失敗，狀態碼：" + res.status);
      }
    })
    .catch(err => {
      //alert("⚠️ 請求錯誤：" + err.message);
    });
}