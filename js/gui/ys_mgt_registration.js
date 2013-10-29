function doRegistration(){
	ys_doShowRegistration();
}

function ys_doShowRegistration(){	
	require(["dijit/registry","ready!"],
	        function(reg){
	            var dlg = reg.byId("mgt_regDlg");
	            //console.log(dlg);
	            if(dlg){
	            	

	            	var username_field = reg.byId("mgt_reg_username");
	            	//var email_field = reg.byId("mgt_reg_email");
	            	var passwd_field = reg.byId("mgt_reg_passwd");
	            	
	            	passwd_field.set("pattern", '^(?=.*\\d).{4,10}$');  //4到10位之间，必须含有一位数字
	            	username_field.set("pattern", '^\\w+$');   // 英数字加下划线串   
	            	//email_field.set("pattern", '^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$'); 
	            	
	                dlg.show();
	            }
	        }
	    ); 
}

function hideRegDlg(){
	ys_hideRegDlg();
}

function ys_hideRegDlg(){
	require(["dijit/registry"],
	        function(reg){
	            var dlg = reg.byId("mgt_regDlg");
	            //console.log(dlg);
	            if(dlg){	            	 
	                dlg.hide();
	            }
	        }
	    ); 
}

function ys_reg_confirmPassword(value, constraints){
	
	var isValid = false;
    if(constraints && constraints.other)  {
    	var otherInput =  dijit.byId(constraints.other);
    	if(otherInput) {
    		var otherValue = otherInput.value;
    		console.log("%s == %s ?", value, otherValue);
    		isValid = (value == otherValue);
    	}
    }
    return isValid;
}

function doRegDlg(){
	ys_doRegDlg();
}

function ys_doRegDlg(){
	
	require(["dijit/registry", "dojo/request/xhr", "dojo/_base/json", "dojo/i18n!../js/nls/common.js"],
			function(reg, xhr, json, common){
        		
			var username_field = reg.byId("mgt_reg_username");
			var email_field = reg.byId("mgt_reg_email");
			var passwd_field = reg.byId("mgt_reg_passwd");	 
			var passwd_field2 = reg.byId("mgt_reg_passwd2");
			
			if(username_field.isValid() && email_field.isValid() && passwd_field.isValid() && passwd_field2.isValid()){
				
				//var uri = 
				var uri = "../test_res/registration.json";
				
				var put_data = json.toJson({id:"", username:username_field.get("value"), email:email_field.get("value"), passwd:passwd_field.get("value") });

				xhr(check_uri,{handleAs: "json", method:"PUT", data:put_data}).then(function(data){

					console.log("callback data", data);
					if(data.success){
						alert("您已经注册成功，请登录");
						dlg.hide();
					}else{
						//后台服务失败
						if("user_exists" == data.error){
							alert("该用户名已经存在，请重新尝试");
						}else{
							alert(common.operation_error);
						}
						
					}

				},function(err){
					alert(common.internal_server_error);
				});				
			}else{
				alert("请正确填写带红色 *符号的必填项")
			}
					 
    	});
	
}