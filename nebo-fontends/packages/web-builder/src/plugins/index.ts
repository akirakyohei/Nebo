// import React, { useRef, useCallback, useEffect, useMemo } from 'react'

// import { debounce, mergeWith, add } from 'lodash'
// import { notification } from 'antd'
// import { GrapesjsReact } from 'grapesjs-react'
// import config from './config'
// import { validateTemplate } from '../../../../../utils'
// import events, { setDevice, setMargin, setEditorDimension, vis, loadData, loopAllComponents } from './utils'

// import { useDesignerContext } from '../../../../../contexts/DesignerContext'
// import 'intersection-observer'
// import { useIsVisible } from 'react-is-visible'
// import style from './config/style'
// import { TYPES } from './plugins/componentTypes/consts'

// export default function Editor({ onInit, onComponentToggle }) {
//   const { template, editor, assets: globalAssets } = useDesignerContext()
//   const {
//     current: currentEditor,
//     set: setEditor,
//     setSelectedComponent,
//     zoomIn,
//     zoomOut,
//     setHasUndo,
//     setHasRedo,
//     setHasLegacy,
//   } = editor
//   const { data, isLoading, updateContent, updateAssets, autoSave } = template
//   const { components, styles, options } = data

//   // Local state variables
//   const initialized = useRef(false)
//   const destroyed = useRef(false)
//   const editorRef = useRef(null)
//   const isVisible = useIsVisible(editorRef)
//   const error = useRef(null)
//   const templateAssets = useRef({})
//   const handle = useRef(null)
//   const handleStore = useRef(null)

//   // if there isn't an editor set initialized to false
//   // Used for reloading
//   useEffect(() => {
//     if (currentEditor) return
//     initialized.current = false
//   }, [currentEditor])

//   useEffect(() => {
//     if (!globalAssets.isSuccess || !currentEditor) return
//     currentEditor.Assets.load({ assets: globalAssets.data.data })
//   }, [globalAssets, currentEditor])

//   handleStore.current = {
//     // Handle changes to the template body here so that
//     // we can control when changes are passed to the parent
//     content: (data) => updateContent(data),
//     assets() {
//       const currentTemplateAssets = { ...templateAssets.current }
//       const filteredAssets = Object.keys(currentTemplateAssets).filter((k) => currentTemplateAssets[k] > 0)

//       if (!globalAssets?.data?.data?.length > 0) return
//       // Get the IDs from global template assets & store if there's a change
//       const assetIds = globalAssets.data.data.filter((a = {}) => filteredAssets.includes(a.src)).map((a = {}) => a.id)
//       updateAssets(assetIds)
//     },
//   }

//   const handleChange = useCallback(() => {
//     if (!currentEditor || !currentEditor.modules) return
//     const { getDirtyCount, getEditing, store } = currentEditor
//     if (getDirtyCount() <= 0 || getEditing() != null || error.current) return
//     store()
//   }, [currentEditor])

//   //Debounce the storage method so we don't make so many API calls
//   const handleChangeDebounced = useMemo(() => debounce(handleChange, 3000, { leading: false }), [handleChange])
//   const handleStoreAssetsDebounced = useMemo(() => debounce(handleStore.current.assets, 3000), [])

//   // Store any unsaved changes if the user switches away from the browser window
//   vis((event, isVisible) => {
//     if (!isVisible) handleChange()
//   })

//   // Store any unsaved changes if the user switches to preview
//   useEffect(() => {
//     if (!isVisible) handleChange()
//   }, [isVisible, handleChange])

//   useEffect(() => {
//     return function () {
//       handleChange()
//     }
//   }, [handleChange])

//   const validateTextComponent = useCallback((model) => {
//     if (model?.attributes?.type !== 'text') return
//     const html = model.toHTML()
//     error.current = validateTemplate(html)
//     let action = error.current ? 'add' : 'remove'
//     model.view?.el.classList[action]('error')
//     notification.destroy()
//     if (error.current) {
//       notification.error({
//         message: 'Syntax error',
//         description:
//           'This was probably caused by a malformed variable in the element that was modified last. To fix, try undoing the last change.',
//         placement: 'bottomRight',
//       })
//     }
//   }, [])

//   const updateSelectedComponent = () => {
//     if (!currentEditor) return
//     const selComp = currentEditor.getSelected()
//     setSelectedComponent(selComp)

//     if (onComponentToggle) onComponentToggle(selComp)
//   }


  
//   const updateTemplateAssets = (model, changeType) => {
//     if (destroyed.current) return

//     // Verify is image type
//     if (model?.attributes?.type !== 'dm-image') return

//     const { attributes: img, _previousAttributes: prevImg } = model

//     const changes = { [img.src]: 0, [prevImg.src]: 0 }

//     if (changeType === 'add') changes[img.src]++
//     if (changeType === 'remove') changes[img.src]--
//     if (changeType === 'update') {
//       changes[prevImg.src]--
//       changes[img.src]++
//     }
//     const prevValues = { ...templateAssets.current }
//     templateAssets.current = mergeWith(prevValues, changes, add)

//     handleStoreAssetsDebounced()
//   }

//   const handleScrollZoom = useCallback(
//     (event) => {
//       if (event.ctrlKey === false) return
//       event.preventDefault()
//       const changeValue = event?.wheelDeltaY
//       if (!changeValue || changeValue === 0) return
//       if (changeValue > 0) {
//         zoomIn()
//       } else {
//         zoomOut()
//       }
//     },
//     [zoomIn, zoomOut],
//   )

//   // const handleEmptyTemplateState = useCallback(() => {
//   //   const wrapper = currentEditor && currentEditor.getWrapper()
//   //   if (!wrapper) return

//   //   const isEmpty = wrapper?.attributes?.components?.length <= 0
//   //   const container = currentEditor.BlockManager.getContainer()

//   //   const blockEls = container?.querySelectorAll?.('.gjs-block')
//   //   if (!blockEls) return

//   //   blockEls.forEach((el) => {
//   //     const className = el.title === 'Section' ? 'focus' : 'disabled'
//   //     el.classList[isEmpty ? 'add' : 'remove'](className)
//   //   })
//   // }, [currentEditor])

//   useEffect(() => {
//     return function () {
//       if (currentEditor) {
//         const dirtyCount = currentEditor?.getDirtyCount?.()
//         if (dirtyCount > 0) currentEditor.store()
//       }
//     }
//   }, [currentEditor])

//   function updateSelectedChildClasses(model, action = 'add') {
//     function updateParent(model) {
//       const isWrapper = model?.is?.('wrapper')
//       const parent = model?.parent?.()
//       if (isWrapper || !parent) return
//       if (parent?.view?.el?.classList) parent.view.el.classList[action]('child-selected')
//       updateParent(parent)
//     }
//     updateParent(model)
//   }

//   // This is a workaround for context issue with GrapesJS
//   handle.current = {
//     initEditor(editor) {
//       // handleEmptyTemplateState()
//     },
//     initialComponentAdd(model) {
//       updateTemplateAssets(model, 'add')
//       validateTextComponent(model)
//     },
//     componentAdd(model) {
//       updateTemplateAssets(model, 'add')
//       // handleEmptyTemplateState()
//     },
//     componentUpdate(model) {
//       updateTemplateAssets(model, 'update')
//     },
//     componentStyleUpdate(model) {},
//     componentRemove(model) {
//       updateTemplateAssets(model, 'remove')
//       // handleEmptyTemplateState()
//     },
//     componentChange(change, editor) {
//       autoSave && autoSave && handleChangeDebounced()
//     },
//     componentSelected(model) {
//       updateSelectedChildClasses(model, 'add')
//     },
//     componentDeselected(model) {
//       updateSelectedChildClasses(model, 'remove')
//       validateTextComponent(model)
//     },
//     componentToggle() {
//       updateSelectedComponent()
//     },
//     bodyScroll(event) {
//       handleScrollZoom(event)
//     },
//   }

//   // INITIALIZATION
//   // ///////////////////////////////////
//   const initializeEditor = useCallback(
//     (editor) => {
//       if (!editor || initialized.current || isLoading) return
//       setEditor(editor)
//       const { on, off, Storage, Canvas, Commands } = editor

//       // STORAGE
//       Storage.add('custom', {
//         store(values, cb, cbError) {
//           delete values.assets
//           // handleStore.current.content(values)
//           handleStore.current.content(values)
//           cb(values)
//         },
//       })

//       const initialAdd = (model) => handle.current.initialComponentAdd(model)

//       on('component:add', initialAdd)
//       loadData(editor, components, styles, style)
//       off('component:add', initialAdd)

//       Storage.setCurrent('custom')

//       on('run:variable-error', () => {
//         notification.error({
//           message: 'Syntax error',
//           description: "Don't include double curly brackets '{{...}}' in your variable name",
//           placement: 'bottomRight',
//         })
//       })

//       /**WORKAROUND FOR WRAPPER STYLES BEING SET TO body */
//       const bodyRule = editor.CssComposer.getRule('#wrapper')

//       if (bodyRule) {
//         const wrapperRule = editor.Css.getRule('.wrapper')
//         if (!wrapperRule) editor.Css.setRule('.wrapper', bodyRule.config.style)
//         editor.Css.remove('#wrapper')
//         editor.refresh()
//       }
//       /** END WORKAROUND */

//       editor.onReady(() => {
//         // BIND EVENT LISTENERS
//         on('change:changesCount', (change) => handle.current.componentChange(change, editor))
//         on('component:add', (model) => handle.current.componentAdd(model))
//         on('component:update', (model) => handle.current.componentUpdate(model))
//         on('component:styleUpdate', (model) => handle.current.componentStyleUpdate(model))
//         on('component:remove', (model) => handle.current.componentRemove(model))
//         on('component:toggled', (model) => handle.current.componentToggle(model))
//         on('component:selected', (model) => handle.current.componentSelected(model))
//         on('component:deselected', (model) => handle.current.componentDeselected(model))
//         on('component:update', () => {
//           setHasUndo(editor.UndoManager.hasUndo())
//           setHasRedo(editor.UndoManager.hasRedo())
//         })

//         const canvasEl = Canvas.getElement()
//         const bodyEl = Canvas.getBody()
//         const document = Canvas.getDocument()
//         const wrapper = editor.getWrapper()

//         // Make dropping rows between rows easier
//         on('block:drag:start component:drag:start', (block) => {
//           const component = block?.target ? block.target : block
//           const type = block?.target ? component.get('type') : component.getId()
//           if (component && type) {
//             bodyEl.classList.remove('stop')
//             bodyEl.setAttribute('data-drag', type)
//             bodyEl.classList.add('gjs-blocks-dragging')
//           }
//         })
//         on('block:drag:stop component:drag:end', () => {
//           bodyEl.classList.add('stop')
//           bodyEl.removeAttribute('data-drag')
//         })

//         // CTRL + Scroll to zoom
//         bodyEl.addEventListener('mousewheel', (e) => handle.current.bodyScroll(e), { passive: false })

//         const canvasFrames = canvasEl.querySelector('.gjs-cv-canvas__frames')
//         canvasFrames.addEventListener('scroll', () => {
//           editor.refresh()
//         })

//         // Paste as plain text
//         function onPaste(ev) {
//           ev.preventDefault()
//           const text = (ev.clipboardData || window.clipboardData).getData('text')
//           // Replace \n with <br> in case of plain text
//           const html = text.replace(/(?:\r\n|\r|\n)/g, '<br/>')
//           document.execCommand('insertHTML', false, html)
//         }

//         on('rte:enable', () => {
//           events.on(document, 'paste', onPaste)

//           const sel = editor.getSelected()

//           if (!sel || !editor?.RichTextEditor?.getAll()?.find((o) => o.name === 'link')?.btn?.style) return

//           if (sel.get('type') === 'dm-button')
//             editor.RichTextEditor.getAll().find((o) => o.name === 'link').btn.style.display = 'none'
//           else editor.RichTextEditor.getAll().find((o) => o.name === 'link').btn.style.display = 'flex'
//         })
//         off('rte:disable', () => {
//           events.off(document, 'paste', onPaste)

//           if (!editor?.RichTextEditor?.getAll()?.find((o) => o.name === 'link')?.btn?.style) return

//           editor.RichTextEditor.getAll().find((o) => o.name === 'link').btn.style.display = 'flex'
//         })

//         const documentWrapper = document.createElement('div')
//         documentWrapper.classList.add('document')
//         documentWrapper.appendChild(wrapper.view.el)
//         bodyEl.appendChild(documentWrapper)

//         // Deselect components when canvas is clicked
//         canvasFrames.addEventListener('click', ({ target }) => target === canvasFrames && editor.select())
//         documentWrapper.addEventListener('click', ({ target }) => target === documentWrapper && editor.select())

//         // SET DEVICE & MARGIN
//         setDevice(editor, options)
//         setMargin(editor, options?.margin)

//         const ro = new ResizeObserver((entries) => {
//           setEditorDimension(editor)
//         })

//         ro.observe(editorRef.current)
//         ro.observe(documentWrapper)

//         // Enable guides
//         Commands.run('sw-visibility')

//         initialized.current = true
//         handle.current.initEditor(editor)
//         if (onInit) onInit(editor)

//         const rootComponents = editor.getComponents()
//         // Scan template for legacy components
//         const ifTrue = (c) => c.get('type') === TYPES.section || c.get('type') === TYPES.row
//         const clb = () => setHasLegacy(true)
//         loopAllComponents(rootComponents, ifTrue, clb)

//         const imageHasChildren = (c) => {
//           const isImage = c.get?.('type') === 'dm-image'
//           if (!isImage) return false
//           const children = c.get?.('components')
//           return children?.length > 0
//         }
//         const removeChildren = (c) => {
//           c.empty()
//         }
//         loopAllComponents(rootComponents, imageHasChildren, removeChildren)
//       })
//     },
//     [setEditor, onInit, components, options, styles, isLoading],
//   )

//   // Handle Options Change
//   // //////////////////////////////////
//   useEffect(() => {
//     if (!options || !currentEditor) return
//     setDevice(currentEditor, options)
//     setMargin(currentEditor, options.margin)
//     setEditorDimension(currentEditor)
//   }, [options, currentEditor])

//   useEffect(() => {
//     const el = editorRef.current
//     if (!el) return
//     el.addEventListener('mousewheel', handleScrollZoom)
//     return function () {
//       el.removeEventListener('mousewheel', handleScrollZoom)
//     }
//   }, [handleScrollZoom])

//   const handleDestroy = useCallback(() => {
//     destroyed.current = true
//     setEditor(null)
//   }, [setEditor])

//   return (
//     <div ref={editorRef}>
//       <GrapesjsReact id='template-designer-canvas' onInit={initializeEditor} {...config} onDestroy={handleDestroy} />
//     </div>
//   )
// }
