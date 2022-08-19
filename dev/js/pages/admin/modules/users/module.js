import {G_Bus} from "../../../../libs/G_Control.js";
import {Model}  from "./model.js";
import {AdminPage} from "../../admin.page.js";
// Открывается саммари если не обновляешь страницу
export class UsersModule extends AdminPage {
	constructor() {
		super();
		this.moduleStructure = {
			'header':'fullHeader',
			'header-tabs':'adminTabs',
			'body-tabs':'usersBodyTabs',
			'body':'usersBody',
			'footer':'adminFooter'
		}
	}

	async asyncDefine(){
		const _ = this;
		Model.currentUsersType = 'student';
		_.activityHeaderData = [
			{title:'40h:35min:57sec',info:'Total time spent in App'},
			{title:'28min:30sec',info:'Average time spent per session'},
			{title:'86',info:'Number of sessions'},
			{title:'Sunday March 17, 2022',info:'Last session'},
		]
		_.activityData = [
			{course:'ISEE',color:'turquoise',date:'2022-03-17',timeIn:'10:00 AM',timeOut:'10:45 AM',duration:'00:45:40'},
			{course:'ISEE',color:'turquoise',date:'2022-03-16',timeIn:'10:00 AM',timeOut:'10:45 AM',duration:'00:45:40'},
			{course:'SHSAT',color:'blue',date:'2022-03-15',timeIn:'10:00 AM',timeOut:'10:45 AM',duration:'00:45:40'},
			{course:'ISEE',color:'turquoise',date:'2022-03-14',timeIn:'10:00 AM',timeOut:'10:45 AM',duration:'00:45:40'},
			{course:'ISEE',color:'turquoise',date:'2022-03-13',timeIn:'10:00 AM',timeOut:'10:45 AM',duration:'00:45:40'},
		];

		//_.studentsInfo =
		//G_Bus.trigger(_.componentName,'showSuccessPopup','Course has been successfully removed')
		//G_Bus.trigger(_.componentName,'showErrorPopup','Error, try again later')
	}
	define(){
		const _ = this;
		_.componentName = 'UsersModule';
		_.maxStep = 6;
		_.maxAssignStep = 4;
		_.minStep = 1;
		_.coursePos = 0;
		_.parentInfo = {};
		_.studentInfo = {};
		_.metaInfo = {};
		_.adminInfo = {};
		_.subSection = 'student';
		_.validationsSteps = [/*2,3,4,5*/];
		_.parentSkipped =  false;
		_.searchInfo = {};
		_.set({
			addingStep : 1,
			assignStep : 1
		});

		G_Bus
			.on(_,[
				'handleErrors',
				'addStudent','showAssignPopup','showRemoveUserPopup','showRemoveAdminPopup','removeUser','removeAdmin',
				'showRemoveParentPopup','removeParent',
				'changeNextStep','changePrevStep','jumpToStep',
				'showRemovePopup','removeCourse',
				'domReady',
				'assignParent','addNewParent','assignCourse','skipParent','updateParent',
				'changeTestType','changeStudentLevel','changeSection',
				'fillAdminInfo',
				'fillStudentInfo','createStudent','skipTestDate',
				'fillParentInfo','assignStudentToParent','removeAssignedParent',
				'selectAvatar','pickAvatar','confirmAvatar','closeAvatar',
				'showSuccessPopup','showErrorPopup','closePopup',
				'generatePassword','validatePassword','showChangePassword','saveChangePassword',
				'changeProfileTab','updateStudent','updateAdmin',
				'showAddParentPopup','showPopupParentProfile','changeParentPopupProfileTab','cancelParentProfile',
				'showHistoryDetails','createNewParent','assignFirstParent',
				'notificationNavigate','showAddCard','showAddBillingAddress','searchUsers','filterUsersByDates',
				'checkEmail',
				'paginate','paginateTo',
			]);

		_.initialState = {
			studentInfo: {},
			parentInfo: {},
			metaInfo: {},
			adminInfo: {}
		}

	}
	garbageCollector(garbageList){
		const _ = this;
		if (!Array.isArray(garbageList)) return void 0;

		for (let garbage of garbageList) {
			if (_[garbage]) _[garbage] = _.initialState[garbage];
		}
	}

	async domReady(data){
		const _ = this;
		_.parentInfo = {};
		_.studentInfo = {};
		_.wizardData = Model.wizardData ?? await Model.getWizardData();
		if(_.subSection === 'student'){
			let
				item,update= true;
			if(data){
				item = data.item;
				update = item.hasAttribute('rerender');
			}
			_.fillTableFilter();

			let tableData = await Model.getUsers({role:_.subSection,update: update});
			_.fillUserTable({usersData:tableData,selector: '#usersBody'});
			_.paginationFill({total:tableData.total,limit:tableData.limit});

			_.studentInfo = {};
		}
		if( _.subSection === 'profile'){
			_.fillProfile(data);
			_._$.assignStep = 1;
		}
		if( _.subSection === 'adminProfile'){
			_.fillAdminProfile(data);
			_._$.assignStep = 1;
		}
		if( _.subSection === 'parentProfile'){
			_.fillParentProfile(data);
		}
		if( _.subSection === 'parent'){
			let
				item,update= true;
			if(data){
				item = data.item;
				update = item.hasAttribute('rerender');
			}
			_.fillTableFilter();
			let tableData = await Model.getUsers({role:_.subSection,update: update});
			_.paginationFill({total:tableData.total,limit:tableData.limit});
			_.fillBodyParentsTable({usersData:tableData});
		}
		if( _.subSection === 'admin'){
			let
				item,update = true;
			if(data){
				item = data.item;
				update = item.hasAttribute('rerender');
			}
			_.fillTableFilter();
			let tableData = await Model.getUsers({role:_.subSection,update: update});
			_.paginationFill({total:tableData.total,limit:tableData.limit});
			_.fillBodyAdminsTable(tableData);
		}
	}

	// Create methods
	async createNewParent(){
		const _ = this;

		let response = await Model.createParent(_.parentInfo);
		if(!response) return void 0;
		let role = _.subSection;

		if (_.subSection == 'profile') {
			Model.assignStudentToParent(response._id,_.studentInfo.studentId);
			role = 'parent';
		}

		G_Bus.trigger('modaler','closeModal');
		G_Bus.trigger(_.componentName,'showSuccessPopup','Parent has been successfully added');

		let users = await Model.getUsers({role,page: 1,update: true});
		_.parentInfo = {};
		_.metaInfo = {};
		if (_.subSection == 'profile') {
			_.fillParentsInfoTable({response:[response]});
			_.f('g-body .button-link.blue').textContent = 'Change parent';
		} else {
			_.fillParentsTable({usersData:users});
		}
	}
	async createStudent(){
		const _ = this;
		if(!_.parentSkipped){
			if(!_.studentInfo['parentId']){
				let parent = await Model.createParent(_.parentInfo);
				_.studentInfo['parentId'] = parent['_id'];
			}
		}
		let response = await Model.createStudent(_.studentInfo);
		if (!response) {
			return void 0;
		}
		_.clearData();
		G_Bus.trigger('modaler','closeModal');
		G_Bus.trigger(_.componentName,'showSuccessPopup','Student has been successfully added');
		_._$.addingStep = 1;
		let users = await Model.getUsers({role:_.subSection,page: 1,update: true});
		_.fillUserTable({usersData:users,selector:'#usersBody'});
	}
	// Create methods
	
	// Update methods
	async updateStudent({item}){
		const _ = this;
		let response = await Model.updateStudent({
			'studentId': _.studentInfo['studentId'],
			'firstName': _.studentInfo['firstName'],
			"lastName": _.studentInfo['lastName'],
			"email": _.studentInfo['email'],
			"password": _.studentInfo['password'],
			"avatar": _.studentInfo['avatar'],
			"grade": _.studentInfo['grade'],
			"currentSchool": _.studentInfo['currentSchool']
		});
		if(!response) return void 0;

		item.setAttribute('rerender',true);
		item.setAttribute('section','student');
		G_Bus.trigger(_.componentName,'changeSection',{item})
		_.showSuccessPopup('Student profile updated')
	}
	async updateAdmin({item}){
		const _ = this;
		let response = await Model.updateAdmin({
			'_id': _.adminInfo['_id'],
			'firstName': _.adminInfo['firstName'],
			"lastName": _.adminInfo['lastName'],
			"email": _.adminInfo['email'],
			"role": _.adminInfo['role'][0],
		});
		if(!response) return void 0;

		item.setAttribute('rerender',true);
		item.setAttribute('section','admin');
		G_Bus.trigger(_.componentName,'changeSection',{item})
		_.showSuccessPopup('Admin profile updated')
	}
	async updateParent({item}){
		const _ = this;
		let response = await Model.updateParent({
			'_id': _.parentInfo['_id'],
			'firstName': _.parentInfo['firstName'],
			"lastName": _.parentInfo['lastName'],
			"email": _.parentInfo['email'],
			"role": _.parentInfo['role'][0],
		});
		if(!response) return void 0;

		item.setAttribute('rerender',true);
		item.setAttribute('section','parent');
		G_Bus.trigger(_.componentName,'changeSection',{item})
		_.showSuccessPopup('Parent profile updated')
	}
	async saveChangePassword({item}){
		const _ = this;
		let
			form = item.closest('.passwords'),
			inputs = form.querySelectorAll('G-INPUT[type="password"]'),
			role = form.getAttribute('data-role') ?? 'student';

		let passwords = {
			'_id': _[`${role}Info`].outerId ?? _[`${role}Info`]._id
		};

		for (let input of inputs) {
			let name = input.getAttribute('name');
			_[`${role}Info`][name] = input.value;
			passwords[name] = input.value;
		}

		let response = await Model.updateStudentPassword(passwords);
		if (response) {
			G_Bus.trigger('modaler','closeModal')
			_.showSuccessPopup('Password has been changed');
		}
	}
	// Update methods
	
	
	// Fill methods
	fillParentInfo({item}){
		const _ = this;
		let
			prop = item.getAttribute('name'),
			value = item.value;
		if( typeof value == 'object'){
			value = value+'';
		}
		_['parentInfo'][prop] = value;
	}
	fillStudentInfo({item}){
		const _ = this;
		let
			prop = item.getAttribute('name'),
			value = item.value;
		if( typeof value == 'object'){
			value = value + '';
		}
		if( (prop == 'firstSchool') || (prop == 'secondSchool')|| (prop == 'thirdSchool')|| (prop == 'grade')){
			_.metaInfo[prop] = item.textContent;
		}
		_['studentInfo'][prop] = value;
	}
	fillAdminInfo({item}){
		const _ = this;
		_.adminInfo[item.getAttribute('name')] = item.value;
	}
	skipTestDate({item}){
		const _ = this;
		let
			cont = item.closest('.adding-section'),
			inputDate = cont.querySelector('g-input');
		if (item.id == "have_yet") {
			_.studentInfo.testDatePicked = false;
			_.studentInfo.testDate = null;
			inputDate.setAttribute('disabled',true);
			inputDate.value = '';
		} else {
			_.studentInfo.testDatePicked = true;
			inputDate.removeAttribute('disabled')
		}
	}
	fillDataByClass({className,data}){
		const _ = this;
		let conts = _.f(`${className}`);
		if(conts.length){
			conts.forEach( item=>{
				item.textContent = data;
			});
		} else {
			conts.textContent = data;
		}
	}
	async fillUserTable({usersData,selector = '',cont}){
		const _ = this;
		let
			tbody = cont ? cont.querySelector('.tbl-body') : _.f(selector + ' .tbl-body'),
			total = usersData['total'];

		_.clear(tbody);

		_.fillDataByClass({className:`.gusers-count`,data:`${usersData ? total : 0}`});

		if(!usersData.total) {
			return void 'No users data';
		}
		
		let tableData = _.usersBodyRowsTpl(usersData);
		tbody.append(...tableData);
		if (usersData.response.length) _.connectTableHead(selector);
	}
	async fillParentBlock({usersData}){
		const _ = this;
		let total = usersData['total'];
		_.fillDataByClass({className:`#assignParent .users-count`,data:`${usersData ? total : 0}`});

		if(!usersData) {
			return void 'no users data';
		}
	}
	async fillParentsTable({usersData}){
		const _ = this;
		let tbody = _.f(`#assignParent .tbl-body`);
		if (!tbody) {
			_.fillBodyParentsTable({usersData});
			return;
		}
		let tableData = _.parentsBodyRowsTpl({usersData});
		_.clear(tbody)
		tbody.append(...tableData);
		if (usersData.response.length) _.connectTableHead('#assignParent');
	}
	async fillBodyParentsTable({usersData,cont,role}){
		const _ = this;
		let
			tbody = cont ? cont.querySelector('.tbl-body') : _.f(`#bodyParents .tbl-body`),
			tableData = _.parentsBodyRowsTpl({usersData,type:'single',cont,role}),
			total = usersData['total'],
			limit = usersData['limit'];
		
		_.fillDataByClass({className:`.gusers-count`,data:`${usersData ? total : 0}`});
		_.fillDataByClass({className:`.gusers-limit`,data:`${usersData ? (limit <= total ? limit : total) : 0}`});
		_.clear(tbody)
		tbody.append(...tableData);
		if (usersData.response.length)_.connectTableHead('#bodyParents');
	}
	async fillProfile(profileData) {
		const _ = this;
		let studentId;
		if(profileData['item']){
			studentId = profileData['item'].getAttribute('data-id');
			_.subSection = profileData['item'].getAttribute('section');
		} else {
			studentId = profileData['studentId'];
		}
		let currentStudent = Model.studentsData.response.filter( student => student['_id'] == studentId )[0];
		console.log(currentStudent)
		_.studentInfo = Object.assign({},currentStudent['user']);
		_.metaInfo = {};
		_.studentInfo['currentSchool'] = currentStudent['currentSchool'] ?? '';
		_.studentInfo['currentPlan'] = currentStudent['currentPlan'];
		_.studentInfo['grade'] = currentStudent['grade'] ? currentStudent['grade']['_id'] : '';
		_.studentInfo['studentId'] = currentStudent['_id'];
		
		_.f('.student-profile-inner').innerHTML = _.personalInfo();
		_._$.addingStep = 1;

		if (currentStudent['currentPlan']){
			_.studentInfo['firstSchool'] = currentStudent['currentPlan'].firstSchool ? currentStudent['currentPlan'].firstSchool['_id'] : '';
			_.studentInfo['secondSchool'] = currentStudent['currentPlan'].secondSchool ? currentStudent['currentPlan'].secondSchool['_id'] : '';
			_.studentInfo['thirdSchool'] = currentStudent['currentPlan'].thirdSchool ? currentStudent['currentPlan'].thirdSchool['_id'] : '';
			_.f('.student-profile-course-info').innerHTML = _.courseInfo(await Model.getWizardData());
		} else _.f('.student-profile-course-info').innerHTML = _.emptyCourseInfo();
		_.f('.breadcrumbs').innerHTML = _.breadCrumbsTpl([{title:'Users'},{title:'Students'},{title:`${_.studentInfo['firstName']} ${_.studentInfo['lastName']} Profile`}]);
	}
	async fillAdminProfile(profileData) {
		const _ = this;
		let adminId;
		if(profileData['item']){
			adminId = profileData['item'].getAttribute('data-id');
			_.subSection = profileData['item'].getAttribute('section');
		} else {
			adminId = profileData['_id'];
		}
		let currentAdmin = Model.adminsData.response.filter( admin => admin['_id'] == adminId )[0];
		_.adminInfo = Object.assign({},currentAdmin['user']);
		_.adminInfo['outerId'] = _.adminInfo['_id'];
		_.adminInfo['_id'] = currentAdmin['_id'];

		_.f('.admin-profile-inner').innerHTML = _.adminProfileInner();
		_.f('.breadcrumbs').innerHTML = _.breadCrumbsTpl([{title:'Users'},{title:'Admins'},{title:`${_.adminInfo['firstName']} ${_.adminInfo['lastName']} Profile`}]);
	}
	async fillParentProfile(profileData) {
		const _ = this;
		let parentId;
		if(profileData['item']){
			parentId = profileData['item'].getAttribute('data-id');
			_.subSection = profileData['item'].getAttribute('section');
		} else {
			parentId = profileData['_id'];
		}
		let
			currentParent = Model.parentsData.response.filter( parent => parent['_id'] == parentId )[0];
		//console.log(currentParent)
		_.parentInfo = Object.assign({},currentParent['user']);
		_.parentInfo['outerId'] = _.parentInfo['_id'];
		_.parentInfo['_id'] = currentParent['_id'];

		_.f('.parent-profile-inner').innerHTML = _.parentsProfileInner();
		_.f('.breadcrumbs').innerHTML = _.breadCrumbsTpl([
			{title:'Users'},
			{title:'Parents'},
			{title:`${_.parentInfo['firstName']} ${_.parentInfo['lastName']} Profile`}
		]);
	}
	async fillParentsInfoTable(parentsData){
		const _ = this;
		let tbody = _.f(`.parents-info-table .tbl-body`);
		let tableData = _.parentsBodyRowsTpl({usersData:parentsData,type:'parentsInfo'});
		_.clear(tbody)
		tbody.append(...tableData);
		_.connectTableHead('.student-profile-inner');
	}
	fillActivityTable(){
		const _ = this;
		let table = _.f('.activity-table .tbl-body');
		_.clear(table);
		table.append(..._.activityBodyRowsTpl(_.activityData));
	}
	async fillStudentsTable(usersData,selector){
		const _ = this;
		let
			tbody = _.f('#parent-profile-popup .tbl-body');
		
		_.clear(tbody);
		
		if(!usersData) {
			return void 'no users data';
		}
		let
			tableData = _.usersBodyRowsTpl(usersData,'parent');
		tbody.append(...tableData);
		_.connectTableHead(selector);
	}
	async fillBodyAdminsTable(adminsData){
		const _ = this;
		let
			tbody = _.f(`#bodyAdmins .tbl-body`),
			tableData = _.parentsBodyRowsTpl({usersData:adminsData,type:'single'}),
			total = adminsData['total'],
			limit = adminsData['limit'];

		_.fillDataByClass({className:`.gusers-count`,data:`${adminsData ? total : 0}`});
		_.fillDataByClass({className:`.gusers-limit`,data:`${adminsData ? (limit <= total ? limit : total) : 0}`});
		_.clear(tbody)
		tbody.append(...tableData);
		_.connectTableHead('#bodyAdmins');
	}
	clearData(){
		const _ = this;
		_.studentInfo = {};
		_.parentInfo = {};
		_.parents = {};
		_.metaInfo = {};
		_.parentSkipped = false;
		_.coursePos = 0;
	}
	// fill tables methods
	async fillTableFilter(){
		const _ = this;
		let filters = _.f('.filter');
		if (filters.length) {
			for (let filter of filters) {
				_.fillOneFilter(filter);
			}
		} else {
			_.fillOneFilter(filters)
		}
	}
	fillOneFilter(filter){
		const _ = this;
		_.clear(filter);

		let role = filter.hasAttribute('role') ? filter.getAttribute('filter') : _.subSection;
		filter.append(_.markup(_.filterTpl()))

		if (!_.searchInfo[role]) _.searchInfo[role] = {page: 1};
		setTimeout(()=>{
			for (let key in _.searchInfo[role]) {
				let
					input = filter.querySelector(`[name="${key}"]`),
					value = _.searchInfo[role][key];
				if (input) input.value = value;
			}
		})
	}
	paginationFill({limit,total,selector,cont}){
		const _ = this;
		let paginations = cont ? [cont] : document.querySelectorAll(`${selector ? selector + ' ' : ''}.pagination`);
		if (!paginations.length) return;
		let role = _.subSection;
		if (!_.searchInfo[role]) _.searchInfo[role] = {page: 1};
		if (!_.searchInfo[role].page) _.searchInfo[role].page = 1;
		let tpl = _.paginationTpl({limit,total,page:_.searchInfo[role].page})
		paginations.forEach(function (item){
			_.clear(item);
			item.append(_.markup(tpl));
		})
	}
	async getSearchUsers({searchInfo,cont,role}){
		const _ = this;
		if (!role) role = _.subSection;
		let usersData = await Model.getUsers({role,update: true,searchInfo});

		if(role == 'student') {
			_.fillUserTable({usersData,cont});
		}
		if(role == 'parent') {
			_.fillBodyParentsTable({usersData,cont,role});
		}
		if(role == 'admin') {
			_.fillBodyAdminsTable({usersData,cont})
		}
		_.studentInfo = {};
		_.metaInfo = {};
		let paginationData = {
			cont:cont.querySelector('.pagination'),
			page:_.searchInfo[role].page,
			limit:usersData.limit,
			total:usersData.total
		}
		_.rebuildPagination(paginationData);
	}
	// Fill methods end

	// Adding methods
	async addStudent({item}) {
		const _ = this;
		
		_._$.addingStep = _._$.addingStep;

		G_Bus.trigger('modaler','showModal', {type:'html',target:'#addingForm'});
	
	}
	addNewParent(clickData) {
		const _ = this;
		let container;
		if (clickData) {
			let item = clickData.item;
			item.parentElement.querySelector('.active').classList.remove('active');
			item.classList.add('active');

			container = item.closest('.adding-body');
		} else {
			container = _.f('#addingForm');
		}
		let cont = container.querySelector('.adding-assign-body');
		if (cont) {
			_.clear(cont);
			cont.classList.remove('full');
			cont.append(_.markup(_.assignNewParent()))
		}

		_.parentSkipped =  false;
		_.studentInfo.parentId = null;
		_.metaInfo.parentAssigned = false;
		_.metaInfo.parentAddType = 'adding';
	}
	async selectAvatar(clickData) {
		const _ = this;

		let listCont = _.f('.avatars-list');
		if (!listCont.children.length ) {
			_.avatars = await Model.wizardData['avatars'];
			listCont.append(_.markup(_.avatarsItemsTpl()));
		}

		let activeAvatar = listCont.querySelector('.active');
		if (activeAvatar) activeAvatar.classList.remove('active');
		let avatarInfo = _.studentInfo ? _.studentInfo.avatar : null;
		if (avatarInfo) {
			listCont.querySelector(`[value="${avatarInfo['_id'] ?? avatarInfo}"]`).classList.add('active');
		}

		let callback = clickData.item.getAttribute('data-callback');
		if (callback) {
			_.f('#avatars').setAttribute('data-callback',callback);
		}

		G_Bus.trigger('modaler','closeModal');
		G_Bus.trigger('modaler','showModal', {type:'html',target:'#avatars'});
	}
	pickAvatar({item}) {
		const _ = this;
		let
			listCont = item.closest('.avatars-list'),
			activeBtn = listCont.querySelector('.active');
		if (activeBtn) activeBtn.classList.remove('active');
		item.classList.add('active')

		let avatarName = item.getAttribute('title');
		_['metaInfo'].avatarName = avatarName;
		_['metaInfo'].avatar = item.value;
	}
	confirmAvatar({item}){
		const _ = this;

		_['studentInfo'].avatar = _['metaInfo'].avatar;
		_['studentInfo'].avatarName = _['metaInfo'].avatarName;

		let img = _.markup(`<img src="/img/${_['studentInfo'].avatarName}.svg">`)
		let avatarCont = _.f('.adding-avatar-letter');
		_.clear(avatarCont);
		avatarCont.append(img);

		_.closeAvatar({item})
	}
	closeAvatar({item}){
		const _ = this;
		let
			modalCont = item.closest('.avatars'),
			callback = modalCont.getAttribute('data-callback');

		G_Bus.trigger('modaler','closeModal');

		if (callback) {
			modalCont.removeAttribute('data-callback');
			_[callback]({item})
		}
	}
	// Adding methods end
	
	// Change methods
	changeStudentLevel({item}) {
		const _ = this;
		if(item.parentNode.querySelector('.active')) item.parentNode.querySelector('.active').classList.remove('active');
		item.classList.add('active');
		_['studentInfo']['level'] = item.getAttribute('data-id');
		_['metaInfo']['level'] = item.textContent;
	}
	async changeTestType({item}) {
		const _ = this;
		if(item.parentNode.querySelector('.active')) item.parentNode.querySelector('.active').classList.remove('active');
		item.classList.add('active');
		let
			pos = parseInt(item.getAttribute('pos')),
			levelButtons = item.closest('.adding-body').querySelector('.level-buttons');
		_.clear(levelButtons);
		levelButtons.innerHTML = '<img src="/img/loader.gif">';
		let stepData = await Model.getWizardData();
		_.coursePos = pos;
		_['studentInfo'].course = stepData['courses'][pos]['_id'];
		_['studentInfo'].level = stepData['courses'][pos]['levels'][0]['_id'];
		_['metaInfo'].course = stepData['courses'][pos]['title'];
		_['metaInfo'].level = stepData['courses'][pos]['levels'][0]['title'];
		levelButtons.innerHTML = _.levelButtons(stepData['courses'][pos]);
	}
	async changeSection({item,event}) {
		const _ = this;
		_.subSection = item.getAttribute('section');
		let struct = _.flexible();
		await _.render( struct,{item} );
		_.switchSubNavigate();
	}
	async changeProfileTab({item}) {
		const _ = this;
		let pos = item.getAttribute('data-pos');
		item.parentNode.querySelector('.active').classList.remove('active');
		item.classList.add('active');
		let studentInner = _.f('.student-profile-inner');
		let adminInner = _.f('.admin-profile-inner');
		let parentInner = _.f('.parent-profile-inner');
		if(pos == 0){
			studentInner.classList.remove('short')
			_.fillProfile({studentId:_.studentInfo['studentId']});
		}
		if(pos == 1){
			studentInner.classList.remove('short')
			studentInner.innerHTML = _.parentsInfo();
			//let parentsData = await Model.getUsers({role: 'parent'});
			_.currentParent = await Model.getStudentParents( _.studentInfo['studentId'] );
			if ( _.currentParent['response']['length'] ){
				studentInner.querySelector( '.button-link.blue' ).textContent = 'Change parent';
			}
			_.fillParentsInfoTable( _.currentParent );
		}
		if(pos == 2){
			studentInner.classList.remove('short')
			studentInner.innerHTML = _.activityHistory();
			_.fillActivityTable();
			_.connectTableHead('.activity-table')
		}
		if(pos == 3){
			studentInner.classList.add('short');
			_.notificationsData = await Model.getAdminNotifications();
			studentInner.innerHTML = _.notifications(_.notificationsData,{title:'Notifications'});
		}
		if(pos == 4){
			adminInner.classList.remove('short')
			_.fillAdminProfile({_id:_.adminInfo['_id']});
		}
		if(pos == 5){
			adminInner.classList.remove('short')
			adminInner.innerHTML = _.activityHistory();
			_.fillActivityTable();
			_.connectTableHead('.activity-table');
		}
		if(pos == 6){
			parentInner.classList.remove('short')
			_.fillParentProfile({_id:_.parentInfo['_id']});
		}
		if (pos == 9) {
			parentInner.classList.remove('short')
			parentInner.innerHTML = _.activityHistory();
			_.fillActivityTable();
			_.connectTableHead('.activity-table')
		}
		if (pos == 10) {
			_.notifSubsections = await Model.getParentNotificationsSections();
			_.notificationsData = await Model.getParentNotifications(_.notifSubsections[0].value);
			let layout = `
				<div class="notifications-cont">
					${_.notificationsNavigation(_.notifSubsections)}
					<div class="notifications-list-cont">
						${_.notifications(_.notificationsData,{
							title:'General Notifications',
							subtitle:'User gets notification when',
							types:_.notifSubsections[0].types})}
					</div>
				</div>
			`;
			parentInner.innerHTML = layout;
		}
		if (pos == 11) {
			let
				cards = await Model.getCardsInfo(),
				addresses = await Model.getBillingAddressInfo();
			let layout = _.billingsTpl();
			parentInner.innerHTML = layout;
			_.fillParentCardsInfo(cards);
			_.fillParentAddressesInfo(addresses);
			//
		}
	}
	showAddCard({item}){
		const _ = this;
		G_Bus.trigger('modaler','showModal',{type:'html',target:'#addCard'})
	}
	showAddBillingAddress({item}){
		const _ = this;
		G_Bus.trigger('modaler','showModal',{type:'html',target:'#addBillingAddress'})
	}
	fillParentCardsInfo(cardsInfo){
		const _ = this;
		let cardsCont = _.f('#cards');
		_.clear(cardsCont)
		if (cardsInfo.length) {
			cardsCont.append(_.markup(_.fillParentCardsTpl(cardsInfo)));
		}
	}
	fillParentAddressesInfo(addressesInfo){
		const _ = this;
		let addressesCont = _.f('#billing-addresses');
		_.clear(addressesCont)
		if (addressesInfo.length) {
			addressesCont.append(_.markup(_.fillParentAddressTpl(addressesInfo)));
		}
	}
	async changeParentPopupProfileTab({item}) {
		const _ = this;
		let
			pos = item.getAttribute('data-pos'),
			parentId = _.f('#parent-profile-popup').getAttribute('data-id');
		item.parentNode.querySelector('.active').classList.remove('active');
		item.classList.add('active');
		let container = _.f('.parent-popup-profile-body');
		if(pos == 0){
			container.classList.add('adding-center');
			container.innerHTML = _.parentPersonalInfoTpl();
		}
		if(pos == 1){
			container.classList.remove('adding-center');
			container.innerHTML = _.parentChildesInfoTpl();
			let tableData = await  Model.getParentStudents(parentId);
			_.fillStudentsTable(tableData,'#parent-profile-popup');
		}
	}
	flexible(){
		const _ = this;
		if(_.subSection === 'profile') {
			return {
				'body': 'profile'
			};
		} else if(_.subSection === 'adminProfile') {
			return {
				'body': 'adminProfile'
			};
		} else if(_.subSection === 'parentProfile') {
			return {
				'body': 'parentProfile'
			};
		} else if(_.subSection === 'student') {
			return {
				'body': 'usersBody'
			};
		} else if (_.subSection === 'parent') {
			return {
				'body': 'parentsBody'
			};
		} else if (_.subSection === 'admin') {
			return {
				'body':'adminsBody'
			};
		}
	}
	// Change methods end
	
	// Show methods
	async showAssignPopup({item}) {
		const _ = this;
		_._$.assignStep = _._$.assignStep;
		G_Bus.trigger('modaler','showModal', {type:'html',target:'#assignForm'});
	}
	showRemovePopup({item}) {
		const _ = this;
		G_Bus.trigger('modaler','showModal', {type:'html',target:'#removeForm','closeBtn':'hide'});
	}
	showRemoveUserPopup({item}){
		const _ = this;
		_.studentInfo['studentId'] = item.getAttribute('data-id');
		//_.metaInfo['sourse'] = '';
		G_Bus.trigger('modaler','showModal', {item:item,type:'html',target:'#removeUserForm','closeBtn':'hide'});
	}
	showRemoveAdminPopup({item}){
		const _ = this;
		G_Bus.trigger('modaler','showModal', {item:item,type:'html',target:'#removeAdminForm','closeBtn':'hide'});
	}
	showRemoveParentPopup({item}){
		const _ = this;
		_.parentInfo['parentId'] = item.getAttribute('data-id');
		G_Bus.trigger('modaler','showModal', {item:item,type:'html',target:'#removeParentForm','closeBtn':'hide'});
	}
	showAddParentPopup({item}){
		const _ = this;
		_.addNewParent();
		let from = item.getAttribute('from');
		if (!_.parentInfo || !_.parentInfo.type || _.parentInfo.type !== 'adding') _.parentInfo = {type:'adding'}
		_.f('.parent-popup-body').innerHTML = _.parentAddingFromProfile(from);
		
		G_Bus.trigger('modaler','showModal',{
			type: 'html',
			target: '#add-parent'
		})
	}
	async showPopupParentProfile({item}){
		const _ = this;

		let parentId = item.getAttribute('data-id');
		_.f('#parent-profile-popup').setAttribute('data-id',parentId);

		let tableData = await Model.getUsers({role:'parent'});
		_.currentParent = tableData.response.filter( parent => parent['_id'] == parentId )[0];
		_.parentInfo = _.currentParent['user'];
		
		G_Bus.trigger('modaler','closeModal');
		_.f('.parent-popup-profile-body').innerHTML = _.parentPersonalInfoTpl();
		G_Bus.trigger('modaler','showModal',{
			type: 'html',
			target: '#parent-profile-popup',
			closeBtn: 'hide'
		});
	}
	showHistoryDetails({item}){
		const _ = this;
		G_Bus.trigger('modaler','showModal',{target:'#historyDetails'})
	}
	showChangePassword({item}){
		const _ = this;
		let role = item.getAttribute('data-role');
		if (role) {
			let targetForm = _.f('#changePassword');
			targetForm.setAttribute('data-role',role);
		}
		G_Bus.trigger('modaler','showModal',{target:'#changePassword'})
	}
	async notificationNavigate({item}){
		const _ = this;
		let
			cont = _.f('.notifications-list-cont'),
			index = parseInt(item.getAttribute('data-pos'));
		item.closest('.notifications-navigate-list').querySelector('.active').classList.remove('active');
		item.classList.add('active');
		_.notifSubsections = await Model.getParentNotificationsSections();
		_.notificationsData = await Model.getParentNotifications(_.notifSubsections[index].value);
		cont.innerHTML = _.notifications(_.notificationsData,{
			title:'General Notifications',
			subtitle:'User gets notification when',
			types:_.notifSubsections[index].types
		});
	}

	cancelParentProfile({item}){
		const _ = this;
		G_Bus.trigger('modaler','closeModal');

		if (_.subSection === 'student'){
			G_Bus.trigger(_.componentName,'addStudent',{item});
			G_Bus.trigger(_.componentName,'assignParent');
		}
	}
	// Show methods end
	
	// Validation methods
	nextStepBtnValidation(){
		const _ = this;
		let stepBtn = _.f(`#addingForm .step-next-btn`);
		if (_.validationsSteps.indexOf(_._$.addingStep) >= 0) {
			if (!_.stepValidation()) {
				stepBtn.setAttribute('disabled',true);
				return void 0;
			}
		}
		stepBtn.removeAttribute('disabled')
	}
	stepValidation(){
		const _ = this;
		if (_._$.addingStep == 2) {
			return _.stepTwoValidation();
		} else if (_._$.addingStep == 3) {
			return _.stepThreeValidation();
		}
	}
	stepTwoValidation(){
		const _ = this;
		let props = ['firstName','lastName','email','avatar','password','cpass'];
		for (let prop of props) if (!_.studentInfo[prop]) return false;

		if (_.searchInfo.cpass !== _.studentInfo.password) {
			_.showErrorPopup('Password and Repeat password must match');
			return false;
		}

		return true;
	}
	stepThreeValidation(){
		const _ = this;
		if (_.metaInfo && _.metaInfo.parentAddType == 'addNewParent') {
		
		}
	}
	validatePassword({item}){
		const _ = this;
		let
			cont = item.closest('.passwords'),
			inputs = cont.querySelectorAll('G-INPUT[type="password"]'),
			text = item.nextElementSibling;


		if (item == inputs[0]) {
			if (item.value.length < 8) {
				item.setMarker('red');
				text.style = 'color: red;';
			} else {
				item.setMarker();
				text.removeAttribute('style');
			}
		} else {
			if (item.value !== inputs[0].value) {
				item.setMarker('red');
				text.style = 'color: red;';
			} else {
				item.setMarker();
				text.style = 'display:none;';
			}
		}

		let callback = item.getAttribute('data-callback');
		if (callback) {
			let callBackDetails = callback.split(':');
			G_Bus.trigger(callBackDetails[0],callBackDetails[1],{item});
		}
	}
	async checkEmail({item}){
		const _ = this;
		let
			value = item.value,
			text = item.nextElementSibling;
		let response = await Model.checkEmail(value);
		if (response.substr(response.length - 4) !== 'free') {
			item.setMarker('red');
			text.textContent = 'User with this email address already exists';
			text.style = 'color: red;'
		} else {
			item.setMarker();
			text.style = 'display:none;'
		}
	}
	// Validation methods end

	handleErrors({method,data}){
		const _ = this;
		//console.log(method,data);
		if( method == 'getUsers'){
			//console.log('Users not found ',data);
		}
	}

	connectTableHead(selector) {
		const _ = this;

		let cont = _.f(`${selector ?? ''} .tbl`);
		if (!cont) return void 0;

		let
			head = cont.querySelector('.tbl-head'),
			ths = head.querySelectorAll('.tbl-item'),
			table = cont.querySelector('TABLE'),
			row = table.querySelector('TBODY TR');

		if (!row) return;

		let tds = row.querySelectorAll('.tbl-item');
		ths.forEach(function (item,index){
			let w = tds[index].getBoundingClientRect().width;
			item.style = `width:${w}px;flex: 0 0 ${w}px;`
		})
	}
	skipParent ({item}) {
		const _ = this;
		item.parentElement.querySelector('.active').classList.remove('active');
		item.classList.add('active')
		let cont = _.f('.adding-assign-body');
		_.clear(cont);
		cont.classList.remove('full');

		_.metaInfo.parentAddType = 'skip'
		cont.append(_.markup(_.skipParentTpl()));
		_.parentSkipped=  true;
	}
	generatePassword({item}){
		const _ = this;
		let
			len = Math.ceil((Math.random() * 8)) + 8,
			inputs = item.closest('.passwords').querySelectorAll('G-INPUT[type="password"]'),
			symbols = ['!','#', '$', '&', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
			password = '',
			input;
		
		for (let i = 0; i < len; i++) {
			let number = Math.ceil(Math.random() * 65);
			password += symbols[number];
		}

		for (let i = 0; i < inputs.length; i++) {
			inputs[i].value = password.toString();
			let callBack = inputs[i].getAttribute('data-input');
			if (callBack) {
				let callBackTitle = callBack.split(':')[1];
				G_Bus.trigger(_.componentName,callBackTitle,{item:inputs[i]})
			}
			if (!i) {
				input = inputs[i].shadow.querySelector('INPUT');
				input.type = 'text';
				input.select();
				document.execCommand("copy");
			}
			_.validatePassword({item:inputs[i]})
		}
		G_Bus.trigger(_.componentName,'showSuccessPopup','Password Generated and Copied');
		setTimeout(()=>{input.type = 'password'},2000)
	}
	
	// Assign methods
	async assignParent(clickData = null) {
		const _ = this;

		let container;
		if ( clickData ) {
			let item = clickData.item;
			item.parentElement.querySelector('.active').classList.remove( 'active' );
			item.classList.add('active');

			container = item.closest('.adding-body');
		} else {
			container = _.f('#addingForm');
		}

		let cont = container.querySelector( '.adding-assign-body' );
		_.clear(cont);
		cont.classList.add( 'full' );

		if ( _.metaInfo.parentAssigned ){
			cont.append( _.markup( _.assignedParent( _.currentParent )));
			return void 0;
		} else {
			cont.append( _.markup( _.assignParentTpl() ));
		}

		_.parents = await Model.getUsers({
			role:'parent',
			page:1
		});

		_.paginationFill({
			total:_.parents.total,
			limit:_.parents.limit,
			cont:cont.querySelector( '.pagination' )
		});

		_.fillParentBlock({
			usersData:_.parents
		});

		_.fillParentsTable({
			usersData:_.parents
		});

		if ( _.currentParent ){
			for ( let parent of _.currentParent['response'] ){
				let curParentAssignBtn = cont.querySelector(`.users-btn.button-blue[data-id="${ parent['_id'] }"]`);
				if ( !curParentAssignBtn ) continue;
				curParentAssignBtn.closest('TR').remove();
			}
		}

		_.parentSkipped =  false;
		_.metaInfo.parentAddType = 'assign';
	}
	async assignStudentToParent({item}) {
		const _ = this;

		let parentId = item.getAttribute('data-id');

		if ( _.subSection === 'profile' && _.studentInfo['studentId'] ){
			let cont = _.f( '#add-parent .tbl' );
			_.clear( cont );
			cont.append( _.markup( `<img src="/img/loader.gif">` ));

			await Model.assignStudentToParent( parentId,_.studentInfo['studentId'] );
			G_Bus.trigger('modaler','closeModal');
			let sectionButton = _.f('g-body .section-button.active');
			_.changeProfileTab({item:sectionButton});
			return;
		}

		if ( _.studentInfo['parentId'] ){
			let
				usersTable = item.closest('.table'),
				usersBtnSelector = `.users-btn[data-id="${_.studentInfo['parentId']}"]`,
				userBtn = usersTable.querySelector(usersBtnSelector);
			userBtn.textContent = 'Assign';
		}
		_.studentInfo['parentId'] = parentId;

		let parData = Model.parentsData.response;
		_.currentParent = parData.filter( parent => parent['_id'] == _.studentInfo['parentId'] )[0];

		_.f('.parent-adding-table').innerHTML = _.assignedParent(_.currentParent);
		_.parentInfo = _.currentParent['user'];
		_.parentInfo.type = 'assigned';
		_.metaInfo.parentAssigned = true;
	}
	async assignCourse({item}) {
		const _ = this;
		let response = await Model.assignCourse(_.studentInfo);
		if(!response)	return void 0;
		_.studentInfo['currentPlan'] = response['currentPlan'];
		let wizardData = await Model.getWizardData();
		_.f('.student-profile-course-info').innerHTML = _.courseInfo(wizardData);
		G_Bus.trigger('modaler','closeModal');
		_.showSuccessPopup('Course has been successfully assigned');
	}
	async assignFirstParent({item}) {
		const _ = this;
		let parentId,studentId = _.studentInfo['studentId'];
		if(!_.metaInfo.parentAddType || ( _.metaInfo.parentAddType == 'adding')){
			let parent = await Model.createParent(_.parentInfo);
			parentId = parent['_id'];
		}else{
			parentId = _.studentInfo['parentId'];
		}
		let response = await Model.assignStudentToParent(parentId,studentId);
		G_Bus.trigger(_.componentName,'showSuccessPopup','')
	}
	// Assign methods
	
	// Remove methods
	async removeCourse({item}) {
		const _ = this;
		let courseInfo = _.f('.student-profile-course-info');
		_.clear(courseInfo);
		await Model.removeCourse({
			studentId:_.studentInfo['studentId'],
			planId:_.studentInfo.currentPlan['_id'],
		});
		courseInfo.innerHTML = _.emptyCourseInfo();
		G_Bus.trigger('modaler','closeModal');
		_.studentInfo.firstSchool = null;
		_.studentInfo.secondSchool = null;
		_.studentInfo.thirdSchool = null;
		_.studentInfo.testDate = null;
		_.studentInfo.testDatePicked = false;
		_._$.assignStep = 1;
		_.showSuccessPopup('Course has been successfully removed')
	}
	async removeUser({item}){
		const _ = this;
		let response = await Model.removeStudent(_.studentInfo['studentId']);
		if (!response) return;
		
		if (_.subSection == 'profile') {
			item.setAttribute('rerender',true);
			item.setAttribute('section','student');
			G_Bus.trigger(_.componentName,'changeSection',{item})
		} else {
			_.f(`TR[user-id="${_.studentInfo['studentId']}"]`).remove();
		}
		G_Bus.trigger('modaler','closeModal',{item})
		_.showSuccessPopup('Student profile deleted')
	}
	async removeAdmin({item}){
		const _ = this;
		let response = await Model.removeAdmin(_.adminInfo['_id']);
		if (!response) return;

		if (_.subSection == 'adminProfile') {
			item.setAttribute('rerender',true);
			item.setAttribute('section','admin');
			G_Bus.trigger(_.componentName,'changeSection',{item})
		} else {
			_.f(`TR[user-id="${_.adminInfo['_id']}"]`).remove();
		}
		G_Bus.trigger('modaler','closeModal',{item})
		_.showSuccessPopup('Admin profile deleted')
	}
	async removeParent({item}){
		const _ = this;
		let response = await Model.removeParent(_.parentInfo['parentId']);
		if (!response) return;
		_.f(`TR[user-id="${_.parentInfo['parentId']}"]`).remove();
		G_Bus.trigger('modaler','closeModal')
		_.showSuccessPopup('Parent profile deleted');
	}
	async removeAssignedParent({item}) {
		const _ = this;
		_.studentInfo['parentId'] = null;
		_.metaInfo['parentAssigned'] = false;
		let cont = _.f( '.parent-adding-table' );
		cont.innerHTML = _.assignParentTpl( true );
		_.paginationFill({
			total:_.parents.total,
			limit:_.parents.limit,
			cont:cont.querySelector('.pagination')
		});
	}
	// Remove methods

	//search methods
	searchUsers({item}) {
		const _ = this;
		let
			name = item.getAttribute('name'),
			value = item.value,
			cont = item.closest('.block'),
			filter = item.closest('.filter'),
			role = filter.getAttribute('role') ?? _.subSection;

		if (!_.searchInfo[role]) _.searchInfo[role] = {page:1};
		_.searchInfo[role][name] = value;
		_.getSearchUsers({searchInfo:_.searchInfo[role],cont,role})
	}
	filterUsersByDates({item}){
		const _ = this;
		let
			cont = item.closest('.block'),
			filter = item.closest('.filter'),
			role = filter.getAttribute('role') ?? _.subSection,
			dates = item.value.split('|');
		if (!_.searchInfo[role]) _.searchInfo[role] = {page:1};
		_.searchInfo[role]['startDate'] = dates[0];
		_.searchInfo[role]['endDate'] = dates[1] ?? dates[0];
		_.searchInfo[role][item.getAttribute('name')] = item.value;

		_.getSearchUsers({searchInfo:_.searchInfo[role],cont,role})
	}
	//end search methods


	setCancelBtn(type = 'adding') {
		const _ = this;
		let stepBtn = _.f(`#${type}Form .step-prev-btn`);
		stepBtn.setAttribute('data-click', 'modaler:closeModal');
		stepBtn.textContent = 'Cancel';
	}
	setPrevBtn(type = 'adding') {
		const _ = this;
		let stepBtn = _.f(`#${type}Form .step-prev-btn`);
		stepBtn.setAttribute('data-click',`${_.componentName}:changePrevStep`);
		stepBtn.setAttribute('step',`2`);
		stepBtn.textContent = 'Back';
	}
	setNextBtn(type = 'adding') {
		const _ = this;
		let stepBtn = _.f(`#${type}Form .step-next-btn`);
		stepBtn.textContent = 'Next';
		stepBtn.className = 'button-blue step-next-btn';
		stepBtn.setAttribute('data-click',`${_.componentName}:changeNextStep`);
	}
	setSubmitBtn(type = 'adding') {
		const _ = this;
		let stepBtn = _.f(`#${type}Form .step-next-btn`);
		stepBtn.className = 'button-blue button-green step-next-btn';
		stepBtn.textContent = 'Submit';
		if(type === 'adding') {
			stepBtn.setAttribute('data-click',`${_.componentName}:createStudent`);
		}
		if(type == 'assign'){
			stepBtn.setAttribute('data-click',`${_.componentName}:assignCourse`);
		}
		
	}
	changeNextStep({item}) {
		const _ = this;
		let type = item.getAttribute('type');
		if( type == 'adding' ) {
			if(_.maxStep > _._$.addingStep) _._$.addingStep++;
			_.nextStepBtnValidation();
		}else{
			if(_.maxAssignStep > _._$.assignStep) _._$.assignStep++;
		}
	}
	changePrevStep({item}) {
		const _ = this;
		let type = item.getAttribute('type');
		if( type == 'adding' ) {
			if(_._$.addingStep > _.minStep) _._$.addingStep--;
			_.nextStepBtnValidation();
		}else{
			if(_._$.assignStep > _.minStep) _._$.assignStep--;
		}
	}
	jumpToStep({item}) {
		const _ = this;
		let
		type = item.getAttribute('type'),
		step = parseInt(item.getAttribute('step'));
		if( type == 'adding' ){
			_._$.addingStep = step;
		}else{
			_._$.assignStep = step;
		}
	}
	async handleAddingSteps({addingStep}) {
		const _ = this;
		if(!_.initedUpdate){
			let wizardData = await Model.getWizardData();
			_.stepsObj = {
				1: _.addingStepOne.bind(_,wizardData),
				2: _.addingStepTwo.bind(_,wizardData),
				3: _.addingStepThree.bind(_,wizardData),
				4: _.addingStepFour.bind(_,wizardData),
				5: _.addingStepFive.bind(_),
				6: _.addingStepSix.bind(_)
			};
			return void 0;
		}
		let
			addingBody = _.f('#addingForm .adding-body');
		if (!addingBody) return void 0;
		addingBody.innerHTML = '<img src="/img/loader.gif">';
		_.clear(addingBody);
		
		if(addingStep == _.minStep){
			_.setCancelBtn();
		}else{
			_.setPrevBtn();
		}
		if(addingStep == _.maxStep){
			_.setSubmitBtn();
		}else{
			_.setNextBtn();
		}
		if(addingStep == 1 ){
			let stepOneData = await Model.wizardData;
			if (!_.studentInfo.course) _['studentInfo'].course = stepOneData['courses'][0]['_id'];
			if (!_.studentInfo.level) _['studentInfo'].level = stepOneData['courses'][0]['levels'][0]['_id'];
			if (!_['metaInfo'].course) _['metaInfo'].course = stepOneData['courses'][0]['title'];
			if (!_['metaInfo'].level) _['metaInfo'].level = stepOneData['courses'][0]['levels'][0]['title'];
		}
		addingBody.append( _.markup( _.stepsObj[ addingStep ]() ) );
		
		_.f('#addingForm .adding-list-item.active').classList.remove('active');
		_.f(`#addingForm .adding-list-item:nth-child(${addingStep})`).classList.add('active');
		if (addingStep == 3 && _.parents) {
			_.paginationFill({limit:_.parents.limit,total:_.parents.total,selector:'#assignParent'})
		}
	}
	async handleAssignSteps({assignStep}) {
		const _ = this;
		if(!_.initedUpdate){
			let wizardData = await Model.getWizardData();
			_.stepsAssignObj = {
				1: _.addingStepOne.bind(_,wizardData),
				2: _.assignStepTwo.bind(_,wizardData),
				3: _.addingStepFive.bind(_),
				4: _.assignStepFour.bind(_),
			};
			return void 0;
		}
		let
			addingBody = _.f('#assignForm .adding-body');
		if (!addingBody) return void 0;
		_.clear(addingBody);
		
		if (assignStep === 1) {
			let wizardData = await Model.getWizardData();
			_['studentInfo'].course = wizardData['courses'][0]['_id'];
			_['studentInfo'].level = wizardData['courses'][0]['levels'][0]['_id'];
			_['metaInfo'].course = wizardData['courses'][0]['title'];
			_['metaInfo'].level = wizardData['courses'][0]['levels'][0]['title'];
		}
		if ( assignStep == _.minStep){
			_.setCancelBtn('assign');
		}else{
			_.setPrevBtn('assign');
		}
		if ( assignStep == _.maxAssignStep){
			_.setSubmitBtn('assign');
		}else{
			_.setNextBtn('assign');
		}
		addingBody.append( _.markup( _.stepsAssignObj[ assignStep ]() ) );
		
		_.f('#assignForm .adding-list-item.active').classList.remove('active');
		_.f(`#assignForm .adding-list-item:nth-child(${ assignStep })`).classList.add('active');
	}


	// Paginate
	paginate({item}){
		const _ = this;
		if (item.hasAttribute('disabled')) return;
		let page = parseInt(item.value);

		_.searchInfo[_.subSection].page = page;
		let cont = item.closest('.block');
		_.getSearchUsers({searchInfo:_.searchInfo[_.subSection],cont});
	}
	paginateTo({item}){
		const _ = this;
		let value = parseInt(item.value);
		let limit = parseInt(item.getAttribute('limit'));

		if (isNaN(value)) item.value = 1;
		else if (value > limit) item.value = limit;
		else item.value = value;

		_.paginate({item})
	}
	rebuildPagination({cont,page = 1,limit,total}){
		const _ = this;
		let from = cont.querySelector('.gusers-page'),
			to = cont.querySelector('.gusers-limit'),
			count = cont.querySelector('.gusers-count'),
			inner = cont.querySelector('.pagination-inner'),
			prev = cont.querySelector('.pagination-prev'),
			next = cont.querySelector('.pagination-next'),
			jumpTo = cont.querySelector('.pagination-jump-to');

		let lastPage = Math.ceil(total / limit);
		let len = lastPage < 5 ? lastPage : 5;
		for (let index = 0; index < len; index++){
			let i,button = inner.children[index];
			if (page < 4) {
				i = index + 1;
			} else if (page > lastPage - 2) {
				i = lastPage - (len - 1) + index;
			} else {
				i = (page - 2) + index;
			}
			if (inner.children.length > len) {
				inner.children[inner.children.length - 1].remove();
			} else {
				if (!button && len > index) {
					button = document.createElement('BUTTON');
					button.className = 'pagination-link';
					inner.append(button);
				}
				button.textContent = i.toString();
				button.value = i;
				if (page == i) button.classList.add('active');
				else button.classList.remove('active')
			}
		}

		let previousPage = page - 1;
		prev.value = previousPage;
		if (previousPage) prev.removeAttribute('disabled');
		else prev.setAttribute('disabled','');

		let nextPage = page + 1;
		next.value = nextPage;
		if (nextPage <= lastPage) next.removeAttribute('disabled');
		else next.setAttribute('disabled','');

		jumpTo.value = page;
		jumpTo.setAttribute('limit',lastPage);

		from.textContent = (page - 1) * limit + 1;
		to.textContent = page * limit > total ? total : page * limit;
		count.textContent = total;
	}
	// End paginate
	
	async init(){
		const _ = this;
		_._( _.handleAddingSteps.bind(_),[ 'addingStep' ] );
		_._( _.handleAssignSteps.bind(_),[ 'assignStep' ] );
	}
	
}