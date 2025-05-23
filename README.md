# Тестовое задание от H2O

Проект представляет собой визуализацию с линейной диаграммной и проблемными зонами.

## Дизайн макет

[Ссылка на макет в Figma](https://www.figma.com/file/s8w0iwVY2jkaP7EwXiMWLC/Untitled?node-id=0%3A1&t=dKP6UUhiN6qXAH2e-1)

## Генерация данных

Данные генерируются случайным образом в формате JSON:

```json
{
  "data": [
    {
      "division": "B2B",
      "date": "2023-09-25T05:00:00.000+00:00",
      "amount": "20000",
      "type": "expanses"
    },
    {
      "division": "B2C",
      "date": "2023-09-24T05:00:00.000+00:00",
      "amount": "14000",
      "type": "income"
    }
  ]
}
```
Где type - это тип денежной операции
- expanses: затраты,
- income: прибыль,
- revenue: выручка,
- debt: задолженность    
---  
**График**
- Навигационные панели и стили
- Проблемные зоны
-Анимация

# Используемые технологии

**Основные:** React, Typescript, RTKQuery, React Router  
**Сборщик:** Vite  
**Стили:** TailwindCSS  
**Доп. утилиты:** date-fns  

Для имитации сервера использовался **json-server + faker-js**

# Как запустить проект

- Стянуть с гита проект
- Подтянуть зависимости через: 
```bash 
npm i
```
- Зайти в папку server: 
```bash 
cd server
``` 
и установить зависимости для сервера
- запустить фронтенд из корневой папки: 
```bash
npm run dev
```
- запустить сервер из папки server: 
```bash
npm run start
```
