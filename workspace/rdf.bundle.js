/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/rdf.tsx":
/*!**************************!*\
  !*** ./examples/rdf.tsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var n3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! n3 */ \"./node_modules/n3/src/N3Parser.js\");\n/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/index */ \"./src/index.ts\");\n/* harmony import */ var _resources_exampleMetadataApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resources/exampleMetadataApi */ \"./examples/resources/exampleMetadataApi.ts\");\n/* harmony import */ var _resources_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resources/common */ \"./examples/resources/common.ts\");\n\n\n\n\n\n\nconst TURTLE_DATA = __webpack_require__(/*! ./resources/orgOntology.ttl */ \"./examples/resources/orgOntology.ttl\");\nconst CUSTOM_LINK_LABEL_IRI = 'urn:example:custom-link-label';\nconst EDITABLE_LINK_TEMPLATE = {\n    renderLink: (link, model) => {\n        let editedLabel;\n        if (link.linkState &&\n            Object.prototype.hasOwnProperty.call(link.linkState, CUSTOM_LINK_LABEL_IRI)) {\n            const customLabel = link.linkState[CUSTOM_LINK_LABEL_IRI];\n            if (typeof customLabel === 'string') {\n                editedLabel = customLabel;\n            }\n        }\n        return {\n            label: editedLabel === undefined ? undefined : {\n                label: [model.factory.literal(editedLabel)],\n                text: {\n                    fontStyle: 'italic',\n                    fontWeight: 'normal',\n                },\n            },\n        };\n    },\n    setLinkLabel: (link, label) => {\n        link.setLinkState({\n            ...link.linkState,\n            [CUSTOM_LINK_LABEL_IRI]: label.length === 0 ? undefined : label,\n        });\n    },\n};\nfunction RdfExample() {\n    const workspaceRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null);\n    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {\n        const cancellation = new AbortController();\n        const { model } = workspaceRef.current.getContext();\n        const dataProvider = new _src_index__WEBPACK_IMPORTED_MODULE_2__.RdfDataProvider();\n        dataProvider.addGraph(new n3__WEBPACK_IMPORTED_MODULE_5__[\"default\"]().parse(TURTLE_DATA));\n        const diagram = (0,_resources_common__WEBPACK_IMPORTED_MODULE_4__.tryLoadLayoutFromLocalStorage)();\n        model.importLayout({\n            diagram,\n            dataProvider,\n            validateLinks: true,\n            signal: cancellation.signal,\n        });\n        return () => cancellation.abort();\n    }, []);\n    const [metadataApi] = react__WEBPACK_IMPORTED_MODULE_1__.useState(() => new _resources_exampleMetadataApi__WEBPACK_IMPORTED_MODULE_3__.ExampleMetadataApi());\n    const [validationApi] = react__WEBPACK_IMPORTED_MODULE_1__.useState(() => new _resources_exampleMetadataApi__WEBPACK_IMPORTED_MODULE_3__.ExampleValidationApi());\n    const suggestProperties = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(params => {\n        let maxLength = 0;\n        for (const iri of params.properties) {\n            maxLength = Math.max(maxLength, iri.length);\n        }\n        const scores = params.properties.map((p) => ({\n            propertyIri: p,\n            score: 1 - p.length / maxLength,\n        }));\n        return (0,_src_index__WEBPACK_IMPORTED_MODULE_2__.delay)(300).then(() => scores);\n    }, []);\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_index__WEBPACK_IMPORTED_MODULE_2__.Workspace, { ref: workspaceRef, metadataApi: metadataApi, validationApi: validationApi, typeStyleResolver: _src_index__WEBPACK_IMPORTED_MODULE_2__.SemanticTypeStyles, groupBy: [\n            { linkType: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', linkDirection: 'in' },\n        ], onIriClick: ({ iri }) => window.open(iri), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_index__WEBPACK_IMPORTED_MODULE_2__.DefaultWorkspace, { canvas: {\n                elementTemplateResolver: types => {\n                    if (types.length === 0) {\n                        // use group template only for classes\n                        return _src_index__WEBPACK_IMPORTED_MODULE_2__.GroupTemplate;\n                    }\n                    return undefined;\n                },\n                linkTemplateResolver: type => {\n                    if (type === 'http://www.w3.org/2000/01/rdf-schema#subClassOf') {\n                        return EDITABLE_LINK_TEMPLATE;\n                    }\n                    return (0,_src_index__WEBPACK_IMPORTED_MODULE_2__.OntologyLinkTemplates)(type);\n                },\n            }, connectionsMenu: { suggestProperties }, toolbar: {\n                onSaveDiagram: () => {\n                    const { model } = workspaceRef.current.getContext();\n                    const diagram = model.exportLayout();\n                    window.location.hash = (0,_resources_common__WEBPACK_IMPORTED_MODULE_4__.saveLayoutToLocalStorage)(diagram);\n                    window.location.reload();\n                },\n                onPersistChanges: () => {\n                    const { editor } = workspaceRef.current.getContext();\n                    const state = editor.authoringState;\n                    console.log('Authoring state:', state);\n                },\n            } }) }));\n}\n(0,_resources_common__WEBPACK_IMPORTED_MODULE_4__.mountOnLoad)((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RdfExample, {}));\n\n\n//# sourceURL=webpack://@reactodia/workspace/./examples/rdf.tsx?");

/***/ }),

/***/ "./examples/resources/exampleMetadataApi.ts":
/*!**************************************************!*\
  !*** ./examples/resources/exampleMetadataApi.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ExampleMetadataApi: () => (/* binding */ ExampleMetadataApi),\n/* harmony export */   ExampleValidationApi: () => (/* binding */ ExampleValidationApi)\n/* harmony export */ });\n/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/index */ \"./src/index.ts\");\n\nconst OWL_PREFIX = 'http://www.w3.org/2002/07/owl#';\nconst RDFS_PREFIX = 'http://www.w3.org/2000/01/rdf-schema#';\nconst owl = {\n    class: OWL_PREFIX + 'Class',\n    objectProperty: OWL_PREFIX + 'ObjectProperty',\n    domain: OWL_PREFIX + 'domain',\n    range: OWL_PREFIX + 'range',\n};\nconst rdfs = {\n    subClassOf: RDFS_PREFIX + 'subClassOf',\n    subPropertyOf: RDFS_PREFIX + 'subPropertyOf',\n};\nfunction hasType(model, type) {\n    return Boolean(model.types.find(t => t === type));\n}\nconst SIMULATED_DELAY = 500; /* ms */\nclass ExampleMetadataApi {\n    async canDropOnCanvas(source, ct) {\n        await delay(SIMULATED_DELAY, ct);\n        const elementTypes = await this.typesOfElementsDraggedFrom(source, ct);\n        ct?.throwIfAborted();\n        return elementTypes.length > 0;\n    }\n    async canDropOnElement(source, target, ct) {\n        await delay(SIMULATED_DELAY, ct);\n        const linkTypes = await this.possibleLinkTypes(source, target, ct);\n        ct?.throwIfAborted();\n        return linkTypes.length > 0;\n    }\n    async possibleLinkTypes(source, target, ct) {\n        function mapLinkTypes(types, direction = _src_index__WEBPACK_IMPORTED_MODULE_0__.LinkDirection.out) {\n            return types.map(linkTypeIri => ({ linkTypeIri, direction }));\n        }\n        await delay(SIMULATED_DELAY, ct);\n        if (hasType(source, owl.class) && hasType(target, owl.class)) {\n            return mapLinkTypes([rdfs.subClassOf]).concat(mapLinkTypes([rdfs.subClassOf], _src_index__WEBPACK_IMPORTED_MODULE_0__.LinkDirection.in));\n        }\n        else if (hasType(source, owl.objectProperty) && hasType(target, owl.class)) {\n            return mapLinkTypes([owl.domain, owl.range]);\n        }\n        else if (hasType(target, owl.objectProperty) && hasType(source, owl.class)) {\n            return mapLinkTypes([owl.domain, owl.range], _src_index__WEBPACK_IMPORTED_MODULE_0__.LinkDirection.in);\n        }\n        else if (hasType(source, owl.objectProperty) && hasType(target, owl.objectProperty)) {\n            return mapLinkTypes([rdfs.subPropertyOf]).concat(mapLinkTypes([rdfs.subPropertyOf], _src_index__WEBPACK_IMPORTED_MODULE_0__.LinkDirection.in));\n        }\n        else {\n            return [];\n        }\n    }\n    async typesOfElementsDraggedFrom(source, ct) {\n        await delay(SIMULATED_DELAY, ct);\n        return (hasType(source, owl.class) ? [owl.class] :\n            hasType(source, owl.objectProperty) ? [owl.class, owl.objectProperty] :\n                []);\n    }\n    async propertiesForType(type, ct) {\n        await delay(SIMULATED_DELAY, ct);\n        return [];\n    }\n    async canDeleteElement(element, ct) {\n        await delay(SIMULATED_DELAY, ct);\n        return true;\n    }\n    async filterConstructibleTypes(types, ct) {\n        await delay(SIMULATED_DELAY, ct);\n        const result = new Set();\n        types.forEach(type => {\n            if (type.length % 2 === 0) {\n                result.add(type);\n            }\n        });\n        return result;\n    }\n    async canEditElement(element, ct) {\n        await delay(SIMULATED_DELAY, ct);\n        return true;\n    }\n    async canLinkElement(element, ct) {\n        await delay(SIMULATED_DELAY, ct);\n        return true;\n    }\n    async canDeleteLink(link, source, target, ct) {\n        await delay(SIMULATED_DELAY, ct);\n        return true;\n    }\n    async canEditLink(link, source, target, ct) {\n        await delay(SIMULATED_DELAY, ct);\n        return true;\n    }\n    async generateNewElement(types, ct) {\n        await delay(SIMULATED_DELAY, ct);\n        const random32BitDigits = Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);\n        return {\n            id: `${types[0]}_${random32BitDigits}`,\n            types: [...types],\n            label: [_src_index__WEBPACK_IMPORTED_MODULE_0__.Rdf.DefaultDataFactory.literal('New Entity')],\n            properties: {},\n        };\n    }\n}\nclass ExampleValidationApi {\n    async validate(event) {\n        const errors = [];\n        if (event.target.types.indexOf(owl.class) >= 0) {\n            event.state.links.forEach(e => {\n                if (!e.before && e.after.sourceId === event.target.id) {\n                    errors.push({\n                        type: 'link',\n                        target: e.after,\n                        message: 'Cannot add any new link from a Class',\n                    });\n                    const linkType = event.model.createLinkType(e.after.linkTypeId);\n                    errors.push({\n                        type: 'element',\n                        target: event.target.id,\n                        message: `Cannot create <${linkType.id}> link from a Class`,\n                    });\n                }\n            });\n        }\n        await delay(SIMULATED_DELAY, event.signal);\n        return errors;\n    }\n}\nasync function delay(amountMs, ct) {\n    ct?.throwIfAborted();\n    await waitTimeout(amountMs);\n    ct?.throwIfAborted();\n}\nfunction waitTimeout(amountMs) {\n    if (amountMs === 0) {\n        return Promise.resolve();\n    }\n    return new Promise(resolve => setTimeout(resolve, amountMs));\n}\n\n\n//# sourceURL=webpack://@reactodia/workspace/./examples/resources/exampleMetadataApi.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"rdf": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_reactodia_workspace"] = self["webpackChunk_reactodia_workspace"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/rdf.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;