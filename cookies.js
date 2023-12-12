function showCookiesForTab(tabs) {
    //get the first tab object in the array
    let tab = tabs.pop();
    
    //get all cookies in the domain
    let gettingAllCookies = browser.cookies.getAll({url: tab.url});
    gettingAllCookies.then((cookies) => {
  
      //set the header of the panel
      let activeTabUrl = document.getElementById('current-header-title');
      let text = document.createTextNode("Cookies at: "+tab.title);
      let cookieList = document.getElementById('current-cookie-list');
      activeTabUrl.appendChild(text);
      if (cookies.length > 0) {
        //add an <li> item with the name and value of the cookie to the list
        for (let cookie of cookies) {
          let li = document.createElement("li");
          let content = document.createTextNode(cookie.name + ": "+ cookie.value);
          li.appendChild(content);
          cookieList.appendChild(li);
        }
      } else {
        let p = document.createElement("p");
        let content = document.createTextNode("No cookies in this tab.");
        let parent = cookieList.parentNode;
  
        p.appendChild(content);
        parent.appendChild(p);
      }
    });
  }

  function showCookiesForMultipleTabs(tabs) {
    for (let tab of tabs) {
        //get all cookies in the domain
        let gettingAllCookies = browser.cookies.getAll({url: tab.url});
        gettingAllCookies.then((cookies) => {

        let tabList = document.getElementById('tab-list')
        let tabLi = document.createElement("li")
        let tabContent = document.createTextNode(tab.title)
        tabLi.appendChild(tabContent)
        tabList.appendChild(tabLi)
        let cookieList = document.createElement("ul")
        if (cookies.length > 0) {
            //add an <li> item with the name and value of the cookie to the list
            for (let cookie of cookies) {
                let li = document.createElement("li");
                let content = document.createTextNode(cookie.name + ": "+ cookie.value);
                li.appendChild(content);
                cookieList.appendChild(li);
            }
            tabList.appendChild(cookieList)
        } else {
            let p = document.createElement("p");
            let content = document.createTextNode("No cookies in this tab.");
            let parent = cookieList.parentNode;

            p.appendChild(content);
            parent.appendChild(p);
        }
        });
     }
  }
  
  //get active tab to run an callback function.
  //it sends to our callback an array of tab objects
  function getActiveTab() {
    return browser.tabs.query({currentWindow: true, active: true});
  }

function getTabsForWindow() {
    return browser.tabs.query({currentWindow: true, active: false})
}

function getOtherTabs() {
    return browser.tabs.query({currentWindow: false})
}

getActiveTab().then(showCookiesForTab);

let activeWindowUrl = document.getElementById('window-header-title');
let text = document.createTextNode("Cookies at current window");
activeWindowUrl.appendChild(text);

getTabsForWindow().then(showCookiesForMultipleTabs)

let allUrl = document.getElementById('all-header-title');
let allText = document.createTextNode("All cookies");
allUrl.appendChild(allText);

getOtherTabs().then(showCookiesForMultipleTabs)