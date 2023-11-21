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

/***/ "./examples/styleCustomization.tsx":
/*!*****************************************!*\
  !*** ./examples/styleCustomization.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var n3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! n3 */ \"./node_modules/n3/src/N3Parser.js\");\n/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/index */ \"./src/index.ts\");\n/* harmony import */ var _resources_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resources/common */ \"./examples/resources/common.ts\");\n\n\n\n\n\nconst CERTIFICATE_ICON = __webpack_require__(/*! @vscode/codicons/src/icons/symbol-class.svg */ \"./node_modules/@vscode/codicons/src/icons/symbol-class.svg\");\nconst COG_ICON = __webpack_require__(/*! @vscode/codicons/src/icons/gear.svg */ \"./node_modules/@vscode/codicons/src/icons/gear.svg\");\nconst TURTLE_DATA = __webpack_require__(/*! ./resources/orgOntology.ttl */ \"./examples/resources/orgOntology.ttl\");\nconst CUSTOM_LINK_TEMPLATE = {\n    markerSource: {\n        fill: '#4b4a67',\n        stroke: '#4b4a67',\n        d: 'M0,3a3,3 0 1,0 6,0a3,3 0 1,0 -6,0',\n        width: 6,\n        height: 6,\n    },\n    markerTarget: {\n        fill: '#4b4a67',\n        stroke: '#4b4a67',\n        d: 'm 20,5.88 -10.3,-5.95 0,5.6 -9.7,-5.6 0,11.82 9.7,-5.53 0,5.6 z',\n        width: 20,\n        height: 12,\n    },\n    renderLink: () => ({\n        connection: {\n            stroke: '#3c4260',\n            strokeWidth: 2,\n        },\n        label: {\n            text: { fill: '#3c4260' },\n        },\n    }),\n};\nfunction StyleCustomizationExample() {\n    const workspaceRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null);\n    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {\n        const cancellation = new AbortController();\n        const { model } = workspaceRef.current.getContext();\n        const dataProvider = new _src_index__WEBPACK_IMPORTED_MODULE_2__.RdfDataProvider();\n        dataProvider.addGraph(new n3__WEBPACK_IMPORTED_MODULE_4__[\"default\"]().parse(TURTLE_DATA));\n        const diagram = (0,_resources_common__WEBPACK_IMPORTED_MODULE_3__.tryLoadLayoutFromLocalStorage)();\n        model.importLayout({\n            diagram,\n            dataProvider: dataProvider,\n            validateLinks: true,\n            signal: cancellation.signal,\n        });\n        return () => cancellation.abort();\n    }, []);\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_index__WEBPACK_IMPORTED_MODULE_2__.Workspace, { ref: workspaceRef, typeStyleResolver: types => {\n            if (types.indexOf('http://www.w3.org/2000/01/rdf-schema#Class') !== -1) {\n                return { icon: CERTIFICATE_ICON };\n            }\n            else if (types.indexOf('http://www.w3.org/2002/07/owl#Class') !== -1) {\n                return { icon: CERTIFICATE_ICON };\n            }\n            else if (types.indexOf('http://www.w3.org/2002/07/owl#ObjectProperty') !== -1) {\n                return { icon: COG_ICON };\n            }\n            else if (types.indexOf('http://www.w3.org/2002/07/owl#DatatypeProperty') !== -1) {\n                return { color: '#046380' };\n            }\n            else {\n                return undefined;\n            }\n        }, onIriClick: ({ iri }) => window.open(iri), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_index__WEBPACK_IMPORTED_MODULE_2__.DefaultWorkspace, { canvas: {\n                linkTemplateResolver: type => CUSTOM_LINK_TEMPLATE,\n            }, toolbar: {\n                onSaveDiagram: () => {\n                    const { model } = workspaceRef.current.getContext();\n                    const diagram = model.exportLayout();\n                    window.location.hash = (0,_resources_common__WEBPACK_IMPORTED_MODULE_3__.saveLayoutToLocalStorage)(diagram);\n                    window.location.reload();\n                },\n            } }) }));\n}\n(0,_resources_common__WEBPACK_IMPORTED_MODULE_3__.mountOnLoad)((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyleCustomizationExample, {}));\n\n\n//# sourceURL=webpack://@reactodia/workspace/./examples/styleCustomization.tsx?");

/***/ }),

/***/ "./node_modules/@vscode/codicons/src/icons/gear.svg":
/*!**********************************************************!*\
  !*** ./node_modules/@vscode/codicons/src/icons/gear.svg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/icon-138b2889466e6f2f2841.svg\";\n\n//# sourceURL=webpack://@reactodia/workspace/./node_modules/@vscode/codicons/src/icons/gear.svg?");

/***/ }),

/***/ "./node_modules/@vscode/codicons/src/icons/symbol-class.svg":
/*!******************************************************************!*\
  !*** ./node_modules/@vscode/codicons/src/icons/symbol-class.svg ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/icon-0d0abb6f1bdb6f4d30ba.svg\";\n\n//# sourceURL=webpack://@reactodia/workspace/./node_modules/@vscode/codicons/src/icons/symbol-class.svg?");

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
/******/ 			"styleCustomization": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/styleCustomization.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;