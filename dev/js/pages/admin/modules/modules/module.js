import {G_Bus} from "../../../../libs/G_Control.js";
import {Model}  from "./model.js";
import {AdminPage} from "../../admin.page.js";
export class ModulesModule extends AdminPage {
	constructor() {
		super();
		this.moduleStructure = {
			'header':'fullHeader',
			'header-tabs':'adminTabs',
			'body':'modulesBody'
		}
	}
	define(){
		const _ = this;
		_.componentName = 'ModulesModule';
		G_Bus.on(_,['domReady','fillModuleWeeks','updateWeek'])
	}
	domReady(){
		const _ = this;
		_.fillModulesBody();
	}

	// fillMethods
	async fillModulesBody(){
		const _ = this;
		let bodyCont = _.f('.modules-body');
		_.clear(bodyCont);
		let modules = await Model.getModules();

		if(modules){
			modules.forEach(module => {
				bodyCont.append(_.markup(_.moduleItem(module)));
			});
		}
	}

	async fillModuleWeeks({item}){
		const _ = this;
		let
			bodyCont = _.f('.modules-body'),
			moduleId = item.getAttribute('data-id'),
			moduleData = await Model.getModuleData(moduleId),
			headerData = {
				title: moduleData['title'],
				subtitle: [moduleData['subtitle']],
				gap: false,
				icon: {
					href:'graphic-2',
					color: '0,175,175',
				},
				titlesData: {
					titleCls: 'practice-title practice-block-title',
					subtitleCls: 'practice-block-subtitle'
				}
			}

		_.clear(bodyCont);
		bodyCont.prepend(_.markup(_.moduleInnerTpl(headerData)));

		let weekList = _.f('#week-list');
		_.clear(weekList);
		moduleData['weeks'].forEach(week => {
			weekList.append(_.markup(_.weekItemTpl(week)));
		});

	}

	// fillMethods


	// saveMethods
	updateWeek({item}){
		const _ = this;
		let
			bodyCont = _.f('.modules-body');
		_.clear(bodyCont);
		bodyCont.prepend(_.markup(_.updateWeekTpl({title:'Неделя 1'})));
	}

	// saveMethods

	init(){}
}