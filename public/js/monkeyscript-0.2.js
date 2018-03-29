// ==UserScript==
// @name         gSchool LEARN Check-Standards
// @namespace    petesilva
// @version      0.2.0
// @description  Make it so you can click through standards to checkpoints
// @author       Pete Silva
// @require      http://code.jquery.com/jquery-latest.js
// @match        https://learn.galvanize.com/cohorts/372/*
// @grant        GM_addStyle
// ==/UserScript==


// Main Exec
$(document).ready( function() {
  console.log('Standard 2 Checkpoint script started.');
  var domain = 'learn-check-standards.herokuapp.com';
  var cohortId = 372;   // Only seems to work for g81

  // First make general query to API to get all standards + checkpoints as JSON
  var ajaxUrl = 'https://'+domain+'/checkpoints/cohort/'+cohortId;
  fetch(ajaxUrl).then((res) => {
      console.log('Fetched:', res);

      if (res.status !== 200) { // If problem, bail
        throw new Error('Failed to retrieve cohort data');

      } else {
        ////
        // parse response to JSON then deal with response data
        var json = res.json();
        if(json) {
          json.then((data) => {
            // Defense
            if(
                typeof data !== 'object' ||
                !data.hasOwnProperty('link')
            ) {
              throw new Error(`Couldn't find checkpoint for standard:${standardId}`);
            }

            // console.log('this',this);
            $(this).before(`<a href="${data.link}" style="margin-right:5px;font-size: 150%;" target="_blank">&#9099;</a>`);
          });
        }
        ////
      }

  })
  .catch((err) => {
    //nothingness
  });

  // Then loop through all standards on the page (html elements),
  // attaching a button with correct URL to each on



  $('.performances-container table tr td.standard-core a').each( function() {

    if ($(this).attr('href')) {
      var standardId = $(this).attr('href').substring(1);





    }
  });

}); // END docready
