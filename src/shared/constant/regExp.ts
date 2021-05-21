const regExp = {
  emailRegexp: /^[a-zA-Z]+[0-9]*([.\-_]?[0-9]*[a-zA-Z]+[0-9]*)*@([.\-_]?[0-9]*[a-zA-Z]+[0-9]*)+\.[a-zA-Z]+$/,
  passwordRegexp: /((?=.*[a-z])|(?=.*[а-я])).*((?=.*[A-Z])|(?=.*[А-Я])).*(?=.*\d).*/,
  nameRegexp: /^[a-zA-Z]+(\s[a-zA-Z]+)?$/,
  bookNameRegexp: /^[a-z0-9]+[.,]?(\s[a-z0-9]+[.,]?)*$/i
}

export const {
  emailRegexp,
  passwordRegexp,
  nameRegexp,
  bookNameRegexp
} = regExp
