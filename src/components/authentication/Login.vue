<template>
	<div class="Login">
		<div class="container">
			<div class="header-login tw-flex tw-justify-between">
				<div class="slice d-flex align-center">
					<a
						class="me-0 d-flex align-center"
						href="https://mizbancloud.com"
						target="_blank"
					>
						<img
							src="@/assets/general/images/root/mizbancloud_logo_wsp.svg"
							alt="Mizban Cloud"
							class=""
						/>
					</a>
				</div>
				<div class="slice">
					<a
						href="tel:02191013434"
						target="_blank"
						class="text-decoration-none d-flex align-items-center"
					>
						<span
							class="text-black-800 me-2 fw-400 fs-15 ws-05 ls-03 d-none d-sm-block"
							>خطوط 24 ساعته</span
						>
						<span
							class="text-black-900 me-2 fw-600 fs-18 ws-05 ls-01 number"
							dir="ltr"
							>021 - 91013434</span
						>
						<button
							class="phone-btn bsh-orange-300-to-pink-350_ btn btn-nav bg-grd-pink-350-to-orange-300-80 border-0 rounded-pill d-flex align-items-center justify-content-center"
						>
							<img
								src="@/assets/general/images/root/ico_phone_call.svg"
							/>
						</button>
					</a>
				</div>
			</div>
			<div class="right-elements tw-pt-2 position-relative">
				<div class="war-hat text-center">
					<img
						class="user-select-none d-inline-block"
						src="@/assets/general/images/root/login/ico_helmet.png"
						alt="ورود به حساب کاربری"
					/>
				</div>

				<div class="input-elements text-center position-relative">
					<div v-if="!two_auth" class="position-relative">
						<div
							style="
								box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.15) !important;
								height: 46px;
							"
							class="btn-group btn-group-blue rounded-pill shadow tw-mb-4"
							:class="{ marginMore: !createAccount }"
							role="group"
							aria-label="ورود یا ایجاد حساب"
						>
							<button
								type="button"
								style="
									margin-left: 1px !important;
									border: none;
								"
								class="btn px-3-5 py-2 line-h-1 rounded-pill ls-04 ws-15"
								:class="{
									active: !createAccount,
								}"
								@click="createAccount = false"
							>
								ورود به حساب
							</button>
							<button
								type="button"
								style="border: none"
								class="btn px-3-5 py-2 line-h-1 rounded-pill ls-04 ws-15"
								:class="{ active: createAccount }"
								@click="createAccount = true"
							>
								ایجاد حساب
							</button>
						</div>
						<div v-if="createAccount" class="create-account">
							<div class="some-space tw-pr-3">
								<div
									style="
										padding-right: 2.7em !important;
										margin-top: 0 !important;
									"
									class="d-flex align-items-center form-check form-switch position-relative"
								>
									<label
										style="margin-top: 3px"
										class="form-check-label fs-13 user-select-none ms-2-5 ls-03 fw-600 ws-15 text-gray-800 user-select-none"
										>حساب حقوقی</label
									>
									<small class="focus-border"></small>
									<input
										v-model="isLegalAccount"
										class="form-check-input"
										type="checkbox"
									/>
								</div>
							</div>
							<div class="inputs some-space">
								<div class="top-box">
									<div class="row tw-px-4 rtl">
										<div
											class="tw-mb-4 tw-pb-2 col-12 col-sm-6"
										>
											<div class="form-floating">
												<input
													@keyup.enter="
														submitRegister()
													"
													name="name"
													v-model="name"
													placeholder="نام"
													aria-label="نام"
													class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
													type="text"
												/>
												<label
													class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
													for="name"
													>نام</label
												>
												<small
													class="focus-border"
													:class="{
														'alert-line':
															validAlerts_register.name,
													}"
												></small>
												<div
													class="text-alert"
													:class="{
														'slide-down':
															validAlerts_register.name,
													}"
												>
													نام الزامی است!
												</div>
											</div>
										</div>
										<div
											class="col-12 col-sm-6 tw-mb-4 tw-pb-2"
										>
											<div class="form-floating">
												<input
													@keyup.enter="
														submitRegister()
													"
													name="last_name"
													v-model="last_name"
													placeholder="نام خانوادگی"
													aria-label="نام خانوادگی"
													class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
													type="text"
												/>
												<label
													class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
													for="last_name"
													>نام خانوادگی</label
												>
												<small
													class="focus-border"
													:class="{
														'alert-line':
															validAlerts_register.last_name,
													}"
												></small>
												<div
													class="text-alert"
													:class="{
														'slide-down':
															validAlerts_register.last_name,
													}"
												>
													نام خانوادگی الزامی است!
												</div>
											</div>
										</div>

										<div
											class="col-12 col-sm-6 tw-mb-4 tw-pb-2"
										>
											<div class="form-floating">
												<input
													@keyup.enter="
														submitRegister()
													"
													name="mobile"
													v-model="mobile"
													placeholder="موبایل"
													aria-label="موبایل"
													class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
													type="tel"
												/>
												<label
													class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
													for="mobile"
													>موبایل</label
												>
												<small
													class="focus-border"
													:class="{
														'alert-line':
															validAlerts_register.mobile,
													}"
												></small>
												<div
													class="text-alert"
													:class="{
														'slide-down':
															validAlerts_register.mobile,
													}"
												>
													شماره موبایل الزامی است!
												</div>
											</div>
										</div>
										<div
											class="col-12 col-sm-6 tw-mb-4 tw-pb-2"
										>
											<div class="form-floating">
												<input
													@keyup.enter="
														submitRegister()
													"
													name="email"
													v-model="email"
													placeholder="ایمیل"
													aria-label="ایمیل"
													class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
													type="text"
												/>
												<label
													class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
													for="email"
													>ایمیل</label
												>
												<small
													class="focus-border"
													:class="{
														'alert-line':
															validAlerts_register.email,
													}"
												></small>
												<div
													class="text-alert"
													:class="{
														'slide-down':
															validAlerts_register.email,
													}"
												>
													ایمیل به درستی وارد نشده!
												</div>
											</div>
										</div>
										<div class="col-12 tw-mb-4 tw-pb-2">
											<div class="form-floating">
												<input
													@keyup.enter="
														submitRegister()
													"
													name="national_code"
													v-model="national_code"
													placeholder="کد ملی"
													aria-label="کد ملی"
													class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
													type="text"
												/>
												<label
													class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
													for="national_code"
													>کد ملی</label
												>
												<small
													class="focus-border"
													:class="{
														'alert-line':
															validAlerts_register.national_code,
													}"
												></small>
												<div
													class="text-alert"
													:class="{
														'slide-down':
															validAlerts_register.national_code,
													}"
												>
													کد ملی به درستی وارد نشده!
												</div>
											</div>
										</div>
										<div
											class="col-12 col-sm-6 tw-mb-4 tw-pb-2"
										>
											<div class="form-floating">
												<input
													@keyup.enter="
														submitRegister()
													"
													name="register_password"
													v-model="register_password"
													placeholder="رمز عبور"
													aria-label="رمز عبور"
													class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
													:type="
														show_register_password
															? 'text'
															: 'password'
													"
												/>
												<label
													class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
													for="register_password"
													>رمز عبور</label
												>
												<div
													v-if="!!register_password"
													class="show-pass-wrap"
												>
													<div
														@click="
															show_register_password = true
														"
														v-if="
															!show_register_password
														"
													>
														<img
															src="@/assets/general/images/root/login/ic_visible.svg"
															alt=""
														/>
													</div>
													<div
														@click="
															show_register_password = false
														"
														v-if="
															show_register_password
														"
													>
														<img
															src="@/assets/general/images/root/login/ic_invisible.svg"
															alt=""
														/>
													</div>
												</div>

												<small
													class="focus-border"
													:class="{
														'alert-line':
															validAlerts_register.register_password,
													}"
												></small>
												<div
													class="text-alert"
													:class="{
														'slide-down':
															validAlerts_register.register_password,
													}"
												>
													رمز عبور باید حداقل 6
													کاراکتر،حاوی علامت، عدد و
													حروف بزرگ باشد!
												</div>
											</div>
										</div>
										<div
											class="col-12 col-sm-6 tw-mb-4 tw-pb-2"
										>
											<div class="form-floating">
												<input
													@keyup.enter="
														submitRegister()
													"
													name="repeat_register_password"
													v-model="
														repeat_register_password
													"
													placeholder="تکرار رمز عبور"
													aria-label="تکرار رمز عبور"
													class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
													:type="
														show_repeat_register_password
															? 'text'
															: 'password'
													"
												/>
												<label
													class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
													for="repeat_register_password"
													>تکرار رمز عبور</label
												>
												<div
													v-if="
														!!repeat_register_password
													"
													class="show-pass-wrap"
												>
													<div
														@click="
															show_repeat_register_password = true
														"
														v-if="
															!show_repeat_register_password
														"
													>
														<img
															src="@/assets/general/images/root/login/ic_visible.svg"
															alt=""
														/>
													</div>
													<div
														@click="
															show_repeat_register_password = false
														"
														v-if="
															show_repeat_register_password
														"
													>
														<img
															src="@/assets/general/images/root/login/ic_invisible.svg"
															alt=""
														/>
													</div>
												</div>
												<small
													class="focus-border"
													:class="{
														'alert-line':
															validAlerts_register.repeat_register_password,
													}"
												></small>
												<div
													class="text-alert"
													:class="{
														'slide-down':
															validAlerts_register.repeat_register_password,
													}"
												>
													تکرار رمز عبور به درستی وارد
													نشده!
												</div>
											</div>
										</div>
									</div>
									<div
										class="is-legal-part rtl"
										:class="{ opened: isLegalAccount }"
									>
										<div class="row tw-px-4">
											<div
												class="col-12 col-sm-6 tw-mb-4 tw-pb-2"
											>
												<div class="form-floating">
													<input
														@keyup.enter="
															submitRegister()
														"
														name="busyness_name"
														v-model="busyness_name"
														placeholder="نام ثبت شده تجاری"
														aria-label="نام ثبت شده تجاری"
														class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
														type="text"
													/>
													<label
														class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
														for="busyness_name"
														>نام ثبت شده
														تجاری</label
													>
													<small
														class="focus-border"
														:class="{
															'alert-line':
																validAlerts_register.busyness_name,
														}"
													></small>
													<div
														class="text-alert"
														:class="{
															'slide-down':
																validAlerts_register.busyness_name,
														}"
													>
														نام تجاری وارد نشده!
													</div>
												</div>
											</div>
											<div
												class="col-12 col-sm-6 tw-mb-4 tw-pb-2"
											>
												<div class="form-floating">
													<input
														@keyup.enter="
															submitRegister()
														"
														name="economic_code"
														v-model="economic_code"
														placeholder="کد اقتصادی"
														aria-label="کد اقتصادی"
														class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
														type="text"
													/>
													<label
														class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
														for="economic_code"
														>کد اقتصادی</label
													>
													<small
														class="focus-border"
														:class="{
															'alert-line':
																validAlerts_register.economic_code,
														}"
													></small>
													<div
														class="text-alert"
														:class="{
															'slide-down':
																validAlerts_register.economic_code,
														}"
													>
														کد اقتصادی وارد نشده!
													</div>
												</div>
											</div>
											<div
												class="col-12 col-sm-6 tw-mb-4 tw-pb-2"
											>
												<div class="form-floating">
													<input
														@keyup.enter="
															submitRegister()
														"
														name="juridical_code"
														v-model="juridical_code"
														placeholder="شناسه ملی حقوقی"
														aria-label="شناسه ملی حقوقی"
														class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
														type="text"
													/>
													<label
														class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
														for="juridical_code"
														>شناسه ملی حقوقی</label
													>

													<small
														class="focus-border"
														:class="{
															'alert-line':
																validAlerts_register.juridical_code,
														}"
													></small>
													<div
														class="text-alert"
														:class="{
															'slide-down':
																validAlerts_register.juridical_code,
														}"
													>
														شناسه ملی حقوقی وارد
														نشده!
													</div>
												</div>
											</div>
											<div
												class="col-12 col-sm-6 tw-mb-4 tw-pb-2"
											>
												<div class="form-floating">
													<input
														@keyup.enter="
															submitRegister()
														"
														name="submited_number"
														v-model="
															submited_number
														"
														placeholder="َشماره ثبت"
														aria-label="شماره ثبت"
														class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
														type="text"
													/>
													<label
														class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
														for="submited_number"
														>شماره ثبت</label
													>
													<small
														class="focus-border"
														:class="{
															'alert-line':
																validAlerts_register.submited_number,
														}"
													></small>
													<div
														class="text-alert"
														:class="{
															'slide-down':
																validAlerts_register.submited_number,
														}"
													>
														شماره ثبت وارد نشده!
													</div>
												</div>
											</div>
											<div class="col-12 tw-mb-4 tw-pb-2">
												<div class="form-floating">
													<input
														@keyup.enter="
															submitRegister()
														"
														name="post_code"
														v-model="post_code"
														placeholder="کد پستی"
														aria-label="کد پستی"
														class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
														type="text"
													/>
													<label
														class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
														for="post_code"
														>کد پستی</label
													>
													<small
														class="focus-border"
														:class="{
															'alert-line':
																validAlerts_register.post_code,
														}"
													></small>
													<div
														class="text-alert"
														:class="{
															'slide-down':
																validAlerts_register.post_code,
														}"
													>
														کد پستی به درستی وارد
														نشده!
													</div>
												</div>
											</div>
											<div
												class="col-12 tw-mb-4 tw-pb-2 address"
											>
												<div class="form-floating">
													<textarea
														@keyup.enter="
															submitRegister()
														"
														name="address"
														v-model="address"
														class="form-control px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
														rows="4"
														placeholder="آدرس"
													></textarea>
													<label
														class="ws-15 ls-03 text-gray-600 user-select-none address-label"
														for="address"
														>آدرس</label
													>
													<small
														class="focus-border"
														:class="{
															'alert-line':
																validAlerts_register.address,
														}"
													></small>
													<div
														class="text-alert"
														:class="{
															'slide-down':
																validAlerts_register.address,
														}"
													>
														آدرس وارد نشده!
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- <form @submit.prevent="handleSubmit">
							<input
								v-model="inputValue"
								placeholder="Enter a value"
							/>
							<button type="submit">Submit</button>
						</form> -->
							</div>
							<div
								class="terms d-flex align-items-center position-relative tw-pr-3"
							>
								<div class="form-check ps-0 pe-2">
									<input
										type="checkbox"
										id="rulesAccepted"
										name="rulesAccepted"
										v-model="rulesAccepted"
										class="btn-check btn-check-tick border-0 bg-grd-blue-230-to-blue-260-45"
									/>
									<label
										class="btn btn-check-lable border-0 bg-grd-gray-350-to-gray-180-45"
										for="rulesAccepted"
									></label>
								</div>
								<a
									target="_blank"
									href="https://mizbancloud.com/terms"
									class="fs-13 text-decoration-none fw-600 mb-0 me-1 ws-05 ls-04"
								>
									<span class="terms-txt"
										>قوانین و شرایط</span
									>
								</a>
								<p
									class="fs-13 text-decoration-none fw-400 text-gray-900 mb-0 me-1 ws-05 ls-04 user-select-none"
								>
									<span>استفاده از سایت را می‌پذیرم.</span>
									<span
										class="text-red-400 user-select-none fs-13 fw-400 ws-15 ls-02 me-1 mx-1"
										v-if="
											validAlerts_register.rulesAccepted
										"
									>
										(الزامی!)
									</span>
								</p>
							</div>
							<div
								class="submit-floor text-center position-relative"
							>
								<button
									@click="submitRegister()"
									style="min-width: 158px"
									class="loginRegisterSwitch submit-button tw-cursor-pointer btn btn-grd-blue-100-to-blue-500-80 mt-2 IRANSansFa border-0 rounded-pill ws-15 line-h-2"
								>
									ثبت نام
								</button>
							</div>
						</div>
						<div v-else class="go-to-account">
							<div v-if="!forget_pass" class="inputs some-space">
								<div class="">
									<div class="row tw-px-4">
										<div class="col-12 tw-mb-4 tw-pb-2">
											<div class="form-floating">
												<input
													name="username"
													v-model="username"
													@keyup.enter="submitLogin()"
													placeholder="موبایل یا ایمیل"
													aria-label="موبایل یا ایمیل"
													class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
													type="text"
												/>
												<label
													class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
													for="username"
													>موبایل یا ایمیل</label
												>
												<small
													class="focus-border"
													:class="{
														'alert-line':
															validAlerts_login.username,
													}"
												></small>
												<div
													class="text-alert"
													:class="{
														'slide-down':
															validAlerts_login.username,
													}"
												>
													موبایل یا ایمیل به درستی
													وارد نشده!
												</div>
											</div>
										</div>
										<div class="col-12 tw-mb-4 tw-pb-2">
											<div class="form-floating">
												<input
													name="password"
													v-model="password"
													@keyup.enter="submitLogin()"
													placeholder="رمز عبور"
													aria-label="رمز عبور"
													class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
													:type="
														show_password
															? 'type'
															: 'password'
													"
												/>
												<label
													class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
													for="password"
													>رمز عبور</label
												>
												<div
													v-if="!!password"
													class="show-pass-wrap"
												>
													<div
														@click="
															show_password = true
														"
														v-if="!show_password"
													>
														<img
															src="@/assets/general/images/root/login/ic_visible.svg"
															alt=""
														/>
													</div>
													<div
														@click="
															show_password = false
														"
														v-if="show_password"
													>
														<img
															src="@/assets/general/images/root/login/ic_invisible.svg"
															alt=""
														/>
													</div>
												</div>
												<small
													class="focus-border"
													:class="{
														'alert-line':
															validAlerts_login.password,
													}"
												></small>
												<div
													class="text-alert"
													:class="{
														'slide-down':
															validAlerts_login.password,
													}"
												>
													رمز عبور به درستی وارد نشده!
												</div>
											</div>
										</div>
										<div
											class="col-12 tw-pb-2 col-sm-6 tw-py-1"
										>
											<div
												class="form-check ps-0 pe-2 d-flex align-items-center"
											>
												<input
													type="checkbox"
													name="storeToBrowser"
													id="storeToBrowser"
													v-model="storeToBrowser"
													class="btn-check btn-check-tick border-0 bg-grd-blue-230-to-blue-260-45"
												/>
												<label
													class="btn btn-check-lable border-0 bg-grd-gray-350-to-gray-180-45"
													for="storeToBrowser"
												>
												</label>
												<small
													class="focus-border"
												></small>
												<p
													@click="
														storeToBrowser =
															!storeToBrowser
													"
													class="tw-mr-2 fs-11 tw-cursor-pointer"
												>
													ذخیره اطلاعات در مرورگر
												</p>
											</div>
										</div>
										<div
											class="col-12 col-sm-6 tw-pb-2 tw-text-left"
										>
											<a
												class="text-dash fs-13 dotted-line text-decoration-none fw-600 text-gray-900 mb-0 me-1 ws-05 ls-04 user-select-none"
												@click="forget_pass = true"
											>
												<span
													>رمز عبورم را فراموش
													کرده‌ام!
												</span>
											</a>
										</div>
									</div>
								</div>
								<!-- <form @submit.prevent="handleSubmit">
									<input
										v-model="inputValue"
										placeholder="Enter a value"
									/>
									<button type="submit">Submit</button>
								</form> -->
							</div>
							<div class="mb40" v-if="forget_pass">
								<div v-if="!forgetSMSsended">
									<div class="tw-mb-4">
										موبایل خود را وارد کنید
									</div>
									<div class="">
										<div class="form-floating">
											<input
												@keyup.enter="sendForgetCode()"
												name="username_forget"
												v-model="username_forget"
												placeholder="موبایل"
												aria-label="موبایل"
												class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
												type="text"
											/>
											<label
												class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
												for="username_forget"
												>موبایل</label
											>
											<small
												class="focus-border"
												:class="{
													'alert-line':
														validAlerts_forgetPass_mobile.username_forget,
												}"
											></small>
											<div
												class="text-alert"
												:class="{
													'slide-down':
														validAlerts_forgetPass_mobile.username_forget,
												}"
											>
												شماره موبایل به درستی وارد نشده!
											</div>
										</div>
									</div>
								</div>
								<div v-if="forgetSMSsended">
									<div class="col-12 tw-mb-4 tw-pb-2">
										<div class="form-floating">
											<input
												@keyup.enter="submitNewPass()"
												name="sended_code"
												v-model="sended_code"
												placeholder="کد تایید"
												aria-label="کد تایید"
												maxlength="6"
												class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent text-center border-bottom rounded-0 input-placeholder"
												type="tel"
												:class="
													sended_code.length
														? 'code-input'
														: ''
												"
											/>
											<label
												class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
												for="username_forget"
												>کد تایید</label
											>
											<small
												class="focus-border"
												:class="{
													'alert-line':
														validAlerts_forgetPass_form.sended_code,
												}"
											></small>
											<div
												class="text-alert"
												:class="{
													'slide-down':
														validAlerts_forgetPass_form.sended_code,
												}"
											>
												کد تایید به درستی وارد نشده!
											</div>
										</div>
									</div>
									<div class="col-12 tw-mb-4 tw-pb-2">
										<div class="form-floating">
											<input
												@keyup.enter="submitNewPass()"
												name="username_forget"
												v-model="new_password"
												placeholder="رمز عبور جدید"
												aria-label="رمز عبور جدید"
												class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
												:type="
													show_new_password
														? 'text'
														: 'password'
												"
											/>
											<label
												class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
												for="username_forget"
												>رمز عبور جدید</label
											>
											<small
												class="focus-border"
												:class="{
													'alert-line':
														validAlerts_forgetPass_form.new_password,
												}"
											></small>
											<div
												v-if="!!new_password"
												class="show-pass-wrap"
											>
												<div
													@click="
														show_new_password = true
													"
													v-if="!show_new_password"
												>
													<img
														src="@/assets/general/images/root/login/ic_visible.svg"
														alt=""
													/>
												</div>
												<div
													@click="
														show_new_password = false
													"
													v-if="show_new_password"
												>
													<img
														src="@/assets/general/images/root/login/ic_invisible.svg"
														alt=""
													/>
												</div>
											</div>

											<div
												class="text-alert"
												:class="{
													'slide-down':
														validAlerts_forgetPass_form.new_password,
												}"
											>
												رمز عبور باید حداقل 6
												کاراکتر،حاوی علامت، عدد و حروف
												بزرگ باشد!
											</div>
										</div>
									</div>
									<div class="col-12 tw-mb-4 tw-pb-2">
										<div class="form-floating">
											<input
												@keyup.enter="submitNewPass()"
												name="username_forget"
												v-model="new_password_confirm"
												placeholder="تکرار رمز عبور جدید"
												aria-label="تکرار رمز عبور جدید"
												class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent border-bottom rounded-0 input-placeholder"
												:type="
													show_new_password_conf
														? 'text'
														: 'password'
												"
											/>
											<label
												class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
												for="username_forget"
												>تکرار رمز عبور جدید</label
											>
											<small
												class="focus-border"
												:class="{
													'alert-line':
														validAlerts_forgetPass_form.new_password_confirm,
												}"
											></small>
											<div
												v-if="!!new_password_confirm"
												class="show-pass-wrap"
											>
												<div
													@click="
														show_new_password_conf = true
													"
													v-if="
														!show_new_password_conf
													"
												>
													<img
														src="@/assets/general/images/root/login/ic_visible.svg"
														alt=""
													/>
												</div>
												<div
													@click="
														show_new_password_conf = false
													"
													v-if="
														show_new_password_conf
													"
												>
													<img
														src="@/assets/general/images/root/login/ic_invisible.svg"
														alt=""
													/>
												</div>
											</div>
											<div
												class="text-alert"
												:class="{
													'slide-down':
														validAlerts_forgetPass_form.new_password_confirm,
												}"
											>
												تکرار رمز با رمز عبور یکسان
												نیست!
											</div>
										</div>
									</div>
									<div
										class="row mt-4-5 cursor-pointer"
										@click="showCaptchaModal = true"
									>
										<div class="col check-captcha">
											<div class="d-flex form-check p-0">
												<input
													onchange="checked=$captcha"
													type="checkbox"
													class="btn-check btn-check-tick border-0 bg-grd-blue-230-to-blue-260-45 input-fill"
													id="checkCaptcha"
													autocomplete="off"
													v-model="captcha_check"
													disabled
												/>
												<label
													class="btn btn-check-lable border-0 bg-grd-gray-350-to-gray-180-45"
													for="checkCaptcha"
												></label>
												<p
													onclick="document.getElementById('checkCaptcha').click()"
													class="fs-12 ws-15 fw-600 ms-2 mb-0 noCursor"
												>
													من ربات نیستم
												</p>
											</div>
											<div class="img-captcha">
												<img
													src="@/assets/general/images/captcha/ico_robot.png"
													alt=""
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								class="submit-floor text-center position-relative"
							>
								<button
									v-if="!forget_pass"
									@click="submitLogin()"
									style="min-width: 158px"
									class="loginRegisterSwitch submit-button tw-cursor-pointer btn btn-grd-blue-100-to-blue-500-80 mt-2 IRANSansFa border-0 rounded-pill ws-15 line-h-2"
								>
									ورود
								</button>
								<button
									v-if="forget_pass && !forgetSMSsended"
									@click="sendForgetCode()"
									style="min-width: 158px"
									class="loginRegisterSwitch submit-button tw-cursor-pointer btn btn-grd-blue-100-to-blue-500-80 mt-2 IRANSansFa border-0 rounded-pill ws-15 line-h-2"
								>
									ارسال پیامک
								</button>
								<button
									v-if="forget_pass && forgetSMSsended"
									@click="submitNewPass()"
									style="min-width: 158px"
									class="loginRegisterSwitch submit-button tw-cursor-pointer btn btn-grd-blue-100-to-blue-500-80 mt-2 IRANSansFa border-0 rounded-pill ws-15 line-h-2"
								>
									ثبت رمز جدید
								</button>
								<button
									v-if="forget_pass && forgetSMSsended"
									class="refresh-btn"
									@click="sendForgetCode()"
									:disabled="!!minutes || !!seconds"
								>
									<div
										class="time-txt"
										v-if="!!minutes || !!seconds"
									>
										{{ minutes }}:{{
											seconds < 10
												? "0" + seconds
												: seconds
										}}
									</div>
									<img
										v-else
										title="مسیج جدید"
										src="@/assets/general/images/captcha/ico_refresh.svg"
										alt=""
									/>
								</button>
							</div>
						</div>
					</div>
					<div v-if="two_auth" class="two-auth">
						<div v-if="two_auth_sms" class="">
							<h3 class="mb40">کد پیامکی موبایل</h3>
							<div class="row tw-px-4">
								<div class="col-12 tw-mb-4 tw-pb-2">
									<div class="form-floating">
										<input
											name="sms_two_auth"
											v-model="sms_two_auth"
											@keyup.enter="checkAuthSMS()"
											placeholder="کد تایید"
											aria-label="کد تایید"
											maxlength="6"
											class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent text-center border-bottom rounded-0 input-placeholder"
											type="tel"
											:class="
												sms_two_auth.length
													? 'code-input'
													: ''
											"
										/>
										<label
											class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
											for="sms_two_auth"
											>کد تایید</label
										>
										<small
											class="focus-border"
											:class="{
												'alert-line':
													validAlerts_sms_two_auth,
											}"
										></small>
										<div
											class="text-alert"
											:class="{
												'slide-down':
													validAlerts_sms_two_auth,
											}"
										>
											کد تایید به درستی وارد نشده!
										</div>
									</div>
								</div>
							</div>
							<div class="position-relative">
								<button
									@click="checkAuthSMS()"
									style="min-width: 158px"
									class="loginRegisterSwitch submit-button tw-cursor-pointer btn btn-grd-blue-100-to-blue-500-80 IRANSansFa border-0 rounded-pill ws-15 line-h-2"
								>
									بررسی
								</button>
								<button
									class="refresh-btn mx-3"
									@click="sendAuthSMS()"
									:disabled="!!minutes || !!seconds"
								>
									<div
										class="time-txt"
										v-if="!!minutes || !!seconds"
									>
										{{ minutes }}:{{
											seconds < 10
												? "0" + seconds
												: seconds
										}}
									</div>
									<img
										v-else
										title="مسیج جدید"
										src="@/assets/general/images/captcha/ico_refresh.svg"
										alt=""
									/>
								</button>
							</div>
						</div>

						<div v-if="!two_auth_sms && two_auth_email" class="">
							<h3 class="mb40">کد ایمیل</h3>
							<div class="row tw-px-4">
								<div class="col-12 tw-mb-4 tw-pb-2">
									<div class="form-floating">
										<input
											name="email_two_auth"
											v-model="email_two_auth"
											@keyup.enter="checkAuthEmail()"
											placeholder="کد تایید ایمیل"
											aria-label="کد تایید ایمیل"
											maxlength="6"
											class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent text-center border-bottom rounded-0 input-placeholder"
											type="text"
											:class="
												email_two_auth.length
													? 'code-input'
													: ''
											"
										/>
										<label
											class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
											for="email_two_auth"
											>کد تایید ایمیل</label
										>
										<small
											class="focus-border"
											:class="{
												'alert-line':
													validAlerts_email_two_auth,
											}"
										></small>
										<div
											class="text-alert"
											:class="{
												'slide-down':
													validAlerts_email_two_auth,
											}"
										>
											تایید به درستی وارد نشده!
										</div>
									</div>
								</div>
							</div>
							<div class="position-relative">
								<button
									@click="checkAuthEmail()"
									style="min-width: 158px"
									class="loginRegisterSwitch submit-button tw-cursor-pointer btn btn-grd-blue-100-to-blue-500-80 mt-2 IRANSansFa border-0 rounded-pill ws-15 line-h-2"
								>
									بررسی
								</button>

								<button
									class="refresh-btn mx-3"
									@click="sendAuthEmail()"
									:disabled="!!minutes || !!seconds"
								>
									<div
										class="time-txt"
										v-if="!!minutes || !!seconds"
									>
										{{ minutes }}:{{
											seconds < 10
												? "0" + seconds
												: seconds
										}}
									</div>
									<img
										v-else
										title="مسیج جدید"
										src="@/assets/general/images/captcha/ico_refresh.svg"
										alt=""
									/>
								</button>
							</div>
						</div>
						<div
							v-if="
								!two_auth_sms &&
								!two_auth_email &&
								two_auth_2factor
							"
						>
							<h3 class="mb40">کد Authenticator</h3>
							<div class="row tw-px-4">
								<div class="col-12 tw-mb-4 tw-pb-2">
									<div class="form-floating">
										<input
											name="twoFactor_two_auth"
											v-model="twoFactor_two_auth"
											@keyup.enter="checkAuthTwoFactor()"
											placeholder="کد تایید دو مرحله ای"
											aria-label="کد تایید دو مرحله ای"
											maxlength="6"
											class="form-control iranyekanEn input-placeholder-ltr px-0 pb-2-5 ws-15 ls-04 focus-balck-b bg-transparent text-center border-bottom rounded-0 input-placeholder"
											type="text"
											:class="
												twoFactor_two_auth.length
													? 'code-input'
													: ''
											"
										/>
										<label
											class="fs-15 ws-15 ls-03 text-gray-600 user-select-none"
											for="twoFactor_two_auth"
											>کد تایید دو مرحله ای</label
										>
										<small
											class="focus-border"
											:class="{
												'alert-line':
													validAlerts_twoFactor_two_auth,
											}"
										></small>
										<div
											class="text-alert"
											:class="{
												'slide-down':
													validAlerts_twoFactor_two_auth,
											}"
										>
											کد دو مرحله ای به درستی وارد نشده!
										</div>
									</div>
								</div>
							</div>
							<div class="">
								<button
									@click="checkAuthTwoFactor()"
									style="min-width: 158px"
									class="loginRegisterSwitch submit-button tw-cursor-pointer btn btn-grd-blue-100-to-blue-500-80 mt-2 IRANSansFa border-0 rounded-pill ws-15 line-h-2"
								>
									بررسی
								</button>
							</div>
						</div>
					</div>

					<div
						v-if="forget_pass && !createAccount"
						@click="forget_pass = false"
						class="back-btn"
					>
						<img
							src="@/assets/general/new-images/ico_back_arrow.svg"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Modal
		content-class-name="captchaModal bg-transparent border-0"
		alignment="center"
		:show="showCaptchaModal"
		@close="showCaptchaModal = false"
	>
		<div class="modal-dialog modal-dialog-centered modal-lg iranyekanFa">
			<div class="captcha-card-wrap mx-auto modal-content border-0">
				<div class="captcha-card">
					<div class="captcha-head">
						<div class="captcha-logo">
							<img
								src="@/assets/general/images/captcha/ico_robot.png"
								alt=""
							/>
						</div>
						<p class="captcha-title">M.Captcha</p>
					</div>
					<div class="captcha-form">
						<p class="form-text mb-4">
							جهت تشخیص ربات از انسان لطفا عبارت و یا عدد مندرج در
							کادر زیر را در فرم پایین وارد نمایید
						</p>
						<div class="captcha-text" id="cap-image">
							<img
								id="captch-img"
								:src="captchaImage"
								class="image"
							/>
						</div>
						<div class="captcha-field">
							<input
								@keyup.enter="submitCaptcha()"
								autocomplete="off"
								id="captchaSTR"
								class="form-control"
								type="text"
								placeholder="عبارت داخل تصویر را وارد کنید"
								v-model="captchaData"
							/>
							<span
								class="error"
								v-text="captchaErrors[captchaError]"
							></span>
						</div>
						<div class="position-relative text-center">
							<button
								class="refresh-btn"
								@click="getCaptchaImage()"
							>
								<img
									title="کپچای جدید"
									src="@/assets/general/images/captcha/ico_refresh.svg"
									alt=""
								/>
							</button>
							<button class="submit-btn" @click="submitCaptcha()">
								ادامه
							</button>
						</div>
						<div class="captcha-footer"></div>
					</div>
				</div>
			</div>
		</div>
	</Modal>
</template>

<style scoped lang="scss">
@import url("@/assets/styles/tw-custom-components.css");
@import url("@/assets/styles/components/login.scss");
</style>
<style lang="scss">
.body-login .vue-modal-inner {
	background-color: unset !important;
	box-shadow: unset !important;
}
.body-login .vue-modal-close {
	display: none !important;
}
.body-login .vue-modal-normal {
	width: 387px !important;
	max-width: 387px !important;
	justify-content: center;
}
.body-login .vue-modal-content {
	box-shadow: unset !important;
	background: unset !important;
	display: flex;
	justify-content: center;
	max-width: 387px !important;
}

.body-login .modal-content {
	background-color: unset;
	background: unset;
}
.body-login .vue-modal-content-wrapper {
	border: none !important;
	max-width: 390px !important;
	padding: 3.5rem 0 2rem 0 !important;
}
.body-login label.btn-check-lable {
	margin-top: 2px !important;
}

.body-login .vue-modal-content-body .form-control:focus {
	box-shadow: none !important;
}
.body-login .vue-modal-content-body .form-control {
	border: 0;
	padding: 15px;
	text-align: center;
	width: 100%;
	font-family: iranyekanwebregular;
	background: transparent;
	line-height: 1;
	direction: ltr;
	.input-fill {
		letter-spacing: 13px;
		text-transform: uppercase;
	}
}

.body-login .submit-btn {
	color: #fff !important;
	background: #6bd5ef;
	background: linear-gradient(80deg, #6bd5ef 0, #7caff2 100%);
	border-color: #6bd5ef !important;
	min-height: 45px;
	min-width: 158px;
	border-radius: 30px;
}
.body-login .captcha-logo {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
<script setup>

import axiosCall from "@/api/axiosCall.js";
import { ref, reactive, computed, watch } from "vue";
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const router = useRouter();
document.body.classList.add("body-login");
document.body.classList.remove("light", "d-body");

const isEmail = ref(
	/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
);
const isMobile = ref(/^(\+98|0|98|0098)-?9\d{9}$/);
const isPass = ref(
	/^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{6,}$/
);
const nonEnglishCharsRegex = /[^\u0000-\u007F]/;

const createAccount = ref(false);
const loading = ref(false);
const name = ref("");
const last_name = ref("");
const mobile = ref("");
const email = ref("");
const national_code = ref("");
const password = ref("");
const username = ref("");
const username_forget = ref("");
const busyness_name = ref("");
const economic_code = ref("");
const juridical_code = ref("");
const submited_number = ref("");
const register_password = ref("");
const repeat_register_password = ref("");
const show_register_password = ref(false);
const show_repeat_register_password = ref(false);
const show_password = ref(false);
const show_new_password = ref(false);
const show_new_password_conf = ref(false);
const address = ref("");
const post_code = ref("");
const isLegalAccount = ref(0);
const rulesAccepted = ref(false);
const storeToBrowser = ref(!!Number(localStorage.getItem("storeToBrowser")));
const forget_pass = ref(false);
const formValidRegister = ref(true);
const formValidLogin = ref(true);
const formValidForgetPass = ref(true);
const formValidNewPass = ref(true);
const forgetSMSsended = ref(false);
const showCaptchaModal = ref(false);
const loadingCaptcha = ref(false);
const captchaToken = ref("");
const captchaImage = ref("");
const sended_code = ref("");
const new_password = ref(null);
const new_password_confirm = ref(null);
const two_auth = ref(false);
const two_auth_sms = ref(false);
const two_auth_email = ref(false);
const two_auth_2factor = ref(false);
const captchaErrors = ref([
	"", // Leave this blank!
	"لطفا عبارت داخل کادر را وارد کنید",
	"لطفا عبارت داخل کادر را صحیح وارد کنید",
]);

const captchaError = ref(0);
const $requests =
	getCurrentInstance().appContext.config.globalProperties.$requests;
const $store = getCurrentInstance().appContext.config.globalProperties.$store;
const $helpers =
	getCurrentInstance().appContext.config.globalProperties.$helpers;
const checkMobile = (val) => {
	return isMobile.value.test(val);
};
const checkEmail = (val) => {
	return isEmail.value.test(val);
};
const checkPass = (val) => {
	return isPass.value.test(val);
};
const checkPassEN = (val) => {
	return nonEnglishCharsRegex.test(val);
};
const checkPassRepeat = (val) => {
	if (!!val == true && register_password.value === val) {
		return true;
	}
};
const checkNationalCode = (national_code) => {
	return String(national_code)
		.toLowerCase()
		.match(/^[0-9]{10}$/);
};

const apiRegister = async (payload) => {
	let url = import.meta.env.VITE_BASE_URL + "/auth/register";
	let my_response = await axiosCall("post", url, payload).then(
		(response) => response
	);
	if (my_response.data.success == true) {
		router.push({ path: "/verification" });
		console.log("my token", my_response.data.data.token);
	} else {
		console.log(my_response.data.message);
		$helpers.showAlert(my_response.data.message, "خطا!", "error");
	}
};

const submitLogin = () => {
	if (!loading.value) {
		MyValidationLogin();

		if (formValidLogin.value) {
			loading.value = true;
			$requests
				.userLogin(username.value, password.value)
				.then((res) => {
					if (res?.success) {
						checkLoginSecurity(
							res.userData.require_otp,
							res.userData
						);
					} else {
						console.log(res?.details);
						$helpers.showAlert(
							res?.message || "اطلاعات ورود اشتباه است",
							"خطا!",
							"error"
						);
					}
				})
				.catch((err) => {
					console.log("my error is", err);
					$helpers.showAlert(
						err.response.data.message,
						"خطا!",
						"error"
					);
				})
				.then((res) => {
					loading.value = false;
				});
		}
	}
};
const test_token = ref("");
const checkLoginSecurity = async (otp, res) => {
	if (otp.enabled) {
		two_auth.value = true;
		two_auth_sms.value = otp.sms;
		two_auth_email.value = otp.email;
		two_auth_2factor.value = otp.totp;
		test_token.value = res.token;
		if (two_auth_sms.value) {
			sendAuthSMS();
		} else if (two_auth_email.value) {
			sendAuthEmail();
		}
		// two_auth_email.value = otp.email;
		// two_auth_2factor.value = otp.totp;
	} else {
		welcome(res);
	}
};

const sendAuthSMS = async () => {
	ReverseTimer(2, 0);
	let url =
		import.meta.env.VITE_BASE_URL +
		"/auth/tfa/send-sms?identifier=" +
		username.value;
	let my_response = await axiosCall("post", url).then((response) => response);
	if (my_response.data.success == true) {
	} else {
		$helpers.showAlert(my_response.data.message, "خطا!", "error");
	}
};
const sms_two_auth = ref("");
const validAlerts_sms_two_auth = ref(false);

const checkAuthSMS = async () => {
	if (sms_two_auth.value.length != 6) {
		validAlerts_sms_two_auth.value = true;
	} else {
		let payload = { code: sms_two_auth.value, token: test_token.value };
		let url = import.meta.env.VITE_BASE_URL + "/auth/login/confirm-sms";
		let my_response = await axiosCall("post", url, payload).then(
			(response) => response
		);

		if (my_response.data.success == true) {
			router.push("/");
		} else {
			if (
				typeof my_response.data.data.length == "number" &&
				!my_response.data.data.length
			) {
				validAlerts_sms_two_auth.value = true;
				$helpers.showAlert(my_response.data.message, "خطا!", "error");
			} else {
				two_auth_sms.value = false;
				if (!my_response.data.data.email) {
					two_auth_email.value = true;
					sendAuthEmail();
				} else if (!my_response.data.data.otp) {
					two_auth_2factor.value = true;
				}
			}
		}
	}
};

const sendAuthEmail = async () => {
	let url =
		import.meta.env.VITE_BASE_URL +
		"/auth/tfa/send-email?identifier=" +
		username.value;
	let my_response = await axiosCall("post", url).then((response) => response);
	if (my_response.data.success == true) {
		ReverseTimer(2, 0);
		$helpers.showAlert("", "کد تایید به ایمیل شما ارسال شد.", "success", {
			bodyClass: ["bg-white", "text-primary", "fs-16", "py-4"],
			showIcon: false,
		});
	} else {
		$helpers.showAlert(my_response.data.message, "خطا!", "error");
	}
};

const email_two_auth = ref("");
const validAlerts_email_two_auth = ref(false);

const checkAuthEmail = async () => {
	if (email_two_auth.value.length != 6) {
		validAlerts_email_two_auth.value = true;
	} else {
		let payload = { code: email_two_auth.value, token: test_token.value };
		let url = import.meta.env.VITE_BASE_URL + "/auth/login/confirm-email";
		let my_response = await axiosCall("post", url, payload).then(
			(response) => response
		);

		if (my_response.data.success == true) {
			router.push("/");
		} else {
			if (
				typeof my_response.data.data.length == "number" &&
				!my_response.data.data.length
			) {
				$helpers.showAlert(my_response.data.message, "خطا!", "error");
				validAlerts_email_two_auth.value = true;
			} else {
				two_auth_sms.value = false;
				if (!my_response.data.email) {
					two_auth_email.value = false;
					two_auth_2factor.value = true;
				}
			}
		}
		validAlerts_email_two_auth.value = false;
	}
};

const twoFactor_two_auth = ref("");
const validAlerts_twoFactor_two_auth = ref(false);

const checkAuthTwoFactor = async () => {
	if (twoFactor_two_auth.value.length != 6) {
		validAlerts_twoFactor_two_auth.value = true;
	} else {
		let payload = {
			code: twoFactor_two_auth.value,
			token: test_token.value,
		};
		let url = import.meta.env.VITE_BASE_URL + "/auth/login/confirm";
		let my_response = await axiosCall("post", url, payload).then(
			(response) => response
		);

		if (my_response.data.success == true) {
			router.push("/");
		} else {
			if (
				typeof my_response.data.data.length == "number" &&
				!my_response.data.data.length
			) {
				$helpers.showAlert(my_response.data.message, "خطا!", "error");
				validAlerts_twoFactor_two_auth.value = true;
			}
		}
	}
};
const welcome = (res) => {
	$store.commit("setUserData", res.userData);
	const welcomeMessage =
		res?.userData !== undefined ? "ورود با موفقیت انجام شد" : res.message;
	$helpers.showAlert("", welcomeMessage, "success", {
		bodyClass: ["bg-white", "text-primary", "fs-16", "py-4"],
		showIcon: false,
	});
	router.push("/");
};

const sendForgetCodeApi = async (payload) => {
	let url = import.meta.env.VITE_BASE_URL + "/auth/reset-password";
	let my_response = await axiosCall("post", url, payload).then(
		(response) => response
	);
	if (my_response.data.success == true) {
		forgetSMSsended.value = true;

		ReverseTimer(2, 0);

		$helpers.showAlert("", "کد جدید ارسال شد!", "success", {
			bodyClass: ["bg-white", "text-primary", "fs-16", "py-4"],
			showIcon: false,
		});
	} else {
		$helpers.showAlert(my_response.data.message, "خطا!", "error");
	}
};
const sendForgetCode = () => {
	MyValidationForgetPass();

	if (formValidForgetPass.value) {
		sendForgetCodeApi({ mobile: username_forget.value });
	}
};
const submitRegister = () => {
	MyValidationRegister();
	if (formValidRegister.value) {
		let sendData = {
			name: name.value,
			family: last_name.value,
			phone_number: mobile.value,
			email: email.value,
			national_id: national_code.value,
			password: register_password.value,
			confirm_password: repeat_register_password.value,
			juridical: isLegalAccount.value,
			rStatus: 1,
		};

		if (isLegalAccount.value) {
			sendData.address = address.value;
			sendData.company = busyness_name.value;
			sendData.economical_number = economic_code.value;
			sendData.juridical_code = juridical_code.value;
			sendData.register_code = submited_number.value;
			sendData.zip_code = post_code.value;
		}
		apiRegister(sendData);
	}
};
const validAlerts_register = ref({
	rulesAccepted: false,
	repeat_register_password: false,
	register_password: false,
	national_code: false,
	email: false,
	mobile: false,
	last_name: false,
	name: false,
	address: false,
	post_code: false,
	submited_number: false,
	juridical_code: false,
	economic_code: false,
	busyness_name: false,
});

const MyValidationRegister = () => {
	formValidRegister.value = true;
	validAlerts_register.value.name = !!name.value ? false : true;
	validAlerts_register.value.rulesAccepted = !!rulesAccepted.value
		? false
		: true;
	validAlerts_register.value.last_name = !!last_name.value ? false : true;
	validAlerts_register.value.mobile = checkMobile(mobile.value)
		? false
		: true;
	validAlerts_register.value.email = checkEmail(email.value) ? false : true;
	validAlerts_register.value.national_code = checkNationalCode(
		national_code.value
	)
		? false
		: true;
	validAlerts_register.value.register_password = checkPass(
		register_password.value
	)
		? false
		: true;

	validAlerts_register.value.repeat_register_password = checkPassRepeat(
		repeat_register_password.value
	)
		? false
		: true;

	if (!!isLegalAccount.value) {
		validAlerts_register.value.address = !!address.value ? false : true;
		validAlerts_register.value.post_code = !!post_code.value ? false : true;
		validAlerts_register.value.submited_number = !!submited_number.value
			? false
			: true;
		validAlerts_register.value.juridical_code = !!juridical_code.value
			? false
			: true;
		validAlerts_register.value.economic_code = !!economic_code.value
			? false
			: true;
		validAlerts_register.value.busyness_name = !!busyness_name.value
			? false
			: true;
	}

	Object.keys(validAlerts_register.value).forEach((key) => {
		if (validAlerts_register.value[key]) {
			formValidRegister.value = false;
		}
	});
};

const MyValidationLogin = () => {
	formValidLogin.value = true;
	validAlerts_login.value.username =
		checkMobile(username.value) || checkEmail(username.value)
			? false
			: true;
	validAlerts_login.value.password = checkPass(password.value) ? false : true;

	Object.keys(validAlerts_login.value).forEach((key) => {
		if (validAlerts_login.value[key]) {
			formValidLogin.value = false;
		}
	});
};
const MyValidationForgetPass = () => {
	formValidForgetPass.value = true;
	validAlerts_forgetPass_mobile.value.username_forget = checkMobile(
		username_forget.value
	)
		? false
		: true;

	Object.keys(validAlerts_forgetPass_mobile.value).forEach((key) => {
		if (validAlerts_forgetPass_mobile.value[key]) {
			formValidForgetPass.value = false;
		}
	});
};

const MyValidationNewPass = () => {
	formValidNewPass.value = true;
	validAlerts_forgetPass_form.value.sended_code =
		sended_code.value.length == 6 ? false : true;
	validAlerts_forgetPass_form.value.new_password = checkPass(
		new_password.value
	)
		? false
		: true;
	validAlerts_forgetPass_form.value.new_password_confirm = checkPass(
		new_password_confirm.value
	)
		? false
		: true;

	Object.keys(validAlerts_forgetPass_form.value).forEach((key) => {
		if (validAlerts_forgetPass_form.value[key]) {
			formValidNewPass.value = false;
		}
	});
};
const validAlerts_login = ref({
	username: false,
	password: false,
});

const validAlerts_new_form = ref({
	new_password: false,
	password: false,
});
const validAlerts_forgetPass_mobile = ref({
	username_forget: false,
});
const validAlerts_forgetPass_form = ref({
	sended_code: false,
	new_password_confirm: false,
	new_password: false,
});

watch(register_password, (newValue, oldValue) => {
	let nonEN = checkPassEN(newValue);
});

watch(storeToBrowser, (newValue, oldValue) => {
	if (newValue) {
		localStorage.setItem("storeToBrowser", 1);
		saveUserPassToCookie();
	} else {
		localStorage.setItem("storeToBrowser", 0);
		saveUserPassToCookie();
	}
});

watch(sms_two_auth, (newValue) => {
	if (newValue.length == 6) {
		checkAuthSMS();
	}
});
watch(email_two_auth, (newValue) => {
	if (newValue.length == 6) {
		checkAuthEmail();
	}
});
watch(twoFactor_two_auth, (newValue) => {
	if (newValue.length == 6) {
		checkAuthTwoFactor();
	}
});

const saveUserPassToCookie = () => {
	Cookies.set("username", username.value);
	Cookies.set("password", password.value);
};

const getUserPassFromCookie = () => {
	if (!!Cookies.get("username")) {
		username.value = Cookies.get("username");
		password.value = Cookies.get("password");
	}
};

if (!!storeToBrowser.value) {
	getUserPassFromCookie();
}

const getCaptchaImage = async (payload) => {
	if (!loadingCaptcha.value) {
		loadingCaptcha.value = true;
		$requests
			.getCaptchaImage()
			.then((res) => {
				if (res && res.data && res.data.captcha) {
					captchaToken.value = res.data.captcha;
					captchaImage.value =
						import.meta.env.VITE_JUST_URL +
						"/captcha/" +
						captchaToken.value +
						".jpg";
				} else {
					$helpers.showAlert(
						"خطا در دریافت کپچا از سرور!",
						"خطا!",
						"error"
					);
				}
			})
			.catch((err) => {})
			.then((res) => {
				loadingCaptcha.value = false;
			});
	}
};

getCaptchaImage();

const captchaData = ref(null);
const captcha_check = ref(false);

const submitCaptcha = async () => {
	let payload = { token: captchaToken.value, captcha: captchaData.value };
	let url = import.meta.env.VITE_BASE_URL + "/auth/captcha/validate";
	let my_response = await axiosCall("post", url, payload).then(
		(response) => response
	);
	console.log(my_response.data);
	if (my_response.data.success == true) {
		$helpers.showAlert("", "کپچا صحیح!", "success", {
			bodyClass: ["bg-white", "text-primary", "fs-16", "py-4"],
			showIcon: true,
		});
		captcha_check.value = true;
		captchaData.value = null;
		showCaptchaModal.value = false;
	} else {
		$helpers.showAlert("رمز کپچا صحیح نیست", "خطا!", "error");
	}
};

const submitNewPass = async () => {
	MyValidationNewPass();
	if (formValidNewPass.value) {
		if (captcha_check.value) {
			let payload = {
				code: sended_code.value,
				passwd: new_password.value,
				phone_number: username_forget.value,
			};

			let url =
				import.meta.env.VITE_BASE_URL + "/auth/reset-password/confirm";
			let my_response = await axiosCall("post", url, payload).then(
				(response) => response
			);
			if (my_response.data.success == true) {
				$helpers.showAlert(
					"",
					"رمز عبور شما با موفقیت تغییر یافت!",
					"success",
					{
						bodyClass: [
							"bg-white",
							"text-primary",
							"fs-16",
							"py-4",
						],
						showIcon: true,
					}
				);
				createAccount.value = false;
				forget_pass.value = false;
				forgetSMSsended.value = false;
			} else {
				validAlerts_forgetPass_form.value.sended_code = true;
				$helpers.showAlert(my_response.data.message, "خطا!", "error");
			}
		} else {
			$helpers.showAlert("لطفا اول کپچا را وارد کنید!", "", "error");
			showCaptchaModal.value = true;
		}
	}
};

// Timer Button

const minutes = ref(2);
const seconds = ref(0);

const ReverseTimer = (minute, second) => {
	seconds.value = second;
	minutes.value = minute;
	const interval = setInterval(() => {
		if (seconds.value > 0) {
			seconds.value--;
		} else if (minutes.value > 0) {
			minutes.value--;
			seconds.value = 59;
		} else {
			clearInterval(interval);
		}
	}, 1000);
};
</script>
