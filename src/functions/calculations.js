import { range, format, sum } from "./library"

const getAnnualEnergyProduced = (
  year,
  firstYearAnnualProduction,
  annualDegradationRate = 0.005
) => {
  const performanceFactor = (1 - annualDegradationRate) ** year
  return firstYearAnnualProduction * performanceFactor
}

const getMATaxCredit = taxBasis => Math.min([1000, 0.15 * taxBasis])

const getSRECMarketValue = (
  year,
  initialSRECValue,
  annualDecreaseRate = 0.05
) =>
  year < 10
    ? Math.floor(initialSRECValue * (1 - annualDecreaseRate) ** year)
    : 0

const getSMARTValue = (year, initialSMARTValue, annualDecreaseRate = 0.05) =>
  year < 10
    ? Math.floor(initialSMARTValue * (1 - annualDecreaseRate) ** year)
    : 0

const getAnnualSRECsMonetized = (
  year,
  annualProduction,
  counter = 0,
  remainderLastYear = 0,
  sRECMarketSector = 0.8
) => {
  if (year >= 10) return 0
  const sRECBasis = remainderLastYear + annualProduction
  const sRECsMonetized = Math.floor(sRECMarketSector * sRECBasis / 1000)
  const remainderThisYear = (sRECMarketSector * sRECBasis) % 1000
  if (counter === year) return sRECsMonetized
  return getAnnualSRECsMonetized(
    year,
    annualProduction,
    counter + 1,
    remainderThisYear
  )
}

const getUtilityRateValue = (
  year,
  initialUtilityRate = 0.2,
  annualIncreaseRate = 0.025
) =>
  Math.floor(initialUtilityRate * 1000 * (1 + annualIncreaseRate) ** year) /
  1000

const getFederalITCValue = (year, taxBasis) => (year === 0 ? 0.3 * taxBasis : 0)

const getDepreciableBasis = (taxBasis, firstYearBonusDepreciationRate) =>
  (1 - firstYearBonusDepreciationRate) * 0.85 * taxBasis

const getAnnualDepreciationValue = (
  year,
  taxBasis,
  firstYearBonusDepreciationRate,
  taxRate = 0.35
) => {
  const depreciableBasis = getDepreciableBasis(
    taxBasis,
    firstYearBonusDepreciationRate
  )
  const firstYearBonusDepreciation =
    firstYearBonusDepreciationRate * 0.85 * taxBasis
  const fiveYearDepreciationRate = [0.2, 0.32, 0.192, 0.1152, 0.1152, 0.0576]
  const acceleratedDepreciationDeduction =
    year === 0
      ? fiveYearDepreciationRate[year] * depreciableBasis +
        firstYearBonusDepreciation
      : fiveYearDepreciationRate[year] * depreciableBasis

  return taxRate * acceleratedDepreciationDeduction || 0
}

const getInsuranceCost = (year, firstYearInsuranceCost) =>
  Math.floor(firstYearInsuranceCost * 1.0125 ** year)

const getMaintenanceCost = (year, initialMaintenanceCost) =>
  year > 0 && year % 4 === 0
    ? Math.floor(initialMaintenanceCost / 50 * 1.025 ** year) * 50
    : 0

const getAnnualSRECRevenue = (
  year,
  firstYearAnnualProduction,
  initialSRECValue
) =>
  getAnnualSRECsMonetized(
    year,
    getAnnualEnergyProduced(year, firstYearAnnualProduction)
  ) * getSRECMarketValue(year, initialSRECValue)

const getAnnualSMARTRevenue = (
  year,
  firstYearAnnualProduction,
  initialSMARTValue
) =>
  getAnnualEnergyProduced(year, firstYearAnnualProduction) *
  getSMARTValue(year, initialSMARTValue)

const getAnnualNetMeteringSavings = (
  year,
  firstYearAnnualProduction,
  initialUtilityRate
) =>
  getAnnualEnergyProduced(year, firstYearAnnualProduction) *
  getUtilityRateValue(year, initialUtilityRate)

const getNantucketSOLARRebateValue = year => (year === 1 ? 2500 : 0)

//// EXPORTS

export const generateLifetimeAnnualDataProductionOnly = (
  startYear,
  firstYearAnnualProduction,
  firstYearInsuranceCost,
  initialMaintenanceCost,
  initialSRECValue,
  initialUtilityRate
) =>
  range(25).map(year => ({
    Year: (year + startYear).toString(),
    "SREC Revenue": format("$")(
      getAnnualSRECRevenue(year, firstYearAnnualProduction, initialSRECValue)
    ),
    "Net Metering Savings": format("$")(
      getAnnualNetMeteringSavings(
        year,
        firstYearAnnualProduction,
        initialUtilityRate
      )
    ),
    "Insurance Expenses": format("$")(
      getInsuranceCost(year, firstYearInsuranceCost)
    ),
    "Maintenance Expenses": format("$")(
      getMaintenanceCost(year, initialMaintenanceCost)
    ),
    "Net Income": format("$")(
      getAnnualSRECRevenue(year, firstYearAnnualProduction, initialSRECValue) +
        getAnnualNetMeteringSavings(
          year,
          firstYearAnnualProduction,
          initialUtilityRate
        ) -
        getInsuranceCost(year, firstYearInsuranceCost) -
        getMaintenanceCost(year, initialMaintenanceCost)
    )
  }))

export const generateLifetimeAnnualData = (
  startYear,
  firstYearAnnualProduction,
  taxBasis,
  incentivePrograms,
  taxRate = 0.35,
  firstYearBonusDepreciationRate = 0.4,
  initialSRECValue = 245,
  initialSMARTValue = 120,
  initialUtilityRate = 0.2
) => {
  const lifetimeData = []
  const {
    fITC,
    sMART,
    sREC,
    mACRS,
    nantucketSolar,
    netMetering
  } = incentivePrograms
  range(25).map(year => {
    lifetimeData[year] = {}
    lifetimeData[year]["Year"] = year + startYear
    fITC &&
      (lifetimeData[year]["Federal ITC Value"] = getFederalITCValue(
        year,
        taxBasis
      ))
    sMART &&
      (lifetimeData[year]["SMART Revenue"] = getAnnualSMARTRevenue(
        year,
        firstYearAnnualProduction,
        initialSMARTValue
      ))
    sREC &&
      (lifetimeData[year]["SREC Revenue"] = getAnnualSRECRevenue(
        year,
        firstYearAnnualProduction,
        initialSRECValue
      ))
    mACRS &&
      (lifetimeData[year][
        "Depreciation Deductions"
      ] = getAnnualDepreciationValue(
        year,
        taxBasis,
        firstYearBonusDepreciationRate,
        taxRate
      ))
    nantucketSolar &&
      (lifetimeData[year]["Nantucket Solar"] = getNantucketSOLARRebateValue(
        year
      ))
    netMetering &&
      (lifetimeData[year]["Net Metering Savings"] = getAnnualNetMeteringSavings(
        year,
        firstYearAnnualProduction,
        initialUtilityRate
      ))
    const totalAnnualIncentiveValue = sum(Object.values(lifetimeData[year]))
    lifetimeData[year][
      "Total Annual Incentive Value"
    ] = totalAnnualIncentiveValue
  })

  return lifetimeData
}

export const getPaybackPeriod = (
  startYear,
  firstYearAnnualProduction,
  taxBasis
) =>
  generateLifetimeAnnualData(startYear, firstYearAnnualProduction, taxBasis)
    .map(year =>
      Object.keys(year)
        .filter(key => key !== "Year")
        .map(key => year[key])
        .reduce((a, b) => a + b)
    )
    .reduce((a, b, i) => {
      a.push(b + (a[i - 1] || 0))
      return a
    }, [])
    .map((e, i) => ({
      Year: startYear + i,
      "Net Revenue and Savings": e
    }))
    .find(e => e["Net Revenue and Savings"] >= taxBasis)
