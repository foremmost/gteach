export const loginView = {
	resetTpl(params){
		const _ = this;
		let
				rawParams = params[1].split('?'),
				token = rawParams[0],
				email = rawParams[1].split('=');
		return `
			<div class="login-right">
				<form class="login-form" data-submit="${_.componentName}:doFormAction" data-handle="doReset">
					<h2 class="login-title"><span>Reset Password</span></h2>
					<h5 class="login-subtitle"><span>Please enter your new password</span></h5>
					<input type="hidden" class="g-form-item" name="token" value="${token}">
					<input type="hidden" class="g-form-item" name='email' value="${email[1]}">
					<div class="form-block">
						<div class="form-label-row">
							<label class="form-label">Password</label>
						</div>
						<g-input type="password" name="password" required class="g-form-item pwd" classname="form-input"></g-input>
						<span class="form-block-comment">8+ characters, with min. one number, one uppercase letter and one special character</span>
					</div>
					<div class="form-block">
						<div class="form-label-row">
							<label class="form-label">Confirm password</label>
						</div>
						<g-input type="password" name="confirmation" required class="g-form-item" classname="form-input" match=".pwd"></g-input>
					</div>
					<div class="form-block row">
					<button class="button-blue"><span>Reset Password</span></button></div>
				</form>
			<div class="login-bottom">
				<a class="link" href="#"><span>Contact Us</span></a></div>
			</div>
		`;
	},
	passwordChangedTpl(){
		const _ = this;
		return `
			<div class="login-full login-success">
				<h2 class="login-main-title"><span>Password is changed</span></h2>
				<div class="login-main-subtitle">
					<span>Your password is successfully changed.</span>
					<span>Please Sign in to your account</span>
				</div>
				<a class="button-blue" data-click="${_.componentName}:changeSection" section="welcome"><span>Sign In</span></a>
				<img class="login-success-img" src="/img/S_multitasking.png" alt="">
			</div>
		`;
	},
	welcomeTpl(initTpl=this.loginTpl()){
		const _ =  this;
	/*	_.fillPartsPage([
			{ part:'row', content: _.markup(_.rowTpl(),false)},
			{ part:'left', parent:'.login', content: _.markup(_.leftTpl(),false)},
			{ part:'right', parent:'.login', content: _.markup(initTpl,false)}
		],true);*/
	},
	registerTpl(){
		const _ = this;
		return `
			<div>
				<form class="login-form" data-submit="${_.componentName}:doFormAction" data-handle="doRegister">
					<h2 class="login-title">
						<span>Sign Up to Prepfuel</span>
					</h2>
					<h5 class="login-subtitle">
						<span>Already have an account?</span>
						<a class="link" data-click="${_.componentName}:changeSection" section="login"><span>Sign In</span></a>
					</h5>
					<div class="login-row">
						<div class="form-block">
							<div class="form-label-row">
								<label class="form-label">First Name</label>
							</div>
							<g-input type="text" class="g-form-item" className="form-input" required name="firstName"></g-input>
						</div>
						<div class="form-block">
							<div class="form-label-row">
								<label class="form-label">Last Name</label>
							</div>
							<g-input type="text" class="g-form-item" className="form-input" required name="lastName"></g-input>
						</div>
				</div>
				<div class="form-block">
					<div class="form-label-row">
						<label class="form-label">Email</label>
					</div>
						<g-input type="email" class="g-form-item" className="form-input" required name="email"></g-input>
					</div>
					<div class="form-block">
					<div class="form-label-row">
						<label class="form-label">Password</label>
					</div>
					<g-input type="password" class="g-form-item" className="form-input" required name="password"></g-input>
					<span class="form-block-comment">8+ characters, with min. one number, one uppercase letter and one special character</span>
				</div>
				<div class="form-block">
				<div class="form-checkbox-row">
				<label class="form-checkbox-label">
					<g-input type="checkbox" class="" items='[{"value":1,"text":""}]' data-change="${_.componentName}:changeAgree"></g-input>
					<span class="form-checkbox-label-text">I agree to the</span>
				</label><a class="link" href="#"><span>Terms &amp; Conditions</span></a><span>and</span><a class="link" href="#"><span>Privacy Policy</span></a>
				</div>
				</div>
					<div class="form-block">
						<button class="button-blue" id="create-account-btn" disabled>
							<span>Create account</span>
						</button>
					</div>
				</form>
			</div>
		`;
	},
	forgotDoneTpl(){
		const _ = this;
		return `
			<div class="login-full login-success">
				<h2 class="login-main-title"><span>We sent password reset link to your email</span></h2>
				<div class="login-main-subtitle"><span>Please check your inbox messages</span></div>
				<div class="form-checkbox-row login-checkbox"><span>Did’t receive an email?</span>
				<a class="link" href='/login/forgot'>Resend</a></div><img class="login-success-img" src="/img/S_email.png" alt="">
			</div>
		`;
	},
	forgotTpl(){
		const _ = this;
		//data-click="${_.componentName}:changeSection" section="reset"
		return `<div class="login-right">
				<form class="login-form" data-submit="${_.componentName}:doFormAction" data-handle="doForgot">
					<h2 class="login-title">
						<span>Забыли пароль?</span>
					</h2>
					<h5 class="login-subtitle">
						<span>Введите email адресс, который вы указали при регистрации</span>
						<span>мы пришлём ссылку для восстановления пароля.</span>
					</h5>
					<div class="form-block">
						<div class="form-label-row">
							<label class="form-label">Email</label>
						</div>
						<g-input class="g-form-item" type="email" name="email" className="form-input" required></g-input>
					</div>
					<div class="form-block row">
						<a class="button-lightblue" data-click="${_.componentName}:changeSection" section="login">
							<span>Назад</span>
						</a>
						<button class="button-blue" >
							<span>Сбросить пароль</span>
						</button>
					</div>
				</form>
			</div>`;
	},
	leftTpl(){
		const _ = this;
		return `
			<div class="login-left-logo">
				<svg width="433" height="275" viewBox="0 0 433 275" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M299.005 208.722L260.659 107.299C261.09 105.34 275.093 94.24 275.739 76.8284C276.17 67.0343 270.353 54.6286 261.306 51.3639C262.167 53.9756 272.077 60.2873 271 74.4343C270.569 80.9637 263.029 96.1988 257.643 99.4635C254.412 94.0224 232.439 25.6817 223.391 0.870117L211.543 37.2169C211.974 39.8287 214.128 43.9639 218.436 55.7168C221.883 65.9461 237.394 108.822 238.686 114.699C231.793 122.099 182.461 147.346 165.873 159.969C162.211 162.798 158.333 165.628 154.671 168.457C136.791 182.386 116.757 202.628 112.879 225.916C109.217 247.68 119.342 269.445 141.53 273.145C141.53 272.492 141.53 271.839 141.53 271.186C132.052 269.009 126.451 265.092 121.496 256.386C116.326 247.245 115.249 234.186 118.049 224.174C122.142 208.722 138.945 191.31 149.716 180.863L170.828 164.975C178.152 159.751 186.338 154.963 194.094 150.393L241.487 122.534C245.149 131.457 248.38 141.904 251.612 151.046C255.058 160.622 258.72 170.416 261.736 180.21C264.968 190.004 268.63 199.798 271.861 209.374C273.8 214.598 273.8 220.91 269.922 225.263C267.768 227.657 263.675 229.18 260.228 230.051C256.351 230.921 257.213 230.268 257.428 232.227C257.428 233.533 257.213 233.316 260.013 233.316H320.978C319.901 225.916 308.483 235.492 299.005 208.722Z" fill="#EAC7C7"/>
					<path d="M161.136 201.755C160.92 203.061 161.567 199.361 162.644 192.396C162.644 192.396 162.213 191.961 161.782 191.961C161.567 191.961 160.92 191.961 160.92 191.961C157.258 200.014 150.365 221.125 138.947 228.308C135.285 230.484 134.639 229.178 134.208 233.096H169.753C168.891 225.261 155.319 236.143 161.136 201.755Z" fill="#EAC7C7"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M274.453 115.351C271.006 116.657 262.174 118.834 258.512 119.051C258.727 114.916 262.389 112.74 258.512 110.128C252.911 106.21 249.895 116.004 246.448 116.875C245.155 107.952 248.818 108.387 254.634 104.034C268.636 91.8457 257.865 79.44 249.248 93.5869C246.017 98.5928 244.509 103.381 243.001 108.822L242.57 110.128C242.786 114.263 241.493 122.098 246.448 124.057C248.602 121.446 251.834 109.693 257.865 111.869C259.589 122.316 243.432 122.534 244.509 130.804C248.818 132.981 252.695 129.716 254.203 126.016C258.081 119.922 258.081 121.01 264.974 119.269C270.791 117.963 272.945 117.31 277.469 116.44L274.453 115.351ZM256.357 89.234C264.974 93.3693 252.911 104.904 247.74 107.081C247.74 103.599 253.126 90.7575 256.357 89.234ZM246.879 128.628C247.31 126.234 250.756 123.622 253.126 122.969C252.049 125.798 250.972 128.845 246.879 128.628Z" fill="#333333"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M334.338 108.603C322.059 118.18 316.242 128.191 309.995 127.103C307.41 124.709 309.133 113.392 311.287 110.345C314.95 106.209 318.181 102.292 320.335 96.6329C320.981 92.7153 322.705 87.9271 318.181 86.8389C311.503 87.0565 303.963 105.774 303.748 112.086L303.532 114.48C303.748 119.486 301.378 129.497 307.841 131.239C315.165 133.415 326.582 115.568 333.907 110.345L334.338 108.603ZM313.011 97.5035C314.088 94.6741 315.38 88.7977 318.396 88.58C321.628 93.1506 314.95 106.862 310.641 109.256C309.995 106.427 312.149 100.333 313.011 97.5035Z" fill="#333333"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M271.651 116.873C271.22 121.661 272.297 124.708 278.114 126.014C284.576 127.538 298.794 117.961 308.704 112.738C308.704 112.52 308.704 112.085 308.488 111.867C299.656 116.656 279.622 126.014 277.037 122.967C273.374 121.008 275.529 117.526 275.744 117.091C294.27 111.214 284.792 97.5027 272.944 113.826C272.944 113.609 271.651 116.003 271.651 116.873ZM284.145 108.167C284.792 110.126 277.898 115.132 275.744 115.132C274.882 113.173 281.776 106.426 284.145 108.167Z" fill="#333333"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M121.717 112.956C112.669 120.139 95.2198 136.897 98.6666 116.003C95.8661 112.521 95.0044 109.039 90.4805 114.262C85.5258 120.139 88.3263 119.268 79.0631 121.444C60.3213 126.668 40.5024 123.186 21.7606 130.586C17.4522 132.327 -1.28963 140.162 1.94172 146.691C6.03475 146.038 6.25018 138.638 17.4522 134.503C32.5318 127.539 46.7497 127.103 62.4756 125.362C74.3238 123.839 75.8318 122.533 85.7412 120.574C85.9566 123.621 83.3716 125.144 85.095 128.844C90.696 132.762 91.9885 126.668 95.0044 124.491C98.4512 127.756 101.252 130.586 108.145 126.668C111.161 125.58 115.685 119.921 125.164 114.262C125.164 114.045 125.81 112.303 125.594 111.868C120.209 114.48 127.318 108.168 121.717 112.956ZM88.7571 127.103C88.1109 124.927 89.8343 122.533 90.9114 119.703C91.9885 117.527 93.7119 114.48 95.8661 113.827C96.2969 117.309 91.9885 125.58 88.7571 127.103Z" fill="#333333"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M203.579 114.916C201.641 118.616 199.917 122.316 203.149 124.492C206.595 125.798 208.103 122.098 211.335 120.139C214.351 123.839 216.72 126.886 224.045 123.839C230.938 121.01 247.741 105.992 245.156 110.345C245.156 110.127 248.387 107.733 248.387 107.298C243.002 109.039 246.233 107.516 239.986 111.651C230.292 117.745 210.904 130.804 216.505 112.086C215.643 107.951 213.489 104.686 208.319 109.257L203.579 114.916ZM205.087 122.098C204.656 119.704 206.595 117.527 208.103 114.916C209.396 112.739 211.335 110.127 213.704 109.692C213.704 113.174 208.534 120.792 205.087 122.098Z" fill="#333333"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M141.537 124.711C137.875 120.358 142.183 112.74 140.891 107.517C137.444 107.299 137.875 107.952 136.582 110.999L130.551 119.705C129.043 121.664 128.181 123.623 126.242 123.405C124.519 119.487 129.043 109.258 121.287 109.693C119.779 111.652 120.426 111.652 120.21 114.046L119.349 115.352C119.779 118.834 118.487 126.234 124.519 126.67C131.843 127.322 130.981 121.446 134.213 119.705C137.66 136.028 146.492 125.146 147.569 124.493C149.292 123.623 154.247 114.917 161.356 113.393C161.356 112.74 161.787 111.217 161.572 110.781C148.431 114.481 144.769 127.105 141.537 124.711Z" fill="#333333"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M182.465 122.969C178.803 118.616 183.112 110.998 181.819 105.775C178.372 105.557 179.019 106.21 177.511 109.257L171.479 117.963C169.971 119.922 169.109 121.88 167.17 121.663C165.447 117.745 169.54 108.604 162 109.039C160.492 110.998 160.708 109.91 160.492 112.304L160.062 113.827C160.492 117.31 159.2 124.71 165.232 125.145C172.556 125.798 171.694 119.922 174.926 118.18C178.372 134.504 189.574 123.404 196.683 118.398C199.915 115.133 204.439 113.827 207.67 114.045C207.67 113.392 210.47 108.169 210.47 107.733C197.114 111.433 185.697 125.363 182.465 122.969Z" fill="#333333"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M409.521 105.339C401.119 105.339 390.133 104.469 381.731 105.557C371.175 106.428 362.558 109.475 353.295 114.916C348.987 117.528 337.139 130.586 333.476 126.886C331.753 125.363 332.184 121.01 332.615 115.786C333.046 113.175 333.692 110.781 334.553 109.692C338.431 105.775 341.878 101.857 344.248 96.416C345.109 92.4983 347.048 87.9278 342.524 86.4043C335.846 86.1866 327.229 104.469 326.798 110.781L326.583 112.957C326.583 114.698 326.152 117.092 325.937 119.704C325.506 123.186 325.937 127.757 328.522 129.498C337.569 135.592 348.987 113.828 370.96 108.822C393.149 104.469 408.444 108.604 423.523 105.992C425.893 105.775 428.693 105.122 431.709 104.251C432.355 103.816 432.14 103.163 432.14 102.945C432.14 102.51 431.709 102.075 431.278 102.292C424.385 104.251 418.568 105.339 409.521 105.339ZM337.139 97.0689C338.431 94.2395 339.939 88.5807 342.955 88.3631C345.971 93.1513 338.647 106.428 334.338 108.604C333.692 105.775 335.846 99.6806 337.139 97.0689Z" fill="#333333"/>
					<path d="M96.7243 167.805C96.7243 168.893 96.7243 169.764 96.7243 170.417C96.7243 171.07 96.7243 171.94 96.5089 172.811C96.5089 173.464 96.2934 174.117 96.078 174.77C95.6472 176.511 94.7855 177.381 93.7084 177.381C93.493 177.381 93.2775 177.381 93.0621 177.381H92.8467V179.34H93.0621C93.2775 179.34 93.2775 179.34 93.7084 179.34C96.078 179.34 97.3706 178.034 98.0168 175.205C98.4477 173.464 98.6631 171.505 98.6631 168.676V165.411H104.48V179.34H106.418V163.452H96.9397L96.7243 167.805Z" fill="#333333"/>
					<path d="M117.835 163.235H116.112L109.218 178.688L109.003 178.906H111.157L113.096 174.771H120.636L122.359 178.906V179.123H124.513L117.835 163.235ZM113.742 173.029L116.758 166.065L119.774 173.029H113.742Z" fill="#333333"/>
					<path d="M133.345 169.112H129.036V165.194H137.869V163.235H127.098V179.123H133.56C137.007 179.123 139.161 177.165 139.161 174.118C139.161 172.594 138.73 171.506 137.653 170.418C136.576 169.547 135.284 169.112 133.345 169.112ZM133.345 177.165H129.036V171.071H133.345C135.715 171.071 137.007 172.159 137.007 174.118C137.007 176.076 135.715 177.165 133.345 177.165Z" fill="#333333"/>
					<path d="M149.071 163.018C146.916 163.018 144.978 163.888 143.47 165.412C141.962 166.935 141.315 168.894 141.315 171.288C141.315 173.682 141.962 175.641 143.47 177.165C144.978 178.688 146.916 179.559 149.071 179.559C151.44 179.559 153.164 178.906 154.672 177.165C156.18 175.641 156.826 173.682 156.826 171.288C156.826 168.894 155.964 166.935 154.672 165.412C153.164 163.888 151.225 163.018 149.071 163.018ZM153.164 175.641C152.087 176.729 150.579 177.382 149.071 177.382C147.347 177.382 146.055 176.729 144.978 175.641C143.901 174.553 143.254 173.029 143.254 171.288C143.254 169.547 143.901 168.023 144.978 166.935C146.055 165.847 147.563 165.194 149.071 165.194C150.794 165.194 152.087 165.847 153.164 166.935C154.241 168.023 154.887 169.547 154.887 171.288C154.887 173.029 154.241 174.553 153.164 175.641Z" fill="#333333"/>
					<path d="M166.737 163.452H160.059V179.34H161.997V172.593H166.521C169.537 172.593 171.691 170.852 171.691 168.023C171.907 165.193 169.753 163.452 166.737 163.452ZM166.521 170.417H161.997V165.193H166.521C168.46 165.193 169.753 166.064 169.753 167.805C169.753 169.546 168.676 170.417 166.521 170.417Z" fill="#333333"/>
					<path d="M180.094 163.235H178.371L171.477 178.688L171.262 178.906H173.416L175.355 174.771H183.11L184.833 178.906V179.123H186.988L180.094 163.235ZM176.001 173.029L179.017 166.065L182.033 173.029H176.001Z" fill="#333333"/>
					<path d="M185.694 165.193H191.08V179.123H193.019V165.193H198.404V163.452H185.694V165.193Z" fill="#333333"/>
					<path d="M206.804 163.018C204.65 163.018 202.711 163.888 201.203 165.412C199.695 166.935 199.049 168.894 199.049 171.288C199.049 173.682 199.695 175.641 201.203 177.165C202.711 178.688 204.65 179.559 206.804 179.559C209.174 179.559 210.897 178.906 212.405 177.165C213.913 175.641 214.559 173.682 214.559 171.288C214.559 168.894 213.698 166.935 212.405 165.412C210.897 163.888 208.958 163.018 206.804 163.018ZM210.897 175.641C209.82 176.729 208.312 177.382 206.804 177.382C205.081 177.382 203.788 176.729 202.711 175.641C201.634 174.553 200.988 173.029 200.988 171.288C200.988 169.547 201.634 168.023 202.711 166.935C203.788 165.847 205.296 165.194 206.804 165.194C208.527 165.194 209.82 165.847 210.897 166.935C211.974 168.023 212.62 169.547 212.62 171.288C212.62 173.029 211.974 174.553 210.897 175.641Z" fill="#333333"/>
					<path d="M224.47 163.452H217.792V179.34H219.731V172.593H224.255C227.271 172.593 229.425 170.852 229.425 168.023C229.64 165.193 227.486 163.452 224.47 163.452ZM224.47 170.417H219.946V165.193H224.47C226.409 165.193 227.701 166.064 227.701 167.805C227.486 169.546 226.409 170.417 224.47 170.417Z" fill="#333333"/>
					<path d="M234.381 175.64V163.452H232.227V179.123H233.95L243.213 166.934V179.123H245.152V163.452H243.429L234.381 175.64Z" fill="#333333"/>
					<path d="M249.027 167.805C249.027 169.982 250.319 171.505 252.473 172.158L247.519 179.34H249.888L254.627 172.376H258.936V179.34H260.875V163.452H254.197C251.181 163.452 249.027 165.193 249.027 167.805ZM259.151 165.193V170.199H254.197C252.258 170.199 251.181 169.329 251.181 167.587C251.181 166.064 252.258 164.976 254.197 164.976H259.151V165.193Z" fill="#333333"/>
					<path d="M277.895 170.634L272.725 163.452H270.786V179.123H272.725V166.717L277.249 172.811L277.464 173.029H278.541L283.281 166.717V179.123H285.219V163.452H283.281L277.895 170.634Z" fill="#333333"/>
					<path d="M296.42 163.018C294.266 163.018 292.327 163.888 290.819 165.412C289.311 166.935 288.665 168.894 288.665 171.288C288.665 173.682 289.311 175.641 290.819 177.165C292.327 178.688 294.266 179.559 296.42 179.559C298.79 179.559 300.513 178.906 302.021 177.165C303.529 175.641 304.175 173.682 304.175 171.288C304.175 168.894 303.314 166.935 302.021 165.412C300.513 163.888 298.574 163.018 296.42 163.018ZM300.513 175.641C299.436 176.729 297.928 177.382 296.42 177.382C294.912 177.382 293.404 176.729 292.327 175.641C291.25 174.553 290.604 173.029 290.604 171.288C290.604 169.547 291.25 168.023 292.327 166.935C293.404 165.847 294.912 165.194 296.42 165.194C297.928 165.194 299.436 165.847 300.513 166.935C301.59 168.023 302.237 169.547 302.237 171.288C302.237 173.029 301.59 174.553 300.513 175.641Z" fill="#333333"/>
					<path d="M318.61 163.452H308.7V165.411C308.7 168.458 308.485 170.852 308.054 172.811C307.623 174.552 306.977 176.076 306.115 177.381H304.607V182.605H306.546V179.123H318.825V182.605H320.764V177.381H318.394V163.452H318.61ZM316.456 177.164H308.485C309.993 174.77 310.639 171.07 310.639 166.064V165.193H316.456V177.164Z" fill="#333333"/>
					<path d="M329.167 169.111H325.289V163.452H323.351V179.34H329.167C332.614 179.34 334.768 177.381 334.768 174.334C334.768 172.811 334.337 171.723 333.26 170.634C332.183 169.546 330.89 169.111 329.167 169.111ZM328.952 177.164H325.289V170.852H328.952C331.321 170.852 332.614 171.94 332.614 173.899C332.829 176.076 331.321 177.164 328.952 177.164Z" fill="#333333"/>
					<path d="M338.644 163.452H336.705V179.34H338.644V163.452Z" fill="#333333"/>
				</svg>
			</div>
			<h2 class="login-main-title">
				<span>Добро пожаловать в AnnaBell</span>
			</h2>
			<div class="login-main-subtitle">
				<span>Помогите себе добиться успеха с</span>
				<span>нашей адаптивной технологией обучения.</span>
			</div>
			<img class="login-left-img" src="/img/anna.png" alt="">
		`;
	},
	loginTpl(){
		const _ = this;
		let loginData = localStorage.getItem('loginData');
		if (loginData) loginData = JSON.parse(loginData);
		return `
				<form class="login-form" data-submit="${_.componentName}:doFormAction" data-handle="doLogin">
					<h2 class="login-title">
						<span>Вход в обучение</span>
					</h2>
					<div class="form-block">
						<div class="form-label-row">
							<label class="form-label">Email</label>
						</div>
						<g-input class="g-form-item" type="email" data-keydown="${_.componentName}:formInputHandle" value="${loginData ? loginData.email : 'admin@mail.ru'}" name="email" className="form-input" required></g-input>
					</div>
					<div class="form-block">
						<div class="form-label-row">
							<label class="form-label">Пароль</label>
							<a class="link" data-click="${this.componentName}:changeSection" section="forgot">
								<span>Забыли пароль?</span>
							</a>
						</div>
						<g-input class="g-form-item" type="password" data-keydown="${_.componentName}:formInputHandle" name="password"  className="form-input"  value="${loginData ? loginData.password : 'admin123'}" required></g-input>
					</div>
					<div class="form-block">
						<g-input type="checkbox" class="g-form-item" items='[{"value":"1","text":"Запомнить меня","checked":${loginData ? true : false}}]' name="remember"></g-input>
					</label>
				</div>
					<div class="form-block">
						<button class="button-red">
							<span>Войти</span>
						</button>
					</div>
				</form>
				<div class="login-bottom">
				<a class="link" href="#">
					<span>Условия</span>
				</a>
				<a class="link" href="#">
					<span>Планы</span>
				</a>
				<a class="link" href="#">
					<span>Связаться с нами</span>
				</a>
			</div>
		`;
	},
	rowTpl(initTpl){
		const _ = this;
		return `
			<section class='login'>
			</section>
		`;
	}
}