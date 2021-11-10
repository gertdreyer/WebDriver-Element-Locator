//content script
var node = null;

document.addEventListener("mousedown", function (event) {
  const node = event.target;
  console.log("-- IN SELF ON CONTEXT --");

  tagName = node.nodeName.toLowerCase();
  var locatorsArr = [];
  var xpathContainsArr = [];
  var cSharpRefsArr = [];
  var uniquesArr = [];
  var pythonRefsArr = [];
  var rubyRefsArr = [];
  var javaRefsArr = [];

  var name,
    value,
    locator,
    xpathContains,
    xpathEquals,
    cSharpRef,
    pythonRef,
    rubyRef,
    javaRef;

  if (tagName != "body") {
    //console.log(' -- TAG NAME != BODY --');

    //// For each node attribute
    for (var i = 0; i < node.attributes.length; i++) {
      //// Get its attribute name and value
      name = node.attributes[i].name;
      value = node.attributes[i].value;

      //console.log(' -- LOOPING ON NODE ATTRIBUTES --' + name + ":" + value);

      if (value.indexOf("'") < 0 && value.length > 0) {
        if (tagName == "select") {
          locator =
            'locator.LocateDropdown("' +
            tagName +
            '" , "' +
            name +
            '" , "' +
            value +
            '");';
        } else {
          locator =
            'locator.Locate("' +
            tagName +
            '" , "' +
            name +
            '" , "' +
            value +
            '");';
        }

        //// Set standard contains XPath
        xpathContains =
          "//" + tagName + "[contains(@" + name + ",'" + value + "')]";

        //cSharpRef = "driver.FindElement(By.XPath(\"//" + tagName + "[contains(@" + name + ",\'" + value + "\')]\"));";
        cSharpRef = 'driver.FindElement(By.XPath("' + xpathContains + '"));';
        pythonRef = 'driver.find_element_by_xpath("' + xpathContains + '")';
        rubyRef = 'driver.find_element(:xpath, "' + xpathContains + '")';
        javaRef = 'driver.findElement(By.xpath("' + xpathContains + '"));';

        locatorsArr.push(locator);
        xpathContainsArr.push(xpathContains);
        cSharpRefsArr.push(cSharpRef);
        pythonRefsArr.push(pythonRef);
        rubyRefsArr.push(rubyRef);
        javaRefsArr.push(javaRef);

        //// Add bool to uniquesArr to show whether or not the xpath returns one and only one node
        var xpr = node.ownerDocument.evaluate(
          "count(" + xpathContains + ")",
          node.ownerDocument.body,
          null,
          XPathResult.NUMBER_TYPE,
          null
        );
        var bUnique = xpr.numberValue === 1;
        uniquesArr.push(bUnique);

        //////////////////////// NEW CODE

        //// Set standard Equals XPath
        xpathEquals = "//" + tagName + "[@" + name + "='" + value + "']";

        cSharpRef = 'driver.FindElement(By.XPath("' + xpathEquals + '"));';
        pythonRef = 'driver.find_element_by_xpath("' + xpathEquals + '")';
        rubyRef = 'driver.find_element(:xpath, "' + xpathEquals + '")';
        javaRef = 'driver.findElement(By.xpath("' + xpathEquals + '"));';

        //// BUG_BOJ: Added a 'disregard' string so the support locators don't go out of sync

        locatorsArr.push("DISREGARD");
        xpathContainsArr.push(xpathEquals);
        cSharpRefsArr.push(cSharpRef);
        pythonRefsArr.push(pythonRef);
        rubyRefsArr.push(rubyRef);
        javaRefsArr.push(javaRef);

        //// Add bool to uniquesArr to show whether or not the xpath returns one and only one node
        xpr = node.ownerDocument.evaluate(
          "count(" + xpathEquals + ")",
          node.ownerDocument.body,
          null,
          XPathResult.NUMBER_TYPE,
          null
        );
        bUnique = xpr.numberValue === 1;
        uniquesArr.push(bUnique);

        //////////////////////// NEW CODE

        //// Handle long element names with '_' char
        if (value.indexOf("_") !== -1) {
          // The value has a '_' in it
          //// Substring value from last _ to end
          var arr = value.split("_");
          var newval = arr[arr.length - 1];
          value = newval;

          locator =
            'locator.Locate("' +
            tagName +
            '" , "' +
            name +
            '" , "' +
            value +
            '");';

          xpathContains =
            "//" + tagName + "[contains(@" + name + ",'" + value + "')]";

          //cSharpRef = "driver.FindElement(By.XPath(\"//" + tagName + "[contains(@" + name + ",\'" + value + "\')]\"));";
          cSharpRef = 'driver.FindElement(By.XPath("' + xpathContains + '"));';
          pythonRef = 'driver.find_element_by_xpath("' + xpathContains + '")';
          rubyRef = 'driver.find_element(:xpath, "' + xpathContains + '")';
          javaRef = 'driver.findElement(By.xpath("' + xpathContains + '"));';

          locatorsArr.push(locator);
          xpathContainsArr.push(xpathContains);
          cSharpRefsArr.push(cSharpRef);
          pythonRefsArr.push(pythonRef);
          rubyRefsArr.push(rubyRef);
          javaRefsArr.push(javaRef);

          xpr = node.ownerDocument.evaluate(
            "count(" + xpathContains + ")",
            node.ownerDocument.body,
            null,
            XPathResult.NUMBER_TYPE,
            null
          );
          bUnique = xpr.numberValue === 1;
          uniquesArr.push(bUnique);
        }

        //// Handle long element names with '$' char
        if (value.indexOf("$") !== -1) {
          // The value has a '_' in it
          //// Substring value from last _ to end
          var arr = value.split("$");
          var newval = arr[arr.length - 1];
          value = newval;

          locator =
            'locator.Locate("' +
            tagName +
            '" , "' +
            name +
            '" , "' +
            value +
            '");';

          xpathContains =
            "//" + tagName + "[contains(@" + name + ",'" + value + "')]";

          //cSharpRef = "driver.FindElement(By.XPath(\"//" + tagName + "[contains(@" + name + ",\'" + value + "\')]\"));";
          cSharpRef = 'driver.FindElement(By.XPath("' + xpathContains + '"));';
          pythonRef = 'driver.find_element_by_xpath("' + xpathContains + '")';
          rubyRef = 'driver.find_element(:xpath, "' + xpathContains + '")';
          javaRef = 'driver.findElement(By.xpath("' + xpathContains + '"));';

          locatorsArr.push(locator);
          xpathContainsArr.push(xpathContains);
          cSharpRefsArr.push(cSharpRef);
          pythonRefsArr.push(pythonRef);
          rubyRefsArr.push(rubyRef);
          javaRefsArr.push(javaRef);

          xpr = node.ownerDocument.evaluate(
            "count(" + xpathContains + ")",
            node.ownerDocument.body,
            null,
            XPathResult.NUMBER_TYPE,
            null
          );
          bUnique = xpr.numberValue === 1;
          uniquesArr.push(bUnique);
        }
      }
    }

    var nodeText = node.textContent;
    if (nodeText.indexOf("'") < 0 && nodeText.length > 0) {
      if (tagName != "select") {
        locator = 'locator.Locate("' + tagName + '" , "' + nodeText + '");';
        xpath = "//" + tagName + "[contains(.,'" + nodeText + "')]";

        ////cSharpRef = 'driver.FindElements(By.XPath(\"//"'+tagName+ '[contains(.,\''+ nodeText +'\')]\"));';
        //cSharpRef = 'driver.FindElement(By.XPath(\"//'+tagName+ '[contains(.,\''+ nodeText +'\')]\"));';

        cSharpRef = 'driver.FindElement(By.XPath("' + xpath + '"));';
        pythonRef = pythonRef = 'driver.find_element_by_xpath("' + xpath + '")';
        rubyRef = 'driver.find_element(:xpath, "' + xpath + '")';
        javaRef = 'driver.findElement(By.xpath("' + xpath + '"));';

        locatorsArr.push(locator);
        xpathContainsArr.push(xpath);
        cSharpRefsArr.push(cSharpRef);
        pythonRefsArr.push(pythonRef);
        rubyRefsArr.push(rubyRef);
        javaRefsArr.push(javaRef);

        var xpr = node.ownerDocument.evaluate(
          "count(" + xpath + ")",
          node.ownerDocument.body,
          null,
          XPathResult.NUMBER_TYPE,
          null
        );
        var bUnique = xpr.numberValue === 1;
        uniquesArr.push(bUnique);
      }

      // If not unique, add a LocateAll
      //if (!bUnique)
      //{
      //locator = 'LocateAll(\"' + tagName + '\" , \"' + nodeText + '\");' ;
      //locatorsArr.push(locator);
      //}/
    }

    //for (var i = 0; i < xpathContainsArr.length; i++)
    //{
    //console.log('Recorded locator:' + xpathContainsArr[i]);
    //}

    console.log("Constructing result arrays");

    var resultArrays = [];
    resultArrays.push(locatorsArr);
    resultArrays.push(xpathContainsArr);
    resultArrays.push(uniquesArr);
    resultArrays.push(cSharpRefsArr);
    resultArrays.push(pythonRefsArr);
    resultArrays.push(rubyRefsArr);
    resultArrays.push(javaRefsArr);

    console.log("Result array length: " + resultArrays.length);
    chrome.runtime.sendMessage({ type: "locators", data: resultArrays });
  }
});
chrome.runtime.onMessage.addListener(function (message) {
  console.log(message);
  if (message.type == "copy") {
    console.log("copying to clipboard");
    navigator.clipboard.writeText(message.data);
  }
});
