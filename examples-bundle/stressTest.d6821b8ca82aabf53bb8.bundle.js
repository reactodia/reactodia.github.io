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

/***/ "./examples/stressTest.tsx":
/*!*********************************!*\
  !*** ./examples/stressTest.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n/* harmony import */ var _src_workspace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/workspace */ \"./src/workspace.ts\");\n/* harmony import */ var _resources_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resources/common */ \"./examples/resources/common.tsx\");\n\n\n\nconst Layouts = _src_workspace__WEBPACK_IMPORTED_MODULE_1__.defineLayoutWorker(() => new Worker('layout.worker.js'));\nfunction StressTestExample() {\n    const { defaultLayout } = _src_workspace__WEBPACK_IMPORTED_MODULE_1__.useWorker(Layouts);\n    const { onMount } = _src_workspace__WEBPACK_IMPORTED_MODULE_1__.useLoadedWorkspace(async ({ context, signal }) => {\n        const { model, view } = context;\n        const dataProvider = new _src_workspace__WEBPACK_IMPORTED_MODULE_1__.RdfDataProvider();\n        const [graphData, nodes] = createLayout(500, 2, dataProvider.factory);\n        dataProvider.addGraph(graphData);\n        const diagram = (0,_resources_common__WEBPACK_IMPORTED_MODULE_2__.tryLoadLayoutFromLocalStorage)();\n        await model.importLayout({\n            diagram,\n            dataProvider,\n            validateLinks: Boolean(diagram),\n            signal,\n        });\n        if (!diagram) {\n            const rowCount = Math.floor(Math.sqrt(nodes.length));\n            const estimatedWidth = 200;\n            const estimatedHeight = 100;\n            const batch = model.history.startBatch();\n            for (let i = 0; i < nodes.length; i++) {\n                const nodeId = nodes[i];\n                const x = (i % rowCount) * estimatedWidth;\n                const y = Math.floor(i / rowCount) * estimatedHeight;\n                model.addElement(new _src_workspace__WEBPACK_IMPORTED_MODULE_1__.Element({\n                    id: `n:${i}`,\n                    data: {\n                        id: nodeId,\n                        types: [],\n                        label: [],\n                        properties: {},\n                    },\n                    position: { x, y },\n                }));\n            }\n            batch.store();\n            await Promise.all([\n                model.requestElementData(nodes),\n                model.requestLinksOfType(),\n            ]);\n            model.history.reset();\n            const canvas = view.findAnyCanvas();\n            if (canvas) {\n                canvas.renderingState.syncUpdate();\n                canvas.zoomToFit();\n            }\n        }\n    }, []);\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_workspace__WEBPACK_IMPORTED_MODULE_1__.Workspace, { ref: onMount, defaultLayout: defaultLayout, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_workspace__WEBPACK_IMPORTED_MODULE_1__.DefaultWorkspace, { leftColumn: { defaultCollapsed: true }, toolbar: {\n                menu: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_resources_common__WEBPACK_IMPORTED_MODULE_2__.ExampleToolbarMenu, {}),\n            }, navigator: {\n                expanded: false,\n            } }) }));\n}\nfunction createLayout(nodeCount, edgesPerNode, factory) {\n    const rdfType = factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');\n    const rdfsLabel = factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label');\n    const nodeType = factory.namedNode('urn:test:Node');\n    const linkType = factory.namedNode('urn:test:link');\n    const makeNodeIri = (n) => factory.namedNode(`urn:test:n:${n}`);\n    const elementIris = [];\n    const quads = [];\n    for (let i = 0; i < nodeCount; i++) {\n        const iri = makeNodeIri(i);\n        elementIris.push(iri.value);\n        quads.push(factory.quad(iri, rdfType, nodeType), factory.quad(iri, rdfsLabel, factory.literal(`Node ${i}`)));\n        for (let j = 0; j < edgesPerNode; j++) {\n            const target = i - j - 1;\n            if (target >= 0) {\n                quads.push(factory.quad(iri, linkType, makeNodeIri(target)));\n            }\n        }\n    }\n    return [quads, elementIris];\n}\n(0,_resources_common__WEBPACK_IMPORTED_MODULE_2__.mountOnLoad)((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StressTestExample, {}));\n\n\n//# sourceURL=webpack://@reactodia/workspace/./examples/stressTest.tsx?");

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
/******/ 			"stressTest": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/stressTest.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;