import Handsontable from 'handsontable'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'handsontable/dist/handsontable.full.min.css'

const tableReports = document.querySelector('#tblReports')

const configs = {
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
        'Scanid', 'Empcode', 'Indexer', 'Type', 'Feedtype',
        'Status', 'Reported', 'To report', 'States of dates',
        'Comment', 'QA Owner', 'Warning', 'Print'
    ],
    columns: [
        {
            data: 'scanid',
            type: 'text',
        },
        {
            data: 'empcode',
            type: 'text',
        },
        {
            data: 'indexer',
            type: 'text',
        },
        {
            data: 'type',
            type: 'text'
        },
        {
            data: 'feedtype',
            type: 'text'
        },
        {
            data: 'status',
            type: 'text'
        },
        {
            data: 'reported',
            type: 'text'
        },
        {
            data: 'toReport',
            type: 'text'
        },
        {
            data: 'dates',
            type: 'text'
        },
        {
            data: 'comment',
            type: 'text'
        },
        {
            data: 'qa',
            type: 'text',
        },
        {
            data: 'warning',
            type: 'text',
        },
        {
            data: 'print',
            type: 'text',
        }
    ],
}
const hot = tableReports && new Handsontable(tableReports, configs)

const txtRows = document.querySelector('#txtRows')
txtRows.addEventListener('change', e => {
    const rows = e.target.value
    hot?.updateSettings({
        minRows: rows,
        maxRows: rows
    })
})

const btnGenerate = document.querySelector('#btnGenerateReports')
const txtReport = document.querySelector('#txtReport')
btnGenerate?.addEventListener('click', _ => {
    const data = hot.getSourceData()
    const toReport = data.filter(e => e.toReport?.match(/si/i))
    const string = makeTemplate(toReport)
    txtReport.value = withoutSpace(string)
})

const btnCopy = document.querySelector('#btnCopy')
btnCopy?.addEventListener('click', _ => copy(txtReport))

function makeTemplate(data) {
    let string = ''
    data.forEach((e, i) => {
        string += `
            ${++i}.
            Empcode: ${e.empcode}
            Scanid: ${e.scanid}
            Feedtype: ${e.feedtype}
            Type: ${e.type}
            Razón: ${e.comment}
            QA: ${e.qa ? '@' + e.qa : 'N/A'}
            Print: ${e.print || 'N/A'}
        `
    })
    return string
}

function withoutSpace(text) {
    return text.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '')
}

function copy(element) {
    if (!element.value) return alert('Nothing to copy')
    element.select()
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alert('Text successfully copied')
        }
    }
    catch (err) {
        console.log('Unable to copy');
    }
}