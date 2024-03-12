// const api = (path) => {return 'http://localhost:8000'+path}
const api = (path) => {
	// return "http://192.168.10.64:8005" + path;
	return "http://192.168.10.56:8005" + path;
};
const apiPrefix = "/api/v1";
const errorCodes = {
	400: "درخواست اشتباه است.",
	401: "Unauthorized",
	402: "Payment Required",
	403: "Forbidden",
	404: "Not Found",
	405: "Method Not Allowed",
	406: "Not Acceptable",
	407: "Proxy Authentication Required",
	408: "Request Timeout",
	409: "Conflict",
	410: "Gone",
	411: "Length Required",
	412: "Precondition Failed",
	413: "Payload Too Large",
	414: "URI Too Long",
	415: "Unsupported Media Type",
	416: "Range Not Satisfiable",
	417: "Expectation Failed",
	418: "I`m a teapot",
	422: "Unprocessable Entity",
	425: "Too Early",
	426: "Upgrade Required",
	428: "Precondition Required",
	429: "Too Many Requests",
	431: "Request Header Fields Too Large",
	451: "Unavailable For Legal Reasons",
	500: "خطای داخلی سرور",
	501: "Not Implemented",
	502: "درگاه اشتباه است",
	503: "سرویس در دسترس نیست",
	504: "پاسخ مناسبی از سرور دریافت نشد",
	505: "HTTP Version Not Supported",
	506: "Variant Also Negotiates",
	507: "Insufficient Storage",
	508: "Loop Detected",
	510: "Not Extended",
	511: "Network Authentication Required",
};
export default {
	errorHandling(error) {
		const errOptions = {
			timeout: 1000000,
		};
		if (error.code === "ECONNABORTED") {
			window.showAlert(
				"درخواست ارسالی با پاسخی از سرور مواجه نشد!",
				"خطا!",
				"error"
			);
		} else if (error.response) {
			window.showAlert(
				error?.response?.data?.message ||
					errorCodes[error?.code] ||
					error?.message ||
					"بروز خطای ناشناخته!",
				"خطای " + error.code,
				"error"
			);
		} else if (error.request) {
			window.showAlert(
				"خطا در ارسال درخواست به سرور. ارتباط اینترنت خود را بررسی کنید.",
				"خطای " + error.code,
				"error"
			);
		}
		return error;
	},

	api(path) {
		return api(path);
	},

	// Acquire user`s token from localStorage and returns it directly
	token() {
		return localStorage.getItem("token");
	},

	// Create an object to set Axios Headers
	tokenHeader() {
		return {
			headers: {
				Authorization: "Bearer " + this.token(),
			},
		};
	},

	// A silly function to create FormData more easily
	makeFormData(requestData = {}, isJson = true) {
		if (isJson) {
			return requestData;
		}
		let formData = new FormData();
		for (const key in requestData) {
			formData.append(key, requestData[key]);
		}
		return formData;
	},

	// A function to create userData object from API response directly
	makeUserData(res) {
		const userData = {
			user_id: res.data.data.id,
			fName: res.data.data.name,
			lName: res.data.data.family,
			email: res.data.data.email,
			nCode: res.data.data.national_id,
			mobile: res.data.data.phone_number,
			token: localStorage.getItem("token"),
			require_otp: res.data.data.require_otp,
			max_sessions: res.data.data.max_sessions,
			max_sessions_per_ip: res.data.data.max_sessions_per_ip,
			allowed_auth_ips: res.data.data.allowed_auth_ips,
			request_ip: res.data.data.request_ip,
		};
		return userData;
	},

	// Send sms verification code
	// Where to use: Login Component
	async sendMobileVerification(mobileNumber) {
		const res = await axios.post(api(apiPrefix + "/auth/reset-sms"), {
			mobile: mobileNumber,
		});
		return res;
	},

	// Check user needs to enter captcha or not
	// Where to use: Login Component
	async checkUserCaptchaState() {
		const res = await axios.get(api(apiPrefix + "/auth/captcha"));
		return res?.data;
	},

	// Get captcha image address from server
	// Where to use: Login Component
	// When it called: Whenever checkUserCaptchaState declares user must validate a captcha
	// **** DEPRECATED ****
	async getCaptchaImage() {
		const res = await axios.post(api("/submit/captcha/recaptcha"));
		return res;
	},

	// Check entered captcha value by user is correct or not
	// Where to use: Login Component
	async checkCaptchaValidation(captcha, captchaToken) {
		const formData = this.makeFormData({
			captcha: captcha,
			token: captchaToken,
		});
		const res = await axios.post(
			api(apiPrefix + "/auth/captcha"),
			formData
		);
		return res;
	},

	// Authenticate user
	// Where to use: Login Component
	async userLogin(username, password, captchaToken = null) {
		let response = {
			success: false,
			userData: null,
			needCaptcha: false,
			message: "نام کاربری یا کلمه عبور اشتباه است.",
		};
		let formData = this.makeFormData({
			username: username,
			password: password,
			...(captchaToken !== null && { captchaToken: captchaToken }),
		});
		const res = await axios.post(api(apiPrefix + "/auth/login"), formData);

		// const res = await axios.post(api('/userState'), {token: this.token()})
		if (res && res?.data && res?.data?.success) {
			localStorage.setItem("token", res.data.data.token);
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${localStorage.getItem("token")}`;
			response = {
				success: true,
				userData: this.makeUserData(res),
				needCaptcha: false,
				message: "خوش آمدید!",
			};
		} else {
			const test = res?.data?.message;
			if (test.includes("captcha")) {
				response.needCaptcha = true;
			}
			response.message =
				res.data?.details || res.data?.message || "خطای ناشناخته!";
		}
		return response;
	},

	// Check User Status with Token and validate the Token
	// Returns User`s data (Name, email and ...)
	async checkUserState() {
		let response = {
			success: false,
			userData: null,
			message: "اطلاعات لاگین کاربر دریافت نشد.",
		};
		axios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${localStorage.getItem("token")}`;
		const res = await axios.get(api(apiPrefix + "/auth/profile"));
		if (res?.data?.success) {
			response = {
				success: true,
				userData: this.makeUserData(res),
			};
		}

		return response;
	},

	// Get Main page slider data
	async getDashboardSlider() {
		const res = await axios.get(
			api(apiPrefix + "/static/sliders"),
			this.tokenHeader()
		);
		const response = {
			success: res?.data?.status === "success",
			slides: res?.data?.data || [],
		};
		for (let i = 0; i < response.slides.length; i++) {
			response.slides[i].image = api(response.slides[i].image);
		}
		return response;
	},

	// Get Support Tickets
	// Parameters:
	// count: count of tickets, 0 for all
	// page: Starting page with this number, 0 for no pagination
	// status: ticket status
	async getTicketsList(count = 0, page = 0, status = "all") {
		const formData = {
			params: {
				count: count,
				page: page,
				status: status,
			},
			...this.tokenHeader(),
		};
		const res = await axios.get(
			api(apiPrefix + "/support/tickets"),
			formData
		);
		const response = {
			success: res?.data?.success === true || false,
			tickets: res?.data?.data || [],
		};
		return response;
	},

	// Get Support Ticket`s detail
	// Parameters:
	// ticket_id: id number of ticket
	async getTicketDetails(ticket_id) {
		let response = {
			success: false,
			ticketDetail: {},
		};
		const res = await axios.get(
			api(apiPrefix + "/support/tickets/" + ticket_id),
			this.tokenHeader()
		);
		if (res?.data?.success === true) {
			let ticketDetail = res.data?.data || {};
			if (ticketDetail?.attachments?.length) {
				for (let i = 0; i < ticketDetail.attachments.length; i++) {
					const attachment =
						ticketDetail.attachments[i].at_name.split("/");
					ticketDetail.attachments[i].filename =
						attachment[attachment.length - 1];
				}
			}

			response = {
				success: true,
				ticketDetail: ticketDetail,
			};
		}

		return response;
	},

	// Get Support Ticket`s replies
	// Parameters:
	// ticket_id: id number of ticket
	async getTicketReplies(ticket_id) {
		let response = {
			success: false,
			replies: [],
		};
		const res = await axios.get(
			api(apiPrefix + "/support/tickets/" + ticket_id + "/replies"),
			this.tokenHeader()
		);
		if (res?.data?.success === true) {
			let replies = res?.data?.data || [];
			for (let j = 0; j < replies.length; j++) {
				if (replies[j]?.attachments?.length) {
					for (let i = 0; i < replies[j].attachments.length; i++) {
						const attachment =
							replies[j].attachments[i].at_name.split("/");
						replies[j].attachments[i].filename =
							attachment[attachment.length - 1];
					}
				}
			}

			response = {
				success: true,
				replies: replies,
			};
		}

		return response;
	},

	// Submit ticket`s reply
	// Parameters:
	// formData: form of a FormData which contains 'tid' as ticker id, 'description' as reply body and 'file_{index}' as attachment file (max 6 files)
	async submitTicketReply(formData) {
		const res = await axios.post(
			api(apiPrefix + "/support/tickets/" + this.ticket + "/replies"),
			formData,
			this.tokenHeader()
		);
		const response = {
			success: res?.data?.success === true,
			attachments: res?.data?.attachments || [],
			path: res?.data?.path || null,
		};

		return response;
	},

	// Submit change ticket status
	// Parameters:
	// targetStatus: status number
	//      1 => 'open'
	//      2 => 'inprogress'
	//      3 => 'assigned'
	//      4 => 'closed'
	//      5 => 'answered'
	//      6 => 'customer-reply'
	// ticket_id: id number of ticket
	async changeTicketStatus(targetStatus, ticket_id) {
		const formData = this.makeFormData({
			status: targetStatus,
			tid: ticket_id,
		});
		const res = await axios.post(
			api(apiPrefix + "/support/tickets/" + this.ticket + "/status"),
			formData,
			this.tokenHeader()
		);
		const response = {
			success: res?.data?.success === true,
		};

		return response;
	},

	//Get websites (domains) list
	async getWebsites(count = 15, page = 1) {
		const formData = {
			params: {
				count: count,
				page: page,
			},
			...this.tokenHeader(),
		};
		let res = await axios.get(api(apiPrefix + "/cdn/websites"), formData);
		let response = {
			success: false,
			message: "خطا در دریافت اطلاعات دامنه‌ها.",
		};
		if (res?.data?.success) {
			let tempDomains = res?.data?.data || [];
			let domains = [];
			for (const key in tempDomains) {
				domains.push({
					id: tempDomains[key].domainid,
					webid: tempDomains[key].webid,
					domain: key,
					plan: tempDomains[key].plan,
					planDetail: tempDomains[key].plansdet,
					data: tempDomains[key].data || [],
					status: tempDomains[key].domainstatus || [],
					cloud: tempDomains[key].domainstatus == 1,
					couldText:
						tempDomains[key].domainstatus == 1 ? "فعال" : "غیرفعال",
					date: "تاریخ ارسال نشده",
					// date: tempDomains[key].date || this.$helpers.jDate(Date.now(), 'jYYYY/jMM/jDD HH:mm')
				});
			}
			response = {
				success: true,

				domains: domains,
			};
		}
		return response;
	},

	// Add new domain (website)
	async submitNewDomain(domainName) {
		let formData = this.makeFormData({
			domain: domainName,
		});
		const res = await axios.post(
			api(apiPrefix + "/cdn/ng/domains"),
			formData,
			this.tokenHeader()
		);
		const response = {
			success: res?.data?.success || false,
			data: res?.data?.data || [],
			...(res?.data?.message !== undefined && {
				message: res?.data?.message,
			}),
		};
		return response;
	},

	// Delete existing domain
	// confirm_code: A verification code sent to user`s mobile if domain is ACTIVE
	async deleteDomain(domain_id, confirm_code) {
		const formData = {
			params: {
				domainid: domain_id,
				...(confirm_code !== false && { code: confirm_code }),
			},
			...this.tokenHeader(),
		};
		const res = await axios.delete(
			api(apiPrefix + "/cdn/domains/" + domain_id),
			formData
		);
		return res.data;
	},

	//Get domain`s records list
	async getDomainDnsRecords(domain_name, count = 15, page = 1) {
		const formData = {
			params: {
				domain: domain_name,
				count: count,
				page: page,
			},
			...this.tokenHeader(),
		};
		let res = await axios.get(
			api(apiPrefix + "/cdn/domains/dns"),
			formData
		);
		const response = {
			success: res?.data?.success || false,
			countofpage: res?.data?.countofpage || 0,
			currentpage: res?.data?.currentpage || 1,
			records: res?.data?.data || {},
			message: res?.data?.message || "خطا در دریافت اطلاعات رکوردهای DNS",
		};
		for (const recKey in response.records) {
			response.records[recKey].success =
				response.records[recKey].status.toLowerCase() === "success";
			delete response.records[recKey].status;
		}
		return response;
	},

	// Add ns record for domain
	async addDomainDnsRecord(data) {
		const formData = this.makeFormData(data);
		let res = await axios.post(
			api(apiPrefix + "/cdn/domains/dns"),
			formData,
			this.tokenHeader()
		);
		return res.data;
	},

	// Edit an existing ns record
	async editDomainDnsRecord(data, record_id) {
		const formData = this.makeFormData(data);
		let res = await axios.put(
			api(apiPrefix + "/cdn/domains/dns/" + record_id),
			formData,
			this.tokenHeader()
		);
		return res.data;
	},

	// Delete an existing ns record
	async deleteDomainDnsRecord(domain_name, domain_id, record_id) {
		const formData = {
			params: {
				domain: domain_name,
				domain_id: domain_id,
				record_id: record_id,
			},
			...this.tokenHeader(),
		};
		let res = await axios.delete(
			api(apiPrefix + "/cdn/domains/dns/" + record_id),
			formData
		);
		return res.data;
	},

	// Get domain global data
	async getDomainMainRecord(domain_id) {
		const formData = {
			params: {
				domain_id: domain_id,
			},
			...this.tokenHeader(),
		};
		let res = await axios.get(
			api(apiPrefix + "/cdn/domains/dns/webid"),
			formData
		);
		return res.data;
	},

	// Get DNSSEC data
	async getDomainSecure(domain_name, domain_id) {
		const formData = {
			params: {
				domain: domain_name,
				domain_id: domain_id,
			},
			...this.tokenHeader(),
		};
		let res = await axios.get(
			api(apiPrefix + "/cdn/domains/dns/secure"),
			formData
		);
		return res.data;
	},

	// Update DNSSEC
	async setDnsSecStatus(domain_name, domain_id, status = null) {
		const formData = this.makeFormData({
			domain: domain_name,
			domain_id: domain_id,
			...(status !== null && { status: status }),
		});
		let res;
		if (status != null) {
			res = await axios.put(
				api(apiPrefix + "/cdn/domains/dns/secure"),
				formData,
				this.tokenHeader()
			);
		} else {
			res = await axios.post(
				api(apiPrefix + "/cdn/domains/dns/secure"),
				formData,
				this.tokenHeader()
			);
		}
		return res.data;
	},

	// Get domain`s A-Record clusters in DNS section
	async getDomainRecordClusters(domain_name, record_id) {
		const formData = {
			params: {
				domain: domain_name,
				record_id: record_id,
			},
			...this.tokenHeader(),
		};
		let res = await axios.get(
			api(apiPrefix + "/cdn/domains/dns/balancer"),
			formData
		);
		return res.data;
	},

	// Get domain`s name-servers
	async getDomainNameServers(domain_name, domain_id) {
		const formData = this.makeFormData({
			params: {
				domain: domain_name,
				domain_id: domain_id,
			},
			...this.tokenHeader(),
		});
		let res = await axios.get(
			api(apiPrefix + "/cdn/domains/dns/nameservers"),
			formData
		);
		return res.data;
	},

	// Edit custom name-servers for a PRO or ORG domain plan
	async updateDomainNameServers(domain_name, domain_id, ns1, ns2) {
		const formData = this.makeFormData({
			domain_id: domain_id,
			ns1: ns1,
			ns2: ns2,
		});
		let res = await axios.post(
			api(apiPrefix + "/cdn/domains/dns/nameservers"),
			formData,
			this.tokenHeader()
		);
		return res.data;
	},

	// Edit dns-record proxy setting
	async changeCloudStatus(domain_name, domain_id, record_id, status = null) {
		const formData = this.makeFormData({
			domain: domain_name,
			domain_id: domain_id,
			record_id: record_id,
			...(status !== null && { status: status }),
		});
		let res = await axios.post(
			api(apiPrefix + "/cdn/domains/dns/proxy"),
			formData,
			this.tokenHeader()
		);

		return res.data;
	},

	// Download DNS zone setting file
	async downloadZoneFile(domain_name, domain_id) {
		const formData = this.makeFormData({
			domain: domain_name,
			did: domain_id,
		});
		const res = await axios.post(
			api(apiPrefix + "/cdn/domains/dns/dns/download/zone-file"),
			formData,
			this.tokenHeader()
		);
		return res.data;
	},

	// Upload DNS zone setting file
	async uploadZoneFile(formData) {
		const res = await axios.post(
			api(apiPrefix + "/cdn/domains/dns/dns/upload/zone-file"),
			formData,
			this.tokenHeader()
		);
		return res.data;
	},

	// Get user`s balance and debt
	async getBalanceData() {
		const res = await axios.get(
			api(apiPrefix + "/financial/billing/balance"),
			this.tokenHeader()
		);
		const response = {
			success: res?.data?.success === true,
			balance: parseInt(res?.data?.data?.balance),
			debt: parseInt(res?.data?.data?.debt),
		};

		return response;
	},

	// Add balance
	async addBalance(price, gateway, rebound = null) {
		const formData = this.makeFormData({
			price: price,
			gateway: gateway,
			rebound: rebound || location.href,
		});

		const res = await axios.post(
			api(apiPrefix + "/financial/billing/balance"),
			formData,
			this.tokenHeader()
		);
		return res;
		const response = {
			success: res?.data?.success === true,
			balance: parseInt(res?.data?.data?.balance),
			debt: parseInt(res?.data?.data?.debt),
		};

		return response;
	},

	// Get system payment gateways
	async getGateways() {
		const res = await axios.get(
			api(apiPrefix + "/financial/billing/gateways"),
			this.tokenHeader()
		);
		let gateways = res?.data?.data || [];
		for (let i = 0; i < gateways.length; i++) {
			gateways[i].logoPath =
				"/src/assets/general" + gateways[i].basepath + gateways[i].logo;
		}
		const response = {
			success: res?.data?.success || false,
			gateways: gateways,
		};

		return response;
	},

	// Send request to Bank`s gateway
	async sendRequestToBank(target) {
		const res = await axios.post(api(target), this.tokenHeader());
		return res.data;
	},

	// Get Bank`s gateway response
	async getBankResponse(target) {
		const res = await axios.get(api(target), this.tokenHeader());
		const response = {
			success: res?.data?.status === "success",
			...(res?.data?.message !== undefined && {
				message: res?.data?.message,
			}),
			...(res?.data?.code !== undefined && { code: res?.data?.code }),
			...(res?.data?.data?.pgwUrl !== undefined && {
				url: res?.data?.data?.pgwUrl.replace("http://localhost", ""),
			}),
		};
		return response;
	},

	// Get all invoices (closed invoices)
	async getInvoices(count = 0, page = 0, mock = false) {
		const formData = {
			params: {
				count: count,
				page: page,
				...(mock === true && { mock: "yes" }),
			},
			...this.tokenHeader(),
		};
		const res = await axios.get(
			api(apiPrefix + "/financial/billing/invoices"),
			formData
		);
		return res;
	},

	// Get user`s Payment history
	async getPaymentHistory(count = 0, page = 0) {
		const formData = {
			params: {
				count: count,
				page: page,
			},
			...this.tokenHeader(),
		};
		const res = await axios.get(
			api(apiPrefix + "/financial/billing/payments"),
			formData
		);
		return res;
	},

	// Get user`s Transaction history
	async getTransactions(count = 0, page = 0) {
		const formData = {
			params: {
				count: count,
				page: page,
			},
			...this.tokenHeader(),
		};
		const res = await axios.get(
			api(apiPrefix + "/financial/billing/transactions"),
			formData
		);
		return res;
	},

	// Get user`s usage data (chart data)
	async getUsageData() {
		const res = await axios.get(
			api(apiPrefix + "/financial/reports/usage"),
			this.tokenHeader()
		);
		const response = {
			success: res?.data?.success || false,
			chart: res?.data?.data || {},
		};

		return response;
	},

	// Get system DNS plans
	async getDnsPlans() {
		const res = await axios.get(
			api(apiPrefix + "/cdn/plans"),
			this.tokenHeader()
		);
		let plans = [];
		if (typeof res?.data === "object") {
			for (const key in res?.data) {
				plans.push({
					key: key,
					value: res?.data[key],
				});
			}
		}
		const response = {
			success: res?.data?.success || false,
			plans: plans,
		};

		return response;
	},

	// Clusters

	// Get domain`s clusters
	// GET::/api/v1/cdn/cluster/
	// Parameters:
	//     domain_id
	//     domain_name
	//     website_id
	//     website_name
	async getClusters(domain_id, domain_name, website_id, website_name = null) {
		const formData = this.makeFormData({
			params: {
				domain: domain_name,
				domain_id: domain_id,
				website: website_name === null ? domain_name : website_name,
				website_id: website_id,
			},
			...this.tokenHeader(),
		});

		const res = await axios.get(api(apiPrefix + "/cdn/cluster"), formData);

		return res.data;
	},

	// Add new domain`s cluster
	// POST::/api/v1/cdn/cluster/
	// Parameters:
	//     domain_name
	//     domain_id
	//     protocol
	//     method
	//     name
	async addCluster(domain_name, domain_id, protocol, method, name) {
		const formData = this.makeFormData({
			domain: domain_name,
			domain_id: domain_id,
			protocol: protocol,
			method: method,
			name: name,
		});

		const res = await axios.post(
			api(apiPrefix + "/cdn/cluster"),
			formData,
			this.tokenHeader()
		);

		return res.data;
	},

	// Update existing domain`s cluster
	// PUT::/api/v1/cdn/cluster/{cluster_id}
	// Parameters:
	//     domain_name
	//     domain_id
	//     cluster_id
	//     protocol
	//     method
	//     name
	async updateCluster(
		domain_name,
		domain_id,
		cluster_id,
		protocol,
		method,
		name
	) {
		const formData = this.makeFormData({
			domain: domain_name,
			domain_id: domain_id,
			protocol: protocol,
			method: method,
			name: name,
		});

		const res = await axios.put(
			api(apiPrefix + "/cdn/cluster/" + cluster_id),
			formData,
			this.tokenHeader()
		);

		return res.data;
	},

	// Delete existing domain`s cluster
	// DELETE::/api/v1/cdn/cluster/{cluster_id}
	// Parameters:
	//     domain_id
	//     domain_name
	//     cluster_id
	//     website_id
	//     website_name
	async deleteCluster(
		domain_id,
		domain_name,
		cluster_id,
		website_id,
		website_name = null
	) {
		const formData = this.makeFormData({
			domain: domain_name,
			domain_id: domain_id,
			website: website_name === null ? domain_name : website_name,
			website_id: website_id,
			cluster_id: cluster_id,
		});

		const res = await axios.delete(
			api(apiPrefix + "/cdn/cluster/" + cluster_id),
			formData,
			this.tokenHeader()
		);

		return res.data;
	},

	// Add new domain`s SUB cluster
	// POST::/api/v1/cdn/cluster/{cluster_id}/servers
	// Parameters:
	//     cluster_id
	//     weight
	//     port
	//     source
	async addSubCluster(cluster_id, weight, port, source) {
		const formData = this.makeFormData({
			weight: weight,
			port: port,
			source: source,
		});

		const res = await axios.post(
			api(apiPrefix + "/cdn/cluster/" + cluster_id + "/servers"),
			formData,
			this.tokenHeader()
		);

		return res.data;
	},

	// Update existing domain`s SUB cluster
	// PUT::/api/v1/cdn/cluster/{cluster_id}/servers/{server_id}
	// Parameters:
	//     cluster_id
	//     server_id
	//     port
	//     weight
	//     source
	async updateSubCluster(cluster_id, server_id, port, weight, source) {
		const formData = this.makeFormData({
			weight: weight,
			port: port,
			source: source,
		});

		const res = await axios.put(
			api(
				apiPrefix +
					"/cdn/cluster/" +
					cluster_id +
					"/servers/" +
					server_id
			),
			formData,
			this.tokenHeader()
		);

		return res.data;
	},

	// Delete existing domain`s SUB cluster
	// DELETE::/api/v1/cdn/cluster/{cluster_id}/servers/{server_id}
	// Parameters:
	//     cluster_id
	//     server_id
	async deleteSubCluster(cluster_id, server_id) {
		const res = await axios.delete(
			api(
				apiPrefix +
					"/cdn/cluster/" +
					cluster_id +
					"/servers/" +
					server_id
			),
			{},
			this.tokenHeader()
		);

		return res.data;
	},

	// Assign cluster
	// PUT::/api/v1/cdn/cluster/assignment
	// Parameters:
	//     domain_id
	//     domain_name
	//     website_id
	//     cluster_id
	//     action
	async assignCluster(
		domain_id,
		domain_name,
		website_id,
		cluster_id,
		action
	) {
		const formData = {
			domain_id: domain_id,
			domain: domain_name,
			website_id: website_id,
			cluster_id: cluster_id,
			action: action,
		};

		const res = await axios.put(
			api(apiPrefix + "/cdn/cluster"),
			formData,
			this.tokenHeader()
		);

		return res.data;
	},
};
