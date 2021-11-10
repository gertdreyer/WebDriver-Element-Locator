chrome.runtime.onInstalled.addListener(() => {
  let locators;
  chrome.contextMenus.onClicked.addListener((x) => {
    const re = /locators-(\d+)-(\d+)/gm;
    console.log(x.menuItemId);
    let matches;
    if ((matches = re.exec(x.menuItemId)) !== null) {
      console.log("sending copy to tab", matches);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "copy",
          data: locators[matches[1]][matches[2]],
        });
      });
    }
  });

  let options = [
    "Locators",
    "XPath",
    "unique",
    "CSharp",
    "Python",
    "Ruby",
    "Java",
  ];
  chrome.runtime.onMessage.addListener(function (message) {
    if (message.type == "locators") {
      data = message.data;
      locators = data;
      chrome.contextMenus.removeAll();
      chrome.contextMenus.create({
        id: "parent",
        title: "Web element inspector",
        contexts: ["all"],
      });

      chrome.contextMenus.create({
        id: "Locators",
        parentId: "parent",
        title: "Locators",
        contexts: ["all"],
      });
      chrome.contextMenus.create({
        id: "XPath",
        parentId: "parent",
        title: "XPath",
        contexts: ["all"],
      });
      chrome.contextMenus.create({
        id: "CSharp",
        parentId: "parent",
        title: "C#",
        contexts: ["all"],
      });
      chrome.contextMenus.create({
        id: "Python",
        parentId: "parent",
        title: "Python",
        contexts: ["all"],
      });
      chrome.contextMenus.create({
        id: "Ruby",
        parentId: "parent",
        title: "Ruby",
        contexts: ["all"],
      });
      chrome.contextMenus.create({
        id: "Java",
        parentId: "parent",
        title: "Java",
        contexts: ["all"],
      });
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          if (i !== 2 && data[i][j] != "DISREGARD") {
            chrome.contextMenus.create({
              id: `locators-${i}-${j}`,
              parentId: options[i],
              title: (data[2][j] ? "\u2714\uFE0F " : "\u274C ") + data[i][j],
              contexts: ["all"],
            });
          }
        }
      }
    }
  });
});
