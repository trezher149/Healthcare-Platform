# Backend API URL paths

*ภาษาไทยให้อ่านในไฟล์ README-th.md*

#### This is the list of URL paths used for API calls from another docker container, and breifly explained their functionality.

Before you build the image from `Dockerfile` or start docker compose, first, you need to install this application dependencies by `npm install`. You should edit `.env` file if you want to configure to use your mongoDB or custom docker compose or `Dockerfile`. You can use mongo Atlas, but local mongo server is recommended. URL and PORT variables are also avaliable in `.env` file.

URL paths always begin with `http(s)://your_url/api/`

### URL paths are listed as followed
- `/api/user/`
    1. `adduser (email, name, password, healthData)`
        
        Create user for this application with email, name (username), password, and user's health data such as sex, height, weight, and age to use for calculating user's BMR (Basil Metabolic Rate.)
    2. `addlineiduser (userId, lineId)`

        Enable LINE users to use this application from our LINE Official Account named "kenko-chan."
    3. `showuserdata`

        __To be updated__
    3. `getuseridfromlineid (lineId)`

        Used by linebotImg to check if user is linked with our application.
- `/api/calories/`
    1. `updateCal (userId, calories)`

        Update recent user calories amount burned with value from the result from linebotImg. If user send new calories on the same day, the application will use recent highest calories to update a new score for that day.
    2. `getCal (userId, lengthDays)`
        
        Get calories data day by day (up to 10 days by default.)
    3. `setCalGoal (userId, caloriesGoal, endDays)`

        Set user's calories goal. It will calculate the score that user will get based of time length, user's BMR, and amount of calories to burn.
- `/api/sleep/`
    1. `updateSleep (userId, sleepDur)`

        Update recent user sleep duration. If user send new sleep duration on the same day, the data will be rejected.
    2. `getSleep (userId, lengthDays)`

        Get sleep data day by day (up to 10 days by default.)
        The date will be previous day.
    3. `setSleepGoal (userId, sleepDays, endDays)`

        Set user's sleep goal. It will calucate the score that user will get based of time length and amount of days that user sleep no less than 7 hours.

### Example of full URL paths:

- `http://my_url/api/calories/updateCal`
- `http://your_url/api/user/adduser`
- `http://our_url/api/sleep/setSleepGoal`