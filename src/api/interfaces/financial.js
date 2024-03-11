import * as wallet from '../logic/financial/wallet.js';
import * as billing from '../logic/financial/billing.js';
import * as reports from '../logic/financial/reports.js';
import * as price from '../logic/financial/price.js';
import * as financial from '../logic/financial/financial.js';

/**
 * <tested>
 * Changes wallet
 * @param {Object} obj payload { amount: number, ratiof: number, user_id: number, description: string, force: number }
 * @returns response if the object is valid
 */
export const changeWallet = async (amount, userId) => {
	const res = await wallet
		.changeWallet(amount, userId)
		.then((response) => response);
	const userWallet = {
		success: res.success,
		balance: res.data.amount || null,
		credit: res.data.credit || null,
	};
	return userWallet;
};

/**
 * no route yet
 * Gets gateways
 * probably should remove logo path
 */
export const getGateways = async () => {
	const res = await billing.getGateways().then((response) => response);
	let gateways = res?.data?.data || [];
	for (let i = 0; i < gateways.length; i++) {
		gateways[i].logoPath =
			'/src/assets/general' + gateways[i].basepath + gateways[i].logo;
	}
	const response = {
		success: res?.data?.success || false,
		gateways: gateways,
	};
	return response;
};

export const getBanksGateWay = async () => {
	const res = await billing.getBanksGateWay().then((response) => response);
	return res;
};

export const getUsageData = async () => {
	const res = await reports.getUsageData().then((response) => response);
	return res;
};

export const getPrices = async (userId) => {
	const res = await price.getPrices(userId).then((response) => response);
	return res;
};

export const getCustomPrices = async (userId) => {
	const res = await price.getCustomPrices(userId).then((response) => response);
	return res;
};

export const goCheckCoupon = async (payload) => {
	const res = await billing.goCheckCoupon(payload).then((response) => response);
	return res;
};
export const goPayMoney = async (payload) => {
	const res = await billing.goPayMoney(payload).then((response) => response);
	return res;
};

export const getLastInvoice = async () => {
	const res = await financial.getLastInvoice().then((response) => response);
	return res;
};

export const getInvoices = async () => {
	const res = await financial.getInvoices().then((response) => response);
	return res;
};
export const getWallet = async () => {
	const res = await financial.getWallet().then((response) => response);
	return res;
};
export const getBanks = async () => {
	const res = await financial.getBanks().then((response) => response);
	return res;
};
export const getTransactions = async () => {
	const res = await financial.getTransactions().then((response) => response);
	return res;
};
