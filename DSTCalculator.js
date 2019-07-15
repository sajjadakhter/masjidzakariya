


	function AM_IQC_IsDST(date, startDate, endDate)
	{
		return ((date >= startDate) && (date < endDate))
	}

	function AM_IQC_IsDSTStartEndDate(date, startDate, endDate)
	{
		return ( (date.getTime() == startDate.getTime()) || (date.getTime() == endDate.getTime()) );
	}

	function AM_IQC_CalculateDSTDates(date) 
	{
		var AM_IQC_DST_Start_Date;
		var AM_IQC_DST_End_Date;

		if (!AM_IQC_DST_Time_Change)
			return {AM_IQC_DST_Start_Date: new Date("1/1/1900"), AM_IQC_DST_End_Date: new Date("1/1/1900")};

		
		var startDate = new Date(date.getFullYear(), AM_IQC_DST_Start_Month-1, 1); 		

		while(startDate.getDay() != AM_IQC_DST_Start_Day)
			startDate.setDate(startDate.getDate()+ 1);

		if (AM_IQC_DST_Start_Week != -1)
			AM_IQC_DST_Start_Date = AM_IQC_addDays(startDate, (AM_IQC_DST_Start_Week-1)*7);
		else
			if (AM_IQC_addDays(startDate, 28).getMonth() == AM_IQC_DST_Start_Month-1)
				AM_IQC_DST_Start_Date = AM_IQC_addDays(startDate, 28);
			else
				AM_IQC_DST_Start_Date = AM_IQC_addDays(startDate, 21);
				


		var endDate = new Date(date.getFullYear(), AM_IQC_DST_End_Month-1, 1); 		

		while(endDate.getDay() != AM_IQC_DST_End_Day)
			endDate.setDate(endDate.getDate()+ 1);

		if (AM_IQC_DST_End_Week != -1)
			AM_IQC_DST_End_Date = AM_IQC_addDays(endDate, (AM_IQC_DST_End_Week-1)*7);
		else
			if (AM_IQC_addDays(endDate, 28).getMonth() == AM_IQC_DST_End_Month-1)
				AM_IQC_DST_End_Date = AM_IQC_addDays(endDate, 28);
			else
				AM_IQC_DST_End_Date = AM_IQC_addDays(endDate, 21);

	

		return {AM_IQC_DST_Start_Date: AM_IQC_DST_Start_Date, AM_IQC_DST_End_Date: AM_IQC_DST_End_Date};
		
	}



	