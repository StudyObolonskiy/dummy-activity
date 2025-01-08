const root = document.getElementById('root');

const projectsData = [
    {
        projectName: 'Hamster',
        spending: 0,
        profit: 24,
        isFinished: true,
        profitToken: 'usdt'
    },
    {
        projectName: 'NotPixel (330 ждут продажи по цене от 0.4)',
        spending: 18.18,
        profit: 45,
        isFinished: false,
        profitToken: 'usdt'
    },
    {
        projectName: 'Blum',
        spending: 3.2,
        profit: 6,
        isFinished: true,
        profitToken: 'usdt'
    },
    {
        projectName: 'Ton Station',
        spending: 6.5,
        profit: 17.71,
        isFinished: true,
        profitToken: 'usdt'
    },
    {
        projectName: 'Nomis',
        spending: 8.48,
        profit: 0,
        isFinished: false,
        profitToken: 'usdt'
    },
    {
        projectName: 'Dropee',
        spending: 0.72,
        profit: 0,
        isFinished: false,
        profitToken: 'usdt'
    },
    {
        projectName: 'PAWS',
        spending: 12.1,
        profit: 0,
        isFinished: false,
        profitToken: 'usdt'
    },
    {
        projectName: 'Goblin Mine',
        spending: 7.49,
        profit: 1.3,
        isFinished: true,
        profitToken: 'ton'
    },    
    {
        projectName: 'Duck My Duck',
        spending: 11.74,
        profit: 0,
        isFinished: false,
        profitToken: 'usdt'
    },
    {
        projectName: 'TONCO dogs/usdt pool',
        spending: 2.254,
        profit: 60,
        isFinished: true,
        profitToken: 'usdt'
    },
    {
        projectName: 'NewYear Open League Season',        
        spending: 0,
        profit: 7.6,
        isFinished: true,
        profitToken: 'ton'
    },
    {
        projectName: 'Tonco contest (конкурс со скринами ликвидности)',
        spending: 0,
        profit: 25,
        isFinished: true,
        profitToken: 'usdt'
    }
]

const profitData = [...projectsData].sort((a, b) => b.isFinished - a.isFinished);


async function getTonPrice() {
	const response = await fetch('https://api.coingecko.com/api/v3/coins/the-open-network');
	const data = await response.json();
    const currentPrice = data.market_data.current_price.usd;
    
	return currentPrice
}

const createElement = (tag, className, text) => {
    const element = document.createElement(tag);
    element.classList.add(className);
    element.innerText = text;
    return element;
}

const addElements = (parent, ...elements) => {
    
    elements.forEach((element) => {        
        parent.append(element);
    })
}

const rounding = (number) => Math.round(number * 1000) / 1000

const totalSpending = () => {
    return rounding(profitData.reduce((acc, item) => acc + item.spending, 0));
}

const getUSDTProfit = (item, tonPrice) => {
    const usdtProfit = item.profitToken === 'usdt' ? item.profit : item.profit * tonPrice;
    return rounding(usdtProfit);
}

const totalProfit = (tonPrice) => {
    return rounding(profitData.reduce((acc, item) => acc + getUSDTProfit(item, tonPrice), 0));
}

const  createTableRow = (cellData, rowStyle, cellStyle) => {
    const tableRow = createElement('div', rowStyle, '');
    tableRow.classList.add('table-row');
    cellData.forEach((item) => {
        const tableCell = createElement('div', cellStyle, item);
        addElements(tableRow, tableCell);
    });
    return tableRow;
}

const showTotalSpending = () => {
    const totalSpendingElement = createElement('div', 'total-spending', `Total spending: ${totalSpending()}`);
    return totalSpendingElement;
}

const showTotalProfit = (tonPrice) => {
    const totalProfitElement = createElement('div', 'total-profit', `Total profit: ${totalProfit(tonPrice)}`);
    return totalProfitElement;
}

const showIncome = (tonPrice) => {
    const totalIncomeElement = createElement('div', 'total-income', `Total income: ${rounding(totalProfit(tonPrice) - totalSpending())}`);
    return totalIncomeElement;
}

const createTable = (tonPrice) => {
    const wrapper = createElement('div', 'wrapper', '');
    const tableHeader = createTableRow(['Project', 'Spending', 'Profit', 'Status', 'Income', 'Profit token'], 'table-header', 'table-header-cell');
    const tableBody = profitData.map((item) => {
        const { projectName, spending, profit, isFinished } = item;
        const usdtProfit = getUSDTProfit(item, tonPrice);
        
        const tableRow = createTableRow([projectName, spending, profit, isFinished ? 'Finished' : 'In progress', rounding(usdtProfit - spending), item.profitToken], 'table-row', 'table-cell');
        return tableRow;
    })
    addElements(wrapper, tableHeader, ...tableBody);
    return wrapper;
}

const createResult = (tonPrice) => {
    const result = createElement('div', 'result', '');
    addElements(result, showTotalSpending(), showTotalProfit(tonPrice), showIncome(tonPrice));
    return result;
}

const render = async () => {
    const tonPrice = await getTonPrice();
    const priceBlock = createElement('div', 'price', `TON price: ${tonPrice} $`);

    root.append(priceBlock ,createTable(tonPrice), createResult(tonPrice));
}

render()