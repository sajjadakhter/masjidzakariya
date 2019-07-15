	var date = new Date();
	getElementsForScript('year').value = date.getFullYear();
	getElementsForScript('month').value = date.getMonth() + 1;

	var _scaleFonts = true;
	var monthNames = new Array('', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    var hijriShortMonthNames = new Array('', 'Muh.', 'Saf.', 'Rab. I', 'Rab. II', 'Jum. I', 'Jum. II', 'Raj.', 'Sha.', 'Ram.', 'Shaw.', 'Dhu\'l-Q.', 'Dhu\'l-H.');
    var shortMonthNames = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
	var download = getParameterByName("download");

	update();

	function update() {

		//The following values can be gathered from the UI in the future
		var lat = "";
		var lng = "";
		var timeZone = "";
		var method = "";

        var masjidId = getParameterByName("masjid_id");
		console.log('masjidId : ' + masjidId);
		var download = getParameterByName("download");
		var monthParam = getParameterByName("mm");
		var yearParam = getParameterByName("yy");
		if(yearParam) {
			console.log('yearParam : ' + yearParam);
			setElementsForScript('year', yearParam);
		}
		if(monthParam) {
			console.log('monthParam : ' + monthParam);
			setElementsForScript('month', monthParam);
		}
        if (masjidId.length = 0) {
            alert ("Masjid Id not present.");
            return;
        }

		var year = getElementsForScript('year').value;
		var month = +getElementsForScript('month').value;
		var hijriadjust = +getElementsForScript('hijriadjust').value;
		var style = "default";

		var startDate;
		var endDate;


		startDate = new Date(year, 0, 1);
		endDate = AM_IQC_addMonths(startDate, 12);

		if (month != 0)
		{
			startDate = AM_IQC_addMonths(startDate, month-1);
			endDate = AM_IQC_addMonths(startDate, 1);
		}
		endDate = AM_IQC_addDays(endDate, -1);

		var generateData = AM_IQC_getPrayerAndIqamaTimes(startDate, endDate, lat, lng, timeZone, method);

        var url = baseURL + "salahtime/api/masjidi/v1/index.php/masjids/"+ masjidId + "/iqamahandprayertimes/" + year + "/" + month + "?XDEBUG_SESSION_START=PHPSTORM";
        console.log(url);
        $.ajax({url: url, success: function(result){
            dataFromServer = result;
            console.log(dataFromServer);
            var html = makeTable(startDate, endDate, hijriadjust, monthNames[month] + " " + year, style,dataFromServer.masjidInfo,dataFromServer.prayerTimes,dataFromServer.iqamaTimes);


            getElementsForScript('timetable').innerHTML = '<pre>'+ html+ '</pre>';

            document.getElementById('more').onclick = function () {
                if (this.checked)
                    document.getElementById('PageHeader').style.display = 'none';
                else
                    document.getElementById('PageHeader').style.display = 'blocked';
            }


        }});


	}



	function makeTable(startDate, endDate, hijriadjust,  title, style,masjidInfo,serverPrayerTime,serverIqamaTimes) {


		var iqamaFlag = false;
		var table = "<table id='iqama-container' class='iqama-container' bgcolor='#ffffff'>";
		var iqamaTimesHTML="<tr class='iqama_time_header'><td width='125px' style='text-align: left;'>&nbsp;Iqamah Times</td><td width='45px'>Fajr</td><td width='45px'>Dhuhr</td><td width='45px'>Asr</td><td width='45px'>Maghrib</td><td width='45px'>Isha</td></tr>";
		var iqamaTimesNonRamadhan;
		var iqamaTimesRamadhan;
		var iqamaTimesTemp;
		var prayerTimesHTML="";
		var iqamaStyleString = "";
		var iqamaHijriStyleString = "";
		var currentDateLabel = "";
		var startingLabel = "";
		var iqamaCounter = 0;
		var prayerNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        var prayerNamesServer = ['fajr_start_time', 'shuruq', 'zuhr_start_time', 'asr_start_time', 'magrib_start_time', 'isha_start_time'];
		var iCurrentDate;
		var iHijriDate;
		var imageFileName = startDate.getMonth()+1 + ".jpg";


		iCurrentDate = startDate;

		iqamaStyleString = "<tr class='iqama_time'><td style='text-align: left;'>&nbsp;";
		iqamaHijriStyleString = "<tr class='iqama_time_hijri'><td style='text-align: left;'>&nbsp;";

        var iHijriMonth = serverPrayerTime[0]['hijri_month'];


        table += "<tr class='header_page1'>" +
            "<td colspan=1 rowspan=3>" +
            "<img style='max-width: 50px;height: auto;' src='" + masjidInfo.masjid_logo + "'></td><td colspan=7>" + masjidInfo.title.toUpperCase() +
            "</td><td colspan=1 rowspan=3></td></tr>";
        table += "<tr class='header_page2'><td colspan=7>Prayer Schedule for <b>" + title + "</b></td></tr>";
        table += "<tr class='header_page3'><td colspan=7>" + getMasjidAddress(masjidInfo) + "</td></tr>";
        table += "<tr class='header_row'><td width='70px'>" + shortMonthNames[iCurrentDate.getMonth()] + "</td><td width='70px'>Day</td><td width='70px'>" + hijriShortMonthNames[iHijriMonth] + "</td><td width='70px'>Fajr</td><td width='70px'>Sunrise</td><td width='70px'>Dhuhr</td><td width='70px'>Asr</td><td width='70px'>Maghrib</td><td width='70px'>Isha</td></tr>";


		for (j=0; j<serverPrayerTime.length; j++)
		{
			iqamaFlag = false;
			iHijriDate = serverPrayerTime[j]['hijri_date'];//AM_IQC_calculateHijriDate(AM_IQC_addDays(iCurrentDate, -hijriadjust));
            iHijriMonth = serverPrayerTime[j]['hijri_month'];//AM_IQC_calculateHijriDate(AM_IQC_addDays(iCurrentDate, -hijriadjust));
            iHijriDay = serverPrayerTime[j]['hijri_day'];//AM_IQC_calculateHijriDate(AM_IQC_addDays(iCurrentDate, -hijriadjust));
			iqamaTimeAvailable = true;
			if (serverIqamaTimes.length > 0) {
                var iqamahDateStr = serverIqamaTimes[iqamaCounter]['iqama_date']["date"];
                var iqamahDate = moment(iqamahDateStr, "YYYY-MM-DD");
                currentDateLabel = iqamahDate.format('dddd, MMMM D');
                startingLabel = iqamaStyleString + "" + currentDateLabel;
            } else {
                iqamaTimeAvailable = false;
			}
			startingLabel = startingLabel	+ "</td>";

			if (iqamaTimeAvailable) {
                var iqamahDateMonth = iqamahDate.format('M');
                var currentDateMonth = iCurrentDate.getMonth()+1;//JS Month is 0 based
                if (((j == 0) && (iqamahDateMonth != currentDateMonth)) || (iCurrentDate.getTime() == (iqamahDate.valueOf()))) {
                    iqamaFlag = true;

                    iqamaTimesNonRamadhan = "<td bgcolor= '" + getTDBackgroundColor(serverIqamaTimes, iqamaCounter, 'fajr_iqama') + "'>" + AM_IQC_convert12HourFormat(serverIqamaTimes[iqamaCounter]['fajr_iqama']) + '</td>';
                    iqamaTimesNonRamadhan += '<td bgcolor= "' + getTDBackgroundColor(serverIqamaTimes, iqamaCounter, 'dhuhr') + '">' + AM_IQC_convert12HourFormat(serverIqamaTimes[iqamaCounter]['dhuhr']) + '</td>';
                    iqamaTimesNonRamadhan += '<td bgcolor= "' + getTDBackgroundColor(serverIqamaTimes, iqamaCounter, 'asr') + '">' + AM_IQC_convert12HourFormat(serverIqamaTimes[iqamaCounter]['asr']) + '</td>';
                    iqamaTimesNonRamadhan += '<td bgcolor= "' + getTDBackgroundColor(serverIqamaTimes, iqamaCounter, 'maghrib') + '">' + AM_IQC_convert12HourFormat(serverIqamaTimes[iqamaCounter]['maghrib']) + '</td>';
                    iqamaTimesNonRamadhan += '<td bgcolor= "' + getTDBackgroundColor(serverIqamaTimes, iqamaCounter, 'isha') + '">' + AM_IQC_convert12HourFormat(serverIqamaTimes[iqamaCounter]['isha']) + '</td>';

                    iqamaTimesRamadhan = '<td bgcolor= "' + getTDBackgroundColor(serverIqamaTimes, iqamaCounter, 'fajr_iqama') + '">' + AM_IQC_convert12HourFormat(serverIqamaTimes[iqamaCounter]['fajr_ramadhan']) + '</td>';
                    iqamaTimesRamadhan += '<td bgcolor= "' + getTDBackgroundColor(serverIqamaTimes, iqamaCounter, 'dhuhr') + '">' + AM_IQC_convert12HourFormat(serverIqamaTimes[iqamaCounter]['dhuhr']) + '</td>';
                    iqamaTimesRamadhan += '<td bgcolor= "' + getTDBackgroundColor(serverIqamaTimes, iqamaCounter, 'asr') + '">' + AM_IQC_convert12HourFormat(serverIqamaTimes[iqamaCounter]['asr']) + '</td>';
                    iqamaTimesRamadhan += '<td bgcolor= "' + getTDBackgroundColor(serverIqamaTimes, iqamaCounter, 'maghrib') + '">' + AM_IQC_convert12HourFormat(serverIqamaTimes[iqamaCounter]['maghrib']) + '</td>';
                    iqamaTimesRamadhan += '<td bgcolor= "' + getTDBackgroundColor(serverIqamaTimes, iqamaCounter, 'isha') + '">' + AM_IQC_convert12HourFormat(serverIqamaTimes[iqamaCounter]['isha']) + '</td>';

                    iqamaTimesTemp = startingLabel;

                    if (AM_IQC_isRamadhan(iHijriDate))
                        iqamaTimesTemp += iqamaTimesRamadhan;
                    else
                        iqamaTimesTemp += iqamaTimesNonRamadhan;

                    if (iqamaCounter < serverIqamaTimes.length - 1)
                        iqamaCounter++;

                }
            }


			if (AM_IQC_isFirstOfRamadhanShawwal(iHijriDate))
			{
				iqamaFlag = true;

				startingLabel = iqamaHijriStyleString + iHijriDate + "</td>";
				iqamaTimesTemp = startingLabel;

				if (AM_IQC_isRamadhan(iHijriDate))
					iqamaTimesTemp += iqamaTimesRamadhan;
				else
					iqamaTimesTemp += iqamaTimesNonRamadhan;


			}

			if (iqamaFlag)
			{
				iqamaTimesHTML += iqamaTimesTemp;
				iqamaTimesHTML += "</tr>";

			}

			prayerTimesHTML = "<tr class='data-row'><td>" + iCurrentDate.getDate() + "</td>";
            prayerTimesHTML += "<td>" + AM_IQC_getShortDayName(iCurrentDate)  + "</td>";
			prayerTimesHTML += "<td>" + iHijriDay + " " + "</td>";

			for (var i in prayerNames){
                prayerTimesHTML += '<td>' + AM_IQC_convert12HourFormat(serverPrayerTime[j][prayerNamesServer[i].toLowerCase()]) + '</td>';

            }
			prayerTimesHTML += "</tr>";
			table += prayerTimesHTML;

			//Print Friday Times
			/*
			if (iCurrentDate.getDay() == 5)
				printJummahTime(iCurrentDate);
			*/

			iCurrentDate = AM_IQC_addDays(iCurrentDate,1);

		}


        table += "<tr><td colspan=4>" + masjidInfo.iqama_print_notice + "</td> <td colspan=5 align=center><table align=center><br/>";

        table += iqamaTimesHTML;

        table += "</table><br/></td></tr>";

		table += "</table>";

		return table;
	}

	function getTDBackgroundColor(iqamaTimes,currentIqamaCounter, iqamaName) {
	    var bgColor = "#FFFFFF";
	    var alternatebgColor = "#d8dad9";
	    if (currentIqamaCounter != 0 && iqamaTimes[currentIqamaCounter][iqamaName] != iqamaTimes[currentIqamaCounter-1][iqamaName]) {
	        bgColor = alternatebgColor;
        }
	    return bgColor;

    }

	function printJummahTime(iCurrentDate)
	{

		var jummahTimes = AM_IQC_calculateJummahIqama(iCurrentDate)
		var printJummahTimes = "";

		for (index = 0; index < jummahTimes.length; index += 2) {
    			printJummahTimes += "Jummah " + ((index/2)+1) + ": Lecture: " + jummahTimes[index] + " - Iqama: " + jummahTimes[index+1] + "\n";
		}

		alert(printJummahTimes);
	}



	function getElementsForScript(id) {
		return document.getElementById(id);
	}

	function setElementsForScript(id, value) {
		return document.getElementById(id).value = value;
	}

	function getMasjidAddress(masjidInfo) {
        return masjidInfo.address + ", " + masjidInfo.city + ", " + masjidInfo.state + ", " + masjidInfo.phone_number ;

    }

    function getParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }
