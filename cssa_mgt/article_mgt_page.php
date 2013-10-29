<div data-dojo-type="dijit/layout/BorderContainer" id="article_mgt_borderContainer" design="sidebar" persist="false" 
	 gutters="true" style="position:absolute; top:0; left:0; min-width: 1em; min-height: 1px; max-width: 1200px; width: 100%; height: 100%;">
	 
	 <div data-dojo-type="dijit/layout/ContentPane" id="article_mgt_left_container" extractContent="false" preventCache="false" 
	 	preload="false" refreshOnShow="false" region="left" splitter="true" maxSize="Infinity" style=" display:none;  width: 540px;" doLayout="false">
	 		<div id="article_mgt_grid_container"></div>
	 </div>	
     <div data-dojo-type="dijit/layout/ContentPane" id="article_mgt_right_container" extractContent="false" preventCache="false" 
	 	preload="false" refreshOnShow="false" region="center" splitter=""true"" maxSize="Infinity" style=" display:none;  width: 540px;" doLayout="false">
	 	
	 	<div data-dojo-type="dijit/Editor" id="article_mgt_editor" style="height: 100%;" 
	 	    data-dojo-props="
	 	    height: '92%',
	 	    onChange:function(){console.log('editor1 onChange handler: ' + arguments[0])},
    		plugins:['cut','copy','paste','|',
    				 'bold','italic','underline','strikethrough','subscript','superscript','|',
    				 'indent', 'outdent', 'justifyLeft', 'justifyCenter', 'justifyRight','|'],
    		extraPlugins:['foreColor','hiliteColor',{name:'dijit/_editor/plugins/FontChoice', command:'fontName', generic:true},
						 {name: 'LocalImage', uploadable: true, uploadUrl: '', baseImageUrl: '../../form/tests/', fileMask: '*.jpg;*.jpeg;*.gif;*.png;*.bmp'}]  		
    		">    		
		</div>

	 </div>
</div>
 