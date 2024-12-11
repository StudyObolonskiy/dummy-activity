const root = document.getElementById('root');

const profitData = [
    {
        projectName: 'Hamster',
        spending: 0,
        profit: 24,
        isFinished: true
    },
    {
        projectName: 'NotPixel',
        spending: 17.08,
        profit: 0,
        isFinished: false
    },
    {
        projectName: 'Blum',
        spending: 2.7,
        profit: 6,
        isFinished: false
    },
    {
        projectName: 'Ton Station',
        spending: 6.5,
        profit: 0,
        isFinished: false
    },
    {
        projectName: 'Nomis',
        spending: 8.48,
        profit: 0,
        isFinished: false
    },
    {
        projectName: 'Dropee',
        spending: 0.72,
        profit: 0,
        isFinished: false
    },
    {
        projectName: 'PAWS',
        spending: 10,
        profit: 0,
        isFinished: false
    },
    {
        projectName: 'Goblin Mine',
        spending: 6.6,
        profit: 0,
        isFinished: false
    },
    {
        projectName: 'Earn',
        spending: 0,
        profit: 0,
        isFinished: false
    },
    {
        projectName: 'TONCO dogs/usdt pool',
        spending: 2.254,
        profit: 50,
        isFinished: true
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
        console.log(element);
        
        parent.append(element);
    })
}

const totalSpending = () => {
   return profitData.reduce((acc, item) => acc + item.spending, 0);
}

const totalProfit = () => {
    return profitData.reduce((acc, item) => acc + item.profit, 0);
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

const createTable = () => {
    const wrapper = createElement('div', 'wrapper', '');
    const tableHeader = createTableRow(['Project', 'Spending', 'Profit', 'Status', 'Income'], 'table-header', 'table-header-cell');
    const tableBody = profitData.map((item) => {
        const { projectName, spending, profit, isFinished } = item;
        const tableRow = createTableRow([projectName, spending, profit, isFinished ? 'Finished' : 'In progress', profit - spending], 'table-row', 'table-cell');
        return tableRow;
    })
    addElements(wrapper, tableHeader, ...tableBody);
    return wrapper;
}

root.appendChild(createTable());