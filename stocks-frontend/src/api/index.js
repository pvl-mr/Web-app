import axios from "axios";
import {NotificationManager} from 'react-notifications';

import { BASE_URL } from "../constants/endpoints";

const Axios = axios.create({
    baseURL: BASE_URL,
    headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
});

Axios.interceptors.response.use((response) => response, (error) => {
    const status = error?.response?.status;
    if (status === 401) {
        localStorage.clear();
        window.location.reload();
    }
    throw error;
})

export const LoginAPI = async (email, pass) => {
    try {
        return await Axios.post(`/login`, {
            email,
            pass
        });
    } catch (error) {
        console.log('error: ', error);
        NotificationManager.error('Ошибка авторизации');
    }
}

export const RegisterAPI = async (firstName, lastName, email, password, code) => {
    try {
        return await Axios.post(`/register`, {
            first_name: firstName,
            last_name: lastName,
            email: email,
            pass: password,
            code,
        });
    } catch (error) {
        console.log('error: ', error)
        NotificationManager.error('Ошибка регистрации');
    }
}

export const getStocksAPI = async () => {
    try {
        return await Axios.get(`/stock`);
    } catch (error) {
        console.log('error: ', error)
    }
}

export const getBondsAPI = async () => {
    try {
        return await Axios.get(`/bond`);
    } catch (error) {
        console.log('error: ', error)
    }
}

export const getPortfolioAPI = async () => {
    try {
        return await Axios.get(`/portfolios`);
    } catch (error) {
        console.log('error: ', error)
    }
}

export const getPortfolioAnalystAPI = async () => {
    const analyst_id = localStorage.getItem('userId');
    try {
        return await Axios.get(`/analystPortfolio/${analyst_id}`);
    } catch (error) {
        console.log('error: ', error)
    }
}

export const createPortfolioAPI = async (years, goal) => {
    try {
        return await Axios.post(`/portfolio`, {
            years,
            goal,
            client_id: Number(localStorage.getItem('userId')),
        });
    } catch (error) {
        console.log('error: ', error)
        NotificationManager.error('Ошибка создания портфеля');
    }
}

export const updatePortfolioAPI = async (id, years, goal, analystId) => {
    try {
        return await Axios.put(`/portfolio`, {
            id,
            years,
            goal,
            analyst_id: analystId,
        });
    } catch (error) {
        console.log('error: ', error)
        NotificationManager.error('Ошибка обновления портфеля');
    }
}

export const deletePortfolioAPI = async (id) => {
    try {
        return await Axios.delete(`/portfolio/${id}`);
    } catch (error) {
        console.log('error: ', error)
        NotificationManager.error('Ошибка удаления портфеля');
    }
}

export const sendPortfolioAPI = async (id) => {
    try {
        return await Axios.post(`/sendPortfolio/${id}`);
    } catch (error) {
        console.log('error: ', error)
        NotificationManager.error('Ошибка отправки портфеля на анализ');
    }
}

export const addStockToPortfolioAPI = async (count, stockId, portfolioId) => {
    try {
        return await Axios.post(`/portfolioStock`, {
            count,
            stock_id: stockId,
            portfolio_id: portfolioId
        });
    } catch (error) {
        console.log('error: ', error)
        NotificationManager.error('Ошибка добавления акции в портфель');
    }
}

export const addBondToPortfolioAPI = async (count, stockId, portfolioId) => {
    try {
        return await Axios.post(`/portfolioBond`, {
            count,
            bond_id: stockId,
            portfolio_id: portfolioId
        });
    } catch (error) {
        console.log('error: ', error)
        NotificationManager.error('Ошибка добавления облигации в портфель');
    }
}

export const sendMessageAPI = async (message, portfolioId) => {
    try {
        return await Axios.post(`/message`, {
            message,
            portfolio_id: portfolioId
        });
    } catch (error) {
        console.log('error: ', error)
        NotificationManager.error('Ошибка сохранения анализа портфеля');
    }
}

export const getPortfolioDetailsAPI = async (portfolioId) => {
    try {
        return await Axios.get(`/portfolioDetails/${portfolioId}`);
    } catch (error) {
        console.log('error: ', error)
    }
}

export const getPortfolioStocksAPI = async (portfolioId) => {
    try {
        return await Axios.get(`/portfolioStocks/${portfolioId}`);
    } catch (error) {
        console.log('error: ', error)
    }
}

export const getPortfolioBondsDetailsAPI = async (portfolioId) => {
    try {
        return await Axios.get(`/portfolioBonds/${portfolioId}`);
    } catch (error) {
        console.log('error: ', error)
    }
}