var credentials = {
    token: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE2NDc0NDE1MDksInRva2VuIjoiYTZZbjNPWXgwZlphVkx4a2EzTUpISHA2eUpTNFk0IiwidXNlcl9pZCI6IjA3OGE0ZDlkLTZiOWMtNDNkOC1iNWY3LWUxOGQ0NDViODBlMiIsImRldmljZV9oYXNoIjoiNmY5OTBjNzcwMzI1N2YxZGIyNGM1OWZmZTU0ZjBiYzgiLCJzY29wZSI6ImludGVybmFsIiwiZGN0IjoxNjA3NTUwNTY2LCJzZXJ2aWNlX3JlY29yZHMiOlt7ImhhbHRlZCI6ZmFsc2UsInNlcnZpY2UiOiJudW1tdXNfdXMiLCJzaGFyZF9pZCI6MSwic3RhdGUiOiJhdmFpbGFibGUifSx7ImhhbHRlZCI6ZmFsc2UsInNlcnZpY2UiOiJicm9rZWJhY2tfdXMiLCJzaGFyZF9pZCI6MTEsInN0YXRlIjoiYXZhaWxhYmxlIn1dLCJ1c2VyX29yaWdpbiI6IlVTIiwib3B0aW9ucyI6dHJ1ZSwibGV2ZWwyX2FjY2VzcyI6ZmFsc2V9.rAhea9qIWm52CxULKsJayUfHlyCTvAOK5uwdx11gaEBl5Ke-prM4ZvYC7q4yTCjSCYFRrJOwGOtGabnqc_vOQJd0KEWomvTQ7IVBFFAwcIHmrdHuZAGFPHKoVQhumYjuffCaU1sWkES3XFxYcJqaR6ahagtnH5XIstMM2N6sxBDrP4o3gH0wkdG9yZo5Ugi7EbRD9Pitr_blgYqXu5lyC5vwovX_7BUnmKzXUulGqydpP6uesTBKw9fWhlJZRxrHBEWMilW-VQGyWpHjoKYxGFCccDqBtrArtxxFVIOtIhIxtyI8gxZ3OxOyh86HV2zktdA_t3SS-3sV4yxGRJQbxw'
};

var workingTicker = {
    todayData: [],
    weekData: [],
    date: null,
    ticker: null
};

var tickerArray;

const fs = require('fs');
import chalk from 'chalk';
const {
    Command
} = require('commander');
const program = new Command();

program
    .name('scalpbot')
    .description('gonna try a thing')
    .version('0.0.1');

program.command('l')
    .description('Listen to given array of ticker names')
    .argument('<string>', 'string to split')
    .option('--first', 'only use first ticker')
    .option('-s, --separator <char>', 'separator character', ',')
    .action((str, options) => {
        const limit = options.first ? 1 : undefined;
        console.log(str.split(options.separator, limit));
        tickerArray = (str.split(options.separator, limit));
    });

program.parse();


main();

function main() {
    var resp = test();
    console.log(resp);
}

function test();

function listen(ticker) {

}


function getHistorialDay(ticker) {
    var Robinhood = require('robinhood')(credentials, function (err, data) {

        //Robinhood is connected and you may begin sending commands to the api.

        Robinhood.quote_data(ticker, function (error, response, body) {
            if (error) {
                console.error(error);
                process.exit(1);
            }
            console.log(body);
            return body;
        });
    });
}

async function saveData(dataAgg, ticker) {
    fs.writeFile(`${ticker}.txt`, dataAgg, function (err) {
        if (err) {
            console.log(err);
            exit 1;
        }
        console.log(`Saved ${ticker}`);
    });
}

function loadData(ticker) {
    const data = fs.readFileSync(`${ticker}.txt`, 'utf8');
    return JSON.parse(data.toString());
}
