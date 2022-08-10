const doesMatch = (a: string, b: string, msg: string) => (a === b ? '' : msg)
const passwordPattern = (pass: string) =>
  /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@ "]).*$/.test(pass)
    ? ''
    : 'password must contain at least 1 uppercase 1 lowercase 1 number and 1special character and must be of at least 8 character'

export { doesMatch, passwordPattern }
