/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

function param2Query(param){
	if(!param) return "";
	var query = "";
	Object.keys(param).forEach((key)=>{
		query? query += "&" : query = "?";
		query += key;
		query += "="
		query += param[key];
	})
	return query;
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

function GUID() {
	this.date = new Date();   /* 判断是否初始化过，如果初始化过以下代码，则以下代码将不再执行，实际中只执行一次 */
	if (typeof this.newGUID != 'function') {   /* 生成GUID码 */
		GUID.prototype.newGUID = function () {
			this.date = new Date(); var guidStr = '';
			var sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16);
			var sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16);
			for (var i = 0; i < 9; i++) {
				guidStr += Math.floor(Math.random() * 16).toString(16);
			}
			guidStr += sexadecimalDate;
			guidStr += sexadecimalTime;
			while (guidStr.length < 32) {
				guidStr += Math.floor(Math.random() * 16).toString(16);
			}
			return this.formatGUID(guidStr);
		}
		/* * 功能：获取当前日期的GUID格式，即8位数的日期：19700101 * 返回值：返回GUID日期格式的字条串 */
		GUID.prototype.getGUIDDate = function () {
			return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date.getDay());
		}
		/* * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933 * 返回值：返回GUID日期格式的字条串 */
		GUID.prototype.getGUIDTime = function () {
			return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(this.date.getSeconds()) + this.addZero(parseInt(this.date.getMilliseconds() / 10));
		}
		/* * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现 * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串 * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串 */
		GUID.prototype.addZero = function (num) {
			if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
				return '0' + Math.floor(num);
			} else {
				return num.toString();
			}
		}
		/*  * 功能：将y进制的数值，转换为x进制的数值 * 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10 * 返回值：返回转换后的字符串 */GUID.prototype.hexadecimal = function (num, x, y) {
			if (y != undefined) { return parseInt(num.toString(), y).toString(x); }
			else { return parseInt(num.toString()).toString(x); }
		}
		/* * 功能：格式化32位的字符串为GUID模式的字符串 * 参数：第1个参数表示32位的字符串 * 返回值：标准GUID格式的字符串 */
		GUID.prototype.formatGUID = function (guidStr) {
			var str1 = guidStr.slice(0, 8) + '-', str2 = guidStr.slice(8, 12) + '-', str3 = guidStr.slice(12, 16) + '-', str4 = guidStr.slice(16, 20) + '-', str5 = guidStr.slice(20);
			return str1 + str2 + str3 + str4 + str5;
		}
	}
};

var createGuid = (function(){
	var guidCreator = new GUID();
	return function(){
		return guidCreator.newGUID();
	}
})();


function formatDate(date){
	let formated = "";
	let now = new Date();
	let nowYear = now.getFullYear();
	let nowMonth = now.getMonth();
	let nowDay = now.getDate();
	let year3 = new Date;
	year3.setFullYear(nowYear-3);
	let year1 = new Date;
	year1.setFullYear(nowYear-1);
	let month1 = new Date();
	month1.setMonth(nowMonth - 1);
	let day7 = new Date();
	day7.setDate(nowDay - 7);
	let day3 = new Date();
	day3.setDate(nowDay - 3);
	let day1 = new Date();
	day1.setDate(nowDay - 1);
	if(date < year3)
		formated = "三年前";
	else if(date < year1)
		formated = "一年前";
	else if(date < month1)
		formated = "一个月前";
	else if(date < day7)
		formated = "七天前";
	else if(date < day3)
		formated = "三天前";
	else if(date < day1)
		formated = "一天前";
	else{
		let hour = date.getHours();
		let minute = date.getMinutes();
		formated = "" + hour + "时";
		formated += minute + "分";
	}
	return formated;
}

export default {
  param2Obj,
  param2Query,
  deepClone,
  createGuid,
  formatDate
}
