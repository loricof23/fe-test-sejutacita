# FE test

Please open this page first

https://cors-anywhere.herokuapp.com

to get access and solve the cors issue, otherwise you can remove that line from api.js:4. 

Replace   baseURL: 'https://cors-anywhere.herokuapp.com/https://asia-southeast2-sejutacita-app.cloudfunctions.net'

with

  baseURL: 'https://asia-southeast2-sejutacita-app.cloudfunctions.net',
  
# API Feedback
429's too many request could be a trouble in dev phase. It limits how many times we can refresh the page, and it is crucial to develop FE Page. It would be good if we can pass some header auth to bypass the limit, keep the limit active for public uses.
  
