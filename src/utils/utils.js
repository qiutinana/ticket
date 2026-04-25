import storage from './storage';
import menu from './menu';
/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(tableName, key, type = 'button') {
	let role = storage.get("role");
	if (!role) {
		role = '管理员';
	}
	let menus = menu.list();
	for (let i = 0; i < menus.length; i++) {
		if (menus[i].roleName == role) {
			for (let j = 0; j < menus[i].backMenu.length; j++) {
				for (let k = 0; k < menus[i].backMenu[j].child.length; k++) {
					if (tableName == menus[i].backMenu[j].child[k].tableName) {
						if (type == 'button') {
							let buttons = menus[i].backMenu[j].child[k].buttons.join(',');
							return buttons.indexOf(key) !== -1 || false
						} else if (type == 'data') {
							if (key == '看部分') {
								return menus[i].backMenu[j].child[k].authField
							}
							return menus[i].backMenu[j].child[k].auth == key || false
						}

					}
				}
			}
		}
	}
	return false;
}
/**
 * 数据权限
 * @param {*} key
 */
export function isDataAuth(tableName) {
	let role = storage.get("role");
	if (!role) {
		role = '管理员';
	}
	let menus = menu.list();
	for (let i = 0; i < menus.length; i++) {
		if (menus[i].roleName == role) {
			for (let j = 0; j < menus[i].backMenu.length; j++) {
				for (let k = 0; k < menus[i].backMenu[j].child.length; k++) {
					if (tableName == menus[i].backMenu[j].child[k].tableName) {
						if (menus[i].backMenu[j].child[k].auth == '看自己') {
							return "yonghu"
						} else if (menus[i].backMenu[j].child[k].auth == '看部分') {
							return menus[i].backMenu[j].child[k].authField
						}  else {
							return -1
						}
					}
				}
			}
		}
	}
	return false;
}
/**
 *  * 获取当前时间（yyyy-MM-dd hh:mm:ss）
 *   */
export function getCurDateTime() {
	let currentTime = new Date(),
		year = currentTime.getFullYear(),
		month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
		day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate(),
		hour = currentTime.getHours(),
		minute = currentTime.getMinutes(),
		second = currentTime.getSeconds();
	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

/**
 *  * 获取当前日期（yyyy-MM-dd）
 *   */
export function getCurDate() {
	let currentTime = new Date(),
		year = currentTime.getFullYear(),
		month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
		day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
	return year + "-" + month + "-" + day;
}

