"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[23526],{85971:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>t,contentTitle:()=>d,default:()=>a,frontMatter:()=>l,metadata:()=>c,toc:()=>o});var r=n(74848),s=n(28453);const l={},d="Interface: SparqlDataProviderSettings",c={id:"api/workspace/interfaces/SparqlDataProviderSettings",title:"Interface: SparqlDataProviderSettings",description:"Dataset-schema specific settings for SparqlDataProvider.",source:"@site/docs/api/workspace/interfaces/SparqlDataProviderSettings.md",sourceDirName:"api/workspace/interfaces",slug:"/api/workspace/interfaces/SparqlDataProviderSettings",permalink:"/docs/api/workspace/interfaces/SparqlDataProviderSettings",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/api/workspace/interfaces/SparqlDataProviderSettings.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Interface: PropertyTypeModel",permalink:"/docs/api/workspace/interfaces/PropertyTypeModel"},next:{title:"Type Alias: SubtypeEdge",permalink:"/docs/api/workspace/type-aliases/SubtypeEdge"}},t={},o=[{value:"Properties",id:"properties",level:2}];function h(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.h1,{id:"interface-sparqldataprovidersettings",children:"Interface: SparqlDataProviderSettings"}),"\n",(0,r.jsxs)(i.p,{children:["Dataset-schema specific settings for ",(0,r.jsx)(i.a,{href:"/docs/api/workspace/classes/SparqlDataProvider",children:"SparqlDataProvider"}),"."]}),"\n",(0,r.jsx)(i.h2,{id:"properties",children:"Properties"}),"\n",(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Property"}),(0,r.jsx)("th",{children:"Type"}),(0,r.jsx)("th",{children:"Description"})]})}),(0,r.jsxs)("tbody",{children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"classInfoQuery?"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(i.p,{children:"SELECT query to retrieve data for each class in a set."}),(0,r.jsx)(i.p,{children:"Parametrized variables:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${ids}"})," VALUES clause content with class IRIs"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${schemaLabelProperty}"})," ",(0,r.jsx)(i.code,{children:"schemaLabelProperty"})," property from the settings"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${labelLanguageFilter}"})," label filter based on ",(0,r.jsx)(i.code,{children:"filterOnlyLanguages"})]}),"\n"]}),(0,r.jsx)(i.p,{children:"Expected output bindings:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"?class"})}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?label"})," (optional)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?instcount"})," (optional)"]}),"\n"]})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"classTreeQuery?"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(i.p,{children:"SELECT query to retrieve class tree."}),(0,r.jsx)(i.p,{children:"Parametrized variables:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${schemaLabelProperty}"})," ",(0,r.jsx)(i.code,{children:"schemaLabelProperty"})," property from the settings"]}),"\n"]}),(0,r.jsx)(i.p,{children:"Expected output bindings:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"?class"})}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?label"})," (optional)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?parent"})," (optional)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?instcount"})," (optional)"]}),"\n"]})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"dataLabelProperty"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:"Property path for querying instance data labels (elements, links)."})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"defaultPrefix"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:"Default prefix to be used in every query."})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"elementInfoQuery"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(i.p,{children:"CONSTRUCT query to retrieve data for each element (types, labels, properties)."}),(0,r.jsx)(i.p,{children:"Parametrized variables:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${ids}"})," VALUES clause content with element IRIs"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${dataLabelProperty}"})," ",(0,r.jsx)(i.code,{children:"dataLabelProperty"})," property from the settings"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${labelLanguageFilter}"})," label filter based on ",(0,r.jsx)(i.code,{children:"filterOnlyLanguages"})]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${valueLanguageFilter}"})," property value filter based on ",(0,r.jsx)(i.code,{children:"filterOnlyLanguages"})]}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"${propertyConfigurations}"})}),"\n"]}),(0,r.jsx)(i.p,{children:"Expected output format for triples:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?inst <urn:reactodia:sparql:type> ?class"})," element has type"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?inst <urn:reactodia:sparql:label> ?label"})," element has label"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?inst ?propType ?propValue"})," element has value for a datatype property"]}),"\n"]})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"filterAdditionalRestriction"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:"SPARQL query pattern for additional filtering on elements within the lookup query."})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"filterElementInfoPattern"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsxs)("td",{children:[(0,r.jsxs)(i.p,{children:["SPARQL pattern which describes how to fetch elements info similar to ",(0,r.jsx)(i.code,{children:"elementInfoQuery"}),"\r\nbut within the lookup query."]}),(0,r.jsx)(i.p,{children:"Parametrized variables:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${dataLabelProperty}"})," ",(0,r.jsx)(i.code,{children:"dataLabelProperty"})," property from the settings"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${labelLanguageFilter}"})," label filter based on ",(0,r.jsx)(i.code,{children:"filterOnlyLanguages"})]}),"\n"]})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"filterOnlyLanguages?"})})}),(0,r.jsx)("td",{children:(0,r.jsxs)(i.p,{children:["readonly ",(0,r.jsx)(i.code,{children:"string"}),"[]"]})}),(0,r.jsx)("td",{children:(0,r.jsxs)(i.p,{children:["Set of language tags to provide a ",(0,r.jsx)(i.code,{children:"FILTER"})," for labels and other literal values."]})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"filterRefElementLinkPattern"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsxs)("td",{children:[(0,r.jsxs)(i.p,{children:["SPARQL query pattern to restrict lookup results in case when\r\n",(0,r.jsx)(i.a,{href:"/docs/api/workspace/interfaces/DataProviderLookupParams#refelementlinkid",children:"DataProviderLookupParams.refElementLinkId"})," is not specified."]}),(0,r.jsx)(i.p,{children:"Available bindings:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?link"})," link type"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?direction"})," link direction, either ",(0,r.jsx)(i.code,{children:'"in"'})," or ",(0,r.jsx)(i.code,{children:'"out"'})]}),"\n"]})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"filterTypePattern"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(i.p,{children:"SPARQL query pattern to retrieve transitive type sets for elements."}),(0,r.jsx)(i.p,{children:"Expected output bindings:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?inst"})," element IRI"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?class"})," element type (there may be multiple or transitive types for an element)"]}),"\n"]})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"fullTextSearch"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.a,{href:"/docs/api/workspace/interfaces/FullTextSearchSettings",children:(0,r.jsx)(i.code,{children:"FullTextSearchSettings"})})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:"Lookup by text settings."})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"imageQueryPattern"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(i.p,{children:"Query pattern to retrieve image URL for an element."}),(0,r.jsx)(i.p,{children:"Expected bindings:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?inst"})," element IRI"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?linkType"})," image property IRI"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?image"})," result image URL"]}),"\n"]})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"linkConfigurations"})})}),(0,r.jsx)("td",{children:(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.a,{href:"/docs/api/workspace/interfaces/LinkConfiguration",children:(0,r.jsx)(i.code,{children:"LinkConfiguration"})}),"[]"]})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:'"Virtual" links configurations to translate a SPARQL pattern as a link.'})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"linkTypesInfoQuery?"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(i.p,{children:"SELECT query to retrieve data for each link type in a set."}),(0,r.jsx)(i.p,{children:"Parametrized variables:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${ids}"})," VALUES clause content with link type IRIs"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${schemaLabelProperty}"})," ",(0,r.jsx)(i.code,{children:"schemaLabelProperty"})," property from the settings"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${labelLanguageFilter}"})," label filter based on ",(0,r.jsx)(i.code,{children:"filterOnlyLanguages"})]}),"\n"]}),(0,r.jsx)(i.p,{children:"Expected output bindings:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"?link"})}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?label"})," (optional)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?instcount"})," (optional)"]}),"\n"]})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"linkTypesOfQuery"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(i.p,{children:"SELECT query to retrieve incoming/outgoing link types from specified element with statistics."}),(0,r.jsxs)(i.p,{children:["If ",(0,r.jsx)(i.code,{children:"?direction"})," binding is returned, it would be possible to avoid statistics query\r\nwhen ",(0,r.jsx)(i.code,{children:"inexactCount"})," mode is requested in ",(0,r.jsx)(i.a,{href:"/docs/api/workspace/interfaces/DataProvider#connectedlinkstats",children:"DataProvider.connectedLinkStats"}),"."]}),(0,r.jsx)(i.p,{children:"Parametrized variables:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"${elementIri}"})}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"${linkConfigurations}"})}),"\n"]}),(0,r.jsx)(i.p,{children:"Expected bindings:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"?link"})}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?direction"})," (optional) - expected values: ",(0,r.jsx)(i.code,{children:'"in"'}),", ",(0,r.jsx)(i.code,{children:'"out"'}),"."]}),"\n"]})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"linkTypesPattern?"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsxs)("td",{children:[(0,r.jsxs)(i.p,{children:["Overridable part of ",(0,r.jsx)(i.code,{children:"linkTypesQuery"})," with same output bindings."]}),(0,r.jsx)(i.p,{children:"Parametrized variables: none"})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"linkTypesQuery?"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(i.p,{children:"SELECT query to retrieve initial link types."}),(0,r.jsx)(i.p,{children:"Parametrized variables:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${linkTypesPattern}"})," ",(0,r.jsx)(i.code,{children:"linkTypesPattern"})," property from the settings"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${schemaLabelProperty}"})," ",(0,r.jsx)(i.code,{children:"schemaLabelProperty"})," property from the settings"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${labelLanguageFilter}"})," label filter based on ",(0,r.jsx)(i.code,{children:"filterOnlyLanguages"})]}),"\n"]}),(0,r.jsx)(i.p,{children:"Expected output bindings:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"?link"})}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?label"})," (optional)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?instcount"})," (optional)"]}),"\n"]})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"linkTypesStatisticsQuery"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(i.p,{children:"SELECT query to retrieve statistics of incoming/outgoing link types for specified element."}),(0,r.jsx)(i.p,{children:"Parametrized variables:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"${linkId}"})}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"${elementIri}"})}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"${linkConfigurationOut}"})}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"${linkConfigurationIn}"})}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${navigateElementFilterOut}"})," (optional; for blank node support only)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${navigateElementFilterIn}"})," (optional; for blank node support only)"]}),"\n"]}),(0,r.jsx)(i.p,{children:"Expected bindings:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?link"})," link type"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?inCount"})," incoming links count"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?outCount"})," outgoing links count"]}),"\n"]})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"linksInfoQuery"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsxs)("td",{children:[(0,r.jsxs)(i.p,{children:["SELECT query to retrieve links between specified ",(0,r.jsx)(i.code,{children:"sourceIris"})," and\r\n",(0,r.jsx)(i.code,{children:"targetIris"})," sets of entities."]}),(0,r.jsxs)(i.p,{children:["For backwards compatibility, ",(0,r.jsx)(i.code,{children:"${ids}"})," placeholder variable with\r\ncombined set of entities can be used; in that case incremental\r\nlink querying will be disabled."]}),(0,r.jsx)(i.p,{children:"Parametrized variables:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${sourceIris}"})," VALUES clause content with source entity IRIs"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${targetIris}"})," VALUES clause content with target entity IRIs"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${ids}"})," VALUES clause content with all entity IRIs (for compatibility)"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${propLanguageFilter}"})," property value filter based on ",(0,r.jsx)(i.code,{children:"filterOnlyLanguages"})]}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"${linkConfigurations}"})}),"\n"]}),(0,r.jsx)(i.p,{children:"Expected output bindings:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?type"})," link type"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?source"})," link source"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?target"})," link target"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?propType"})," (optional) link property type"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?propValue"})," (optional) link property value"]}),"\n"]})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"openWorldLinks?"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"boolean"})})}),(0,r.jsxs)("td",{children:[(0,r.jsxs)(i.p,{children:["Allows data provider to find links other than specified in ",(0,r.jsx)(i.code,{children:"linkConfigurations"}),"\r\nwhen ",(0,r.jsx)(i.code,{children:"linkConfigurations"})," has at least one value set."]}),(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"Default"})}),(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-ts",children:"false\n"})})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"openWorldProperties?"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"boolean"})})}),(0,r.jsxs)("td",{children:[(0,r.jsxs)(i.p,{children:["Allows data provider to find element properties other than specified in\r\n",(0,r.jsx)(i.code,{children:"propertyConfigurations"})," when ",(0,r.jsx)(i.code,{children:"propertyConfigurations"})," has at least one value set."]}),(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:"Default"})}),(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-ts",children:"false\n"})})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"propertyConfigurations"})})}),(0,r.jsx)("td",{children:(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.a,{href:"/docs/api/workspace/interfaces/PropertyConfiguration",children:(0,r.jsx)(i.code,{children:"PropertyConfiguration"})}),"[]"]})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:'"Virtual" property configurations to translate a SPARQL pattern as an element property.'})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"propertyInfoQuery?"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(i.p,{children:"SELECT query to retrieve data for each datatype property in a set."}),(0,r.jsx)(i.p,{children:"Parametrized variables:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${ids}"})," VALUES clause content with datatype property IRIs"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${schemaLabelProperty}"})," ",(0,r.jsx)(i.code,{children:"schemaLabelProperty"})," property from the settings"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"${labelLanguageFilter}"})," label filter based on ",(0,r.jsx)(i.code,{children:"filterOnlyLanguages"})]}),"\n"]}),(0,r.jsx)(i.p,{children:"Expected output bindings:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"?property"})}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"?label"})," (optional)"]}),"\n"]})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"schemaLabelProperty"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:(0,r.jsx)(i.code,{children:"string"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(i.p,{children:"Property path for querying schema labels in schema (classes, link types, properties)."})})]})]})]})]})}function a(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},28453:(e,i,n)=>{n.d(i,{R:()=>d,x:()=>c});var r=n(96540);const s={},l=r.createContext(s);function d(e){const i=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),r.createElement(l.Provider,{value:i},e.children)}}}]);