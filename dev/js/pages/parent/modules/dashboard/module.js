import {G_Bus} from "../../../../libs/G_Control.js";
import { Model } from "./model.js";
import {ParentPage} from "../../parent.page.js";

export class DashboardModule extends ParentPage{
	constructor(props) {
		super(props);
		const _ = this;

		_.studentInfo = {};
		_.metaInfo = {};
		_.coursePos = 0;

		_.me = JSON.parse(localStorage.getItem('me'));

		if (_.me['parent']['students']['length']) {
			_.moduleStructure = {
				'header':'fullHeader',
				'header-tabs':'studentTabs',
				'body-tabs':'dashboardTabs',
				'body':'dashboardBodyTpl',
				'footer':'dashboardFooter'
			};
			_.subSection = 'dashboard';
		} else {
			_.moduleStructure = {
				'body':'welcomeTpl',
				'footer':'dashboardFooter'
			};
			_.subSection = 'welcome';
		}
	}
	async asyncDefine(){
		const _ = this;
	}
	define() {
		const _ = this;
		_.componentName = 'Dashboard';
		_.scheduleColors = {
			"skill test":'#FFA621',
			"practice test":'#009EF6',
			'isee':'#4AB58E',
		};

		_.set({
			addingStep : 1
		})
		_.months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
		G_Bus
		.on(_,[
			'domReady','changeSection','changeStudent',
			'generatePassword','validatePassword','checkEmail','fillStudentInfo',
			'addingStep','assignStep',
			'changeStudentLevel','changeTestType','changePayMethod',
			'updateStudent','showRemoveUserPopup','removeUser',
			'selectAvatar','pickAvatar','confirmAvatar','closeAvatar',
			'skipTestDate',
			'showAddCard','showAddBillingAddress',
			'hideProfile','showHiddenScores',
			'fillProfile','showRemovePopup','removeCourse','assignCourse','inputCourseData','updateCourse',
			'showCancelMembership',
		]);
	}
	async domReady() {
		const _ = this;
		if ( !_.wizardData ) _.wizardData = await Model.getWizardData();
		if ( !_.currentStudent ) _.currentStudent = _.me['parent']['students'][0];

		if( _.subSection == 'welcome' ){
			_.body = _.f("g-body");
			_.clear( _.body );
			_.fillWelcome();
		}
		if( _.subSection == 'addingStudent' ){
			_.body = _.f("g-body");
			_.clear( _.body );
			_.fillAddingStudent();
		}
		if( _.subSection == 'assignCourse' ){
			_.body = _.f("g-body");
			_.clear( _.body );
			_.fillassignCourse();
		}
		if( _.subSection == 'dashboard' ){
			_.fillDashboardTabs();
			_.fillStudentProfile();
		}
		if ( _.subSection == 'profile' ){
			_.body = _.f("g-body");
			_.clear( _.body );
			_.fillProfile();
		}
	}
	async changeSection({item, event}) {
		const _ = this;
		_.previousSection = _.subSection;
		let section = item.getAttribute('section');
		_.subSection = section;
		if (item.getAttribute('data-clear')) {
			_.studentInfo = {};
			_.metaInfo = {};
			_.courseData = {};
		}

		if (section == 'welcome') {
			_.moduleStructure = {
				'header':'',
				'header-tabs':'',
				'body':'badgeTpl',
				'footer':'dashboardFooter'
			}
		}
		if(section == 'addingStudent'){
			_.moduleStructure = {
				'header':'fullHeader',
				'header-tabs':'studentTabs',
				'body':'badgeTpl',
				'footer':'dashboardFooter'
			}
		}
		if(section == 'assignCourse'){
			_.moduleStructure = {
				'header':'fullHeader',
				'header-tabs':'studentTabs',
				'body':'',
				'footer':'dashboardFooter'
			}
		}
		if( section == 'dashboard' ){
			_.moduleStructure = {
				'header':'fullHeader',
				'header-tabs':'studentTabs',
				'body-tabs':'dashboardTabs',
				'body':'dashboardBodyTpl',
				'footer':'dashboardFooter'
			}
		}
		if( section == 'profile' ){
			_.moduleStructure = {
				'header':'fullHeader',
				'body':'',
				'footer':'dashboardFooter'
			}
		}
		await _.render();
	}
	changeStudent({item,event}){
		const _ = this;
		let index = parseInt(item.getAttribute('data-index'));
		if(_.currentStudent === _.me['parent']['students'][index]) return void 0;

		_.currentStudent = _.me['parent']['students'][index];
		let activeButton = item.closest('.section').querySelector('.active');
		activeButton.classList.remove('active');
		item.classList.add('active');
		_.fillStudentProfile({item,event})
	}

	fillWelcome(){
		const _ = this;
		_.body.append( _.markup( _.welcomeTpl()));
	}

	//profile
	async fillProfile() {
		const _ = this;
		_.studentInfo = Object.assign({},_.currentStudent['user']);
		_.metaInfo = {};
		_.studentInfo['currentSchool'] = _.currentStudent['currentSchool'] ?? '';
		_.studentInfo['currentPlan'] = _.currentStudent['currentPlan'];
		_.studentInfo['grade'] = _.currentStudent['grade'] ? _.currentStudent['grade']['_id'] : null;
		_.studentInfo['studentId'] = _.currentStudent['_id'];

		_.body.append( _.markup( _.personalInfo()));
		if (!_.isEmpty(_.currentStudent['currentPlan'])){
			if (_.currentStudent['currentPlan']['firstSchool']) {
				_.studentInfo['firstSchool'] = _.currentStudent['currentPlan']['firstSchool']['_id'] ?? _.currentStudent['currentPlan']['firstSchool'];
			}
			if (_.currentStudent['currentPlan']['secondSchool']) {
				_.studentInfo['secondSchool'] = _.currentStudent['currentPlan']['secondSchool']['_id'] ?? _.currentStudent['currentPlan']['secondSchool'];
			}
			if (_.currentStudent['currentPlan']['thirdSchool']) {
				_.studentInfo['thirdSchool'] = _.currentStudent['currentPlan']['thirdSchool']['_id'] ?? _.currentStudent['currentPlan']['thirdSchool'];
			}
			_.f('.student-profile-course-info').innerHTML = _.courseInfo(await Model.getWizardData());
		} else _.f('.student-profile-course-info').innerHTML = _.emptyCourseInfo();
	}
	showCancelMembership({item}) {
		const _ = this;
		G_Bus.trigger('modaler','showModal', {type:'html',target:'#cancelForm','closeBtn':'hide'});
	}
	showRemovePopup({item}) {
		const _ = this;
		G_Bus.trigger('modaler','showModal', {type:'html',target:'#removeForm','closeBtn':'hide'});
	}
	async removeCourse({item}) {
		const _ = this;
		let courseInfo = _.f('.student-profile-course-info');
		_.clear(courseInfo);
		await Model.removeCourse({
			studentId:_.studentInfo['studentId'],
			planId:_.studentInfo.currentPlan['_id'],
		});

		courseInfo.append( _.markup( _.emptyCourseInfo()));

		G_Bus.trigger('modaler','closeModal');
		let curPlanIndex;
		_.currentStudent['plans'].find((item,index)=>{
			if (_.currentStudent['currentPlan']['_id'] == item['_id']) curPlanIndex = index;
		})
		_.currentStudent['plans'].splice(curPlanIndex,curPlanIndex + 1);
		_.currentStudent['currentPlan'] = {};
		_.updateMe();
		_.studentInfo.firstSchool = null;
		_.studentInfo.secondSchool = null;
		_.studentInfo.thirdSchool = null;
		_.studentInfo.testDate = null;
		_.studentInfo.testDatePicked = false;

		_.showSuccessPopup('Course has been successfully removed');

		console.log(_.me,_.currentStudent,_.studentInfo)
	}
	async assignCourse() {
		const _ = this;
		let response = await Model.assignCourse(_.studentInfo);
		if(!response)	return void 0;
		_.currentStudent['currentPlan'] = response['currentPlan'];
		_.currentStudent['plans'].push(response['currentPlan']);
		_.updateMe();

		let btn = _.markupElement(`<button section="profile"></button>`)
		_.changeSection({item:btn})
		_.showSuccessPopup('Course has been successfully assigned');
	}
	async updateCourse(){
		const _ = this;
		for (let key in _.courseData) {
			let response = await Model.updateCourse(_.courseData[key]);
			if (_.courseData[key]['_id'] == _.currentStudent['currentPlan']['_id']) {
				_.currentStudent['currentPlan'] = response;
			}
			_.currentStudent['plans'].find((item,index)=>{
				if (item['_id'] == _.courseData[key]['_id']) {
					_.currentStudent['plans'][index] = response;
				}
			})
		}
		_.updateMe();
	}
	inputCourseData({item}){
		const _ = this;
		if (!_.courseData) _.courseData = {};

		let curPlanId = _.currentStudent['currentPlan']['_id'];
		if (!_.courseData[curPlanId]) _.courseData[curPlanId] = {_id: curPlanId, studentId:_.currentStudent['_id']};

		let
			fstSchool = _.currentStudent['currentPlan']['firstSchool'],
			sndSchool = _.currentStudent['currentPlan']['secondSchool'],
			trdSchool = _.currentStudent['currentPlan']['thirdSchool'],
			testDate = _.currentStudent['currentPlan']['testDate'];
		if (fstSchool) _.courseData[curPlanId]['firstSchool'] = fstSchool['_id'] ?? fstSchool;
		if (sndSchool) _.courseData[curPlanId]['secondSchool'] = sndSchool['_id'] ?? sndSchool;
		if (trdSchool) _.courseData[curPlanId]['thirdSchool'] = trdSchool ?? trdSchool;
		if (testDate) _.courseData[curPlanId]['testDate'] = testDate;

		_.courseData[curPlanId][item.getAttribute('name')] = item.value;
	}
	async removeUser({item}){
		const _ = this;
		let response = await Model.removeStudent(_.studentInfo['studentId']);
		if (!response) return;

		_.me['parent']['students'].find((student,index)=>{
			if (student['_id'] === _.currentStudent['_id']) {
				_.me['parent']['students'].splice(index,1);
				localStorage.setItem('me',JSON.stringify(_.me));
				_.currentStudent = {};
			}
		})

		if (_.me['parent']['students'].length) {
			_.currentStudent = _.me['parent']['students'][0];
			item.setAttribute('section','dashboard');
		} else {
			item.setAttribute('section','welcome');
		}

		item.setAttribute('rerender',true);
		item.setAttribute('data-clear',true);
		G_Bus.trigger(_.componentName,'changeSection',{item});
		G_Bus.trigger('modaler','closeModal');
		_.showSuccessPopup('Student profile deleted');
	}


	//dashboard
	async fillDashboardTabs(){
		const _ = this;

		let cont = _.f('.subnavigate.parent');
		let imgs = cont.querySelectorAll('[data-id]');
		for( let item of imgs ){
			let imgId = item.getAttribute('data-id');
			let imgTitle;
			_.wizardData['avatars'].find((elem)=>{
				if ( imgId == elem['_id'] ) imgTitle = elem['avatar'];
			})
			let img = `<img src="/img/${imgTitle}.svg">`;
			item.removeAttribute('data-id')
			item.append( _.markup( img ));
		}
	}
	async fillStudentProfile(){
		const _ = this;
		_.fillDashboard();
		_.fillScheduleBlock( _.currentStudent['_id'] );
		_.fillStarsBlock();

		let activities = await Model.getActivities( _.currentStudent['_id'] );
		let activitiesCont = _.f('#activities');
		_.clear(activitiesCont);
		activitiesCont.append( _.markup( _.recentActivitiesTpl( activities ) ) );

		let testScores = Model.getTestScores( _.currentStudent['_id'] );
		let testScoresCont = _.f('#testScores' );
		_.clear(testScoresCont);
		testScoresCont.append( _.markup( _.testScoresTpl( testScores ) ) );

		let skillLevelsCont = _.f('#skillLevels' );
		_.clear(skillLevelsCont);
		skillLevelsCont.append( _.markup( _.skillLevelsTpl() ) );

		let badges = Model.getBadges( _.currentStudent['_id'] );
		let badgesCont = _.f('#badges' );
		_.clear(badgesCont);
		badgesCont.append( _.markup( _.badgesTpl( badges ) ) );

		let usage = Model.getUsage( _.currentStudent['_id'] );
		let usageCont = _.f('#usageList' );
		_.clear(usageCont);
		usageCont.append( _.markup( _.usageStatisticsRow( usage ) ) );

		let mastered = Model.getMastered( _.currentStudent['_id'] );
		let masteredCont = _.f('#mastered' );
		_.clear(masteredCont);
		masteredCont.append( _.markup( _.skillsMastered( mastered ) ) );

		let totalTime = Model.getTotalTime( _.currentStudent['_id'] );
		let totalTimeCont = _.f('#totalTime' );
		_.clear(totalTimeCont);
		totalTimeCont.append( _.markup( _.totalPracticeTime( totalTime ) ) );

		let progress = Model.getProgress( _.currentStudent['_id'] );
		let progressCont = _.f('#studentProgress' );
		_.clear(progressCont);
		progressCont.append( _.markup( _.studentProgress( progress ) ) );
	}

	fillDashboard(){
		const _ = this;

		let cont = _.f('#studentProfile');
		_.clear(cont);
		cont.append( _.markup( _.studentProfileTpl( _.currentStudent)))

		let items = cont.querySelectorAll('[data-id]');
		for ( let item of items ){
			let type = item.getAttribute('data-type');
			if (item.getAttribute('data-id') == 'undefined') continue;
			let value = _.wizardData[type].find(elem=>{
				if (elem['_id'] == item.getAttribute('data-id')){
					return elem
				}
			});
			if (!value) continue;
			if( type != 'avatars' ){
				item.textContent = value[item.getAttribute('data-title')];
			}
			else item.src = `/img/${value[item.getAttribute('data-title')]}.svg`
		}
	}
	async fillScheduleBlock(id){
		const _ = this;
		let
			schedule = await Model.getSchedule(id),
			scheduleList = document.querySelector('#scheduleList');
		_.clear(scheduleList);
		if (!schedule) return;
		let
			scheduleTpl = _.scheduleBlock(schedule);
		scheduleList.append(_.markup(scheduleTpl));
	}
	async fillStarsBlock(){
		const _ = this;
		let starsCont = _.f('#starsBlock');
		let starsInfo = {
			items: [
				{title:'Skills Practice',count:1500,color:'246,155,17'},
				{title:'Tests',count:1500,color:'0,149,232'},
				{title:'Videos Watched',count:2500,color:'80,20,208'},
				{title:'Reviewed Questions',count:345,color:'0,175,175'},
			],
			total: 5845
		};
		_.clear( starsCont );
		starsCont.append( _.markup( _.starsBlockTpl(starsInfo)));
		_.showCircleGraphic(starsInfo,starsCont)
	}
	showCircleGraphic(data,cont){
		const _ = this;
		let starsCont = cont.querySelector('.stars-circle');
		if (!starsCont) return;

		let svg = `</svg>`;
		let radius = window.innerWidth < 768 ? 106 : 134;
		let sum = 0;
		let last;
		let count = 0;
		for (let key in data['items']) {
			let number = parseInt(data['items'][key]['count']);
			if (isNaN(number) || !number) continue;
			last = data['items'][key]['count'];
			sum += number;
			count++;
		}

		let circleWidth = 2 * Math.PI * radius;
		let strokeDashoffset = 0;

		for (let key in data['items']) {
			if (!data['items'][key]['count'] || isNaN(parseInt(data['items'][key]['count']))) continue;
			let width = data['items'][key]['count'] / sum * circleWidth;
			if (data['items'][key]['count'] !== last) {
				width -= 14 / (count - 1);
			} else width += 14;
			let strokeDasharray = `${width} ${circleWidth - width}`;
			svg = `<circle style="stroke:rgb(${data['items'][key]['color']})" stroke-dasharray="${strokeDasharray}" stroke-dashoffset="-${strokeDashoffset}" stroke-linecap="round" cx="50%" cy="50%"></circle>` + svg;
			strokeDashoffset += width;
		}

		svg = '<svg xmlns="http://www.w3.org/2000/svg">' + svg;
		svg = _.markupElement(svg);

		starsCont.prepend(svg);
	}
	setInteger(number){
		const _ = this;
		if (number < 1000) return number;
		let string = Math.ceil(number).toString();
		let result = '';
		for ( let i = 0; i < string.length; i++ ){
			if (!(i%3) && i) {
				result = ',' + result;
			}
			result = string[string["length"] - i - 1] + result;
		}
		return result;
	}
	fillScheduleItemsTpl(dashSchedule){
		const _ = this;
		let schData = [
			dashSchedule['skillTest'],
			dashSchedule['practiceTest'],
			dashSchedule['test'],
		];
		let data = [];
		for (let item of schData) {
			if (!item) return void 0;
			let title = `Next ${item.title}`;
			let info = '', count = '';


			if (item['title'] === 'isee'){
				title = 'Your ISEE Date';
			}
			if (item['title'] === 'skill test'){
				title = 'Next practice';
			}
			if (item['title'] === "practice test"){
				title = 'Next Practice Test';
			}


			if (item['daysLeft'] <= 0) {
				count = 'Today';
				if (item['title'] === 'isee') {
					info = '<div class="info">Good luck</div>';
				}
			} else {
				count = item['daysLeft'];
				if (item['title'] === 'isee') {
					info = `
						<div class="info">
							Day${item['daysLeft'] == 1 ? '' : 's'} until ISEE test
						</div>`
				}
				if (item['title'] === 'skill test') {
					info = `
						<div class="info">
							Day${item['daysLeft'] == 1 ? '' : 's'} until next practice
						</div>`
				}
				if (item['title'] === "practice test") {
					info = `
						<div class="info">
							Day${item['daysLeft'] == 1 ? '' : 's'} until next practice test
						</div>`
				}
			}
			data.push({info,count,item,title});
		}
		return data;
	}
	drawCircleGraphic(item,color){
		const _ = this;
		let
			svg = `</svg>`,
			radius = 67,
			progress = item['progressBar'],
			circleWidth = 2 * Math.PI * radius,
			width = (progress / 100 * circleWidth),
			strokeDasharray = `${width} ${circleWidth - width}`;

		svg = `<circle style="stroke:${color}" stroke-dasharray="${strokeDasharray}" stroke-linecap="round" cx="50%" cy="50%"></circle>` + svg;
		svg = `<circle style="opacity: .2;stroke:${color}" stroke-dasharray="${circleWidth} 0" stroke-linecap="round" cx="50%" cy="50%"></circle>` + svg;
		svg = '<svg xmlns="http://www.w3.org/2000/svg">' + svg;
		return svg;
	}

	// add student methods
	fillStudentInfo({item}){
		const _ = this;
		_.studentInfo[item.getAttribute('name')] = item.value;
	}
	fillAddingStudent(){
		const _ = this;
		_.body.append( _.markup( _.addingStudentTpl()));
		_.handleAddingSteps(1);
	}

	cancelAddStudent(){
		const _ = this;
		let btn = document.createElement('BUTTON');
		if (_.previousSection === 'profile') _.previousSection = 'dashboard'
		btn.setAttribute('section',_.previousSection);
		_.changeSection({item:btn});
	}
	async createStudent(){
		const _ = this;
		let registerData = Object.assign({},_.studentInfo);
		_.studentInfo = {};
		_.metaInfo = {};
		let resp = await Model.createStudent(registerData);
		if (resp.status == "success") {
			G_Bus.trigger('modaler','showModal',{
				target: '#congratulationsPopup',
				closeBtn: false
			})

			_.me['parent'] = await Model.getMe();
			localStorage.setItem('me',JSON.stringify(_.me))

			let btn = document.createElement('BUTTON');
			btn.setAttribute('section','dashboard');
			_.changeSection({item:btn});
		}
	}
	//end add student methods
	//update methods
	updateMe(){
		const _ = this;
		_.me['parent']['students'].find((student,index)=>{
			if (student['_id'] == _.currentStudent['_id']) {
				_.me['parent']['students'][index] = _.currentStudent
			}
		})
		localStorage.setItem('me',JSON.stringify(_.me));
	}
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

		_.currentStudent = response;
		_.updateMe()

		if (!_.isEmpty(_.courseData)) await _.updateCourse();

		let
			passwords = item.closest('.parent').querySelector('.passwords'),
			passInput = passwords.querySelector('g-input');
		if (passInput.value) await _.saveChangePassword({item:passInput});

		item.setAttribute('rerender',true);
		item.setAttribute('section','dashboard');
		G_Bus.trigger(_.componentName,'changeSection',{item})
		_.showSuccessPopup('Student profile updated')
	}
	showRemoveUserPopup({item}){
		const _ = this;
		_.studentInfo['studentId'] = item.getAttribute('data-id');
		G_Bus.trigger('modaler','showModal', {item:item,type:'html',target:'#removeUserForm','closeBtn':'hide'});
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
			_.showSuccessPopup('Password has been changed');
		} else {
			_.showErrorPopup('Password has been changed');
		}
	}

	//avatar methods
	async selectAvatar(clickData) {
		const _ = this;

		let listCont = _.f('.avatars-list');
		if (!listCont.children.length ) {
			_.avatars = _.wizardData['avatars'];
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
	// end avatar methods

	//change methods
	changeStudentLevel({item}) {
		const _ = this;
		if (item.parentNode.querySelector('.active')) item.parentNode.querySelector('.active').classList.remove('active');
		item.classList.add('active');
		_.studentInfo.level = item.getAttribute('data-id');
	}
	async changeTestType({item}) {
		const _ = this;
		if(item.parentNode.querySelector('.active'))  item.parentNode.querySelector('.active').classList.remove('active');
		item.classList.add('active');

		let
			pos = parseInt(item.getAttribute('pos')),
			levelButtons = item.closest('.parent-adding-body').querySelector('.level-buttons');
		_.clear(levelButtons);
		levelButtons.innerHTML = '<img src="/img/loader.gif">';

		_.coursePos = pos;
		_.studentInfo.course = _.wizardData['courses'][pos]['_id'];
		_.studentInfo.level = _.wizardData['courses'][pos]['levels'][0]['_id'];
		_['metaInfo'].course = _.wizardData['courses'][pos]['title'];
		_['metaInfo'].level = _.wizardData['courses'][pos]['levels'][0]['title'];
		levelButtons.innerHTML = _.levelButtons(_.wizardData['courses'][pos]);
	}
	changePayMethod({item}){
		const _ = this;
		let
			cont = item.parentElement,
			activeButton = cont.querySelector('.active');

		if (item == activeButton) return;

		activeButton.classList.remove('active');
		item.classList.add('active');

		_.studentInfo['paymentMethod'] = item.getAttribute('data-type');
		_.metaInfo['paymentMethod'] = item.textContent;
	}
	//end change methods

	hideProfile({item}){
		const _ = this;
		let cont = item.closest('.parent-student-info');
		let show = item.classList.contains('active');

		if (show) item.classList.remove('active');
		else item.classList.add('active');

		let units = cont.querySelectorAll('.unit');
		for (let i = 0; i < units.length; i++) {
			if (i) {
				if (!show) units[i].setAttribute('style','height: 0;margin-bottom:0;opacity: 0;');
				else units[i].removeAttribute('style');
			}
		}
	}
	showHiddenScores({item}){
		const _ = this;
		item.nextElementSibling.classList.toggle('active');
		item.classList.toggle('active')
	}

	//auxiliary methods
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
	validatePassword({item}){
		const _ = this;
		let
			cont = item.closest('.passwords'),
			inputs = cont.querySelectorAll('G-INPUT[type="password"]'),
			text = item.nextElementSibling;
		if (item == inputs[0]) {
			if (item.value.length < 8) {
				console.log(item.value,item.value.length)
				item.setMarker('red');
				text.style = 'color: red;'
			} else {
				item.setMarker();
				text.removeAttribute('style')
			}
		} else {
			if (item.value !== inputs[0].value) {
				item.setMarker('red');
				text.style = 'color: red;'
			} else {
				item.setMarker();
				text.style = 'display:none;'
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
		if (!response) {
			item.setMarker('red');
			text.textContent = "Email can't be empty";
			text.style = 'color: red;'
		}
		if (response.substr(response.length - 4) !== 'free') {
			item.setMarker('red');
			text.textContent = 'User with this email address already exists';
			text.style = 'color: red;'
		} else {
			item.setMarker();
			text.style = 'display:none;'
		}
	}
	skipTestDate({item}){
		const _ = this;
		let
			cont = item.closest('.adding-section'),
			inputDate = cont.querySelector('g-input');
		if (item.id == "have_yet") {
			_.studentInfo.testDate = null;
			_.studentInfo.testDatePicked = false;
			inputDate.setAttribute('disabled',true);
			inputDate.value = '';
		} else {
			inputDate.removeAttribute('disabled');
			_.studentInfo.testDatePicked = true;
		}
	}
	dateToFormat( date, format ){
		const _ = this;
		let
			result = format,
			dateDetails = date.split( '-' ),
			year = parseInt( dateDetails[0] ),
			month = parseInt( dateDetails[1] ) - 1,
			day = parseInt( dateDetails[2] );

		result = result.replace( 'DD', day );
		result = result.replace( 'MM', month );
		result = result.replace( 'YYYY', year );
		result = result.replace( 'month', _.months[month] );

		return result;
	}
	timeToFormat( time ){
		const _ = this;
		let
			result = time.split( ':' ),
			hours = (result[0] > 12 ? result[0] - 12 : result[0]),
			minutes = result[1],
			details = ( result[0] > 12 ? 'pm' : 'am' );

		result = ( hours < 10 ? '0' + hours : hours ) + ':' + minutes + ' ' + details;
		return result;
	}
	isEmpty(obj){
		const _ = this;
		for (let key in obj) {
			return false;
		}
		return true;
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

	addingStep({item}){
		const _ = this;
		_._$.addingStep = parseInt(item.getAttribute('step'));
	}
	assignStep({item}){
		const _ = this;
		_._$.assignStep = parseInt(item.getAttribute('step'));
	}
	async handleAddingSteps({addingStep = 1}){
		const _ = this;
		if(!_.initedUpdate){
			_.wizardData = await Model.getWizardData();
			_.addingSteps = {
				0: 'cancelAddStudent',
				1: 'addingStepOne',
				2: 'addingStepTwo',
				3: 'addingStepThree',
				4: 'addingStepFour',
				5: 'addingStepFive',
				6: 'addingStepSix',
				7: 'createStudent'
			};
			_.studentInfo = {
				course: _.wizardData['courses'][0]['_id'],
				level: _.wizardData['courses'][0]['levels'][0]['_id'],
				paymentMethod: 'monthly'
			};
			_.metaInfo = {
				course : _.wizardData['courses'][0]['title'],
				level : _.wizardData['courses'][0]['levels'][0]['title'],
				paymentMethod: 'Pay Monthly',
			};
			return void 0;
		}
		if (addingStep === 0 || addingStep === 7) {
			_[_.addingSteps[addingStep]]();
			return void 0;
		}

		let addingFooter = _.f('.parent-adding-body .test-footer');
		if (addingStep >= 2) addingFooter.classList.add('narrow');
		else addingFooter.classList.remove('narrow');
		addingFooter.querySelectorAll('BUTTON').forEach((btn)=>{
			if (btn.classList.contains('back')) btn.setAttribute('step',addingStep - 1)
			else  btn.setAttribute('step',addingStep + 1)
		})


		let addingBody = _.f('#parent-adding-body');
		_.clear(addingBody);
		addingBody.append(_.markup(_[_.addingSteps[addingStep]]()))


		let
			aside = _.f('#parent .adding-list'),
			activeAside = aside.querySelector('.active'),
			asideButtons = aside.querySelectorAll('.adding-list-item'),
			asideTarget = asideButtons[addingStep - 1];
		if (asideTarget != activeAside) {
			activeAside.classList.remove('active');
			asideTarget.classList.add('active')
		}
		for (let i = 0; i < 6; i++) {
			let button = asideButtons[i].querySelector('.adding-list-digit');
			_.clear(button);
			if (i < addingStep - 1) {
				button.append(_.markup(`<svg><use xlink:href="#checkmark"></use></svg>`))
			} else {
				button.textContent = i + 1
			}
		}

		if (addingStep === 5) {
			let
				cards = await Model.getCardsInfo(),
				addresses = await Model.getBillingAddressInfo();
			_.fillParentCardsInfo(cards);
			_.fillParentAddressesInfo(addresses);
		}
		let button = _.f('#parent .test-footer .button-blue');
		if (addingStep === 6) {
			button.classList.add('button-green');
			button.textContent = 'Purchase';
		} else {
			button.classList.remove('button-green');
			button.textContent = 'Next';
		}
	}
	async handleAssignSteps({assignStep = 1}){
		const _ = this;
		if( !_.initedAssign ) {
			_.assignSteps = {
				0: 'changeSection',
				1: 'addingStepOne',
				2: 'addingStepThree',
				3: 'addingStepFour',
				4: 'assignCourse'
			}
			_.initedAssign = true;
			return void 0;
		}


		if (assignStep === 0 || assignStep === 4) {
			if (assignStep === 0) {
				let btn = _.markupElement(`<button section="profile"></button>`)
				_[_.assignSteps[assignStep]]({item:btn});
			} else {
				_[_.assignSteps[assignStep]]();
			}
			return void 0;
		}
		if (assignStep === 1) {
			if (!_.studentInfo['course']) _.studentInfo['course'] = _.wizardData['courses'][0]['_id'];
			if (!_.studentInfo['level']) _.studentInfo['level'] = _.wizardData['courses'][0]['levels'][0]['_id'];
		}


		let assignFooter = _.f('#assign-footer');
		if (assignStep >= 2) assignFooter.classList.add('narrow');
		else assignFooter.classList.remove('narrow');
		assignFooter.querySelectorAll('BUTTON').forEach((btn)=>{
			if (btn.classList.contains('back')) btn.setAttribute('step',assignStep - 1)
			else  btn.setAttribute('step',assignStep + 1)
		})


		let assignBody = _.f('#assign-body');
		_.clear(assignBody);
		assignBody.append( _.markup( _[_.assignSteps[assignStep]]()))


		let
			aside = _.f('#assign-list'),
			activeAside = aside.querySelector('.active'),
			asideButtons = aside.querySelectorAll('.adding-list-item'),
			asideTarget = asideButtons[assignStep - 1];
		if (asideTarget != activeAside) {
			activeAside.classList.remove('active');
			asideTarget.classList.add('active')
		}
		for (let i = 0; i < 3; i++) {
			let button = asideButtons[i].querySelector('.adding-list-digit');
			_.clear(button);
			if (i < assignStep - 1) {
				button.append(_.markup(`<svg><use xlink:href="#checkmark"></use></svg>`))
			} else {
				button.textContent = i + 1
			}
		}

		let button = assignFooter.querySelector('.button-blue');
		if (assignStep === 3) {
			button.classList.add('button-green');
			button.textContent = 'Purchase';
		} else {
			button.classList.remove('button-green');
			button.textContent = 'Next';
		}
	}
	fillassignCourse(){
		const _ = this;
		_.body.append( _.markup( _.assignCourseTpl()));
		_.handleAssignSteps(1);
	}

	async init() {
		const _ = this;
		_._( _.handleAddingSteps.bind(_),['addingStep'])
		_._( _.handleAssignSteps.bind(_),['assignStep'])
	}
	
}