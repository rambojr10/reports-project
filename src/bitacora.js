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

const tableBitacora = document.querySelector('#tblBitacora')

const configsForBitacora = {
    data: [],
    height: 'auto',
    licenseKey: 'non-commercial-and-evaluation',
    stretchH: 'all',
    formulas: false,
    rowHeaders: false,
    contextMenu: false,
    manualRowMove: false,
    filters: false,
    dropdownMenu: false,
    colHeaders: [
        'Date', 'Strategy', 'Scanid', 'Empcode', 'Indexer'
    ],
    columns: [{ data: 'date' }, { data: 'strategy' }, { data: 'scanid' }, { data: 'empcode' }, { data: 'indexer' }],
}

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
const nameColumns = [
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
]

let hot3

const dataForTable = []
const btnGenerateBitacora = document.querySelector('#btnGenerateBitacora')
btnGenerateBitacora?.addEventListener('click', _ => {
    const dataTable = hot2.getSourceData()
    dataTable.forEach(e => {
        const element = [
            e.date,
            defineType(e.strategy),
            e.empcode,
            'No',
            e.indexer,
            'Mantenimiento',
            '',
            '',
            '',
            '',
            '10',
            'Done',
            '',
            'Mantenimiento'
        ]
        dataForTable.push(element)
    })
    hot3 = new Handsontable(document.querySelector('#tblNewData'), {
        ...configsForBitacora,
        colHeaders: columnsForBitacora,
        columns: nameColumns,
        data: dataForTable
    })
    // hot2.updateSettings({
    //     colHeaders: columnsForBitacora,
    //     columns: nameColumns
    //     // columns: columsForBitacora.map(e => {
    //     //     return {data: e.toLowerCase(), type: 'text'}
    //     // }),
    // })
    // hot2.loadData(dataForTable)
    // console.log(hot2.getSourceData())
})

const btnGet = document.querySelector('#btnGet')
btnGet.addEventListener('click', e => console.log(hot3.getSourceData()))