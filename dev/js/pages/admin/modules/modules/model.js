import {env} from "/env.js";
import {G_Bus} from "../../../../libs/G_Control.js";
class _Model {
	constructor() {
		const _ = this;
		_.endpoints = {
			modules: `${env.backUrl}/getModules.php`,
			moduleData: `${env.backUrl}/getWeeks.php`,
		};
	}
	async getModules(){
		const _ = this;
		let rawResponse = await fetch(`${_.endpoints['modules']}`, {
			method: 'GET',
			//headers: _.baseHeaders,
		});
		return await rawResponse.json();
	}
	async getModuleData(moduleId){
		const _ = this;
		let rawResponse = await fetch(`${_.endpoints['moduleData']}?id=${moduleId}`, {
			method: 'GET',
			//headers: _.baseHeaders,
		});
		return await rawResponse.json();
	}

}
export const Model = new _Model();