function ys_showLoginDlg(){
    require(["dijit/registry","ready!"],
        function(reg){
            var dlg = reg.byId("mgt_loginDlg");
            //console.log(dlg);
            if(dlg){
                dlg.show();
            }
        }
    );
}

function doLogin(){
    ys_doLogin();
}

function doLoginReset(){
    ys_doLoginReset();
}

function ys_doLoginReset(){
    require(["dijit/registry","dojo/dom-style","ready!"],
        function(reg,domStyle){
            var dlg = reg.byId("mgt_loginDlg");
            if(dlg){
                dlg.reset();
                domStyle.set("login_error_lb", "display", "none");
            }
        }
    );
}

function  ys_doLogin(){

    var url = "../test_res/login_user.json";
    //var url = "/"+SYS_PATH+"/login/";
    require(["dojo/request/xhr","dijit/registry","dojo/dom-style","dojo/i18n!../js/nls/common.js", "dojo/on", "dojo/_base/json"], 
    		function(xhr,reg,domStyle,common,on,json){

        		var username = reg.byId("mgt_login_username").get("value");
        		var pwd = reg.byId("mgt_login_password").get("value");


        		console.log("PHP SESSIONID = ", YS_PHPSESSID);
         
        		xhr(url, {
        			handleAs: "json",
        			method: "POST",
        			data: json.toJson({username: username, passwd: pwd, phpsessid: YS_PHPSESSID})
        		}).then(function(data){
                 
        			if(data){
        				console.log("callback data after login > ", data);
        				if(data.success){
 
        					var uri_user_info = "/"+SYS_PATH+"/user/"+ data.id;
        					var user_def = {

                                    "success":true,
                                    "id":"",
                                    "loginname":"",
                                    "dispname":"",
                                    "lastname":"",
                                    "firstname":"",
                                    "email":"",
                                    "tel":"" 


                                };
        					
        					xhr(uri_user_info, {handleAs:"json"}).then(function(info_data){
        						if(info_data){

        							user_def.id         = info_data.id;
        							user_def.loginname  = info_data.loginname;
        							user_def.dispname   = info_data.dispname;
        							user_def.lastname   = info_data.lastname;
        							user_def.firstname  = info_data.firstname;
        							user_def.email      = info_data.email;
        							user_def.tel        = info_data.tel;
        							 

        							console.log("webuser, after login > ", user_def);
 

                                    

                                        var dlg = reg.byId("mgt_loginDlg");
                                        if(dlg){
                                            
                                        	YS_MGT_CURRENT_USER = user_def;
                                            dlg.hide();
                                            domStyle.set("login_error_lb", "display", "none");
 
                                             
                                        }else{
                                            console.log("error: loginDlg could not be found!");
                                        }
        						}
                            },function(err){
                                        alert(common.internal_server_error);
                                        return false;
                            });
 

                        }else{
                        domStyle.set("login_error_lb", "display", "block");
                    }
                }else{
                    alert(common.internal_server_error);
                }
                console.log("login user form server : ", data);

            }, function(err){
                alert(common.internal_server_error);
              
            });
    });

}
