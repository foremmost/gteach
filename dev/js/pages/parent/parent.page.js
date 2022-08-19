/**
 * @module ParentPage
 **/
import { G_Bus }        from "../../libs/G_Control.js";
import { G }            from "../../libs/G.js";
import GInput           from "../../components/input/input.component.js";
import GModaler         from "../../components/modaler/modaler.component.js";

class ParentPage extends G{
	constructor() {
		super();
		this.pageStructure = {
			'header':{
				id:'',
				container: document.createElement('g-header')
			},
			'header-tabs':{
				id:'',
				container: document.createElement('g-header-tabs')
			},
			'body-tabs':{
				id:'',
				container: document.createElement('g-body-tabs')
			},
			'body':{
				id:'',
				container: document.createElement('g-body')
			},
			'footer': {
				id:'',
				container: document.createElement('g-footer')
			}
		};
	}
	define(){
		const _ = this;
		_.componentName = 'ParentPage';
		G_Bus
		.on(_,[
			'changeSection','navigate',
			'showSuccessPopup','showErrorPopup','closePopup',
		]);
	}
	navigate(clickData){
		const _ = this;
		let
			list = clickData.item,
			target = clickData.event.target,
			btn = _.ascent(target,'.navigate-item','navigate-list');
		_.showActiveNavItem(btn,list);
		_.changeActiveNavItem(btn);
	}
	createdAtFormat(value,format = 'month DD, YYYY'){
		if (!value) return 'No date'
		value = value.split('T')[0].split('-');
		let
		year = value[0],
		month = value[1],
		day = value[2],
		months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		
		let res = format;
		res = res.replace('DD',day)
		res = res.replace('MM',month)
		res = res.replace('YYYY',year)
		res = res.replace('month',months[parseInt(month) - 1]);
		return res;
	}
	changeSection({item,event}){
		const _ = this;
		let
		section = item.getAttribute('section'),
		tpl = section.split('/')[2];
		//	if(_.currentSection == section) return void 0;
		if(section) history.pushState(null, null, section);
		_.moduleRender([tpl]);
		_.currentSection = section;
	}
	showForm(id){
		G_Bus.trigger('modaler','showModal',{
			type: 'html',
			target: `#${id}`
		});
	}
	async moduleRender(params){
		const _ = this;
		let module = await _.getModule({
			'pageName':'parent',
			'name': params[0],
			'structure':_.pageStructure
		});
		if(!module._$){
			module._$ = {};
		}
		module.super_$ = _._$;
		module.headerBlock = _.header;
		return Promise.resolve(module.render());
	}

	showSuccessPopup(text) {
		const _ =  this;
		_.closePopup();
		_.f('BODY').append(_.markup(_.successPopupTpl(text,'green')));
		setTimeout(_.closePopup.bind(_),3000)
	}
	showErrorPopup(text) {
		const _ =  this;
		_.closePopup();
		_.f('BODY').append(_.markup(_.successPopupTpl(text,'red')));
		setTimeout(_.closePopup.bind(_),3000);
	}
	closePopup(clickData) {
		const _ = this;
		let label;
		if (clickData && clickData.item) label = clickData.item.closest('.label');
		else label = _.f('.label');
		if (label) label.remove();
	}

	async init(blockData){
		const _ = this;
		let params;
		if(blockData && blockData['params']){
			params = blockData['params'];
		}
		_.header = await _.getBlock({name:'header'},'blocks');
		if(params && params.length > 0){
			await _.moduleRender(params);
			_.currentSection = '/parent/' + params[0];
		}
		setTimeout(()=>{
			_.navigationInit();
		},1500)
	}
}

export { ParentPage }