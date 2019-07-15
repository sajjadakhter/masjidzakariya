	//START OF HIJRI DATE RELATED FUNCTIONS


	function AM_IQC_isFirstOfRamadhanShawwal(theHijriDate)
	{
        if ((theHijriDate.indexOf("Ramadan 1st") != -1) || (theHijriDate.indexOf("Shawwal 1st") != -1)) {
            return true;
        } else {
            return false;
        }
	}
	
	function AM_IQC_isRamadhan(theHijriDate)
	{
        if (theHijriDate.indexOf("Ramadan") != -1) {
            return true;
        } else {
            false;
        }
	}

	function AM_IQC_calculateHijriDate(gregdata)
	{
		var y = gregdata.getFullYear();
		var m = gregdata.getMonth();
		var d = gregdata.getDate();
			
		m++;
		var fixd = gregToFixed(y, m, d);
		var h = fixedToHijri(fixd);
		return h;
	}

	function isGregLeapYear(year)
	{
		return year%4 == 0 && year%100 != 0 || year%400 == 0;
	}


	function gregToFixed(year, month, day)
	{
		var a = Math.floor((year - 1) / 4);
		var b = Math.floor((year - 1) / 100);
		var c = Math.floor((year - 1) / 400);
		var d = Math.floor((367 * month - 362) / 12);

		if (month <= 2)
			e = 0;
		else if (month > 2 && isGregLeapYear(year))
			e = -1;
		else
			e = -2;

		return 1 - 1 + 365 * (year - 1) + a - b + c + d + e + day;
	}

	function Hijri(year, month, day)
	{
		this.year = year;
		this.month = month;
		this.day = day;
		this.toFixed = hijriToFixed;
		this.toString = hijriToString;
	}

	function hijriToFixed()
	{
		return this.day + Math.ceil(29.5 * (this.month - 1)) + (this.year - 1) * 354 +
 			Math.floor((3 + 11 * this.year) / 30) + 227015 - 1;
	}

	function hijriToString()
	{
		var months = new Array("Muharram","Safar","Rabi-al Awwal","Rabi-al Thani","Jumada al-Ula","Jumada al-Thani","Rajab","Sha\'ban","Ramadhan","Shawwal","Dhul Qa\'dah","Dhul Hijjah");
  		return this.day + " " + months[this.month - 1]+ " " + this.year;
	}

	function fixedToHijri(f)
	{
		var i=new Hijri(1100, 1, 1);
		i.year = Math.floor((30 * (f - 227015) + 10646) / 10631);
		var i2=new Hijri(i.year, 1, 1);
		var m = Math.ceil((f - 29 - i2.toFixed()) / 29.5) + 1;
		i.month = Math.min(m, 12);
		i2.year = i.year;
		i2.month = i.month;
		i2.day = 1;
		i.day = f - i2.toFixed() + 1;
		return i;
	}

	//END OF HIJRI DATE RELATED FUNCTIONS