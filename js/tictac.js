/**
 * [date_diff_indays description]
 * @param  {[type]} format [en or fr]
 * @param  {[type]} date2 [description]
 */
function date_diff_indays(date2) {

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) { dd = '0'+dd }

	if(mm<10) {  mm = '0'+mm }

	dt1 = new Date(mm + '/' + dd + '/' + yyyy);
		dt2 = new Date(date2);

	return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

/**
 * [killThatShit description]
 * @param  {[type]} condition [description]
 * @param  {[type]} el        [description]
 * @param  {[type]} els       [description]
 */
function killThatShit(condition, els){
	if(condition){
		for (var i = els.length; i-- > 0;) {
				var el = els[i];
				if(el.firstChild != null){
					var text = document.createTextNode(el.firstChild.nodeValue);
					el.parentNode.replaceChild(text, el);
				}
		}
	}
}

// Let's parse informations
function doing_stuff(Array_parameters) {

	var date = (!Array_parameters[0]) ? '01/01/2020' : Array_parameters[0],
			killCss = (!Array_parameters[1]) ?  true : Array_parameters[1],
			killJs = (!Array_parameters[2]) ?  true : Array_parameters[2],
			whitescreen = (!Array_parameters[3]) ? false : Array_parameters[3];

			//console.log("typeof whitescreen: ", typeof(whitescreen));
	if(date_diff_indays(date) <= 0 ){

		/* --------------------------------------------------------------------------------------------------------*/
		/* This code will decrease the opacity of the app....
		/* A Code from https://github.com/kleampa/not-paid/
		/* By kleampa
		/* change these variables as you wish */
		var due_date = new Date(date);
		var days_deadline = 5;
		/* stop changing here */
		var current_date = new Date();
		var utc1 = Date.UTC(due_date.getFullYear(), due_date.getMonth(), due_date.getDate());
		var utc2 = Date.UTC(current_date.getFullYear(), current_date.getMonth(), current_date.getDate());
		var days = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
		if(days > 0) {
			var days_late = days_deadline-days;
			var opacity = (days_late*100/days_deadline)/100;
				opacity = (opacity < 0) ? 0 : opacity;
				opacity = (opacity > 1) ? 1 : opacity;
			if(opacity >= 0 && opacity <= 1) {
				document.getElementsByTagName("BODY")[0].style.opacity = opacity;
			}
		}
		/* --------------------------------------------------------------------------------------------------------*/

		// Killing Css
		killThatShit(killCss, document.getElementsByTagName('head'));
		// killing html css
		killThatShit(killCss, document.getElementsByTagName('style'));

		if(whitescreen==true){ // Whit screen mode
			var myNode = document.body;
			while (myNode.firstChild) {
					myNode.removeChild(myNode.firstChild);
			}
		}else{
			// Killing Js script
			killThatShit(killJs, document.getElementsByTagName('script'));
		}
	}
}

/**
 * [checkDate description]
 * @param  {[type]}  date        [description]
 * @param  {Boolean} killCss     [description]
 * @param  {Boolean} killJs      [description]
 * @param  {Boolean} whitescreen [description]
 */
function checkDate(Array_parameters, remoteDead=null){

	if(typeof Array_parameters != "undefined" && Array_parameters != null && remoteDead == null){

			doing_stuff(Array_parameters);

	}else if(Array_parameters == null && remoteDead != null && typeof remoteDead != "undefined" && remoteDead[0]){ // Going to find a remote file

		var xhr  = new XMLHttpRequest();
		xhr.open('GET', remoteDead[1], true)
		xhr.onload = function () {

			if (xhr.readyState == 4 && xhr.status == "200") {
					var Array_parameters = xhr.responseText.split(',');
					Array_parameters[1] = Array_parameters[1].toLocaleLowerCase().includes("true") ? true : false;
					Array_parameters[2] = Array_parameters[2].toLocaleLowerCase().includes("true") ? true : false;
					Array_parameters[3] = Array_parameters[3].toLocaleLowerCase().includes("true") ? true : false;
					doing_stuff(Array_parameters);
			}
		}
		xhr.send(null);

	}else{
		return false;
	}

}