$(document).ready( function () {
  var cohortId = 372;   // Only seems to work for g81

  fetch(`/checkpoints/cohort/${cohortId}`)
  .then((res) => {
    // if problem, bail
    if (res.status !== 200) {
      console.log('Problem. Status Code ' + res.status);
      $('#errormsg').text("Poop. Something backend-like maybe broke.")
      return

    } else {
      // parse response to JSON then deal with response data
      res.json().then((data) => {

        // Loop through results, building up table data
        for (var i = 0; i < data.length; i++) {
          var rowObj = data[i];
          var rowHtml = `
          <tr>
            <td>${rowObj.unitPosition+1}</td>
            <td><a href="https://learn.galvanize.com/cohorts/${cohortId}/units/${rowObj.unitId}/content_files/${rowObj.contentFileId}" target="_blank">${rowObj.unitTitle}</a></td>
            <td>${rowObj.standardDescription}</td>
          </tr>`;
          $('#maptable tbody').append(rowHtml);
        }

        // Init fancy pants dataTable jquery lib
        $('#maptable').dataTable({
          paging: false,
          columnDefs: [
            { className: 'dt-left', targets: '_all' }
          ]
        });
      })
    }
  })
  .catch((err) => {
    console.log('Fetch Error:', err);
    $('#errormsg').text("Poop. Something backend-like maybe broke.")
  })

});
