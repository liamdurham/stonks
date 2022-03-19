var credentials = {
    token: 'Bearer ***'
};

var workingTicker = {
    todayData: [],
    weekData: [],
    date: null,
    ticker: null
};

var tickerArray = [];

const fs = require('fs');
const chalk = require('chalk');
const {
    Command
} = require('commander');
const program = new Command();
const prompt = require('prompt-sync')({
    sigint: true
});

program
    .name('scalpbot')
    .description('gonna try a thing')
    .version('0.0.1');

program.command('listen')
    .description('Listen to given array of ticker names')
    .argument('<string>', 'string to split')
    .option('--first', 'only use first ticker')
    .option('-s, --separator <char>', 'separator character', ',')
    .action((str, options) => {
        const limit = options.first ? 1 : undefined;
        tickerArray = (str.split(options.separator, limit));
        console.log(chalk.underline.bgBlue('Now Listening to:'));
        console.log(chalk.underline.bgBlue(tickerArray));
    });

program.parse();


main();

function main() {
    var name = prompt(chalk.blue('What is your name?'));
    console.log(`Hey there ${name}`);
}


function listen(ticker) {
    // every 5 mins, update our working data for a ticker


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
            console.log(chalk.red('COULDNT SAVE :c '));
            console.log(err);

        }
        console.log(`Saved ${ticker}`);
    });
}

function loadData(ticker) {
    const data = fs.readFileSync(`${ticker}.txt`, 'utf8');
    return JSON.parse(data.toString());
}
