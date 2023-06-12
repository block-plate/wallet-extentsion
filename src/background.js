chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.txId) {
      console.log("메시지를 받았습니다.");
      console.log("txId:", request.txId);

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
              console.log(tabs);
              var tabId = tabs[0].id;
              chrome.tabs.sendMessage(tabId, { data: request.txId, target: 'tx' }, function(response) {
              console.log("connect.js로부터 응답을 받았습니다.");
              console.log(response);
              });
        });
        sendResponse({ status: "success", message: "메시지를 처리했습니다." });
    }
    else if(request.account) {
      console.log("메시지를 받았습니다.");
      console.log("txId:", request.account);
      
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
              console.log(tabs);
              var tabId = tabs[0].id;
              chrome.tabs.sendMessage(tabId, { data: request.account, target: 'account' }, function(response) {
                console.log("connect.js로부터 응답을 받았습니다.");
                console.log(response);
              });
      });
      sendResponse({ status: "success", message: "메시지를 처리했습니다." });
    }
  });