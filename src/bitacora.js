import Handsontable from "handsontable"
import 'handsontable/dist/handsontable.full.min.css';

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
indexers.forEach(e => {
    const option = document.createElement('option')
    option.innerText = e
    cmbIndexer.appendChild(option)
})

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
    // columns: [{ data: 'date' }, { data: 'strategy' }, { data: 'scanid' }, { data: 'empcode' }, { data: 'indexer' }],
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
        'Boo-e': 'Maintenance - Boo error PPC',
        'Last Warning': 'Maintenance - Boo error PPC',
        'Correo': 'Maintenance - Boo error PPC',
        'Matrix': 'Maintenance - Matrix',
        'Stuck': 'Maintenance - Stucked PPC',
        'CL': 'Maintenance - CL'
    }
    for (const [key, value] of Object.entries(cases)) {
        if (type.match(new RegExp(key, 'i')))
            return value
    }
}

const columnsForBitacora = [
    'Date', 'Type', 'Empcode', 'Warranty', 'Assigned to', 'Team',
    'Warranty to', '> 2 SID', 'Supported by', 'Requested by',
    'Time (mins)', 'Status', 'Assigned by', 'Operation'
]
/* const nameColumns = [
    {
        "data": "date",
        "type": "text"
    },
    {
        "data": "type",
        "type": "text"
    },
    {
        "data": "empcode",
        "type": "text"
    },
    {
        "data": "warranty",
        "type": "text"
    },
    {
        "data": "assignedto",
        "type": "text"
    },
    {
        "data": "team",
        "type": "text"
    },
    {
        "data": "warrantyto",
        "type": "text"
    },
    {
        "data": "sid",
        "type": "text"
    },
    {
        "data": "supportedby",
        "type": "text"
    },
    {
        "data": "requestedby",
        "type": "text"
    },
    {
        "data": "time",
        "type": "text"
    },
    {
        "data": "status",
        "type": "text"
    },
    {
        "data": "assignedby",
        "type": "text"
    },
    {
        "data": "operation",
        "type": "text"
    }
] */

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