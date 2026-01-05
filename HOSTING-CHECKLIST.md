# ✅ CHECKLIST: Informacje o hostingu Seohost.pl

Zaloguj się do panelu Seohost.pl i sprawdź:

## 1. Node.js
- [ ] Czy jest Node.js available? - tak
- [ ] Jaka wersja? (potrzebujemy ≥18.17) - 18.20.8 / 19.9.0 / 20.19.4 / 22.18.0
- [ ] Gdzie: Panel → Node.js / Aplikacje Node.js - Panel → Dodatkowe funkcje → Setup Node.js App

## 2. SSH Access
- [ ] Czy masz dostęp SSH? - tak
- [ ] Host: h51.seohost.pl
- [ ] Port: 57185
- [ ] User: srv78841

## 3. MySQL
- [ ] Wersja MySQL: 10.11.14-MariaDB – MariaDB Server (serwer MariaDB zgodny z MySQL 10.x)
- [ ] phpMyAdmin URL: https://h51.seohost.pl/phpMyAdmin
- [ ] Dane dostępowe:
  - Host: localhost
  - Database: srv78841_multiserwis
  - User: srv78841_multiserwis
  - Password: hUjvANhyV4m5W6nV9Shp

## 4. Deployment Options
Zaznacz co jest dostępne:
- [ ] Możliwość uruchomienia Node.js jako daemon
- [ ] PM2 zainstalowany
- [ ] Forever dostępny
- [ ] Możliwość custom npm install
- [ ] FTP access (jako backup)

Na standardowym hostingu SeoHost dostajesz klasyczne środowisko z SSH i możliwością instalacji paczek w katalogu użytkownika, ale bez „menedżerów Node.js jako usługi” typu Heroku/Vercel.​

    Możliwość uruchomienia Node.js jako daemon

        Możesz uruchomić node app.js w tle (np. z nohup, screen, tmux) i ewentualnie dodać restart przez cron; to nie jest jednak gwarantowany „daemon” z SLA – proces może być ubity przy ograniczeniach zasobów / restarcie serwera.​

    PM2 zainstalowany

        Globalnie PM2 zwykle nie jest preinstalowany na współdzielonych hostingach; możesz spróbować zainstalować lokalnie npm install pm2 --save-dev i uruchamiać z katalogu projektu, ale brak gwarancji, że będzie tolerowane jako stale działający manager procesów.​

    Forever dostępny

        Analogicznie: standardowo brak globalnej instalacji; ewentualnie lokalny npm install forever.​

    Możliwość custom npm install

        Tak, przy SSH możesz używać npm install w katalogu użytkownika (node_modules w home / projekcie); nie masz jednak uprawnień root ani sudo.​

    FTP access (jako backup)

        Tak, FTP/SFTP jest w standardzie każdego pakietu hostingowego SeoHost.

## 5. Domain & SSL
- [ ] Domena główna: multiserwis.webisko.pl
- [ ] SSL już skonfigurowany? - tak
- [ ] Subdomena dla testów? (np. dev.multiserwis-kutno.pl) - to będzie tymczasowo na mojej subdomenie na czas prac, podanej wyżej

## 6. Ograniczenia
Sprawdź dokumentację Seohost.pl:
- [ ] Max RAM dla Node.js: 8 GB RAM
- [ ] Max CPU: 4 vCPU (AMD EPYC), 8 GB RAM
- [ ] Max rozmiar dysku: 80 GB

## Specyfikacja techniczna oferty hostingu, z którego chcę skorzystać:

vCPU (AMD EPYC): 4
​

Pamięć RAM: 8 GB
​

IO: 350 MB/s
​

IOPS: 8000
​

NPROC (jednoczesne procesy): 200
​

INODES: 15000 (tak jest zapisane w tabeli, wygląda na błąd/skrót w stosunku do innych pakietów)
​

Maksymalny czas wykonywania zapytania SQL: 300 s
​

Maksymalne użycie pamięci przez zapytanie SQL: 2 GB
​

Maksymalna ilość połączeń jednego użytkownika do bazy SQL: 60
​

Maksymalna liczba połączeń HTTP: 100
​

Maksymalny czas nieaktywności HTTP: 180 s
​

Maksymalne użycie pamięci przez proces PHP: 1 GB
​

Maksymalny czas wykonywania skryptu PHP: 300 s
​

Maksymalny rozmiar wiadomości e-mail: 200 MB
​

Maksymalna ilość odbiorców w pojedynczej wiadomości e-mail: 100
​

Maksymalna liczba połączeń IMAP/POP3/SMTP: 50
​

---

**Po wypełnieniu tej checklisty będę wiedział jak skonfigurować deployment!**

Jeśli nie znajdziesz odpowiedzi w panelu:
📧 Napisz do supportu Seohost.pl:
"Witam, czy mogę uruchomić aplikację Next.js 14 na moim planie hostingowym? 
Potrzebuję Node.js ≥18.17, MySQL, oraz możliwości zarządzania procesem Node."
