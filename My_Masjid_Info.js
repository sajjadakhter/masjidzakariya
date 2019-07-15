// ABOUT
	var AM_IQC_Version = "1.0"; // Do Not Change This Value. Please download authorized template & newer version, for interoperability
	var AM_IQC_Author = "Adnan Makda"; 

// MASJID INFO

	var AM_IQC_Logo = "https://pbs.twimg.com/profile_images/378800000859780242/fGjmzo_H_normal.jpeg";
	var AM_IQC_Name = "ISLAMIC CENTER OF FREMONT";
	var AM_IQC_AddressPhone = "4039 Irvington Ave Fremont CA. 94538 ( 510-661-0352 )";
	var AM_IQC_Latitude = "37.531348"; 
	var AM_IQC_Longitude = "-121.959791";

	var AM_IQC_Timezone = "-8";
	
	var AM_IQC_DST_Time_Change = true;
	var AM_IQC_DST_Start_Month = 3; //Ex: 1=JANUARY, 2=FEBRUARY, 12=DECEMBER
	var AM_IQC_DST_Start_Week = 2; //Ex: -1=Last Day of the Week
	var AM_IQC_DST_Start_Day = 0; //Ex: 0=SUNDAY, 1=MONDAY, 6=SATURDAY, 9=NONE; 
	var AM_IQC_DST_End_Month = 11; //Ex: 1=JANUARY, 2=FEBRUARY, 12=DECEMBER
	var AM_IQC_DST_End_Week = 1; //Ex: -1=Last Day of the Week
	var AM_IQC_DST_End_Day = 0; //Ex: 0=SUNDAY, 1=MONDAY, 6=SATURDAY, 9=NONE; 
	

// PRAYER AND IQAMA RELATED INFO	

	var AM_IQC_PrayerMethod = "ISNA"; //MWL, ISNA, Egypt, Makkah, Karachi, Jafari, Tehran - http://praytimes.org/wiki/Calculation_Methods
	var AM_IQC_AdjustDuhrTime = "5";
	var AM_IQC_AdjustAsrMethod = "Hanafi";
	var AM_IQC_AdjustMaghribTime = "3";
	var AM_IQC_RamadhanStopEating = -10;

	var AM_IQC_IqamaChangeDay = 5; //Ex: 0=SUNDAY, 1=MONDAY, 6=SATURDAY, 9=NONE; 
	var AM_IQC_IqamaChangeDates = []; //Ex: [], [1, 15];
	var AM_IQC_IqamaChangeFrequency = 7; //Ex: 7, 14, 15
	


// FAJR
	var AM_IQC_FajrOverride = "";
	var AM_IQC_FajrFromSunrise = true;
	var AM_IQC_FajrMinGap = 30; 
	var AM_IQC_FajrChangeBy = 15;
	var AM_IQC_FajrMinTime = "5:15";
	var AM_IQC_FajrMaxTime = "6:45";

// FAJR - In Ramadhan
	var AM_IQC_FajrChangeInRamadhan = true;
	var AM_IQC_FajrRamadhanMinGap = 20; 
	var AM_IQC_FajrRamadhanChangeBy = 10;
	var AM_IQC_FajrRamadhanMinTime = "2:00";
	var AM_IQC_FajrRamadhanMaxTime = "6:45";



// DUHR - Change by DS
	var AM_IQC_DuhrTimeStandard = "13:00";
	var AM_IQC_DuhrTimeDST = "13:30";


//ASR
	var AM_IQC_AsrOverride = "";
	var AM_IQC_AsrFromSunset = true;
	var AM_IQC_AsrMinGap = 60;
	var AM_IQC_AsrChangeBy = 15;
	var AM_IQC_AsrMinTime = "15:45";
	var AM_IQC_AsrMaxTime = "18:45";


//ISHA
	var AM_IQC_IshaOverride = "";
	var AM_IQC_IshaMinGap = 10;
	var AM_IQC_IshaChangeBy = 15;
	var AM_IQC_IshaMinTime = "20:00";
	var AM_IQC_IshaMaxTime = "22:15";

	

// JUMMAH (Lecture & Iqama)- Change by DS
	var AM_IQC_Jummah_TimeStandard = ["12:30","13:00","13:30","14:00"];
	var AM_IQC_Jummah_TimeDST = ["13:00","13:30","14:00","14:30","15:00","15:30"];

