function ys_start_article_grid(){
	
 
    require([
             "dojo/i18n!../js/nls/common.js",
             "dojo/dom-style", 
             "dijit/registry",
             "dojo/date/stamp",
             "dojo/store/JsonRest",
             "dojo/store/Memory",
             "dojo/store/Observable",
             "dojo/store/Cache",
             "dojo/when",
             "gridx/Grid",
             "gridx/core/model/cache/Async",
             "gridx/modules/VirtualVScroller",
             "gridx/modules/TouchScroll",
             "gridx/modules/ColumnResizer",
             "gridx/modules/SingleSort",
             "gridx/support/Summary",
             "gridx/modules/CellWidget",
             "gridx/modules/Bar",
             "gridx/modules/IndirectSelect",
             "gridx/modules/select/Row",
             "gridx/modules/move/Row",
             "gridx/modules/extendedSelect/Row",
             "gridx/modules/RowHeader",
             "gridx/modules/Pagination",
             "gridx/modules/pagination/PaginationBar",
             "gridx/modules/Filter",
             "gridx/modules/filter/FilterBar",
             "gridx/modules/filter/QuickFilter"

         ],
             function (common, domStyle, reg, stamp, JsonRest, Memory, Observable, CacheL, when, 
            		   Grid, Cache, VirtualVScroller, TouchScroll, ColumnResizer, SingleSort, Summary, CellWidget, Bar, IndirectSelect, Row, move_Row, Ext_Row, RowHeader, Pagination, PaginationBar, Filter, FilterBar, QuickFilter) {
                 var master_store, cacheStore, store;
                 
                 console.log("ys_start_article_grid------------> start ");
                 
                 var id = "article_mgt_grid";
                 var grid_div = reg.byId(id);
                 
                 /*
                 master_store = new Observable(JsonRest({
                     target:"/" + SYS_PATH + "/article/",
                     idAttribute:"id"
                 }));

                 cacheStore = new Memory({idProperty:"id", data:[]});
                 store = CacheL(master_store, cacheStore);
			     */
                 
                 
                 var demo_data = [
	{
		id: 1,  // article的id
		answer: [{id:3, title:"回复第一篇", creuser:2}],
		title:"第一篇",
		content:"This is the first aticle",
		creuser: "dashen", //创建者username
		credate:123123123, //创建时间戳 unix毫秒   
		moduser:"",//修改者 userid
		moddate:"" ,//修改时间戳
		refer:[{userid:2, dispname:"晓友", username:"xiaoyou"},{userid:3, dispname:"吉晨", username:"jack" }],  // 涉及人或者参与者等，json array
		state:"A", //状态，例如审核状态等
	},
	{
		id: 2,  // article的id
		answer: [], 
		title:"第二篇",
		content:"This is the answer of the first aticle",
		creuser: "dashen", //创建者username
		credate:123223123, //创建时间戳 unix毫秒   
		moduser:"",//修改者 userid
		moddate:"" ,//修改时间戳
		refer:[{userid:2, dispname:"晓友", username:"xiaoyou"},{userid:3, dispname:"吉晨", username:"jack" }],  // 涉及人或者参与者等，json array
		state:"A", //状态，例如审核状态等
		},
		{
			id: 3,  // article的id
			answer: [],
			title:"回复第一篇",
			content:"This is the answer of the first aticle",
			creuser: "xiaoyou", //创建者userid
			credate:123123123, //创建时间戳 unix毫秒   
			moduser:"",//修改者 userid
			moddate:"" ,//修改时间戳
			refer:[{userid:2, dispname:"晓友", username:"xiaoyou"},{userid:3, dispname:"吉晨", username:"jack" }],  // 涉及人或者参与者等，json array
			state:"A", //状态，例如审核状态等
		}
	];
                 
                 
                  
                 store = new Memory({data:demo_data});
             
                 if (!grid_div) {
                	 
                	 
                	 var getDateFromUTC = function (date) {
                         if (date == "" || date == null) {
                             return "";
                         }
 
                         return stamp.toISOString(new Date(date));
                     };
                	 
                    
                     var structure = [
                                      { id:'title', field:'title', name:'题目', width:'15%'},
                                      { id:'state', field:'state', name:'状态', width:'5%'}, 
                                      { id:'answer', field:'answer', name:'回复数', width:'5%', formatter: function(rawData){
                                    	  return rawData.answer.length;
                                      }},
                                      { id:'refer', field:'refer', name:'参与', width:'15%', formatter: function(rawData){
                                    	  var erg = "";
                                    	  var refers = rawData.refer;
                                    	  if (refers&&refers.length > 0) {
                                              for(var i in refers){
                                            	  var item = refers[i];
                                            	  erg += item.username + " , "; 
                                              }
                                              
                                              erg = erg.substring(0,erg.length-2);
                                          }
                                          return erg;
                                           
                                      }},
                                      { id:'creuser', field:'creuser', name:'创建者', width:'15%', decorator:function (cellData) {
                                          if (cellData) {
                                              
                                              return cellData;
                                          }

                                          return cellData;

                                      }
                                      },
                                      { id:'credate', field:'credate', name:'创建时间', width:'15%',  decorator:function (cellData) {
                                          if (cellData) {
                                              return   getDateFromUTC(cellData);
                                          }
                                              return "";
                                          }
                                      },
                                      { id:'moduser', field:'moduser', name:'更改者', width:'15%', decorator:function (cellData) {
                                          if (cellData) {
                                              
                                              return cellData;
                                          }

                                          return cellData;

                                      }
                                      },
                                      { id:'moddate', field:'moddate', name:'修改时间', width:'15%',  decorator:function (cellData) {
                                          if (cellData) {
                                              return   getDateFromUTC(cellData);
                                          }
                                              return "";
                                          }
                                      },
                                     
                                      
                                  ];

                     //Create grid widget.
                     //var toolbar_id = id + "Toolbar";
                     //domStyle.set(toolbar_id, "display", "block");
                     console.log("ys_start_article_grid------------>4");
                     var grid = new Grid({
                         id:id,
                         store:store,
                         cacheClass:Cache,
                         vScrollerLazy:true,
                         selectRowTriggerOnCell:true,
                         structure:structure,
                         selectRowMultiple:true,
                         pageSize:15,
                         paginationBarSizes:[15, 30, 50, 100, 0],
                         //barTop:[
                         //    { plugin:toolbar_id}
                         //],
                         modules:[
                             CellWidget,
                             ColumnResizer,
                             TouchScroll,
                             {
                                 moduleClass:SingleSort,
                                 initialOrder:{ colId:'credate', descending:true }
                             },
                             IndirectSelect, Row, RowHeader, Ext_Row, Pagination, PaginationBar,
                             VirtualVScroller,
                             Bar
                         ]
                     });

                     //Put it into the DOM tree. 
                     grid.placeAt("article_mgt_grid_container");
 
                     grid.connect(grid, "onCellClick", function (evt) {
                         var cell = grid.cell(evt.rowId, evt.columnId, true);
                         var rowId = cell.row.id;
                         var row = grid.row(rowId);
                         var rowData = grid.row(rowId).rawData();
                         console.log("row data   ", rowData);
                          
                     });


                     grid.startup();
                     
                     console.log("article grid startup");

                 } else {

                     grid_div.setStore(store);
                 }


             });


	
}