import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from "handsontable"

const cmbIndexer = document.querySelector('#cmbIndexer')
const indexers = [
    'Alejandra Morales',
    'Alex Calle',
    'Andres Valencia',
    'Brahayan Cossio',
    'Christian Diaz',
    'David Cataño',
    'Duver Betancur',
    'Johan Castrillon',
    'Juan Bedoya',
    'Julian Nicholls',
    'Junior Londoño',
    'Miguel Garcia Henao',
    'Samuel Posada',
    'Santiago Bohorquez',
    'Sebastian Manco',
    'Valentina Posada',
    'Victoria Reyes',
]

const configsForBitacora = {
    height: 'auto',
    licenseKey: 'non-commercial-and-evaluation',
    stretchH: 'all',
    formulas: false,
    rowHeaders: false,
    contextMenu: false,
    manualRowMove: false,
    filters: false,
    dropdownMenu: false,
    maxRows: 0,
    colHeaders: [
        'Date', 'Strategy', 'Scanid', 'Empcode', 'Indexer'
    ],
    afterChange: (changes) => {
        if (changes) {
            const list = [] // Array to fill the cmb with dynamic values
            changes.forEach(([row, prop, oldValue, newValue]) => {
                if (prop === 4 && indexers.includes(newValue)) {
                    list.push(newValue)
                }
            })
            fillCmb(new Set(list))
        }
    }
}

const tableBitacora = document.querySelector('#tblBitacora')
const hot2 = tableBitacora && new Handsontable(tableBitacora, configsForBitacora)

txtRows.addEventListener('change', e => {
    const rows = e.target.value
    hot2?.updateSettings({
        minRows: rows,
        maxRows: rows
    })
})

function defineType(type) {
    const cases = {
        'Boo-e': 'M-Boo-E',
        'Last Warning': 'M-Matrix-Last Warning',
        'Correo': 'M-Boo-E',
        "blue": 'M-Matrix Blue',
        "red": 'M-Matrix Red',
        "yellow": 'M-Matrix Yellow',
        "gray": 'M-Matrix Gray',
        "black": 'M-Matrix Black',
        "orange": 'M-Matrix Orange',
        'Stuck': 'M-Stuck',
        'CL': 'Company List',
    }
    for (const [key, value] of Object.entries(cases)) {
        if (type.match(new RegExp(key, 'i')))
            return value
    }
}

const columnsForBitacora = [
    'Week', 'Date', 'Type', 'Empcode', 'Warranty', 'Assigned to', 'Team',
    'Warranty to', '> 2 SID', 'Supported by', 'Requested by',
    'Time (mins)', 'Status', 'Assigned by', 'Operation'
]

const dataForTable = []
const btnGenerateBitacora = document.querySelector('#btnGenerateBitacora')
btnGenerateBitacora?.addEventListener('click', _ => {
    const cmbValue = cmbIndexer.value
    const dataTable = hot2.getData()
    if (cmbValue === '0') {
        return alert('Please choose a Indexer')
    }

    const filterData = dataTable.filter(e => e[4].match(new RegExp(cmbValue, 'i')))
    filterData.forEach(e => {
        const [date, strategy, , empcode, indexer] = e
        const element = [
            getCurrentWeek(date),
            date,
            defineType(strategy),
            empcode,
            'No',
            indexer,
            'Mantenimiento',
            '',
            'No',
            '',
            '',
            '10',
            'Done',
            '',
            'Mantenimiento'
        ]
        dataForTable.push(element)
    })

    if (dataForTable.length > 0) {
        hot2.updateSettings({
            colHeaders: columnsForBitacora,
            // columns: nameColumns,
            minRows: dataForTable.length,
            maxRows: dataForTable.length,
            contextMenu: ['copy'],
        })
        hot2.updateData(dataForTable)
        btnGenerateBitacora.toggleAttribute('disabled')
    }
})

const btnSelectRows = document.querySelector('#btnSelectRows')
btnSelectRows.addEventListener('click', _ => {
    hot2.selectRows(0, dataForTable.length - 1)
})

//
function getCurrentWeek(date) {
    const currentDate = new Date(date);
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    return (Math.ceil(days / 7))
}

// 
function fillCmb(list) {
    list.forEach(e => {
        const option = document.createElement('option')
        option.innerText = e
        cmbIndexer.appendChild(option)
    })
}