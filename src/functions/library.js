export const camelToTitle = str =>
  str
    .replace(/^([a-z])/, l => l.toUpperCase())
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/(?=[A-Z])+([A-Z])(?=[a-z])/g, " $1")
    .replace(/(\w)(\d)/, "$1 $2")
    .replace(/ {2}/g, " ") // Not sure why this is an issue

export const sum = arr => arr.reduce((a, b) => a + b, 0)

export const range = num => [...Array(num).keys()]

export const parse = str =>
  str ? +str.replace(/[^0-9]/g, "").replace(/^0*(\d+)/, "$1") : 0

export const format = fmt => num => {
  if (fmt === "$0.00") {
    const formattedNum =
      num.toString().length < 3
        ? `00${num.toString()}`.slice(-3)
        : num.toString()
    return `$${formattedNum
      .replace(/([0-9]{2})$/, ".$1")
      .replace(/\B(?=(\d{3})+(?=\.))/g, ",")}`
  }
  if (fmt === "$") {
    return Math.round(num)
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })
      .slice(0, -3)
  }
  if (fmt === "$.") {
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
  }
  if (fmt === ",") {
    return Math.round(num).toLocaleString("en-US")
  }
  if (fmt === "%") {
    return `${Math.round(num * 1000) / 10}%`
  }
}

export const numToMon = num =>
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ][num]

export const generateLoadData = monthlyAvg => {
  // These are from NREL SAM, statistical average?
  const defaultLoadData = [
    375,
    331,
    334,
    369,
    479,
    692,
    842,
    772,
    622,
    500,
    325,
    377
  ]
  const multByScale = num => num * monthlyAvg / (sum(defaultLoadData) / 12)
  return defaultLoadData.map(multByScale).map(Math.round)
}
