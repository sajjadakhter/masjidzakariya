	
	function AM_IQC_getPrayerAndIqamaTimes (startDate, endDate, lat, lng, timeZone, method) {

		var paddedPrayerTimes=[];
  		var prayerTimes=[];
		var iqamaTimes=[];
  		var paddedByDays = 30;

		var paddedStartDate = AM_IQC_addDays(startDate, -paddedByDays);
		var paddedEndDate = AM_IQC_addDays(endDate, paddedByDays);
								
		lat = AM_IQC_Latitude;
		lng = AM_IQC_Longitude;
		timeZone = AM_IQC_Timezone;
		method = AM_IQC_PrayerMethod;

		var dhuhrLabel = AM_IQC_AdjustDuhrTime + " min";
		var maghribLabel = AM_IQC_AdjustMaghribTime + " min";

		prayTimes.setMethod(method);
		prayTimes.adjust({dhuhr: dhuhrLabel, asr: AM_IQC_AdjustAsrMethod, maghrib: maghribLabel});

		
		var DSTStartEndDates = AM_IQC_CalculateDSTDates(startDate);

		var DSTStartDate = DSTStartEndDates.AM_IQC_DST_Start_Date;
		var DSTEndDate = DSTStartEndDates.AM_IQC_DST_End_Date;


		while (paddedStartDate < paddedEndDate) {
				
			var prayerTimesOfCurrentDay = prayTimes.getTimes(paddedStartDate, [lat, lng], timeZone, AM_IQC_IsDST(paddedStartDate, DSTStartDate, DSTEndDate), '24h'); 
				
			paddedPrayerTimes.push({ prayerTimesOfCurrentDay: prayerTimesOfCurrentDay});
			
			if ((paddedStartDate >= startDate) && (paddedStartDate <= endDate))	
				prayerTimes.push({prayerTimesOfCurrentDay: prayerTimesOfCurrentDay});

			paddedStartDate.setDate(paddedStartDate.getDate()+ 1);  // next day
		}

		iqamaTimes = AM_IQC_getIqamaTimes (startDate, paddedByDays, paddedPrayerTimes);
				
     		return {prayerTimes:prayerTimes, iqamaTimes:iqamaTimes};
		
	}
	
	

	function AM_IQC_getIqamaTimes (startDate, paddedByDays, dailyPrayerTimes) {
		
  		var iqamaTimes=[];  		
		var iqamaTime;

		var DSTStartEndDates = AM_IQC_CalculateDSTDates(startDate);
		var DSTStartDate = DSTStartEndDates.AM_IQC_DST_Start_Date;
		var DSTEndDate = DSTStartEndDates.AM_IQC_DST_End_Date;
	

		var startingDate = AM_IQC_addDays(startDate, -paddedByDays);
		var endingDate = AM_IQC_addDays(startingDate, 0);
		var nextDate;

		var prayerTimesOfFirstDateOfCurrentWeek = dailyPrayerTimes[0]['prayerTimesOfCurrentDay'];
		var prayerTimesOfLastDateOfCurrentWeek;


		for (j=1; j<dailyPrayerTimes.length; j++)
		{
			endingDate = AM_IQC_addDays(endingDate,1);
			nextDate = AM_IQC_addDays(endingDate,1);		
			
			if ( (!AM_IQC_isIqamaChangeDay(nextDate)) && (!AM_IQC_IsDSTStartEndDate(nextDate, DSTStartDate, DSTEndDate)) )
				continue;

			//Check if the start date has been reached or if we are just traversing through padded time
			if (endingDate < startDate)
			{
				prayerTimesOfFirstDateOfCurrentWeek = dailyPrayerTimes[j+1]['prayerTimesOfCurrentDay'];
				startingDate = AM_IQC_addDays(endingDate,1);
				continue;
			}
			
			prayerTimesOfLastDateOfCurrentWeek = dailyPrayerTimes[j]['prayerTimesOfCurrentDay'];				

			iqamaTime = AM_IQC_calculateIqamaTimes(prayerTimesOfFirstDateOfCurrentWeek, prayerTimesOfLastDateOfCurrentWeek, startingDate, AM_IQC_IsDST(startingDate, DSTStartDate, DSTEndDate));

			iqamaTimes.push (iqamaTime);

			if ((j+1) < dailyPrayerTimes.length)
			{
				prayerTimesOfFirstDateOfCurrentWeek = dailyPrayerTimes[j+1]['prayerTimesOfCurrentDay'];
				startingDate = AM_IQC_addDays(endingDate,1);
			}

		}
		
     		return iqamaTimes;	
	}


	function AM_IQC_isIqamaChangeDay(theCurrentDate)
	{
		var booleanReturnValue = false;

		for (index = 0; index < AM_IQC_IqamaChangeDates.length; index++) {
    			if (theCurrentDate.getDate() == AM_IQC_IqamaChangeDates[index])
				booleanReturnValue = true;
		}

		if (theCurrentDate.getDay() == AM_IQC_IqamaChangeDay) 
			booleanReturnValue = true;


		return booleanReturnValue;
	}


	function AM_IQC_calculateIqamaTimes(prayerTimesOfFirstDateOfCurrentWeek, prayerTimesOfLastDateOfCurrentWeek, currentDate, isDST) 
	{
		var fajr = AM_IQC_calculateFajrIqama(prayerTimesOfFirstDateOfCurrentWeek, prayerTimesOfLastDateOfCurrentWeek);
		var fajr_ramadhan;
		if (!AM_IQC_FajrChangeInRamadhan)
			fajr_ramadhan = fajr;
		else
			fajr_ramadhan = AM_IQC_calculateFajrRamadhanIqama(prayerTimesOfFirstDateOfCurrentWeek, prayerTimesOfLastDateOfCurrentWeek);
		var dhuhr   = AM_IQC_calculateDhuhrIqama(isDST);
		var asr     = AM_IQC_calculateAsrIqama(prayerTimesOfFirstDateOfCurrentWeek, prayerTimesOfLastDateOfCurrentWeek);
		var maghrib = 'Sunset';  
		var isha    = AM_IQC_calculateIshaIqama(prayerTimesOfFirstDateOfCurrentWeek, prayerTimesOfLastDateOfCurrentWeek);

		return {
			currentDate: currentDate, fajr: fajr, fajr_ramadhan: fajr_ramadhan, dhuhr: dhuhr, asr: asr, maghrib: maghrib, isha: isha
		};		
	}


	function AM_IQC_calculateFajrIqama(prayTimeFirst, prayTimeLast)
	{
		if (AM_IQC_FajrOverride.length != 0) 
			return AM_IQC_FajrOverride;

		if (AM_IQC_FajrFromSunrise)
			return AM_IQC_Formula (AM_IQC_FajrMinTime, AM_IQC_FajrMaxTime, "down", prayTimeFirst["sunrise"], prayTimeLast["sunrise"], AM_IQC_FajrMinGap, AM_IQC_FajrChangeBy);
		else
			return AM_IQC_Formula (AM_IQC_FajrMinTime, AM_IQC_FajrMaxTime, "up", prayTimeFirst["fajr"], prayTimeLast["fajr"], AM_IQC_FajrMinGap, AM_IQC_FajrChangeBy);	

	}
		

	function AM_IQC_calculateFajrRamadhanIqama(prayTimeFirst, prayTimeLast)
	{
		if (AM_IQC_FajrOverride.length != 0) 
			return AM_IQC_FajrOverride;

		return AM_IQC_Formula (AM_IQC_FajrRamadhanMinTime, AM_IQC_FajrRamadhanMaxTime, "up", prayTimeFirst["fajr"], prayTimeLast["fajr"], AM_IQC_FajrRamadhanMinGap, AM_IQC_FajrRamadhanChangeBy);
	
	}

	function AM_IQC_calculateDhuhrIqama(isDST)
	{
		if (isDST)	
			return AM_IQC_DuhrTimeDST;
		else
			return AM_IQC_DuhrTimeStandard;
	
	}


	function AM_IQC_calculateJummahIqama(iCurrentDate)
	{
		var DSTStartEndDates = AM_IQC_CalculateDSTDates(iCurrentDate);
		var DSTStartDate = DSTStartEndDates.AM_IQC_DST_Start_Date;
		var DSTEndDate = DSTStartEndDates.AM_IQC_DST_End_Date;


		if (AM_IQC_IsDST(iCurrentDate, DSTStartDate, DSTEndDate))	
			return AM_IQC_Jummah_TimeDST;
		else
			return AM_IQC_Jummah_TimeStandard;
	
	}

	function AM_IQC_calculateAsrIqama(prayTimeFirst, prayTimeLast)
	{

		if (AM_IQC_AsrOverride.length != 0) 
			return AM_IQC_AsrOverride;

		if (AM_IQC_AsrFromSunset)
			return AM_IQC_Formula (AM_IQC_AsrMinTime, AM_IQC_AsrMaxTime, "down", prayTimeFirst["maghrib"], prayTimeLast["maghrib"], AM_IQC_AsrMinGap, AM_IQC_AsrChangeBy);
		else
			return AM_IQC_Formula (AM_IQC_AsrMinTime, AM_IQC_AsrMaxTime, "up", prayTimeFirst["asr"], prayTimeLast["asr"], AM_IQC_AsrMinGap, AM_IQC_AsrChangeBy);
	}


	function AM_IQC_calculateIshaIqama(prayTimeFirst, prayTimeLast)
	{
		if (AM_IQC_IshaOverride.length != 0) 
			return AM_IQC_IshaOverride;

		return AM_IQC_Formula (AM_IQC_IshaMinTime, AM_IQC_IshaMaxTime, "up", prayTimeFirst["isha"], prayTimeLast["isha"], AM_IQC_IshaMinGap, AM_IQC_IshaChangeBy);
	}


	function AM_IQC_Formula(minTime, maxTime, roundHow, firstTime, lastTime, gap, interval)
	{
		if (roundHow == "up")
			return AM_IQC_MinTime(maxTime, AM_IQC_MaxTime(minTime, AM_IQC_roundTime("up", AM_IQC_MaxTime(firstTime, lastTime), gap, interval)));
		else
			return AM_IQC_MinTime(maxTime,AM_IQC_MaxTime(minTime,AM_IQC_roundTime("down", AM_IQC_MinTime(firstTime, lastTime), gap, interval)));
	}	

	function AM_IQC_roundTime(roundup, time, minTimeGap, interval) {
		
		var timeToReturn = new Date (new Date().toDateString() + ' ' + time);

		if (roundup == "up")
		{
			timeToReturn.setMinutes(timeToReturn.getMinutes() + minTimeGap);
			timeToReturn.setMinutes(Math.ceil(timeToReturn.getMinutes() / interval) * interval);
		}
		else
		{
			timeToReturn.setMinutes(timeToReturn.getMinutes() - minTimeGap);
			timeToReturn.setMinutes(Math.floor(timeToReturn.getMinutes() / interval) * interval);
		}

		return timeToReturn.getHours() + ":" + AM_IQC_pad2(timeToReturn.getMinutes());					

	}

	
	function AM_IQC_MaxTime(time, time2)
	{
		var firstTime = new Date (new Date().toDateString() + ' ' + time);
		var secondTime = new Date (new Date().toDateString() + ' ' + time2);

		if (firstTime > secondTime)
			return time;
		else
			return time2;			
	}

	function AM_IQC_MinTime(time, time2)
	{
		var firstTime = new Date (new Date().toDateString() + ' ' + time);
		var secondTime = new Date (new Date().toDateString() + ' ' + time2);

		if (firstTime > secondTime)
			return time2;
		else
			return time;			
	}

	


