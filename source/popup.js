// Load Video's Tags
chrome.tabs.executeScript( null, {code:
  'Arr = new Array();var collection = document.getElementsByClassName("yt-chip");'+
  'for (var i = 0 ; i < collection.length; i++) '+
  '{Arr.push(collection[i].title)}; Arr.join();'},
  function(results){document.getElementById("tags").value = results[0].replace(new RegExp(",",'g'),"\n")});
// Listener for UpdateTags element
document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('button');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});

//Writing new tags
function click() {
  var elements = document.getElementById("tags").value.split('\n');
  elements = elements.map(function(item) {
    return '<span class="yt-chip" title="'+item+'" role="listitem" tabindex="-1"><span>'+item+
    '</span><span class="yt-delete-chip" role="button" aria-label="Remove Tag '+item+
    '" tabindex="0"></span></span>'})
    chrome.tabs.executeScript( null, {code: "function removeElementsByClass(className)"+
      "{var elements = document.getElementsByClassName(className);while(elements.length > 0)"+
      "{elements[0].parentNode.removeChild(elements[0])}};removeElementsByClass('yt-chip'); "});
    chrome.tabs.executeScript( null, {code:"document.getElementsByClassName('video-settings-tag-chips-container yt-uix-form-input-textarea')[0].innerHTML = '"+elements.join(' ' )+
      "' + document.getElementsByClassName('video-settings-tag-chips-container yt-uix-form-input-textarea')[0].innerHTML"
  });
 var string = '"'+document.getElementById("tags").value.replace(new RegExp("\n",'g'),'" "')+'"';
  chrome.tabs.executeScript( null, {code:
  "document.getElementsByClassName('video-settings-tags')[0].value = '"+string+"'"
});
  
}
