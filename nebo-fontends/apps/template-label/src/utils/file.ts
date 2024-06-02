// import _ from 'lodash'
// import http from '../services/httpService'
// import { saveAs } from 'file-saver'

// async function fetchBlob(url) {
//   const response = await http.get(url, { responseType: 'blob', withCredentials: false })
//   return response.data
// }

// async function createLinkEl(url, filename = 'download.pdf') {
//   const isLink = _.isString(url)
//   const element = document.createElement('a')
//   let blob

//   if (isLink) {
//     blob = await fetchBlob(url)
//   } else {
//     blob = new Blob([url], { type: 'application/pdf' })
//   }

//   element.href = window.URL.createObjectURL(blob)
//   return element
// }

// export async function download(url, filename) {
//   const blob = await fetchBlob(url)
//   saveAs(blob, filename)
// }

// export async function print(url, filename = 'download.pdf') {
//   const linkEl = await createLinkEl(url, filename)
//   linkEl.target = '_blank'
//   window.document.body.appendChild(linkEl)
//   linkEl.click()
// }

// const fileUtils = { download, print }

// export default fileUtils
