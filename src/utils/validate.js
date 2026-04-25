/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
	return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
  if (typeof s !== 'string') {
    return false; // 非字符串直接返回false
  }
  
  // 移除常见分隔符：空格、横杠、括号
  const cleaned = s.replace(/[\s\-()]/g, '');
  
  // 国内手机号规则：
  // 1. 可选的+86或0086前缀
  // 2. 1开头，第二位3-9，后面跟9位数字
  // 总长度（去除前缀后）必须是11位
  const regex = /^(?:\+86|0086)?1[3-9]\d{9}$/;
  
  return regex.test(cleaned);
}
/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
	return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
	return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 匹配数字，可以是小数，不可以是负数,可以为空
 * @param {*} s 
 */
export function isNumber(s) {
	return /(^-?[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$)|(^$)/.test(s);
}
/**
 * 匹配整数，可以为空
 * @param {*} s 
 */
export function isIntNumer(s) {
	return /(^-?\d+$)|(^$)/.test(s);
}
/**
 * 身份证校验
 */
export function checkIdCard(idcard) {
	const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if (!regIdCard.test(idcard)) {
		return false;
	} else {
		return true;
	}
}
/**
 * 匹配中文，可以为空
 * @param {*} s 
 */
export function isChinese(s) {
	return /^[\u4e00-\u9fa5]+$/.test(s);
}
/**
 * 匹配英文，可以为空
 * @param {*} s 
 */
export function isEnglish(s) {
	return /^[A-Za-z]+$/.test(s);
}
/**
 * 匹配英文和数字，可以为空
 * @param {*} s 
 */
export function isEnglishNumber(s) {
	return /^[A-Za-z0-9]+$/.test(s)&&/^(?=.*\d)(?=.*[a-zA-Z]).+$/.test(s);
}