export const view = {
	modulesBody(){
		const _ = this;
		return `<div class="section">
			<div class="modules-body">Test body</div>
		</div>`;
	},
	moduleItem(moduleData){
		const _ = this;
		return `<div class="block student-main">
			<h1 class="main-title"><strong>${moduleData.title}</strong></h1>
			<p class="student-main-text">
				${moduleData.subtitle}
			</p>
			<button class="button-blue" data-id="${moduleData['id']}" data-click="${_.componentName}:fillModuleWeeks"><span>Открыть</span></button>
		</div>`;
	},
	moduleInnerTpl(headerData){
		const _ = this;
		return `
			<div class="block">
				${_.sectionHeaderTpl(headerData)}
				<ul class="loader-parent practice-task-list" id="week-list">
					<img src="/img/loader.gif" alt="">
				</ul>
			</div>
		`;
	},

	weekItemTpl(week,color='80, 20, 208'){
		const _ = this;
		return `
			<li 
				class="practice-task-item" 
				style="background-color: rgba(${color},.05)" 
				data-id="${week['id']}"
			>
				<h6 
					class="practice-task-item-title"
					style="color: rgb(${color});"
				>
					<span class="text">
						${week['title']}
					</span>
				</h6>
				<div class="practice-task-item-actions">

					</span>
					<button 
						class="practice-task-item-button"
						data-id="${week.id}"
						section = "quizDirections"
						data-click="${_.componentName}:updateWeek"
						style="background-color:rgb(${color});"
					>Редактировать</button>
				</div>
			</li>
		`;
	},


	updateWeekTpl(weekData){
		const _ = this;
		return `<div class='week-block block test-block'>
			<form class="week-form" data-submit="${_.componentName}:updateWeek">
			<div class="form-block">
				<div class="form-label-row">
					<label class="form-label">Название недели</label>
				</div>
				<g-input type="text" class="g-form-item" classname="form-input" placeholder="Название недели" value="${weekData['title']}"></g-input>
			</div>
			<div class="form-block">
				<div class="form-label-row">
					<label class="form-label">Описание недели</label>
				</div>
				<g-input type="textarea" class="g-form-item" classname="form-input"  value="${weekData['title']}"></g-input>
			</div>
			<div class="form-block">
				<div class="form-label-row">
					<label class="form-label">Вводное видео</label>
				</div>
				<g-input type="text" class="g-form-item" classname="form-input"  value="${weekData['title']}"></g-input>
			</div>
			<div class="form-block">
				<button class="button-red">
					<span>Добавить тему +</span>
				</button>
			</div>
			</form>
		</div>`;
	}




}