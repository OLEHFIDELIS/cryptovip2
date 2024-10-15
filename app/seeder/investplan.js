const { name } = require("ejs");


const InvestmentPlans = [
    {
        name: "Starter plan",
        minimumAmount: 50,
        maximumAmount: 500,
        interestRate: 2.0,
        duration: 6,
        payoutFrequency: "daily",
        currency: "USD",
        isActive: true
    },
    {
        name: "Basic plan",
        minimumAmount: 500,
        maximumAmount: 5000,
        interestRate: 3.6,
        duration: 1,
        payoutFrequency: "daily",
        currency: "USD",
        isActive: true
    },
    {
        name: "Starndard plan",
        minimumAmount: 5000,
        maximumAmount: 20000,
        interestRate: 6.5,
        duration: 1,
        payoutFrequency: "daily",
        currency: "USD",
        isActive: true
    },
    {
        name: "Premium plan",
        minimumAmount: 700,
        maximumAmount: 10000,
        interestRate: 9,
        duration: 2,
        payoutFrequency: "daily",
        currency: "USD",
        isActive: true
    },
    {
        name: "Golden plan",
        minimumAmount: 20000,
        maximumAmount: 50000,
        interestRate: 12,
        duration: 2,
        payoutFrequency: "daily",
        currency: "USD",
        isActive: true
    },
    {
        name: "Diamond plan",
        minimumAmount: 10000,
        maximumAmount: 200000,
        interestRate: 20,
        duration: 2,
        payoutFrequency: "daily",
        currency: "USD",
        isActive: true
    },
]

const investmentplanSeedRecords = async () => {
    for (const element of InvestmentPlans) {
      await createPlan(element);
   }
  
}

module.exports = investmentplanSeedRecords
