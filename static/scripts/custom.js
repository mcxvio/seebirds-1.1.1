function removeTypeaheadBgColorStyle(elementId) {
	if((document.getElementById) && (document.getElementById(elementId) != null)) {
		var element = document.getElementById(elementId);
		// Check the element's style object and background property are available.
	 	if ((element.style)&& (element.style.backgroundColor != null)) {
            element.style.backgroundColor = null;
  		}else {
			// Property is not assigned or is not supported.
			return;
  		}
	} else {
	  return;
	}
}

// Process data as HTML unordered list.
function getChecklistSubmissions(region, message) {
    if (region.length == 0) {
        return formatResponseMessage(message);
    }

	var url = '/checklists/' + region;
	var data = $.getValues(url, "json");
    /*var output = "";
    if (data.length > 0) {
		if (data.indexOf("errorMsg") > 0) {
			var errorMsg = extractErrorMessage(data);
			output = formatResponseMessage(errorMsg);
		} else {
	        output = getChecklistsHtml(data, region);
		}
    }
    return output;*/
    return data;
}

function getNotableSightings(region, message) {
    if (region.length == 0) {
        return formatResponseMessage(message);
    }

	var url = '/notables/' + region;
	var data = $.getValues(url, "json");
    /*var output = "";
    if (data.length > 0) {
		if (data.indexOf("errorMsg") > 0) {
			var errorMsg = extractErrorMessage(data);
			output = formatResponseMessage(errorMsg);
		} else {
        	output = getNotablesHtml(data, region);
		}
    }
    */
    return data;
}

function getLocationSubmissions(locationId) {
	if (locationId == "") {
		return "";
	}

	var url = '/location/' + locationId;
	var data = $.getValues(url, "json");
    /*var output = "";
    if (data.length > 0) {
		if (data.indexOf("errorMsg") > 0) {
			var errorMsg = extractErrorMessage(data);
			output = formatResponseMessage(errorMsg);
		} else {
	        output = getLocationHtml(data, locationId);
		}
    }
    return output;
    */
	return data;
}

function getSpeciesSightings(region, fullSpeciesName) {
	if (fullSpeciesName == null) {
		return "";
	}

	var url = '/species/' + region + '/' + fullSpeciesName;
	var data = $.getValues(url, "json");
    /*var output = "";
    if (data.length > 0) {
		if (data.indexOf("errorMsg") > 0) {
			var errorMsg = extractErrorMessage(data);
			output = formatResponseMessage(errorMsg);
		} else {
	        output = getSpeciesHtml(data, region);
		}
    }
    return output;
    */
	return data;
}

function extractErrorMessage(data) {
	return data.slice(data.indexOf('errorMsg":"')+11, data.indexOf('"}]'));
}
/*
function extractDatetimesFromResultsData(data) {
	// Extract distinct datetimes from ebird json results.
	var lookup = {};
	var items = data;
	var result = [];

	for (var item, i = 0; item = items[i++];) {
	  var name = item.obsDt;

	  if (!(name in lookup)) {
	    lookup[name] = 1;
	    result.push(name);
	  }
	}

	return result;
}
*/
// End Data.

// Create output lists.
function getUnorderedList() {
	var ul = document.createElement('ul');
	ul.setAttribute("data-role", "listview");
	ul.setAttribute("class", "ui-listview");
	return ul;
}

function getListItem(innerHtml) {
	var li = document.createElement('li');
	li.setAttribute("class", "ui-li-static ui-body-inherit");
	li.innerHTML = innerHtml;
	return li;
}

function getListItemDivider(innerHtml) {
	var lid = document.createElement('li');
	lid.setAttribute("data-role", "list-divider");
	lid.setAttribute("role", "heading");
	lid.setAttribute("class", "ui-li-divider ui-body-inherit");
	lid.innerHTML = innerHtml;
	return lid;
}

function formatResponseMessage(message) {
	var ul = getUnorderedList();
	ul.appendChild(getListItemDivider(message));
	return ul;
}
// End lists.

// Format data into html lists.
/*
function getChecklistsHtml(data, selection) {
	var ul = getUnorderedList();
	var extractedDatetimes = extractDatetimesFromResultsData(data);
	var prevDate = "";
	// Set date for dividing list item and use the date collection to extract summary of checklist data for display.
	for (var j = 0; j < extractedDatetimes.length; ++j) {
		var checklist = data.filter(function(i, n) { return i.obsDt == extractedDatetimes[j]; });

		var date = $.formatDateTime('dd-MM', new Date(extractedDatetimes[j].replace(/-/g , "/")));
		var time = $.formatDateTime('hh:ii', new Date(extractedDatetimes[j].replace(/-/g , "/")));

		var count = checklist.length;
		var location = '<a href="#location" class="gotoLocation" title="' + checklist[0].locID + '" target="_self">' + checklist[0].locName + '</a>';

		if (prevDate != date) {
			// Write out date heading.
			ul.appendChild(getListItemDivider(date));
			prevDate = date;
		}

		var innerHtml = count + " species @ " + location + " @ " + time;
		ul.appendChild(getListItem(innerHtml));
	}
	ul.appendChild(getListItem("&nbsp;"));
	// Set message.
	var message = extractedDatetimes.length + " checklists with most recent species for " + selection + " in last 5 days.";
	ul.insertBefore(getListItemDivider(message), ul.childNodes[0]);
	return ul;
}
*/
/*
function getNotablesHtml(data, selection) {
	var ul = getUnorderedList();
	var extractedDatetimes = extractDatetimesFromResultsData(data);
	// Set date for dividing list item and use the date collection to extract summary of checklist data for display.
	var prevDate = "";
	var speciesCount = 0;
	for (var j = 0; j < extractedDatetimes.length; ++j) {
		var checklist = data.filter(function(i, n) { return i.obsDt == extractedDatetimes[j]; });

		var date = $.formatDateTime('dd-MM', new Date(extractedDatetimes[j].replace(/-/g , "/")));
		var time = $.formatDateTime('hh:ii', new Date(extractedDatetimes[j].replace(/-/g , "/")));

		if (prevDate != date) {
			// Write out date heading.
			ul.appendChild(getListItemDivider(date));
			prevDate = date;
		}

		for (var k = 0; k < checklist.length; k++) {
			var count = checklist[k].howMany || 'X'; //ternary operator.
			var species = '<a href="#species" class="gotoSpecies" title="'+ checklist[k].comName + ' (' + checklist[k].sciName + ')' + '" target="_self">' + checklist[k].comName + '</a>';
            var location = '<a href="#location" class="gotoLocation" title="' + checklist[k].locID + '" target="_self">' + checklist[k].locName + '</a>';
			var timeOut = '<a href="https://ebird.org/ebird/view/checklist?subID=' + checklist[k].subID + '" target="_blank">' + time + '</a>';
			var userName = checklist[k].userDisplayName;

			var innerHtml = count + " " + species + " @ " + location + " @ " + timeOut + "<br> -- " + userName;
			ul.appendChild(getListItem(innerHtml));
			speciesCount++;
		}
	}
	ul.appendChild(getListItem("&nbsp;"));
	// Set message.
	var message = speciesCount + " notable sightings for " + selection + " in last 5 days.";
	ul.insertBefore(getListItemDivider(message), ul.childNodes[0]);
	return ul;
}
*/
/*
function getLocationHtml(data, locId) {
	var ul = getUnorderedList();
	var extractedDatetimes = extractDatetimesFromResultsData(data);
	// Set date for dividing list item and use the date collection to extract summary of checklist data for display.
	var prevDate = "";
	var speciesCount = 0;
	for (var j = 0; j < extractedDatetimes.length; ++j) {
		var checklist = data.filter(function(i, n) { return i.obsDt == extractedDatetimes[j]; });

		var date = $.formatDateTime('dd-MM', new Date(extractedDatetimes[j].replace(/-/g , "/")));
		var time = $.formatDateTime('hh:ii', new Date(extractedDatetimes[j].replace(/-/g , "/")));

		if (prevDate != date) {
			// Write out date heading.
			ul.appendChild(getListItemDivider(date));
			prevDate = date;
		}

		for (var k = 0; k < checklist.length; k++) {
			var count = checklist[k].howMany || 'X'; //ternary operator.
			var species = '<a href="#species" class="gotoSpecies" title="'+ checklist[k].comName + ' (' + checklist[k].sciName + ')' + '" target="_self">' + checklist[k].comName + '</a>';
			var timeOut = '<a href="https://ebird.org/ebird/view/checklist?subID=' + checklist[k].subID + '" target="_blank">' + time + '</a>';
            var userName = checklist[k].userDisplayName;

			var innerHtml = count + " " + species + " @ " + timeOut + "<br>-- " + userName;
			ul.appendChild(getListItem(innerHtml));
			speciesCount++;
		}
	}
	ul.appendChild(getListItem("&nbsp;"));
	// Set message.
	var message = speciesCount + ' species at <a href="http://ebird.org/ebird/hotspot/' + locId  + '" target="_blank" class="external">' + checklist[0].locName + '</a> in last 10 days.';
	ul.insertBefore(getListItemDivider(message), ul.childNodes[0]);
	return ul;
}
*/
/*
function getSpeciesHtml(data, region) {
	var ul = getUnorderedList();
	var extractedDatetimes = extractDatetimesFromResultsData(data);
	// Set date for dividing list item and use the date collection to extract summary of checklist data for display.
	var prevDate = "";
	for (var j = 0; j < extractedDatetimes.length; ++j) {
		var checklist = data.filter(function(i, n) { return i.obsDt == extractedDatetimes[j]; });

		var date = $.formatDateTime('dd-MM', new Date(extractedDatetimes[j].replace(/-/g , "/")));
		var time = $.formatDateTime('hh:ii', new Date(extractedDatetimes[j].replace(/-/g , "/")));

		var count = checklist[0].howMany || 'X'; //ternary operator.
		var location = '<a href="#location" class="gotoLocation" title="' + checklist[0].locID + '" target="_self">' + checklist[0].locName + '</a>';

		if (prevDate != date) {
			// Write out date heading.
			ul.appendChild(getListItemDivider(date));
			prevDate = date;
		}

		var innerHtml = count + " @ " + location + " @ " + time;
		ul.appendChild(getListItem(innerHtml));
	}
	ul.appendChild(getListItem("&nbsp;"));
	// Set message.
	var message = extractedDatetimes.length + ' sightings of <a href="https://duckduckgo.com/?q=' + checklist[0].comName + '&iax=1&ia=images" target="_blank" class="external">' + checklist[0].comName + '</a> in ' + region + ' in last 10 days.';
	ul.insertBefore(getListItemDivider(message), ul.childNodes[0]);
	return ul;
}
*/
// End formatting.
