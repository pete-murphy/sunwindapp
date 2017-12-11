export const camelToTitle = str =>
  str
    .replace(/^([a-z])/, l => l.toUpperCase())
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/(?=[A-Z])+([A-Z])(?=[a-z])/g, " $1")
