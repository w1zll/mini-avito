# 🟢 Mini-Avito — сервис объявлений

**Сервис объявлений**, аналог Avito, сделанный на **Next.js + React + TypeScript**, с поддержкой:

- авторизации (JWT + refresh token)  
- избранного (с оптимистичным обновлением)  
- infinite scroll и виртуализации списков  
- фильтрации и поиска  
- форм для регистрации и создания объявлений  
- SSR + React Query  

---

## 📦 Стек

**Frontend:**

- Next.js 13 (App Router)  
- React 18 + TypeScript  
- Redux Toolkit (auth state)  
- TanStack Query (React Query)  
- Axios (с interceptors для JWT)  
- React Hook Form + Zod (валидация форм)  
- react-virtual (виртуализация списков)  

**Backend:**

- Express.js  
- JWT (accessToken + refreshToken)  
- JSON files как простая база данных (ads.json, favorites.json, users.json)  
- Cookie-parser (для httpOnly refresh token)  

**Тесты:**

- React Testing Library (unit и integration тесты)  

---