'use strict';

async function searchApi(phrase, requestUrl, targetDiv, hidePG = false, hideID = null) {
   if (hidePG) {
      if (phrase != "" && phrase != null)
         document.getElementById(hideID)?.classList.add('d-none');
      else
         document.getElementById(hideID)?.classList.remove('d-none');
   }

   let searchQuery = new FormData();
   searchQuery.append("phrase", phrase);
   const result = await fetch(requestUrl, {
      method: "POST",
      body: searchQuery
   }).then(r => r.text()).then(rt => rt).catch(ex => window.location.reload());
   document.getElementById(targetDiv).innerHTML = result;
   document.getElementById("fetcher").classList.add("d-none");
}


