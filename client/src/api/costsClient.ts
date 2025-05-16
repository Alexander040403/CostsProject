import { createEffect } from "effector";
import { IBaseEffectArgs, ICreateCost, IDeleteCost, IRefreshToken, IUpdateCost} from "../types";
import api from './axiosClient';
import { removeUser } from "../utils/auth";
import { handleAxiosError } from "../utils/errors";
import axios from "axios";


export const createCostFx = createEffect(async ({ url, cost, token }: ICreateCost) => {
    try {
        const { data } = await api.post(url, { ...cost }, { headers: { 'Authorization': `Bearer ${token}` }});

        return data;
    } catch (error) {
        handleAxiosError(error, { type: 'create', createCost: { cost } });
    }
});

export const updateCostFx = createEffect(async ({ url, cost, token, id }: IUpdateCost) => {
    try {
        const { data } = await api.patch(`${url}/${id}`, { ...cost }, { headers: { 'Authorization': `Bearer ${token}` } });

        return data;
    } catch (error) {
        // Полная диагностика ошибки
        console.error('Full error object:', error);
        
        if (axios.isAxiosError(error)) {
          // Стандартная NestJS ошибка
          if (error.response?.data?.statusCode) {
            throw new Error(`Ошибка ${error.response.status}: ${error.response.data.message}`);
          }
          
          // Стандартная Express ошибка
          if (error.response?.data?.error?.message) {
            throw new Error(error.response.data.error.message);
          }
          
          // Простой текст
          if (typeof error.response?.data === 'string') {
            throw new Error(error.response.data);
          }
          
          // Ответ без тела
          if (error.response?.status) {
            throw new Error(`HTTP ${error.response.status}: ${error.message}`);
          }
        }
        
        // Сетевая ошибка (нет ответа сервера)
        throw new Error(error instanceof Error ? error.message : 'Неизвестная ошибка');
      }
});

export const getCostsFx = createEffect(async ({ url, token }: IBaseEffectArgs) => {
    try {
        const { data } = await api.get(url, { headers: { 'Authorization': `Bearer ${token}` }});

        return data;
    } catch (error) {
        handleAxiosError(error, { type: 'get' })
    }
});

export const deleteCostFx = createEffect(async ({ url, token, id }: IDeleteCost) => {
    try {
        await api.delete(`${url}/${id}`, { headers: { 'Authorization': `Bearer ${token}` }});

    } catch (error) {
        handleAxiosError(error, { type: 'delete', deleteCost: { id } })
    }
});

export const refreshTokenFx = createEffect(async ({ url, token, username}: IRefreshToken) => {
    try {
        const result = await api.post(url, { refresh_token: token, username });

        if (result.status === 200) {
            localStorage.setItem('auth', JSON.stringify({
                ...result.data,
                username
            }));

            return result.data.access_token;
        } else {
            removeUser();
        }
    } catch (error) {
        
    }
});