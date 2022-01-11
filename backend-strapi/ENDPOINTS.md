/checkEmail
POST
-> {email: string}
<- {email: string, username: string}

/exists
POST
-> {email: string} || {username: string}
<- {exists: boolean}
