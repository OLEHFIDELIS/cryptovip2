const { name } = require("ejs");



const wallets = [
    {
        currency: "USDT trc20",
        address: "TNxNfEdr28DXL9oUdSwX2Yw34qynCmRZi5"
    },
    {
        currency: "XRP",
        address: "r4SUtLBWo8S5HcPhL8Mcz7eX7NUvwm6ZXx"
    },
    {
        currency: "LTC",
        address: "ltc1q23sje9uc7g8mhaypzp03ptuq9echh6takzdxfp"
    },
    {
        currency: "BTC",
        address: "bc1q4nw2tvdv7lzf8jyhaanzrfmtggd7300x4vmkl7"
    },
    {
        currency: "ETH",
        address: "0xbB91F9fcFa8273262Dc5d751858c3Ae30B5b8b16"
    },
]

const walletAdressSeedRecords = async () => {
    for (const element of wallets) {
      await createWallet(element);
   }
  
}

module.exports = walletAdressSeedRecords