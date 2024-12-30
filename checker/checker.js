const root = document.getElementById('root');
const tonPrice = 5.55

const profitData = [
    {
        projectName: 'Hamster',
        spending: 0,
        profit: 24,
        isFinished: true,
        profitToken: 'usdt'
    },
    {
        projectName: 'NotPixel',
        spending: 18.18,
        profit: 0,
        isFinished: false,
        profitToken: 'usdt'
    },
    {
        projectName: 'Blum',
        spending: 2.7,
        profit: 6,
        isFinished: false,
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
        profit: 0,
        isFinished: false,
        profitToken: 'usdt'
    },
    {
        projectName: 'Earn',
        spending: 0,
        profit: 0,
        isFinished: false,
        profitToken: 'usdt'
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
        projectName: 'Tonco contest',
        spending: 0,
        profit: 25,
        isFinished: true,
        profitToken: 'usdt'
    }
]

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

const getUSDTProfit = (item) => {
    const usdtProfit = item.profitToken === 'usdt' ? item.profit : item.profit * tonPrice;
    return rounding(usdtProfit);
}

const totalProfit = () => {
    return rounding(profitData.reduce((acc, item) => acc + getUSDTProfit(item), 0));
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

const showTotalProfit = () => {
    const totalProfitElement = createElement('div', 'total-profit', `Total profit: ${totalProfit()}`);
    return totalProfitElement;
}

const showIncome = () => {
    const totalIncomeElement = createElement('div', 'total-income', `Total income: ${rounding(totalProfit() - totalSpending())}`);
    return totalIncomeElement;
}

const createTable = () => {
    const wrapper = createElement('div', 'wrapper', '');
    const tableHeader = createTableRow(['Project', 'Spending', 'Profit', 'Status', 'Income'], 'table-header', 'table-header-cell');
    const tableBody = profitData.map((item) => {
        const { projectName, spending, profit, isFinished } = item;
        const usdtProfit = getUSDTProfit(item);
        
        const tableRow = createTableRow([projectName, spending, profit, isFinished ? 'Finished' : 'In progress', usdtProfit - spending], 'table-row', 'table-cell');
        return tableRow;
    })
    addElements(wrapper, tableHeader, ...tableBody);
    return wrapper;
}

const createResult = () => {
    const result = createElement('div', 'result', '');
    addElements(result, showTotalSpending(), showTotalProfit(), showIncome());
    return result;
}

root.append(createTable(), createResult());