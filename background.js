// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

// BROWSER ACTION SAMPLE
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!

  /*chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
});*/
    function cb() {
        console.log('Notification has been shown!');
    }

    var options = {
        type: "basic",
        title: "My Notification",
        message: "BOOOOO",
        iconUrl: "https://api.icons8.com/download/720627141e27846a6ac97c1bd3ece888f0ed5bfe/iOS7/PNG/256/Very_Basic/info-256.png",
    }
    //type, title, message, icon
    chrome.notifications.create(options, cb);
    chrome.notifications.onClicked.addListener(function(){
        alert("You Clicked Me?");
    });

});


// JS CODE INJECTION IN UPDATED TAB
chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    console.log("Tab Id", tabId, "Info", info, "Tab", tab.url);
    if( info.status === "complete" ) {
        chrome.tabs.insertCSS(tabId, {file: "style.css", allFrames: false})
        chrome.tabs.executeScript(tabId, {file: "script.js", allFrames: false, runAt: "document_end"})
    }
})

// CONTEXT MENU SAMPLE
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        title: 'Change BG Color of the page',
        id: 'menu1', // you'll use this in the handler function to identify this context menu item
        contexts: ['all'],
    });

    chrome.contextMenus.create({
        title: 'Open New Tab with Content',
        id: 'menu2', // you'll use this in the handler function to identify this context menu item
        contexts: ['all'],
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "menu1") { // here's where you'll need the ID
        // do something
        console.log('Turning ' + tab.url + ' red!');

        chrome.tabs.executeScript({
          code: 'document.body.style.backgroundColor="red"'
        });
    }

    if (info.menuItemId === "menu2") { // here's where you'll need the ID
        // do something
        console.log('Opening new tab');

        chrome.tabs.create({
          url: 'http://yahoo.com'
        });
    }
});
