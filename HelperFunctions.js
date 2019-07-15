	// GET VARIABLES

	function AM_IQC_getMasjidLogo() {
		return AM_IQC_Logo;
	}

	function AM_IQC_getMasjidName() {
		return AM_IQC_Name;
	}

	function AM_IQC_getMasjidAddressPhone() {
		return AM_IQC_AddressPhone;
	}

	function AM_IQC_getRamadhanStopEating() {
		return AM_IQC_RamadhanStopEating;
	}



	//START OF DATE RELATED FUNCTIONS (HELPER FUNCTIONS)


	function AM_IQC_addMinutes(timePassed, minutesToAdjust) {
		var timeToReturn = new Date (new Date().toDateString() + ' ' + timePassed);
		timeToReturn.setMinutes(timeToReturn.getMinutes() + minutesToAdjust);
		return timeToReturn.getHours() + ":" + AM_IQC_pad2(timeToReturn.getMinutes());	
	 }

	function AM_IQC_addDays(datePassed, daysToAdjust) {
		var newDate = new Date(datePassed);
		newDate.setDate(newDate.getDate() + daysToAdjust);  
		return newDate;
	 }	

	function AM_IQC_addMonths(datePassed, monthsToAdjust) {
		var newDate = new Date(datePassed);
		newDate.setMonth(newDate.getMonth() + monthsToAdjust);  
		return newDate;
	 }	

	function AM_IQC_getMonthName(datePassed) {
		var monthNames = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
		return monthNames[datePassed.getMonth()];
	 }	

	function AM_IQC_getShortDayName(datePassed) {
		var weekdayNames = new Array('Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat');
		return weekdayNames[datePassed.getDay()];
	 }	

	function AM_IQC_getFullDayName(datePassed) {
		var weekdayFullNames = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');	
		return weekdayFullNames[datePassed.getDay()];
	 }	

	function AM_IQC_convert12HourFormat(timeString, subMin) {
		var hrs = timeString.split(':')[0];
		if (isNaN(hrs))
			return timeString;
		var min = timeString.split(':')[1];
		min = min.split(' ')[0];
			
		hrs = parseInt(hrs, 10) // converts the value to an integer
		var hrs12 = hrs > 12 ? hrs - 12 : hrs;

		if(!isNaN(subMin) ){
			min = parseInt(min, 10) - subMin;
		}
		if( (min+ '').length < 2 ) min = '0'+min;
		return hrs12 + ":" + min;
	}

	function AM_IQC_pad2(number) {
		return (number < 10 ? '0' : '') + number;
  	}	

	//END OF DATE RELATED FUNCTIONS (HELPER FUNCTIONS)


	function checkForDownload(){
		if(download && download === '1'){
			downloadImage('iqama-container');
		}
	}

	function downloadImage(id){
		var year = getElementsForScript('year').value;
		var month = +getElementsForScript('month').value;
		var masjidId = getParameterByName("masjid_id");
		var fileName = 'Iqamah-'+masjidId+'-'+month+'-'+year+'.png';
		var contentType = 'image/png';
		var elemTD = $('#'+id+' .data-row td');

		if(_scaleFonts){
			elemTD.css('font-size', '18px');
		}


		html2canvas(document.getElementById(id), {
			//backgroundColor: null,
			//allowTaint: false,
			useCORS: true,
			//scale:2
		}).then(
			function(canvas) {
				//console.log(canvas.width);
				//console.log(canvas.height);

				document.body.appendChild(canvas);
				document.body.removeChild(canvas);

				var link = document.getElementById('ssi');
				link.setAttribute('download', fileName);
				link.setAttribute('href', canvas.toDataURL(contentType).replace(contentType, "image/png"));
				link.click();
				if(_scaleFonts){
					elemTD.css('font-size', '15px');
				}
			}
		);
	}