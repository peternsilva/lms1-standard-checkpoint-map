// ==UserScript==
// @name         gSchool LEARN Check-Standards
// @namespace    petesilva
// @version      0.1
// @description  Make it so you can click through standards to checkpoints
// @author       Pete Silva
// @require      http://code.jquery.com/jquery-latest.js
// @match        https://learn.galvanize.com/cohorts/372/*
// @grant        GM_addStyle
// ==/UserScript==


// Functions


// Main Exec
$(document).ready( function() {
  console.log('Standard 2 Checkpoint script started.');
  var domain = 'learn-check-standards.herokuapp.com';
  var cohortId = 372;   // Only seems to work for g81


  $('.performances-container table tr td.standard-core a').each( function() {

    if ($(this).attr('href')) {
      var standardId = $(this).attr('href').substring(1);

      // Wait a little before hammering server
      setTimeout(() => {
        //
        var ajaxUrl = `https://${domain}/checkpoints/cohort/${cohortId}/standard/${standardId}`;
        // console.log('ajaxUrl', ajaxUrl);
        fetch(ajaxUrl)
        .then((res) => {
          // console.log('Fetched:', res);
          // if problem, bail
          if (res.status !== 200) {
            throw new Error(`Couldn't find checkpoint for standard:${standardId}`);

          } else {
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
          }
        })
        .catch((err) => {
          //do nada
        });
        //
      }, 500);




    }
  });
});
