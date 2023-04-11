async function getCurrencies(){
    const fetchCurrensies = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    const jsonCurrensies = await fetchCurrensies.json()
    
    console.log(jsonCurrensies.Valute.USD.Value.toFixed(2));
}
getCurrencies()