### Автоматизированные End-To-End тесты 

- Стек Playwright/TS
- Установлен linter, prettier, dotenv
- Добавлен pre-commit
- Тесты запускаются в докер контейнере
- Для стабильной поддержки тестов применена Page Object Model и Data Driven Approach
- Тестовые скрипты основаны на чек-листах с ОР
- Для автоматизации использовался учебный сайт [Demoblaze](https://www.demoblaze.com/index.html)
- По желанию можно клонировать репозиторий командой `git clone` и установить зависимости командой `npm install`, предварительно, установив Node не ниже 16 версии

#### Докер
- Сборка докер контейнера `docker build . -t test  -f Docker/dockerfile`
- Запуска тестов в докер контейнере `docker run -t test`
