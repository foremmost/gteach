export const view = {
	welcomeTpl(){
		const _ = this;
		return `
			<section class="login">
				<div class="login-full login-success">
					<div class="login-left-logo">
						<svg width="144" height="173" viewBox="0 0 144 173" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g filter="url(#filter0_d_2566_126400)">
								<path
								d="M66.0623 40C90.3042 50.838 97.8241 72.9803 85.7088 95.7556C84.452 98.2445 82.9386 100.6 81.1923 102.785C73.9886 111.391 69.5174 120.752 73.4354 133C61.7378 129.191 51.9823 124.394 44.9819 115.322C39.2009 107.871 38.5686 99.5089 42.4753 91.2472C44.8916 86.1391 48.595 81.5752 51.9823 76.9335C55.6745 71.8254 60.0555 67.1616 63.375 61.8536C67.3495 55.4352 69.4835 48.3617 66.0623 40Z"
								fill="#00A3FF"/>
								<path
								d="M96.1094 77.0334C106.779 92.4243 108.53 111.968 89.3348 123.517C85.5297 125.815 82.0295 128.614 78.0437 131.457C75.6613 126.415 76.3275 121.785 78.2018 117.309C79.2675 114.542 80.7562 111.951 82.6166 109.625C90.4865 100.397 94.7319 89.7481 96.1094 77.0334Z"
								fill="#00A3FF"/>
							</g>
							<defs>
								<filter id="filter0_d_2566_126400" x="0" y="0" width="144" height="173" filterUnits="userSpaceOnUse"
												color-interpolation-filters="sRGB">
									<feFlood flood-opacity="0" result="BackgroundImageFix"/>
									<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
																 result="hardAlpha"/>
									<feOffset/>
									<feGaussianBlur stdDeviation="20"/>
									<feColorMatrix type="matrix" values="0 0 0 0 0.219948 0 0 0 0 0.278529 0 0 0 0 0.429167 0 0 0 0.1 0"/>
									<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2566_126400"/>
									<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2566_126400" result="shape"/>
								</filter>
							</defs>
						</svg>
					</div>
					<h2 class="login-main-title"><span>Welcome to Prepfuel</span></h2>
					<div class="login-main-subtitle">
						<span>Help your child succeed</span>
						<span>with our adaptive learning technology.</span>
					</div>
					<button class="button-blue" data-click="${_.componentName}:changeSection" section="addingStudent">
						<span>Add a Student</span>
					</button>
					<img class="login-success-img" src="/img/confirmation-on-white.png" alt=""/>
					<div class="login-success-bgc">
						<img src="/img/success-bgc-2,5.png" alt=""/>
						<img src="/img/success-bgc-1.png" alt=""/>
						<img src="/img/success-bgc-2.png" alt=""/>
						<img src="/img/success-bgc-3.png" alt=""/>
						<img src="/img/success-bgc-4.png" alt="">
						<img src="/img/success-bgc-5.png" alt=""/>
						<img src="/img/success-bgc-6.png" alt=""/>
						<img src="/img/success-bgc-7.png" alt=""/>
						<img src="/img/success-bgc-8.png" alt=""/>
					</div>
				</div>
			</section>`
	},
	dashboardFooter(){
		const _ = this;
		return `
			<div hidden>
				${_.selectAvatarTpl()}
				${_.addCardForm()}
				${_.addBillingAddress()}
				${_.registerSuccessPopup()}
				${_.removeCourseTpl()}
				${_.removeUserTpl()}
				${_.cancelMembershipTpl()}
			</div>
		`;
	},

	registerSuccessPopup(){
		return `
			<div id="congratulationsPopup">
				<h3 class="title">Thank You!</h3>
				<p class="text">New student successfully added</p>
				<button class="button-blue" data-click="modaler:closeModal">Continue</button>
			</div>
		`
	},

	removeCourseTpl(){
		const _ = this;
		return `
			<div class="modal-block student-profile-remove-popup" id="removeForm">
				<h6 class="modal-title">
					<span>Removing course</span>
				</h6>
				<p class="modal-text">Are you sure want to remove this course?</p>
				<div class="modal-row">
					<button class="button" type="button" data-click="modaler:closeModal"><span>Cancel</span></button>
					<button class="button-red" data-click="${_.componentName}:removeCourse"><span>Remove</span></button>
				</div>
			</div>
		`;
	},

	assignCourseTpl(){
		const _ = this;
		return `
			<div class="section parent" id="parent">
				<div class="test-block">
					<div class="test-header">
						<h5 class="block-title test-title">
							<span>Adding a Student</span>
						</h5>
					</div>
					<div class="parent-adding-inner">
						<div class="block adding-list" id="assign-list">
							<button class="adding-list-item active" data-click="${_.componentName}:assignStep" step="1">
								<strong class="adding-list-digit">1</strong>
								<div class="adding-list-desc">
									<h5 class="adding-list-title">Course & Plan</h5>
									<h6 class="adding-list-subtitle">Set Type of a Test & Membership </h6>
								</div>
							</button>
							<button class="adding-list-item" data-click="${_.componentName}:assignStep" step="2">
								<strong class="adding-list-digit">2</strong>
								<div class="adding-list-desc">
									<h5 class="adding-list-title">School Information</h5>
									<h6 class="adding-list-subtitle">Student’s School Related Info</h6>
								</div>
							</button>
							<button class="adding-list-item" data-click="${_.componentName}:assignStep" step="3">
								<strong class="adding-list-digit">3</strong>
								<div class="adding-list-desc">
									<h5 class="adding-list-title">Test Information</h5>
									<h6 class="adding-list-subtitle">Set Test Info</h6>
								</div>
							</button>
						</div>
						<div class="block parent-adding-body">
							<div id="assign-body"><img src="/img/loader.gif"></div>
							<div class="test-footer" id="assign-footer">
								<button class="button back" data-click="${_.componentName}:assignStep" step="0">
									<span>Back</span>
								</button>
								<button class="button-blue step-next-btn" data-click="${_.componentName}:assignStep" step="2">
									<span>Next</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`
	},
	addingStudentTpl(){
		const _ = this;
		return `
			<div class="section parent" id="parent">
				<div class="test-block">
					<div class="test-header">
						<h5 class="block-title test-title">
							<span>Adding a Student</span>
						</h5>
					</div>
					<div class="parent-adding-inner">
						<div class="block adding-list">
							<button class="adding-list-item active" data-click="${_.componentName}:addingStep" step="1">
								<strong class="adding-list-digit">1</strong>
								<div class="adding-list-desc">
									<h5 class="adding-list-title">Course & Plan</h5>
									<h6 class="adding-list-subtitle">Set Type of a Test & Membership </h6>
								</div>
							</button>
							<button class="adding-list-item" data-click="${_.componentName}:addingStep" step="2">
								<strong class="adding-list-digit">2</strong>
								<div class="adding-list-desc">
									<h5 class="adding-list-title">Account Settings</h5>
									<h6 class="adding-list-subtitle">Setup Student Account Settings</h6>
								</div>
							</button>
							<button class="adding-list-item" data-click="${_.componentName}:addingStep" step="3">
								<strong class="adding-list-digit">3</strong>
								<div class="adding-list-desc">
									<h5 class="adding-list-title">School Information</h5>
									<h6 class="adding-list-subtitle">Student’s School Related Info</h6>
								</div>
							</button>
							<button class="adding-list-item" data-click="${_.componentName}:addingStep" step="4">
								<strong class="adding-list-digit">4</strong>
								<div class="adding-list-desc">
									<h5 class="adding-list-title">Test Information</h5>
									<h6 class="adding-list-subtitle">Set Test Info</h6>
								</div>
							</button>
							<button class="adding-list-item" data-click="${_.componentName}:addingStep" step="5">
								<strong class="adding-list-digit">5</strong>
								<div class="adding-list-desc">
									<h5 class="adding-list-title">Billing Details</h5>
									<h6 class="adding-list-subtitle">Set Your Payment Methods</h6>
								</div>
							</button>
							<button class="adding-list-item" data-click="${_.componentName}:addingStep" step="6">
								<strong class="adding-list-digit">6</strong>
								<div class="adding-list-desc">
									<h5 class="adding-list-title">Make Payment</h5>
									<h6 class="adding-list-subtitle">Review and <Confirm></Confirm></h6>
								</div>
							</button>
						</div>
						<div class="block parent-adding-body">
							<div id="parent-adding-body"><img src="/img/loader.gif"></div>
							<div class="test-footer">
								<button class="button back" data-click="${_.componentName}:addingStep" step="0">
									<span>Back</span>
								</button>
								<button class="button-blue step-next-btn" data-click="${_.componentName}:addingStep" step="2">
									<span>Next</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`
	},
	addingStepOne(){
		const _ = this;
		let
			courses = _.wizardData['courses'],
			tpl = `
				<h3 class="adding-title">Course & Plan</h3>
				<h5 class="parent-adding-subtitle">
					<span>If you need more info, please </span>
					<a href="#">Contact Our Support</a>
				</h5>
				<div class="adding-section">
					<div class="adding-label">What test is the student purchasing?</div>
					<div class="adding-buttons">
			`;
		courses.forEach( (item,cnt) => {
			let activeClass = '';
			if(_.studentInfo['course']){
				if(_.studentInfo['course'] == item._id) activeClass = 'active';
			}
			tpl += `
				<button class="adding-button ${ activeClass }" pos="${cnt}" data-click="${_.componentName}:changeTestType" data-id="${item._id}">
					<span>${item.title}</span>
				</button>
			`;
		});
		tpl+=	`
				</div>
			</div>
			<div class="adding-section">
				<div class="adding-label">What level of the test student plan to take?</div>
				<div class="adding-buttons level-buttons loader-parent">
					${_.levelButtons(courses[_.coursePos])}
				</div>
			</div>
			<div class="adding-section">
				<div class="adding-label">Type of membership?</div>
				<div class="adding-buttons">
					<button class="adding-button active" data-type="monthly" data-click="${_.componentName}:changePayMethod">Pay Monthly</button>
					<button class="adding-button" data-type="yearly" data-click="${_.componentName}:changePayMethod">Pay Yearly</button>
				</div>
			</div>
			<div class="adding-section parent-adding-section">
				<div class="adding-label">Which plan do you prefer?</div>
				<div class="parent-adding-plan">
					<span class="adding-plan active">
						<h5 class="adding-plan-title">App</h5>
						<h6 class="adding-plan-subtitle">Best for self-preparation</h6>
						<span class="adding-plan-price">
						 <em>$</em><strong>20</strong><i>/ Mon</i>
						</span>
						<ul class="adding-plan-list">
							<li class="adding-plan-item"><span>Skill Practice</span></li>
							<li class="adding-plan-item"><span>Practice Tests</span></li>
							<li class="adding-plan-item none"><span>Homeworks & Quizzes</span></li>
							<li class="adding-plan-item none"><span>Classroom Activities</span></li>
							<li class="adding-plan-item none"><span>Private Tutor</span></li>
						</ul>
					</span>
				</div>
			</div>
		`;
		return tpl;
	},
	addingStepTwo(){
		const _ = this;
		return `
			<div class="adding-center passwords">
				<h3 class="adding-title">Account Settings</h3>
				<div class="adding-section">
					<h4 class="adding-subtitle">Student Personal Info</h4>
					<div class="adding-avatar">
						<button data-click="${_.componentName}:selectAvatar">
							<strong class="adding-avatar-letter">${_.studentInfo.avatarName ? '<img src="/img/' + _.studentInfo.avatarName + '.svg">' : 'K'}</strong>
							<span class="adding-avatar-link">Select Avatar</span>
						</button>
					</div>
				</div>
				<div class="adding-section">
					<div class="adding-inpt-row">
						<div class="adding-inpt small">
							<div class="form-label-row">
								<label class="form-label">First name</label>
							</div>
							<g-input type="text" value="${_.studentInfo['firstName'] ?? ''}" name="firstName" class="g-form-item" classname="form-input adding-inpt" data-input="${_.componentName}:fillStudentInfo"></g-input>
						</div>
						<div class="adding-inpt small">
							<div class="form-label-row">
								<label class="form-label">Last name</label>
							</div>
							<g-input type="text" value="${_.studentInfo['lastName'] ?? ''}" name="lastName" class="g-form-item" data-input="${_.componentName}:fillStudentInfo" classname="form-input adding-inpt"></g-input>
						</div>
					</div>
					<div class="adding-inpt">
						<div class="form-label-row">
							<label class="form-label">Email</label>
						</div>
							<g-input type="text" name="email" value="${_.studentInfo['email'] ?? ''}" class="g-form-item" data-outfocus="${_.componentName}:checkEmail" data-input="${_.componentName}:fillStudentInfo" classname="form-input adding-inpt"></g-input>
							<span class="form-label-desc" style="display:none;">Email is not free</span>
						</div>
				</div>
				<div class="adding-section">
					<h4 class="adding-subtitle">Password</h4>
					<p class="adding-text">Password will be sent to a student via email invitation to the platform</p>
					<div class="adding-inpt small">
						<div class="form-label-row">
							<label class="form-label">Password</label>
						</div>
						<g-input 
							type="password" 
							name="password" 
							match="addingStepTwo"
							value="${_.studentInfo['password'] ?? ''}" 
							data-outfocus="${_.componentName}:validatePassword" 
							data-input="${_.componentName}:fillStudentInfo" 
							class="g-form-item" 
							classname="form-input"
						></g-input>
						<span class="form-label-desc">8+ characters, with min. one number, one uppercase letter and one special character</span>
					</div>
					<div class="adding-inpt small">
						<div class="form-label-row">
							<label class="form-label">Repeat password</label>
						</div>
						<g-input 
							type="password" 
							name="cpass"  
							match="addingStepTwo"
							value="${_.studentInfo['cpass'] ?? ''}" 
							data-outfocus="${_.componentName}:validatePassword" 
							data-input="${_.componentName}:fillStudentInfo" 
							class="g-form-item" classname="form-input"
						></g-input>
						<span class="form-label-desc" style="display:none;">Password does not match</span>
					</div>
				</div>
				<button class="adding-generate" data-click="${_.componentName}:generatePassword">Generate Password</button>
			</div>
		`;
	},
	addingStepThree(){
		const _ = this;
		let gradeActive;
		if(_.studentInfo.grade) gradeActive = `_id:${_.studentInfo.grade}`;
		let gradeItems = _.createSelectItems(_.wizardData['grades'], 'value:_id;text:grade', gradeActive);
		return `
			<div class="adding-center">
				<h3 class="adding-title">School Information</h3>
				<div class="adding-section">
					<h4 class="adding-subtitle withmar">Your current school</h4>
					<div class="adding-inpt small">
						<div class="form-label-row">
							<label class="form-label">Current school</label>
						</div>
						<g-input type="text" value="${_.studentInfo.currentSchool ?? ''}" name="currentSchool" data-input="${_.componentName}:fillStudentInfo" class="g-form-item" classname="form-input adding-inpt"></g-input>
					</div>
					<div class="adding-inpt">
						<div class="form-label-row">
							<label class="form-label">Grade</label>
						</div>
						<g-select 
							class="select adding-select" 
							name="grade" 
							classname="adding-select" 
							data-change="${_.componentName}:fillStudentInfo" 
							arrowsvg="/img/sprite.svg#select-arrow-bottom" 
							title=""
							items='${JSON.stringify(gradeItems)}'></g-select>
					</div>
				</div>
				${_.choiceSelectStudent(_.wizardData)}
			</div>
		`;
	},
	addingStepFour(){
		const _ = this;
		return `
			<div class="adding-center">
				<h3 class="adding-title">Test Information</h3>
				<div class="adding-section">
					<h4 class="adding-subtitle withmar">Registered Official Test Date</h4>
					<div class="adding-inpt adding-radio-row">
						<div class="form-label-row">
							<input type="radio" id="have_registered" class="adding-radio" name="registered" data-change="${_.componentName}:skipTestDate" ${_.studentInfo.testDatePicked ? 'checked' : ''}>
							<label class="form-label adding-label-have" for="have_registered">Have registered</label>
						</div>
						<g-input disabled type='date' format="month DD, YYYY" value="${_.studentInfo.testDate ?? ''}" data-change="${_.componentName}:fillStudentInfo" class="select adding-select" name="testDate" classname="adding-select" icon="false" xlink="select-arrow-bottom" placeholder="Press to choose your official test date"></g-input>
					</div>
					<div class="adding-inpt">
						<div class="form-label-row">
							<input type="radio" id="have_yet" class="adding-radio" name="registered" data-change="${_.componentName}:skipTestDate" ${!_.studentInfo.testDatePicked ? 'checked' : ''}>
							<label class="form-label adding-label-have" for="have_yet">Have not registered yet</label>
						</div>
					</div>
				</div>
			</div>
		`;
	},
	addingStepFive(){
		const _ = this;
		let tpl = `
			<div class="billing-inner parent-adding-billing">
				<h3 class="adding-title">Billing Details</h3>
				<div class="billing-block">
					<h3 class="billing-title">Payment Methods</h3>
					<div class="billing-block-inner loader-parent" id="cards">
						<img src='/img/loader.gif' class='loader'>
					</div>
					<button class="button-white-blue wide" data-click="${_.componentName}:showAddCard">
						<svg class="button-icon big"><use xlink:href="#plus2"></use></svg>
						<span>Add New Card</span>
					</button>
				</div>
				<div class="billing-block">
					<h3 class="billing-title">Billing Addresses</h3>
					<div class="billing-block-inner loader-parent" id="billing-addresses">
						<img src='/img/loader.gif' class='loader'>
					</div>
					<button class="button-white-blue wide" data-click="${_.componentName}:showAddBillingAddress">
						<svg class="button-icon big"><use xlink:href="#plus2"></use></svg>
						<span>Add New Address</span>
					</button>
				</div>
			</div>
		`;
		return tpl;
	},
	addingStepSix(){
		const _ = this;
		//if (_.studentInfo.testDatePicked) testDate = _.createdAtFormat(_.studentInfo['testDate']);
		//let schoolTitles = [_.metaInfo.firstSchool,_.metaInfo.secondSchool,_.metaInfo.thirdSchool];
		//_.addingSummarySchoolsTpl(schoolTitles)
		let items = [{text: 'Discount',active: true}];
		return `
			<div class="adding-center">
				<h3 class="adding-title">Make Payment</h3>
				<div class="adding-section">
					<div class="adding-summary">
						<strong class="adding-summary-title">DETAILS overview</strong>
					</div>
					<ul class="adding-summary-list">
						<li class="adding-summary-item">
							<span>Chosen Course:</span>
							<strong>${_.metaInfo.course}</strong>
							<button class="adding-summary-btn" data-click="${_.componentName}:addingStep" step="1">Edit</button>
						</li>
						<li class="adding-summary-item">
							<span>Membership:</span>
							<strong>${_.metaInfo.paymentMethod}</strong>
							<button class="adding-summary-btn" data-click="${_.componentName}:addingStep" step="1">Edit</button>
						</li>
						<li class="adding-summary-item">
							<span>Plan:</span>
							<strong>FREE</strong>
							<button class="adding-summary-btn" data-click="${_.componentName}:addingStep" step="1">Edit</button>
						</li>
					</ul>
				</div>
				<div class="adding-section">
					<div class="adding-summary">
						<g-select name="discount-type" classname="adding-summary-select" items=${JSON.stringify(items)}></g-select>
					</div>
					<table class="adding-summary-table">
						<thead>
							<tr>
								<th>Course</th>
								<th>Membership</th>
								<th>Plan</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>${_.metaInfo.course}</td>
								<td>${_.studentInfo.paymentMethod}</td>
								<td>Free</td>
								<td>$ 0.00</td>
							</tr>
							<tr>
								<td colspan="3"></td>
								<td>
									<ul class="adding-summary-table-list">
										<li>
											<span>Subtotal:</span>
											<strong>$ 0.00</strong>
										</li>
										<li>
											<span>VAT 0%</span>
											<strong> 0.00</strong>
										</li>
										<li>
											<span>Subtotal + VAT:</span>
											<strong>$ 0.00</strong>
										</li>
										<li>
											<span>Total:</span>
											<strong>$ 0.00</strong>
										</li>
									</ul>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="adding-section adding-summary-final">
					<div class="adding-summary-text">By pressing Purchase, you acknowledge that you have read and agree to our <a href="#">Terms of service</a></div>
					<div class="adding-summary-text">Your membership will be renewed automatically.</div>
					<div class="adding-summary-text">You may cancel online anytime.</div>
				</div>
			</div>
		`;
	},

//steps auxiliary tpls
	levelButtons(stepData){
		const _ = this;
		let tpl = ``;
		stepData['levels'].forEach( (item,count) => {
			let activeClass = '';
			if(_.studentInfo['level']){
				if(_.studentInfo['level'] == item._id){
					activeClass = 'active';
				}
			} else if (!count) {
				activeClass = 'active';
			}
			tpl += `
				<button class="adding-button ${ activeClass }" data-id="${item._id}" data-click="${_.componentName}:changeStudentLevel">
					${item.title}
				</button>
			`;
		});
		return tpl;
	},

	selectAvatarTpl(){
		const _ = this;
		let tpl = `
			<div class="avatars" id="avatars">
				<h3 class="avatars-title title">Select Avatar</h3>
				<ul class="avatars-list"></ul>
				<div class="avatars-buttons">
					<button class="button" data-click="${_.componentName}:closeAvatar">Discard</button>
					<button class="button-blue" data-click="${_.componentName}:confirmAvatar">Save</button>
				</div>
			</div>
		`;
		return tpl;
	},
	avatarsItemsTpl(){
		const _ = this;
		let tpl = '';
		for (let item of _.avatars) {
			tpl += _.avatarsItemTpl(item);
		}
		return tpl;
	},
	avatarsItemTpl(item){
		const _ = this;
		let imgTitle = item.avatar.split('.')[0];
		return `
				<li class="avatars-item">
					<button data-click="${_.componentName}:pickAvatar" title="${imgTitle}" value="${item['_id']}">
						<img src="/img/${imgTitle}.svg" alt="${imgTitle}">
					</button>
				</li>`
	},

	createSelectItems(items,template,active){
		const _ = this;
		let outItems = [];
		let templateSplit = template.split(';');
		for (let item of items) {
			let arrItem = {};
			templateSplit.forEach(( spl) => {
				let
					splitItem = spl.split(':'),
					selectProp = splitItem[0],
					dataProp = splitItem[1];
				arrItem[selectProp] = item[dataProp];
				if(active){
					let activeSplit = active.split(':'),
						activeProp = activeSplit[0],
						activeValue = activeSplit[1];
					if(item[activeProp] == activeValue){
						arrItem['active'] = true;
					}
				}
			});
			outItems.push(arrItem);
		}
		return outItems;
	},
	choiceSelectStudent(choiceData,title='School you are interested in applying to'){
		const _ = this;
		let activeFirst,activeSecond,activeThird;

		if(_.studentInfo.firstSchool) activeFirst = `_id:${_.studentInfo.firstSchool}`;
		if(_.studentInfo.secondSchool) activeSecond = `_id:${_.studentInfo.secondSchool}`;
		if(_.studentInfo.thirdSchool) activeThird = `_id:${_.studentInfo.thirdSchool}`;
		let
			firstItems = _.createSelectItems(choiceData['schools'],"value:_id;text:school",activeFirst ?? ''),
			secondItems = _.createSelectItems(choiceData['schools'],"value:_id;text:school",activeSecond ?? ''),
			thirdItems = _.createSelectItems(choiceData['schools'],"value:_id;text:school",activeThird ?? '');
		return `
			<div class="adding-section">
					<h4 class="adding-subtitle withmar">${title}</h4>
					<div class="adding-inpt">
						<div class="form-label-row">
							<label class="form-label">First choice</label>
						</div>
						<g-select 
							class="select adding-select" 
							name="firstSchool" 
							data-change="${_.componentName}:${_.subSection == 'profile' ? 'inputCourseData' : 'fillStudentInfo'}" 
							classname="adding-select" 
							arrowsvg="/img/sprite.svg#select-arrow-bottom" 
							title=""
							items='${JSON.stringify(firstItems)}'
						></g-select>
					</div>
					<div class="adding-inpt">
						<div class="form-label-row">
							<label class="form-label">Second choice</label>
						</div>
						<g-select 
							class="select adding-select" 
							name="secondSchool"
							data-change="${_.componentName}:${_.subSection == 'profile' ? 'inputCourseData' : 'fillStudentInfo'}" 
							classname="adding-select" 
							arrowsvg="/img/sprite.svg#select-arrow-bottom" 
							title=""
						items='${JSON.stringify(secondItems)}'></g-select>
					</div>
					<div class="adding-inpt">
						<div class="form-label-row">
							<label class="form-label">Third choice</label>
						</div>
						<g-select 
							class="select adding-select" 
							name="thirdSchool" 
							data-change="${_.componentName}:${_.subSection == 'profile' ? 'inputCourseData' : 'fillStudentInfo'}" 
							classname="adding-select" 
							arrowsvg="/img/sprite.svg#select-arrow-bottom" 
							title=""
						items='${JSON.stringify(thirdItems)}'></g-select>
					</div>
				</div>
		`;
	},

	fillParentCardsTpl(cardsInfo){
		const _ = this;
		let tpl = '';
		for (let item of cardsInfo) {
			tpl += `
			<div class="billing-item">
				<div class="billing-item-row alc">
					<h6 class="billing-item-title billing-item-name">${item.name}</h6>
					${item.primary ? '<div class="billing-item-primary">Primary</div>' : ''}
				</div>
				<div class="billing-item-row billing-item-body">
					<div class="billing-item-card">
						<div class="billing-item-card-img"><img src="/img/${item.type}.png"></div>
						<div class="billing-item-info">
							<strong>${item.type} **** ${item.number.substr(item.number.length - 4)}</strong>
							<em>Card expires at ${item.date}</em>
						</div>
					</div>
					<div class="billing-item-row billing-item-actions">
						<button class="test-footer-back">Delete</button>
						<button class="button">Edit</button>
					</div>
				</div>
			</div>
		`;
		}
		return tpl;
	},
	fillParentAddressTpl(addressesInfo){
		const _ = this;
		let tpl = '';
		for (let item of addressesInfo) {
			tpl += `
			<div class="billing-item">
				<div class="billing-item-row alc">
					<h6 class="billing-item-title">${item.title}</h6>
					${item.primary ? '<div class="billing-item-primary">Primary</div>' : ''}
				</div>
				<div class="billing-item-row billing-item-body">
					<div class="billing-item-info">
						<span>${item.line1} ${item.line2}</span>
						<span>${item.state} ${item.postcode}</span>
						<span>${item.country}</span>
					</div>
					<div class="billing-item-row billing-item-actions">
						<button class="test-footer-back">Delete</button>
						<button class="button">Edit</button>
					</div>
				</div>
			</div>
		`;
		}
		return tpl;
	},

	addCardForm(){
		const _ = this;
		let tpl = `
		<div class="block addCard" id="addCard">
			<div class="test-header"></div>
			<div class="addCard-inner">
				<h5 class="title">Add New Card</h5>
				<div class="adding-inpt">
					<div class="form-label-row">
						<label class="addCard-label">Name on Card</label>
					</div>
					<g-input 
						type="text" 
						name="card-name" 
						class="g-form-item" 
						data-input="${_.componentName}:fillCardInfo"
						className="form-input adding-inpt"
					></g-input>
				</div>
				<div class="adding-inpt">
					<div class="form-label-row">
						<label class="addCard-label">Card Number</label>
					</div>
					<g-input 
						type="text" 
						name="card-number" 
						class="g-form-item" 
						data-input="${_.componentName}:fillCardInfo"
						className="form-input adding-inpt"
					></g-input>
				</div>
					<div class="addCard-row">
						<div class="adding-inpt">
						<div class="form-label-row">
							<label class="addCard-label">Expiration Date</label>
						</div>
						<g-input 
							type="text" 
							name="card-date" 
							class="g-form-item" 
							data-input="${_.componentName}:fillCardInfo"
							className="form-input adding-inpt"
						></g-input>
					</div>
					<div class="adding-inpt">
						<div class="form-label-row">
							<label class="addCard-label">CVV Code</label>
						</div>
						<g-input 
							type="text" 
							name="card-cvv" 
							class="g-form-item" 
							data-input="${_.componentName}:fillCardInfo"
							className="form-input adding-inpt"
						></g-input>
					</div>
				</div>
				<label for="card-primary" class="notifications-list-item-label addCard-row adding-inpt">
					<div class="notifications-list-item-action">
						<input id="card-primary" type="checkbox">
						<span class="notifications-list-item-action-btn"></span>
					</div>
					<span class="addCard-checkbox-text">Make Card Primary</span>
				</label>
				<div class="addCard-row jcfe addCard-footer">
					<button class="test-footer-back" data-click="modaler:closeModal">Cancel</button>
					<button class="button-blue">Save Card</button>
				</div>
			</div>
		</div>
		`;
		return tpl;
	},
	addBillingAddress(){
		const _ = this;
		let tpl = `
		<div class="block addCard" id="addBillingAddress">
			<div class="test-header"></div>
			<div class="addCard-inner">
				<h5 class="title">Add New Billing Address</h5>
				<div class="adding-inpt">
					<div class="form-label-row">
						<label class="addCard-label">Address Line 1</label>
					</div>
					<g-input 
						type="text" 
						name="billing-address-line-1" 
						class="g-form-item" 
						data-input="${_.componentName}:fillBillingAddressInfo"
						className="form-input adding-inpt"
					></g-input>
				</div>
				<div class="adding-inpt">
					<div class="form-label-row">
						<label class="addCard-label">Address Line 2</label>
					</div>
					<g-input 
						type="text" 
						name="billing-address-line-2" 
						class="g-form-item" 
						data-input="${_.componentName}:fillBillingAddressInfo"
						className="form-input adding-inpt"
					></g-input>
				</div>
				<div class="adding-inpt">
					<div class="form-label-row">
						<label class="addCard-label">City</label>
					</div>
					<g-input 
						type="text" 
						name="billing-address-city" 
						class="g-form-item" 
						data-input="${_.componentName}:fillBillingAddressInfo"
						className="form-input adding-inpt"
					></g-input>
				</div>
					<div class="addCard-row">
						<div class="adding-inpt">
						<div class="form-label-row">
							<label class="addCard-label">State</label>
						</div>
						<g-select 
							type="text" 
							name="billing-address-state" 
							class="g-form-item" 
							title
							arrowsvg="/img/sprite.svg#select-arrow-bottom"
							data-change="${_.componentName}:fillBillingAddressInfo"
							className="adding-select"
							items='[
								{"value":"alabama","text":"Alabama"},
								{"value":"alaska","text":"Alaska"},
								{"value":"california","text":"California"},
								{"value":"delaware","text":"Delaware"}
							]'
						></g-select>
					</div>
					<div class="adding-inpt">
						<div class="form-label-row">
							<label class="addCard-label">Postcode</label>
						</div>
						<g-input 
							type="text" 
							name="billing-address-postcode" 
							class="g-form-item" 
							data-input="${_.componentName}:fillBillingAddressInfo"
							className="form-input adding-inpt"
						></g-input>
					</div>
				</div>
				<label for="billing-address-primary" class="notifications-list-item-label addCard-row adding-inpt">
					<div class="notifications-list-item-action">
						<input id="billing-address-primary" type="checkbox">
						<span class="notifications-list-item-action-btn"></span>
					</div>
					<span class="addCard-checkbox-text">Make Address Primary</span>
				</label>
				<div class="addCard-row jcfe addCard-footer">
					<button class="test-footer-back" data-click="modaler:closeModal">Cancel</button>
					<button class="button-blue">Save Address</button>
				</div>
			</div>
		</div>
		`;
		return tpl;
	},
//end staps auxiliary tpls


// dashboard
	dashboardTabs(){
		const _ = this;
		let curStIndex = 0;
		if (_.currentStudent) {
			_.me['parent']['students'].find((student,index)=>{
				if (student['_id'] == _.currentStudent['_id']) curStIndex = index;
			})
		}
		let tpl = `
			<div class="subnavigate parent">
				<div class="section">`;
		for (let i = 0; i < _.me['parent']['students']['length']; i++) {
			let student = _.me['parent']['students'][i];
			let img;
			if (student['user']['avatar']) {
				img = `<div class="subnavigate-button-img" data-id="${student['user']['avatar']['_id'] ?? student['user']['avatar']}"></div>`
			}
			tpl += `
				<button class="subnavigate-button${ i == curStIndex ? ' active' : ''}" data-click="${_.componentName}:changeStudent" data-index="${i}">
					${img ?? ''}<span>${student['user']['firstName']} ${student['user']['lastName']}</span>
				</button>
			`;
		}
		tpl += `
					<button class="button-blue" data-click="${_.componentName}:changeSection" section="addingStudent">
						<span>Add student</span>
						<svg class="button-icon"><use xlink:href="#plus"></use></svg>
					</button>
				</div>
			</div>
		`;
		return tpl;
	},
	dashboardBodyTpl(){
		const _ = this;
		let date = new Date;
		date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
		let tpl = `
			<div class="section">
				<div class="section-header">
					${_.sectionHeaderTpl({
						title: 'Student Academic Profile',
						gap: false
					})}
					<div class="section-header-select">
						<span>Switch Course</span>
						<g-select
							class="select filter-select" 
							className="filter-select section-header-select course-select"
							arrowsvg="/img/sprite.svg#select-arrow-bottom"
							items=${JSON.stringify([
								{text:'ISEE', active:true},
								{text:'SHSAT'}
							])}></g-select>
					</div>
				</div>
				<div class="block block-gap parent" id="studentProfile">
					<img src="/img/loader.gif" alt="">
				</div>
				<div class="block block-gap">
					${_.profileSubnavigate()}
				</div>
			</div>
			<div class="section">
				${_.sectionHeaderTpl({title: 'Dashboard',gap:false})}
				<div class="row">
					<div class="col">
						<div class="block block-gap" id="scheduleCont">
							${_.scheduleTpl()}
						</div>
						<div class="block block-gap loader-parent" id="starsBlock">
							<img src="/img/loader.gif" alt="">
						</div>
						<div class="block block-gap recent" id="activities">
							<img src="/img/loader.gif" alt="">
						</div>
					</div>
					<div class="col">
						<div class="block block-gap test-scores">
							<div class="block-title-control">
								<h5 class="block-title"><span>Test Scores</span></h5>
								<button class="button"><span>Hide Scores</span></button>
								<button class="button"><span>View Practice Tests</span></button>
							</div>
							<div id="testScores">
								<img src="/img/loader.gif" alt="">
							</div>
						</div>
						<div class="block block-gap">
							<div class="block-title-control">
								<div class="block-title-left">
									<h5 class="block-title"><span>Current Skill Levels</span></h5>
									<p class="block-title-control-text">Click on section below to open practice and improve</p>
								</div>
								<button class="button"><span>What are skill levels?</span></button>
							</div>
							<div id="skillLevels">
								<img src="/img/loader.gif" alt="">
							</div>
						</div>
						<div class="block block-gap achievements">
							<div class="block-title-control">
								<h5 class="block-title"><span>Badges</span></h5>
								<button class="button"><span>View Badges</span></button>
							</div>
							<ul class="achievements-list" id="badges"><img src="/img/loader.gif" alt=""></ul>
						</div>
						<div class="block block-gap">
							<div class="block-title-control">
								<h5 class="block-title"><span>Recent Rewards</span></h5>
								<button class="button"><span>View Achivements</span></button>
							</div>
							${_.recentRewardsTpl()}
						</div>
					</div>
				</div>
			</div>
			<div class="section">
				<div class="section-header">
					${_.sectionHeaderTpl({title: 'Usage Statistics',gap:false})}
					<div class="section-header-select">
						<span>View</span>
						<g-input 
							type="date" 
							className="section-header-input" 
							format="weekDay month DD, YYYY" 
							icon="false"
							xlink="select-arrow-bottom"
							value="${date}"
						></g-input>
					</div>
				</div>
				<ul class="usage-list" id="usageList"><img src="/img/loader.gif" alt=""></ul>
				<div class="row">
					<div class="col">
						<div class="mastered block-gap" id="mastered"><img src="/img/loader.gif" alt=""></div>
						<div class="total-time block-gap" id="totalTime"><img src="/img/loader.gif" alt=""></div>
					</div>
					<div class="col student-progress">
						<div class="student-progress-graphic">
							<h5 class="student-progress-title">Student Progress</h5>
							<div class="student-progress-lines">
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>
						<ul class="student-progress-info" id="studentProgress">
							<img src="/img/loader.gif" alt="">
						</ul>
					</div>
				</div>
			</div>
		`;
		return tpl;
	},
	studentProfileTpl( studentInfo ){
		const _ = this;
		let tpl = `
			<div class="df aifs">
				<div class="parent-student-avatar">
					<img data-id="${studentInfo['user']['avatar']['_id'] ?? studentInfo['user']['avatar']}" data-type="avatars" data-title="avatar">
				</div>
				<div class="parent-student-info">
					<div class="unit df aic jcsb">
						<div class="item">
							<span class="strong">${studentInfo['user']['firstName']} ${studentInfo['user']['lastName']}</span>
							<span class="text">${studentInfo['user']['email']}</span>
						</div>`;
		if (studentInfo['currentSchool']) {
			tpl += `
			<div class="item">
				<span class="strong">${studentInfo['currentSchool']}</span>
				<span class="text">School</span>
			</div>`;
		}
		if (studentInfo['grade']) {
			tpl += `
			<div class="item">
				<span class="strong">${studentInfo['grade']['grade']}</span>
				<span class="text">Grade</span>
			</div>`;
		}
		if (studentInfo['currentPlan']) {
			tpl += `
				<div class="item">
					<span class="strong">${studentInfo['currentPlan']['course'] ? studentInfo['currentPlan']['course']['title'] : ''}</span>
					<span class="text">Course</span>
				</div>
			`
		}
		tpl += `
						<div class="item buttons last">
							<button class="button">Edit Course</button>
							<button 
								class="button-blue" 
								id="${ studentInfo['_id'] }" 
								section="profile"
								data-click="${_.componentName}:changeSection"	
							>Edit Profile</button>
							<button class="button button-hide" data-click="${_.componentName}:hideProfile">
								<svg><use xlink:href="#select-arrow-bottom"></use></svg>
							</button>
						</div>
					</div>
					`;
		if ( !_.isEmpty(studentInfo['currentPlan']) ){
			tpl += `
				<div class="unit">
					<span class="text">APPLICATION SCHOOL LIST</span>
					<div class="df jcsb">`;
			if ( studentInfo['currentPlan']['firstSchool'] ){
				tpl += `
				<div class="item">
					<span class="strong" 
						data-id="${studentInfo['currentPlan']['firstSchool']['_id'] ?? studentInfo['currentPlan']['firstSchool']}" 
						data-type="schools" 
						data-title="school"
					>${studentInfo['currentSchool']}</span>
					<span class="text">1st choice</span>
				</div>
			`;
			}
			if ( studentInfo['currentPlan']['secondSchool'] ){
				tpl += `
				<div class="item">
					<span class="strong" 
						data-id="${studentInfo['currentPlan']['secondSchool']['_id'] ?? studentInfo['currentPlan']['secondSchool']}" 
						data-type="schools" 
						data-title="school"
					>${studentInfo['currentSchool']}</span>
					<span class="text">2nd choice</span>
				</div>
			`;
			}
			if ( studentInfo['currentPlan']['thirdSchool'] ){
				tpl += `
				<div class="item last">
					<span class="strong" 
						data-id="${studentInfo['currentPlan']['thirdSchool']['_id'] ?? studentInfo['currentPlan']['thirdSchool']}" 
						data-type="schools" 
						data-title="school"
					>${studentInfo['currentSchool']}</span>
					<span class="text">3rd choice</span>
				</div>
			`;
			}
			tpl += `</div>
					</div>`
		}
		tpl += `
					<div class="unit">
						<span class="text">CLASSES</span>
						<div class="df aic jcsb">
							
						</div>
					</div>
				</div>
			</div>
		`;
		return tpl;
	},
	profileSubnavigate(){
		const _ = this;
		let buttons = [
			{text:'Dashboard'},
			{text:'Report by Section'},
			{text:'Practice Test'},
			{text:'Trouble Spots'},
			{text:'Achievements'},
			{text:'Activity'},
		];
		let tpl = `
			<div class="subnavigate">
				<div class="section">`;
		for (let i = 0; i < buttons['length']; i++) {
			let button = buttons[i];
			tpl += `
				<button class="subnavigate-button${ !i ? ' active' : ''}" data-click="${_.componentName}:changeStudent" data-index="${i}">
					<span>${button['text']}</span>
				</button>
			`;
		}
		tpl += `
				</div>
			</div>
		`;
		return tpl;
	},
	recentActivitiesTpl(activities){
		const _ = this;
		let tpl = `
			<h5 class="recent-title block-gap">
				<div class="recent-title-img">
					<svg><use xlink:href="#activity"></use></svg>
				</div>
				<span>Recent Activities</span>
			</h5>
			<ul class="recent-list">`;
		for ( let item of activities ){
			tpl += `
				<li class="recent-item">
					<div class="recent-item-row">
						<h6 class="recent-item-title">${_.currentStudent['user']['firstName']} ${_.currentStudent['user']['lastName']}</h6>
						<span class="recent-item-time">
							${_.dateToFormat(item['date'],'DD month YYYY')}
							${_.timeToFormat(item['time'])}
						</span>
					</div>
					<span class="recent-item-text">${ item.title }</span>
				</li>
			`;
		}
		tpl += `</ul>
			<button class="button narrow">Show More</button>
		`;
		return tpl;
	},

	testScoresTpl(scores){
		const _ = this;
		let tpl = `<ul class="test-scores-list">`;
		for(let item of scores) {
			tpl += `
				<li class="test-scores-item" style="border-color: rgb(${item.textColor ?? item.titleColor})">
					<strong style="color: rgb(${item.titleColor})">${item['value']}</strong>
					<span style="color: rgb(${item.textColor ?? item.titleColor})">${item['title']}</span>
				</li>`;
		}
		tpl += `</ul>
			<button class="hidden-show" data-click="${_.componentName}:showHiddenScores">
				<div class="hidden-show-text"><span>Details</span></div>
				<svg>
					<use xlink:href="#select-arrow-bottom"></use>
				</svg>
			</button>
			<div class="hidden-cont">
				<div class="table">
					<table>
						<thead>
							<tr>
								<th>
									<div class="table-inner">Test</div>
								</th>
								<th>
									<div class="table-inner">total</div>
								</th>
								<th>
									<div class="table-inner">VR</div>
								</th>
								<th>
									<div class="table-inner">QR</div>
								</th>
								<th>
									<div class="table-inner">RC</div>
								</th>
								<th>
									<div class="table-inner">MA</div>
								</th>
								<th>
									<div class="table-inner">ESSAY</div>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div class="table-inner">Practice test 1</div>
								</td>
								<td>
									<div class="table-inner">1000</div>
								</td>
								<td>
									<div class="table-inner">400</div>
								</td>
								<td>
									<div class="table-inner">300</div>
								</td>
								<td>
									<div class="table-inner">200</div>
								</td>
								<td>
									<div class="table-inner">100</div>
								</td>
								<td>
									<div class="table-inner">-</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="table-inner">Practice test 2</div>
								</td>
								<td>
									<div class="table-inner">1000</div>
								</td>
								<td>
									<div class="table-inner">400</div>
								</td>
								<td>
									<div class="table-inner">300</div>
								</td>
								<td>
									<div class="table-inner">200</div>
								</td>
								<td>
									<div class="table-inner">100</div>
								</td>
								<td>
									<div class="table-inner">-</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="table-inner">Practice test 3</div>
								</td>
								<td>
									<div class="table-inner">1000</div>
								</td>
								<td>
									<div class="table-inner">400</div>
								</td>
								<td>
									<div class="table-inner">300</div>
								</td>
								<td>
									<div class="table-inner">200</div>
								</td>
								<td>
									<div class="table-inner">100</div>
								</td>
								<td>
									<div class="table-inner">-</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		`;
		return tpl;
	},
	skillLevelsTpl(){
		const _ = this;
		let tpl = `
			<div class="skill-level-list">
				<div class="skill-level-item green">
					<div class="img">
						<svg>
							<use xlink:href="#graphic-4"></use>
						</svg>
					</div><a class="link" href="#"><span>Verbal</span><span>Reasoning</span></a>
				</div>
				<div class="skill-level-item blue">
					<div class="img">
						<svg>
							<use xlink:href="#graphic-3"></use>
						</svg>
					</div><a class="link" href="#"><span>Quantitative</span><span>Reasoning</span></a>
				</div>
				<div class="skill-level-item violet">
					<div class="img">
						<svg>
							<use xlink:href="#graphic-2"></use>
						</svg>
					</div><a class="link" href="#"><span>Reading</span><span>Comprehension</span></a>
				</div>
				<div class="skill-level-item turquoise">
					<div class="img">
						<svg>
							<use xlink:href="#graphic-1"></use>
						</svg>
					</div><a class="link" href="#"><span>Mathematics</span><span>Achievement</span></a>
				</div>
			</div>
		`;
		return tpl;
	},
	badgesTpl(badges){
		const _ = this;
		let tpl = '';
		for (let item of badges) {
			tpl += `
				<li class="achievements-item" ${item['disabled'] ? 'disabled' : ''}>
					<div class="img" style="background-color: rgba(${item['color']},.1);">
						<svg style="fill:rgb(${item['color']})">
							<use xlink:href="#${item['icon']}"></use>
						</svg>
					</div>
					<div class="text" style="background-color: rgb(${item['color']})"><span>${item['value']}</span></div>
				</li>
		`;
		}
		return tpl;
	},
	recentRewardsTpl(){
		const _ = this;
		let tpl = `
			<ul class="rewards-statistic-list">
				<li class="rewards-statistic-item"><strong>03/26</strong>
					<div class="circle violet"></div><span>In-class recognition - 5 stars</span>
				</li>
				<li class="rewards-statistic-item"><strong>03/25</strong>
					<div class="circle green"></div><strong>Badge earned - 15 Skills Mastered</strong>
				</li>
				<li class="rewards-statistic-item"><strong>03/24</strong>
					<div class="circle red"></div><strong>Badge earned - 400 Point Score Improvement</strong>
				</li>
			</ul>
		`;
		return tpl;
	},
	usageStatisticsRow(rowData){
		const _ = this;
		let tpl = ``;
		for( let item of rowData ){
			tpl += `
				<li class="usage-item" style="background-color: rgb(${item['color']})">
					<strong>${item['value']}</strong>
					<span>${item['title']}</span>
				</li>
			`
		}
		return tpl;
	},
	skillsMastered(masteredData){
		return `
			<div class="mastered-title">${masteredData['title']}</div>
			<div class="mastered-value">${masteredData['value']}/${masteredData['total']}</div>
			<div class="mastered-progress">
				<div class="mastered-progress-inner" style="width: ${(masteredData['value']/masteredData['total']) * 100}%"></div>
			</div>
		`;
	},
	totalPracticeTime(showData){
		const _ = this;
		let tpl = `
			<div class="total-time-cont">
				<div class="total-time-value">${showData['value']}</div>
				<div class="total-time-title">${showData['title']}</div>
			</div>
		`;

		let
			timeDataValue = showData['value'].split(':'),
			valueSeconds = timeDataValue[0] * 3600 + timeDataValue[1] * 60 + timeDataValue[2],
			timeDataTotal = showData['total'].split(':'),
			totalSeconds = timeDataTotal[0] * 3600 + timeDataTotal[1] * 60 + timeDataTotal[2],
			length = Math.PI * 96 * ( valueSeconds / totalSeconds ) - 11;

		let svg = `
			<div class="total-time-svg">
				<svg xmlns="http://www.w3.org/2000/svg">
					<circle stroke-linecap="round" cx="50%" cy="50%"></circle>
					<circle stroke-dasharray="${length} 1000" stroke-linecap="round" cx="50%" cy="50%"></circle>
				</svg>
			</div>
		`;

		tpl += svg;
		return tpl;
	},
	studentProgress(progressData){
		const _ = this;
		let tpl = '';
		for( let item of progressData ){
			tpl += `
				<li class="student-progress-item">
					<h6 class="student-progress-item-title">${item['title']}</h6>
					<span class="student-progress-item-value">${item['value']}</span>
				</li>
			`;
		}
		return tpl;
	},


// schedule methods
	scheduleTpl(){
		const _ = this;
		return `
			<div class="block-title-control">
				<h5 class="block-title"><span>Practice Schedule</span></h5>
				<button class="button" data-click="${_.componentName}:deleteSchedule"><span>Delete</span></button>
				<button class="button" data-click="${_.componentName}:editSchedule"><span>Edit</span></button>
			</div>
			<ul class="schedule-list loader-parent" id="scheduleList">
				<img src="/img/loader.gif">
			</ul>
			${_.scheduleFooterTpl()}
		`
	},
	scheduleBlock(dashSchedule){
		const _ = this;
		if (!dashSchedule) return null;
		let
			practiceDate = dashSchedule['practiceTest'] ? new Date(dashSchedule['practiceTest']['date']) : undefined,
			testDate = dashSchedule['test'] ? new Date(dashSchedule['test']['date']) : undefined;
		let tpl = ``;
		let itemsData = _.fillScheduleItemsTpl(dashSchedule);
		if (!itemsData || !itemsData.length) return;
		for (let item of itemsData) {
			tpl += _.scheduleItemTpl(item);
		}
		return tpl;
	},
	scheduleItemTpl({title,count,info,item}){
		const _ = this;
		return `
			<li class="schedule-item">
				<h5 class="schedule-title"><span>${title}</span></h5>
				<div class="inner">
					<span class="count">${count}</span>
					${info}
					${_.drawCircleGraphic(item, _.scheduleColors[item.title])}
				</div>
			</li>
		`
	},
	scheduleFooterTpl(){
		const _ = this;
		return `
			<div class="schedule-footer">
				<button class="schedule-footer-button active">
					<span class="icon"><svg><use xlink:href="#calendar-transparent"></use></svg></span>
					<span class="text">Calendar</span>
					<span class="arrow"></span>
				</button>
				<button class="schedule-footer-button">
					<span class="icon"><svg><use xlink:href="#list"></use></svg></span>
					<span class="text">Schedule</span>
					<span class="arrow"></span>
				</button>
				<button class="schedule-footer-button last">
					<span class="icon"><svg><use xlink:href="#question"></use></svg></span>
					<span class="text">Practice Schedule FAQ</span>
				</button>
			</div>
		`
	},

	starsBlockTpl(starsData){
		const _ = this;
		let tpl = `
			<div class="stars">
				<div class="block-title-control">
					<h5 class="block-title"><span>Stars</span></h5>
					<button class="button"><span>What are stars?</span></button>
				</div>
				<div class="stars-row">
					<div class="stars-circle circle" data-radius="106,134" data-borders="28">
						<div class="circle-count">
							<svg class="circle-count-icon">
								<use xlink:href="#stars"></use>
							</svg><span class="circle-count-title">${_.setInteger(starsData['total'])}</span>
						</div>
					</div>
					<ul class="stars-info">`;
		for( let item of starsData['items'] ){
			tpl += `
				<li class="stars-info-item">
					<div class="stars-info-img" style="background-color:rgba(${item['color']},.1);">
						<svg style="fill:rgb(${item['color']});">
							<use xlink:href="#stars"></use>
						</svg>
					</div>
					<div class="stars-info-text">
						<strong>${_.setInteger(item['count'])}</strong>
						<span>${item['title']}</span>
					</div>
				</li>
			`;
		}
		tpl += `</ul>
				</div>
			</div>
		`;
		return tpl;
	},

	// profile
	personalInfo(){
		const _ = this;
		let gradeActive;
		if(_.studentInfo.grade) gradeActive = `_id:${_.studentInfo.grade}`;
		let gradeItems = _.createSelectItems(_.wizardData.grades, 'value:_id;text:grade', gradeActive);
		return `
			<div class="section parent">
				<div class="block">
					<div class="student-profile-row student-profile-body">
						<div class="student-profile-left">
							<h4 class="admin-block-graytitle">Student Personal Info</h4>
							<div class="adding-avatar">
								<button data-click="${_.componentName}:selectAvatar">
									<strong class="adding-avatar-letter">${_.studentInfo.avatar ? '<img src="/img/' + _.studentInfo.avatar.avatar + '.svg">' : _.studentInfo.firstName.substr(0,1)}</strong>
									<span class="adding-avatar-link">${_.studentInfo.avatar ? 'Change' : 'Select'} Avatar</span>
								</button>
							</div>
							<div class="adding-section">
								<div class="adding-inpt-row">
									<div class="adding-inpt small">
										<div class="form-label-row">
											<label class="form-label">First name</label>
										</div>
										<g-input type="text" name="firstName"  data-input="${_.componentName}:fillStudentInfo" value='${_.studentInfo["firstName"]}' class="g-form-item" classname="form-input adding-inpt"></g-input>
									</div>
									<div class="adding-inpt small">
										<div class="form-label-row">
											<label class="form-label">Last name</label>
										</div>
										<g-input type="text" name="lastName"  data-input="${_.componentName}:fillStudentInfo" value='${_.studentInfo["lastName"]}' class="g-form-item" classname="form-input adding-inpt"></g-input>
									</div>
								</div>
								<div class="adding-inpt">
									<div class="form-label-row">
										<label class="form-label">Email</label>
									</div>
									<g-input type="text" name="email"  data-input="${_.componentName}:fillStudentInfo" value='${_.studentInfo["email"]}' class="g-form-item" classname="form-input adding-inpt"></g-input>
									</div>
								<div class="adding-inpt">
									<div class="form-label-row">
										<label class="form-label">Date registered</label>
									</div>
									<g-input type="text" name="testDate"  data-input="${_.componentName}:fillStudentInfo"  value='${_.createdAtFormat(_.studentInfo["createdAt"])}' class="g-form-item" classname="form-input adding-inpt" disabled></g-input>
									</div>
							</div>
							<div class="adding-section">
								<div class="password-inner passwords">
									<h6 class="password-title">Password</h6>
									<div class="adding-inpt">
										<div class="form-label-row">
											<label class="form-label">New Password</label>
										</div>
										<g-input 
											type="password" 
											name="password" 
											match="changePassword"
											class="g-form-item" 
											data-outfocus="${_.componentName}:validatePassword"
											className="form-input adding-inpt"
										></g-input>
										<span class="form-label-desc">8+ characters, with min. one number, one uppercase letter and one special character</span>
									</div>
									<div class="adding-inpt">
										<div class="form-label-row">
											<label class="form-label">Repeat password</label>
										</div>
										<g-input 
											type="password" 
											name="confirm_password" 
											match="changePassword"
											class="g-form-item" 
											data-outfocus="${_.componentName}:validatePassword" 
											className="form-input adding-inpt"
										></g-input>
										<span class="form-label-desc" style="display:none;">Password does not match</span>
									</div>
								</div>
							</div>
							<div class="adding-section">
								<h4 class="adding-subtitle withmar">Your current school</h4>
								<div class="adding-inpt small">
									<div class="form-label-row">
										<label class="form-label">Current school</label>
									</div>
									<g-input 
										type="text" 
										name="currentSchool" 
										data-input="${_.componentName}:fillStudentInfo" 
										value='${_.studentInfo["currentSchool"] ?? ''}' 
										class="g-form-item" 
										classname="form-input adding-inpt"
									></g-input>
								</div>
								<div class="adding-inpt">
									<div class="form-label-row">
										<label class="form-label">Grade</label>
									</div>
									<g-select 
										class="select adding-select" 
										name="grade" 
										data-change="${_.componentName}:fillStudentInfo" 
										classname="adding-select" 
										arrowsvg="/img/sprite.svg#select-arrow-bottom" 
										title="Course"
										items=${JSON.stringify(gradeItems)}
									></g-select>
								</div>
							</div>
						</div>
						<div class="student-profile-right">
							<h4 class="admin-block-graytitle">Courses & Plans</h4>
							<div class="student-profile-courses-btns">
								<button class="student-profile-courses-btn${(!_.isEmpty(_.studentInfo['currentPlan']) && _.studentInfo['currentPlan']['course']['title'] == 'ISEE') ? ' active' : ''}">ISEE</button>
								<button class="student-profile-courses-btn${_.isEmpty(_.studentInfo['currentPlan']) ? ' active' : _.studentInfo['currentPlan']['course']['title'] == 'SSAT' ? ' active' : ''}">SSAT</button>
								<button class="student-profile-courses-btn${(!_.isEmpty(_.studentInfo['currentPlan']) && _.studentInfo['currentPlan']['course']['title'] == 'SHSAT') ? ' active' : ''}">SHSAT</button>
							</div>
							<div class="student-profile-course-info loader-parent">
								<img src='/img/loader.gif' class='loader'>
							</div>
						</div>
					</div>
					<div class="student-profile-footer">
						<!--<button class="student-profile-delete" 
							data-click="${_.componentName}:showRemoveUserPopup" 
							data-id="${_.studentInfo['studentId']}"
						>Delete User Profile</button>-->
						<div class="student-profile-actions">
							<button class="test-footer-back" 
								data-clear="true" 
								data-click="${_.componentName}:changeSection" 
								section="dashboard"
							>
								<span>Discard</span>
							</button>
							<button class="button-blue" data-clear="true" data-click="${_.componentName}:updateStudent">
								<span>Save Changes</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		`;
	},
	courseInfo(choiceData){
		const _ = this;
		let
			plan = _.currentStudent["currentPlan"],
			course = plan && plan['course'] ? plan['course'].title : '',
			level = plan && plan['level'] ? plan['level'].title : '',
			testDate = plan && plan['testDate'] ? _.createdAtFormat(plan['testDate']) : '';
		return `
			<div class="adding-section">
				<h4 class="adding-subtitle withmar">Course & Test Information</h4>
				<div class="adding-inpt">
					<div class="form-label-row">
						<label class="form-label">Course</label>
					</div>
					<g-input type="text" name="course" value='${course} ${level}' class="g-form-item" classname="form-input adding-inpt" disabled></g-input>
					</div>
				<div class="adding-inpt">
					<div class="form-label-row">
						<label class="form-label">Official test date</label>
					</div>
					<g-input 
						type="date" 
						name="testDate" 
						format="month DD, YYYY" 
						icon="false" 
						value="${testDate}" 
						class="g-form-item" 
						classname="form-input adding-inpt"
						data-change="${_.componentName}:inputCourseData"
					></g-input>
					</div>
			</div>
			${_.choiceSelectStudent(choiceData,'Application School List')}
			<div class="adding-section">
				<h4 class="adding-subtitle withmar">Membership Plan</h4>
				<div class="student-profile-plan">
					<h5 class="student-profile-plan-title">${course}</h5>
					<div class="student-profile-plan-edit">
						<button class="button-blue">Edit</button>
						<button 
							class="button-white"
							data-click="${_.componentName}:showCancelMembership"
						>Cancel</button>
					</div>
					<div class="student-profile-plan-price">$20.00 per month</div>
					<span>Your plan renews on April 21, 2022</span>
				</div>
				<button class="button student-profile-refund">Request Refund</button>
			</div>
			<!--<button class="student-profile-remove" data-click="${_.componentName}:showRemovePopup">Remove This Course</button>-->
		`;
	},
	emptyCourseInfo(){
		const _ = this;
		return `
			<h5 class="student-profile-course-empty">Currently, there is no ISEE course assign to this student</h5>
			<button  class="student-profile-course-empty-btn" data-click="${_.componentName}:changeSection" section="assignCourse">
				<svg class="button-icon">
					<use xlink:href="#plus"></use>
				</svg>
				<span>Add Course</span>
			</button>
		`;
	},
	removeUserTpl(){
		const _ = this;
		return `
			<div class="modal-block student-profile-remove-popup" id="removeUserForm">
				<h6 class="modal-title">
					<span>Delete student profile</span>
				</h6>
				<p class="modal-text">Are you sure you want to delete this student profile?</p>
				<div class="modal-row">
					<button class="button" type="button" data-click="modaler:closeModal"><span>Cancel</span></button>
					<button class="button-red" data-click="${_.componentName}:removeUser"><span>Remove</span></button>
				</div>
			</div>
		`;
	},
	cancelMembershipTpl(){
		const _ = this;
		let reasons = [
			{text: 'Techical issues'},
			{text: 'Too expensive'},
			{text: 'Switching to another product'},
			{text: 'Not sure how to use the data & tools'},
			{text: 'Missing features I need'},
			{text: 'Other (please explain below)'}
		]
		return `
			<div class="modal-block student-profile-remove-popup" id="cancelForm">
				<h6 class="modal-title">
					<span>We’re sorry to see you go</span>
				</h6>
				<p class="modal-text">Before you cancel, we are interested in a learning more about why you decide to cancel your membership, please let us know the reason you are leaving.</p>
				<p class="modal-text">Your responses will be kept confidential and will not be used for any purpose other than research conducted by our company.</p>
				<g-input type="radio" name="reason" items='${JSON.stringify(reasons)}'></g-input>
				<textarea class="modal-area modal-cancel-area" name="cancel_desc" placeholder="Anything you want to share? (Optional)"></textarea>
				<button class="button-red modal-cancel-button"><span>Cancel Membership</span></button>
				<button class="button modal-cancel-button" type="button" data-click="modaler:closeModal"><span>I don’t want to cancel</span></button>
			</div>
		`;
	},
}